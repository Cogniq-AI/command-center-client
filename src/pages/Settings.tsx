import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure system preferences and user settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>User Preferences</CardTitle>
            <CardDescription>Personal account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">User preference settings coming soon</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>Global system settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">System configuration coming soon</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Security and access controls</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Security settings coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;