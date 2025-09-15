import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Audit: React.FC = () => {
  const auditLogs = [
    {
      time: "2024-01-15 14:32:15",
      actor: "john.doe@acme.com",
      action: "EXCEPTION_APPROVE",
      object: "EX-1042",
      note: "Approved invoice exception over €2,500 limit"
    },
    {
      time: "2024-01-15 13:45:22",
      actor: "system",
      action: "CONFIG_PROMOTE",
      object: "Invoice OCR v1.4.2",
      note: "Promoted configuration from sandbox to production"
    },
    {
      time: "2024-01-15 12:18:07",
      actor: "admin@acme.com",
      action: "POLICY_PROPOSE",
      object: "Daily cost cap",
      note: "Proposed increase to €150 daily cost cap"
    },
    {
      time: "2024-01-15 11:55:33",
      actor: "jane.smith@acme.com",
      action: "EXCEPTION_REJECT",
      object: "EX-1041",
      note: "Rejected unknown vendor exception"
    },
    {
      time: "2024-01-15 10:22:44",
      actor: "system",
      action: "AGENT_RESTART",
      object: "Main Agent",
      note: "Automatic restart after queue clear"
    }
  ];

  const getActionBadge = (action: string) => {
    const actionMap: Record<string, { variant: "default" | "secondary" | "destructive", label: string }> = {
      'EXCEPTION_APPROVE': { variant: 'default', label: 'Approve' },
      'EXCEPTION_REJECT': { variant: 'destructive', label: 'Reject' },
      'CONFIG_PROMOTE': { variant: 'secondary', label: 'Config' },
      'POLICY_PROPOSE': { variant: 'secondary', label: 'Policy' },
      'AGENT_RESTART': { variant: 'default', label: 'System' }
    };
    
    const config = actionMap[action] || { variant: 'secondary' as const, label: action };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Audit & Compliance</h1>
        <p className="text-muted-foreground mt-2">
          Track system activities and maintain compliance records
        </p>
      </div>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
          <CardDescription>
            Complete log of system activities and user actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Object</TableHead>
                <TableHead>Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{log.time}</TableCell>
                  <TableCell className="text-sm">{log.actor}</TableCell>
                  <TableCell>
                    {getActionBadge(log.action)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.object}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {log.note}
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
            <CardTitle>Activity Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Today's Events:</span>
              <span className="font-medium">{auditLogs.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">User Actions:</span>
              <span className="font-medium">
                {auditLogs.filter(log => log.actor !== 'system').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">System Events:</span>
              <span className="font-medium">
                {auditLogs.filter(log => log.actor === 'system').length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Retention Period:</span>
              <span className="font-medium text-success">7 years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Backup Status:</span>
              <span className="font-medium text-success">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Integrity Check:</span>
              <span className="font-medium text-success">Passed</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Export & Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-muted-foreground mb-3">
              Generate compliance reports and export audit data
            </div>
            <div className="space-y-2">
              <button className="w-full text-left text-sm p-2 rounded border hover:bg-muted/50">
                Export CSV (Last 30 days)
              </button>
              <button className="w-full text-left text-sm p-2 rounded border hover:bg-muted/50">
                Compliance Report (Monthly)
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Audit;