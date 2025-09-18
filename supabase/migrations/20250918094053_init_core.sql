-- ================
-- Core multi-tenant schema voor COGNIQ Command Center
-- Tabellen: tenants, users (profielen), agents, tenant_agents, agent_jobs
-- Inclusief Row-Level Security (RLS) policies
-- ================

-- Zorg voor uuid
create extension if not exists "uuid-ossp";

-- 1) TENANTS
create table if not exists public.tenants (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  subdomain   text unique not null,
  sector      text,                         -- bijv. 'verzekeraars','accountancy', etc.
  plan        text,                         -- abonnements/contract info
  created_at  timestamptz not null default now()
);

-- 2) USERS (koppeling met auth.users)
-- Let op: 'id' = auth.users.id
create table if not exists public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  tenant_id   uuid not null references public.tenants(id) on delete cascade,
  role        text not null check (role in ('admin','member')),
  full_name   text,
  created_at  timestamptz not null default now()
);

-- 3) AGENTS (catalogus van tools/agents)
create table if not exists public.agents (
  id                    uuid primary key default gen_random_uuid(),
  name                  text not null,
  slug                  text unique not null,
  category              text,               -- 'cross-sector' of 'sector'
  sector                text,               -- optioneel: sector waarvoor deze agent bedoeld is
  description           text,
  configuration_schema  jsonb,              -- JSON schema/handleiding voor config
  created_at            timestamptz not null default now()
);

-- 4) TENANT_AGENTS (welke agents zijn afgenomen door de tenant + tenant-specifieke config)
create table if not exists public.tenant_agents (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid not null references public.tenants(id) on delete cascade,
  agent_id    uuid not null references public.agents(id)  on delete restrict,
  status      text default 'active',        -- 'active' | 'paused' | 'cancelled'
  config      jsonb,                        -- tenant-specifieke config (API-keys, routing, etc.)
  created_at  timestamptz not null default now(),
  unique (tenant_id, agent_id)
);

