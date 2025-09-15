import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Agent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Agent Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage insurance agents and their performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Agent Directory</CardTitle>
            <CardDescription>Browse and manage active agents</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Agent management features coming soon</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Track agent KPIs and goals</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Performance tracking features coming soon</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Training & Certification</CardTitle>
            <CardDescription>Manage agent training programs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Training management features coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agent;