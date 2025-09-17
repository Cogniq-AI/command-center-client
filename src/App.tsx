import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NavigationRail } from '@/components/NavigationRail';
import { TopBar } from '@/components/TopBar';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  return (
    <div className="min-h-screen w-full flex">
      {/* Navigation Rail */}
      <NavigationRail />
      
      {/* Main Content Area */}
      <div className="page-container">
        {/* Top Bar */}
        <TopBar />
        
        {/* Page Content */}
        <main id="main-content" className="page-content" role="main">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agent" element={<Agent />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/data" element={<Data />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/exceptions" element={<Exceptions />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
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
          <BrowserRouter>
            <AppContent />
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
