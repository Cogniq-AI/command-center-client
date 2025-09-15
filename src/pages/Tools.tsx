import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Tools: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tools & Utilities</h1>
        <p className="text-muted-foreground mt-2">
          Access system tools and administrative utilities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Policy Calculator</CardTitle>
            <CardDescription>Calculate premiums and coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Policy calculation tools coming soon</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Evaluate risk factors and scoring</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Risk assessment tools coming soon</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Document Generator</CardTitle>
            <CardDescription>Generate policies and forms</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Document generation tools coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tools;