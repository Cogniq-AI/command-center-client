import { useState, useEffect } from 'react';

interface SidebarState {
  isExpanded: boolean;
  isPinned: boolean;
  isMobile: boolean;
}

export const useSidebar = () => {
  const [state, setState] = useState<SidebarState>(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      return { isExpanded: false, isPinned: false, isMobile: false };
    }
    
    const saved = localStorage.getItem('sidebar-state');
    const savedState = saved ? JSON.parse(saved) : {};
    const isMobile = window.innerWidth < 768;
    
    return {
      isExpanded: savedState.isExpanded || false,
      isPinned: savedState.isPinned || false,
      isMobile
    };
  });

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setState(prev => ({ ...prev, isMobile }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebar-state', JSON.stringify({
      isExpanded: state.isExpanded,
      isPinned: state.isPinned
    }));
  }, [state.isExpanded, state.isPinned]);

  const toggleExpanded = () => {
    setState(prev => ({ ...prev, isExpanded: !prev.isExpanded }));
  };

  const togglePinned = () => {
    setState(prev => ({ ...prev, isPinned: !prev.isPinned }));
  };

  const collapse = () => {
    setState(prev => ({ ...prev, isExpanded: false }));
  };

  const expand = () => {
    setState(prev => ({ ...prev, isExpanded: true }));
  };

  // Auto-collapse on route change if not pinned
  const handleRouteChange = () => {
    if (!state.isPinned && !state.isMobile) {
      collapse();
    }
  };

  return {
    ...state,
    toggleExpanded,
    togglePinned,
    collapse,
    expand,
    handleRouteChange
  };
};