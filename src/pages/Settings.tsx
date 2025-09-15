import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const Settings: React.FC = () => {
  const [environment, setEnvironment] = useState(() => {
    return localStorage.getItem('environment') || 'sandbox';
  });

  const handleEnvironmentChange = (value: string) => {
    setEnvironment(value);
    localStorage.setItem('environment', value);
  };

  const users = [
    { name: "John Doe", email: "john.doe@acme.com", role: "Admin", status: "Active" },
    { name: "Jane Smith", email: "jane.smith@acme.com", role: "Operator", status: "Active" },
    { name: "Mike Johnson", email: "mike.johnson@acme.com", role: "Viewer", status: "Inactive" },
  ];

  const getRoleBadge = (role: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Admin': 'destructive',
      'Operator': 'default',
      'Viewer': 'secondary'
    };
    return <Badge variant={variants[role] || 'default'}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return <Badge variant={status === 'Active' ? 'default' : 'secondary'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure system preferences and manage access
        </p>
      </div>

      {/* Environment Selection */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Environment</CardTitle>
          <CardDescription>
            Switch between sandbox and production environments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Current Environment:</label>
            <Select value={environment} onValueChange={handleEnvironmentChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sandbox">Sandbox</SelectItem>
                <SelectItem value="prod">Production</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant={environment === 'prod' ? 'destructive' : 'secondary'}>
              {environment === 'prod' ? 'PRODUCTION' : 'SANDBOX'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Users & Roles */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Users & Roles</CardTitle>
          <CardDescription>
            Manage user access and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user, index) => (
              <div key={index}>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{user.name}</span>
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                    </div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                {index < users.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing & Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Billing & Usage</CardTitle>
            <CardDescription>
              Current plan and resource usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Plan:</span>
                <span className="font-medium">Enterprise Pro</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Run Credits:</span>
                <span className="font-medium">8,247 / 10,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Data Retention:</span>
                <span className="font-medium">7 years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Cost:</span>
                <span className="font-medium">€2,340</span>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{width: '82.47%'}}></div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">82.47% of credits used this month</div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>
              Core system settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Timezone:</span>
                <span className="font-medium">UTC+1 (CET)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Language:</span>
                <span className="font-medium">English</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">API Version:</span>
                <span className="font-medium">v2.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Backup Schedule:</span>
                <span className="font-medium">Daily 2:00 AM</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Export Configuration
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;