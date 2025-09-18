import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getSubdomain } from '@/lib/tenant';

type Tenant = {
  id: string;
  name: string;
  subdomain: string;
  sector: string | null;
  plan: string | null;
};

type TenantContext = { 
  tenant: Tenant | null; 
  loading: boolean;
  error: string | null;
};

const TenantContext = createContext<TenantContext>({ 
  tenant: null, 
  loading: true,
  error: null
});

export const useTenant = () => useContext(TenantContext);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subdomain = getSubdomain(window.location.hostname);
    
    if (!subdomain) {
      setError('No subdomain detected');
      setLoading(false);
      return;
    }

    const fetchTenant = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('tenants')
          .select('*')
          .eq('subdomain', subdomain)
          .single();
          
        if (error) {
          console.error('Error fetching tenant:', error);
          setError('Tenant not found');
          setTenant(null);
        } else {
          setTenant(data as Tenant);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching tenant:', err);
        setError('Failed to load tenant');
        setTenant(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, loading, error }}>
      {children}
    </TenantContext.Provider>
  );
}