-- 5) AGENT_JOBS (event/taaklog van agent-run's)
create table if not exists public.agent_jobs (
  id            uuid primary key default gen_random_uuid(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  agent_id      uuid not null references public.agents(id)  on delete restrict,
  task_type     text,                       -- bijv. 'invoice_ocr', 'ap_approval', ...
  input_data    jsonb,
  output_data   jsonb,
  status        text check (status in ('pending','running','completed','failed')) default 'pending',
  error_message text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Handige indexen
create index if not exists idx_users_tenant      on public.users(tenant_id);
create index if not exists idx_ta_tenant_agent   on public.tenant_agents(tenant_id, agent_id);
create index if not exists idx_jobs_tenant_time  on public.agent_jobs(tenant_id, created_at);

-- =========================================================
-- RLS: elke tenant ziet alleen eigen rijen
-- =========================================================

-- Hulpfunctie: huidige tenant_id van ingelogde gebruiker
-- (zo vermijd je subqueries te vaak te herhalen)
create or replace function public.current_tenant_id()
returns uuid
language sql
stable
as $$
  select u.tenant_id
  from public.users u
  where u.id = auth.uid()
$$;

-- TENANTS: alleen eigen tenant kunnen zien; mutaties alleen via service_role
alter table public.tenants enable row level security;

drop policy if exists tenants_select_own on public.tenants;
create policy tenants_select_own
  on public.tenants
  for select
  using ( id = public.current_tenant_id() );

-- Alleen service_role mag tenants wijzigen/aanmaken/verwijderen
drop policy if exists tenants_mod_service on public.tenants;
create policy tenants_mod_service
  on public.tenants
  for all
  to service_role
  using (true)
  with check (true);

-- USERS: per tenant zichtbaar; user mag eigen profiel updaten; admin kan iedereen binnen eigen tenant updaten
alter table public.users enable row level security;

drop policy if exists users_select_same_tenant on public.users;
create policy users_select_same_tenant
  on public.users
  for select
  using ( tenant_id = public.current_tenant_id() );

-- eigen profiel updaten
drop policy if exists users_update_self on public.users;
create policy users_update_self
  on public.users
  for update
  using ( id = auth.uid() )
  with check ( id = auth.uid() );

-- admin binnen eigen tenant mag iedereen updaten
drop policy if exists users_update_admin on public.users;
create policy users_update_admin
  on public.users
  for update
  using ( tenant_id = public.current_tenant_id()
          and exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin') )
  with check ( tenant_id = public.current_tenant_id() );

-- inserts/deletes alleen door service_role (migraties/provisioning)
drop policy if exists users_mod_service on public.users;
create policy users_mod_service
  on public.users
  for all
  to service_role
  using (true)
  with check (true);

-- AGENTS: catalogus is read-only voor iedereen (select); mutaties via service_role
alter table public.agents enable row level security;

drop policy if exists agents_select_all on public.agents;
create policy agents_select_all
  on public.agents
  for select
  using (true);

drop policy if exists agents_mod_service on public.agents;
create policy agents_mod_service
  on public.agents
  for all
  to service_role
  using (true)
  with check (true);

-- TENANT_AGENTS: alleen eigen tenant mag select/insert/update/delete
alter table public.tenant_agents enable row level security;

drop policy if exists ta_select_same_tenant on public.tenant_agents;
create policy ta_select_same_tenant
  on public.tenant_agents
  for select
  using ( tenant_id = public.current_tenant_id() );

drop policy if exists ta_insert_same_tenant on public.tenant_agents;
create policy ta_insert_same_tenant
  on public.tenant_agents
  for insert
  with check ( tenant_id = public.current_tenant_id() );

drop policy if exists ta_update_same_tenant on public.tenant_agents;
create policy ta_update_same_tenant
  on public.tenant_agents
  for update
  using ( tenant_id = public.current_tenant_id() )
  with check ( tenant_id = public.current_tenant_id() );

drop policy if exists ta_delete_same_tenant on public.tenant_agents;
create policy ta_delete_same_tenant
  on public.tenant_agents
  for delete
  using ( tenant_id = public.current_tenant_id() );

-- AGENT_JOBS: tenant-scoped
alter table public.agent_jobs enable row level security;

drop policy if exists jobs_select_same_tenant on public.agent_jobs;
create policy jobs_select_same_tenant
  on public.agent_jobs
  for select
  using ( tenant_id = public.current_tenant_id() );

drop policy if exists jobs_insert_same_tenant on public.agent_jobs;
create policy jobs_insert_same_tenant
  on public.agent_jobs
  for insert
  with check ( tenant_id = public.current_tenant_id() );

drop policy if exists jobs_update_same_tenant on public.agent_jobs;
create policy jobs_update_same_tenant
  on public.agent_jobs
  for update
  using ( tenant_id = public.current_tenant_id() )
  with check ( tenant_id = public.current_tenant_id() );

-- =========================================================
-- SEED: basis agent-catalogus (readonly, muteren met service_role)
-- (optioneel, maar handig om de UI te vullen)
-- =========================================================
insert into public.agents (id, name, slug, category, sector, description, configuration_schema)
values
  (gen_random_uuid(), 'Invoice OCR',   'invoice_ocr', 'cross-sector', null,
   'OCR + 3-way match (inkooporder, pakbon, factuur).', '{"fields":["provider","threshold"],"required":["provider"]}'),
  (gen_random_uuid(), 'AP Approval',   'ap_approval', 'cross-sector', null,
   'Workflow voor crediteuren-factuur goedkeuring met SLA.', '{"fields":["approvers","sla_minutes"]}'),
  (gen_random_uuid(), 'Ticket Triage', 'ticket_triage','cross-sector', null,
   'Mail/kanalen routering en prioritering met labeling.', '{"fields":["channels","priority_rules"]}')
on conflict do nothing;

-- Tip: voeg later sector-specifieke agents toe (claims triage, HS-classification, etc.)