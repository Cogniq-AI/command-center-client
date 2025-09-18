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
import Auth from './pages/Auth';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { RequireAuth } from './components/RequireAuth';
import { RequireTenant } from './components/RequireTenant';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const isAuthPage = ['/login', '/signup', '/auth'].includes(window.location.pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen w-full">
        <main id="main-content" className="w-full" role="main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

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
            <Route path="/dashboard" element={
              <RequireAuth>
                <RequireTenant>
                  <Dashboard />
                </RequireTenant>
              </RequireAuth>
            } />
            <Route path="/agent" element={
              <RequireAuth>
                <RequireTenant>
                  <Agent />
                </RequireTenant>
              </RequireAuth>
            } />
            <Route path="/tools" element={
              <RequireAuth>
                <RequireTenant>
                  <Tools />
                </RequireTenant>
              </RequireAuth>
            } />
            <Route path="/data" element={
              <RequireAuth>
                <RequireTenant>
                  <Data />
                </RequireTenant>
              </RequireAuth>
            } />
            <Route path="/reports" element={
              <RequireAuth>
                <RequireTenant>
                  <Reports />
                </RequireTenant>
              </RequireAuth>
            } />
            <Route path="/exceptions" element={
              <RequireAuth>
                <RequireTenant>
                  <Exceptions />
                </RequireTenant>
              </RequireAuth>
            } />
            <Route path="/tickets" element={
              <RequireAuth>
                <RequireTenant>
                  <Tickets />
                </RequireTenant>
              </RequireAuth>
            } />
            <Route path="/audit" element={
              <RequireAuth>
                <RequireTenant>
                  <Audit />
                </RequireTenant>
              </RequireAuth>
            } />
            <Route path="/settings" element={
              <RequireAuth>
                <RequireTenant>
                  <Settings />
                </RequireTenant>
              </RequireAuth>
            } />
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
