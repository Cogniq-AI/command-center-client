import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Exceptions: React.FC = () => {
  const [exceptions, setExceptions] = useState([
    { id: "EX-1042", tool: "AP Approval", type: "Amount exceeds limit", sla: "2h left", severity: "High", status: "pending" },
    { id: "EX-1043", tool: "Ticket Triage", type: "Unrecognized category", sla: "6h left", severity: "Med", status: "pending" },
    { id: "EX-1044", tool: "Invoice OCR", type: "Vendor unknown", sla: "1h left", severity: "High", status: "pending" },
  ]);

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'High': 'destructive',
      'Med': 'secondary', 
      'Low': 'default'
    };
    return <Badge variant={variants[severity] || 'default'}>{severity}</Badge>;
  };

  const getSLAColor = (sla: string) => {
    const hours = parseInt(sla);
    if (hours <= 1) return 'text-destructive';
    if (hours <= 3) return 'text-warning';
    return 'text-muted-foreground';
  };

  const handleAction = (exceptionId: string, action: 'approve' | 'reject') => {
    setExceptions(prev => 
      prev.map(ex => 
        ex.id === exceptionId 
          ? { ...ex, status: action === 'approve' ? 'approved' : 'rejected' }
          : ex
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Exceptions & Alerts</h1>
        <p className="text-muted-foreground mt-2">
          Human-in-the-loop exceptions requiring manual review
        </p>
      </div>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Active Exceptions</CardTitle>
          <CardDescription>
            Items requiring manual approval or review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tool</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exceptions.map((exception) => (
                <TableRow key={exception.id}>
                  <TableCell className="font-mono text-sm">{exception.id}</TableCell>
                  <TableCell>{exception.tool}</TableCell>
                  <TableCell>{exception.type}</TableCell>
                  <TableCell className={getSLAColor(exception.sla)}>
                    {exception.sla}
                  </TableCell>
                  <TableCell>
                    {getSeverityBadge(exception.severity)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {exception.status === 'pending' ? (
                        <>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleAction(exception.id, 'approve')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleAction(exception.id, 'reject')}
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <Badge variant={exception.status === 'approved' ? 'default' : 'destructive'}>
                          {exception.status}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Exception Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Today:</span>
              <span className="font-medium">{exceptions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">High Priority:</span>
              <span className="font-medium text-destructive">
                {exceptions.filter(ex => ex.severity === 'High').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Avg. Resolution:</span>
              <span className="font-medium">2.3h</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>SLA Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">On-time Rate:</span>
              <span className="font-medium text-success">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Overdue:</span>
              <span className="font-medium text-destructive">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Escalated:</span>
              <span className="font-medium text-warning">1</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Alert Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Configure alert thresholds and notification settings
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Manage Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Exceptions;