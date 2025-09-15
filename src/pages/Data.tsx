import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Data: React.FC = () => {
  const datasets = [
    { name: "ap_invoices", rows: 12843, freshness: "7m", lineage: "Invoice OCR → 3-Way Match" },
    { name: "tickets", rows: 5932, freshness: "2m", lineage: "Ticket Triage" },
    { name: "bank_lines", rows: 41420, freshness: "1h", lineage: "Bank Import" },
  ];

  const getFreshnessColor = (freshness: string) => {
    if (freshness.includes('m') && parseInt(freshness) <= 10) return 'default';
    if (freshness.includes('h') && parseInt(freshness) <= 1) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Management</h1>
        <p className="text-muted-foreground mt-2">
          Explore datasets and data lineage across your systems
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {datasets.map((dataset, index) => (
          <Card key={index} className="card-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-mono">{dataset.name}</CardTitle>
                <Badge variant={getFreshnessColor(dataset.freshness)}>
                  {dataset.freshness}
                </Badge>
              </div>
              <CardDescription>{dataset.rows.toLocaleString()} rows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Lineage</h4>
                <p className="text-sm text-foreground">{dataset.lineage}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Data Preview</h4>
                <div className="bg-muted/50 p-3 rounded-md text-xs font-mono">
                  <div>Schema: {Math.floor(Math.random() * 20) + 5} columns</div>
                  <div>Type: Structured</div>
                  <div>Format: PostgreSQL</div>
                  <div className="text-muted-foreground mt-1">
                    Preview data loading...
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Data;