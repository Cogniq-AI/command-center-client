import { supabase } from '@/integrations/supabase/client';

// Get tenant agents with agent details
export async function getTenantAgents() {
  const { data, error } = await (supabase as any)
    .from('tenant_agents')
    .select(`
      id,
      status,
      config,
      created_at,
      agents:agent_id (
        id,
        name,
        slug,
        category,
        sector,
        description
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tenant agents:', error);
    return [];
  }

  return data || [];
}

// Get available agents not yet added to tenant
export async function getAvailableAgents() {
  const { data, error } = await (supabase as any)
    .from('agents')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching available agents:', error);
    return [];
  }

  return data || [];
}

// Add agent to tenant
export async function addTenantAgent(tenantId: string, agentId: string, config = {}) {
  const { data, error } = await (supabase as any)
    .from('tenant_agents')
    .insert({
      tenant_id: tenantId,
      agent_id: agentId,
      config,
      status: 'active'
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding tenant agent:', error);
    throw error;
  }

  return data;
}

// Get agent jobs statistics
export async function getAgentJobsStats(days = 1) {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const { data, error } = await (supabase as any)
    .from('agent_jobs')
    .select('status, created_at')
    .gte('created_at', fromDate.toISOString());

  if (error) {
    console.error('Error fetching agent jobs stats:', error);
    return { total: 0, success: 0, failed: 0, pending: 0 };
  }

  const jobs = data || [];
  const stats = {
    total: jobs.length,
    success: jobs.filter(job => job.status === 'completed').length,
    failed: jobs.filter(job => job.status === 'failed').length,
    pending: jobs.filter(job => job.status === 'pending').length
  };

  return stats;
}

// Get recent agent jobs
export async function getRecentAgentJobs(limit = 10) {
  const { data, error } = await (supabase as any)
    .from('agent_jobs')
    .select(`
      id,
      status,
      task_type,
      created_at,
      updated_at,
      error_message,
      agents:agent_id (
        name,
        slug
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent agent jobs:', error);
    return [];
  }

  return data || [];
}