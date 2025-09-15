import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';

export const TopBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [environment, setEnvironment] = useState(() => {
    return localStorage.getItem('environment') || 'sandbox';
  });

  useEffect(() => {
    localStorage.setItem('environment', environment);
  }, [environment]);

  return (
    <header className="top-bar">
      {/* Skip to content for accessibility */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to content
      </a>

      {/* Left section */}
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-semibold text-foreground">
          [Client Company]
        </h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search..."
            className="search-input pl-10 w-64"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Environment Toggle */}
        <Select value={environment} onValueChange={setEnvironment}>
          <SelectTrigger className="w-32 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sandbox">Sandbox</SelectItem>
            <SelectItem value="prod">Prod</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          className="h-9 w-9 p-0"
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          aria-label="Notifications"
          className="h-9 w-9 p-0 relative"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></span>
        </Button>

        <Badge variant="secondary" className="text-xs font-medium">
          SSO
        </Badge>
      </div>
    </header>
  );
};