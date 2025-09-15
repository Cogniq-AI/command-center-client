import React from 'react';
import { 
  Activity, 
  Cpu, 
  Package, 
  Database, 
  FileBarChart, 
  TriangleAlert, 
  LifeBuoy, 
  Shield, 
  Settings 
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type Page = 'dashboard' | 'agent' | 'tools' | 'data' | 'reports' | 'exceptions' | 'tickets' | 'audit' | 'settings';

interface NavigationItem {
  id: Page;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'agent', label: 'Agent', icon: Cpu },
  { id: 'tools', label: 'Tools', icon: Package },
  { id: 'data', label: 'Data', icon: Database },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
  { id: 'exceptions', label: 'Exceptions', icon: TriangleAlert },
  { id: 'tickets', label: 'Tickets', icon: LifeBuoy },
  { id: 'audit', label: 'Audit', icon: Shield },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface NavigationRailProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="nav-rail" role="navigation" aria-label="Main navigation">
      <TooltipProvider>
        <div className="flex flex-col items-center py-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </nav>
  );
};