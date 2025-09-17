import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Cpu, 
  Package, 
  Database, 
  FileBarChart, 
  TriangleAlert, 
  LifeBuoy, 
  Shield, 
  Settings,
  ChevronRight,
  Pin,
  PinOff
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSidebar } from '@/hooks/useSidebar';

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavigationItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: Activity },
  { path: '/agent', label: 'Agent', icon: Cpu },
  { path: '/tools', label: 'Tools', icon: Package },
  { path: '/data', label: 'Data', icon: Database },
  { path: '/reports', label: 'Reports', icon: FileBarChart },
  { path: '/exceptions', label: 'Exceptions', icon: TriangleAlert },
  { path: '/tickets', label: 'Tickets', icon: LifeBuoy },
  { path: '/audit', label: 'Audit', icon: Shield },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const NavigationRail: React.FC = () => {
  const { 
    isExpanded, 
    isPinned, 
    isMobile, 
    toggleExpanded, 
    togglePinned, 
    collapse,
    handleRouteChange 
  } = useSidebar();
  
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === '[') {
        e.preventDefault();
        toggleExpanded();
      } else if (e.key === ']') {
        e.preventDefault();
        togglePinned();
      } else if (e.key === 'Escape' && isMobile && isExpanded) {
        collapse();
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [toggleExpanded, togglePinned, isMobile, isExpanded, collapse]);

  // Handle navigation click and auto-collapse
  const handleNavigationClick = () => {
    handleRouteChange();
  };

  // Handle backdrop click on mobile
  const handleBackdropClick = () => {
    if (isMobile && isExpanded) {
      collapse();
    }
  };

  // Focus trap for mobile
  useEffect(() => {
    if (isMobile && isExpanded && navRef.current) {
      const focusableElements = navRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isMobile, isExpanded]);

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isExpanded && (
        <div 
          className="nav-backdrop" 
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Navigation Rail */}
      <nav 
        ref={navRef}
        className={`nav-rail ${isExpanded ? 'expanded' : ''} ${isMobile && isExpanded ? 'mobile-overlay' : ''}`}
        role="navigation" 
        aria-label="Main navigation"
        aria-expanded={isExpanded}
      >
        <div className={isMobile && isExpanded ? 'nav-content' : 'nav-content'}>
          {/* Header with toggle */}
          <div className="nav-header">
            <div className="flex items-center">
              {isExpanded && (
                <h2 className="text-sm font-semibold text-nav-foreground mr-2">
                  Navigation
                </h2>
              )}
            </div>
            {!(isPinned && isExpanded) && (
              <button
                onClick={toggleExpanded}
                className="nav-toggle"
                aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                title={`${isExpanded ? 'Collapse' : 'Expand'} (Press [)`}
              >
                <ChevronRight 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`} 
                />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <div className="nav-items">
            <TooltipProvider>
              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  const navLink = (
                    <NavLink
                      to={item.path}
                      onClick={handleNavigationClick}
                      className={`nav-item group ${isActive ? 'active' : ''} w-full`}
                      aria-label={item.label}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div className="nav-item-icon">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="nav-item-label">
                        {item.label}
                      </span>
                    </NavLink>
                  );

                  // Only show tooltip when collapsed
                  return (
                    <div key={item.path}>
                      {!isExpanded ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {navLink}
                          </TooltipTrigger>
                          <TooltipContent side="right" sideOffset={10}>
                            <p>{item.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        navLink
                      )}
                    </div>
                  );
                })}
              </div>
            </TooltipProvider>
          </div>

          {/* Pin Section */}
          {isExpanded && (
            <div className="nav-pin-section">
              <button
                onClick={togglePinned}
                className="nav-pin-button"
                title={`${isPinned ? 'Unpin' : 'Pin'} sidebar (Press ])`}
              >
                {isPinned ? (
                  <PinOff className="h-4 w-4 mr-2" />
                ) : (
                  <Pin className="h-4 w-4 mr-2" />
                )}
                <span className="text-xs">
                  {isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
                </span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};