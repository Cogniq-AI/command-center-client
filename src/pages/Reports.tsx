import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Generate and view business intelligence reports
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
            <CardDescription>Revenue and profitability analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Financial reporting coming soon</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Claims Analysis</CardTitle>
            <CardDescription>Claims trends and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Claims analysis coming soon</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>KPI dashboards and scorecards</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Performance metrics coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;