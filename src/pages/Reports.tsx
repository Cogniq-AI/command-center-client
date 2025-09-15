import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Reports: React.FC = () => {
  const reports = [
    {
      title: "AP Automation",
      description: "Accounts payable processing metrics and trends",
      metrics: [
        { label: "Invoices Processed", value: "1,247", change: "+8.2%" },
        { label: "Exception Rate", value: "2.1%", change: "-0.3%" },
        { label: "Processing Time", value: "4.2h", change: "-12%" }
      ]
    },
    {
      title: "Weekly Ops Digest", 
      description: "Operational performance summary",
      metrics: [
        { label: "Cost Savings", value: "€21.7k", change: "+15.3%" },
        { label: "Time Saved", value: "428h", change: "+12.5%" },
        { label: "SLA Compliance", value: "98.4%", change: "+0.2%" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive business intelligence and performance reports
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <Card key={index} className="card-elevated">
            <CardHeader>
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {report.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-lg font-bold text-foreground">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                    <div className="text-xs text-success">{metric.change}</div>
                  </div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                <div className="text-center text-muted-foreground">
                  <div className="text-sm">Chart visualization</div>
                  <div className="text-xs">Data visualization coming soon</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;