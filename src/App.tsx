import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NavigationRail, type Page } from '@/components/NavigationRail';
import { TopBar } from '@/components/TopBar';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSidebar } from '@/hooks/useSidebar';

// Page imports
import Dashboard from './pages/Dashboard';
import Agent from './pages/Agent';
import Tools from './pages/Tools';
import Data from './pages/Data';
import Reports from './pages/Reports';
import Exceptions from './pages/Exceptions';
import Tickets from './pages/Tickets';
import Audit from './pages/Audit';
import Settings from './pages/Settings';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const { isExpanded, isMobile } = useSidebar();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'agent':
        return <Agent />;
      case 'tools':
        return <Tools />;
      case 'data':
        return <Data />;
      case 'reports':
        return <Reports />;
      case 'exceptions':
        return <Exceptions />;
      case 'tickets':
        return <Tickets />;
      case 'audit':
        return <Audit />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Navigation Rail */}
      <NavigationRail 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
      />
      
      {/* Main Content Area */}
      <div className="page-container">
        {/* Top Bar */}
        <TopBar />
        
        {/* Page Content */}
        <main id="main-content" className="page-content" role="main">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
