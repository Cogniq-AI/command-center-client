import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Data: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage and analyze insurance data and records
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Policy Records</CardTitle>
            <CardDescription>Browse and manage policy data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Policy data management coming soon</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Claims Database</CardTitle>
            <CardDescription>Access historical claims data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Claims data access coming soon</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Data Analytics</CardTitle>
            <CardDescription>Advanced data analysis tools</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Analytics dashboard coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Data;