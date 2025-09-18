export function getSubdomain(hostname: string): string | null {
  const parts = hostname.split('.');
  // demo.cogniqai.nl -> 'demo'; localhost fallback for development
  if (parts.length > 2) {
    return parts[0];
  }
  
  // For localhost development, you can use formats like:
  // demo.localhost or localhost:3000?tenant=demo
  if (hostname.includes('localhost')) {
    // Check for demo.localhost format
    if (parts[0] !== 'localhost' && parts[1] === 'localhost') {
      return parts[0];
    }
    
    // Fallback: check URL params for tenant (useful for local dev)
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('tenant');
  }
  
  return null;
}