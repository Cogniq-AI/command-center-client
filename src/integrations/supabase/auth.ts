import { supabase } from './client';

export async function signUp(email: string, password: string) {
  const redirectUrl = `${window.location.origin}/`;
  
  return supabase.auth.signUp({ 
    email, 
    password,
    options: {
      emailRedirectTo: redirectUrl
    }
  });
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function onboardUser(tenantSubdomain: string, role: string = 'admin', fullName: string = '') {
  return (supabase as any).rpc('onboard_user', {
    _tenant_subdomain: tenantSubdomain,
    _role: role,
    _full_name: fullName
  });
}