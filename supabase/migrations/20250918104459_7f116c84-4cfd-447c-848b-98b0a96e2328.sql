-- Create onboarding function for linking auth users to tenants
CREATE OR REPLACE FUNCTION public.onboard_user(_tenant_subdomain text, _role text, _full_name text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_tenant uuid;
BEGIN
  -- Find the tenant by subdomain
  SELECT id INTO v_tenant FROM public.tenants WHERE subdomain = _tenant_subdomain;
  
  IF v_tenant IS NULL THEN
    RAISE EXCEPTION 'Unknown tenant subdomain: %', _tenant_subdomain;
  END IF;

  -- Insert user row if it doesn't exist (on conflict do nothing for safety)
  INSERT INTO public.users (id, tenant_id, role, full_name)
  VALUES (auth.uid(), v_tenant, _role, _full_name)
  ON CONFLICT (id) DO NOTHING;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.onboard_user(text, text, text) TO authenticated;