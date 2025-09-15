import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Audit: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Audit & Compliance</h1>
        <p className="text-muted-foreground mt-2">
          Monitor compliance and audit trail activities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Audit Trail</CardTitle>
            <CardDescription>System activity logging</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Audit trail monitoring coming soon</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Compliance Reports</CardTitle>
            <CardDescription>Regulatory compliance tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Compliance reporting coming soon</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Security Monitoring</CardTitle>
            <CardDescription>Access control and security events</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Security monitoring coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Audit;