import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Tickets: React.FC = () => {
  const tickets = [
    { id: "TK-1001", type: "How-to", subject: "How to configure new approval workflow", status: "Open" },
    { id: "TK-1002", type: "Bug", subject: "Invoice OCR failing on certain formats", status: "In Progress" },
    { id: "TK-1003", type: "Feature", subject: "Add multi-language support for forms", status: "Closed" },
    { id: "TK-1004", type: "How-to", subject: "Setting up automated bank reconciliation", status: "Open" },
    { id: "TK-1005", type: "Bug", subject: "Timeout issues with large document processing", status: "Open" },
  ];

  const getTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'How-to': 'secondary',
      'Bug': 'destructive',
      'Feature': 'default'
    };
    return <Badge variant={variants[type] || 'default'}>{type}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Open': 'destructive',
      'In Progress': 'secondary',
      'Closed': 'default'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Support Tickets</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage customer support requests
        </p>
      </div>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>
            Support requests and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                  <TableCell>
                    {getTypeBadge(ticket.type)}
                  </TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    {getStatusBadge(ticket.status)}
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
            <CardTitle>Ticket Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Open:</span>
              <span className="font-medium text-destructive">
                {tickets.filter(t => t.status === 'Open').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">In Progress:</span>
              <span className="font-medium text-warning">
                {tickets.filter(t => t.status === 'In Progress').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Resolved:</span>
              <span className="font-medium text-success">
                {tickets.filter(t => t.status === 'Closed').length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Response Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Avg. First Response:</span>
              <span className="font-medium">2.3h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Avg. Resolution:</span>
              <span className="font-medium">18.7h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">SLA Compliance:</span>
              <span className="font-medium text-success">96.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">How-to:</span>
              <span className="font-medium">
                {tickets.filter(t => t.type === 'How-to').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Bugs:</span>
              <span className="font-medium">
                {tickets.filter(t => t.type === 'Bug').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Features:</span>
              <span className="font-medium">
                {tickets.filter(t => t.type === 'Feature').length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tickets;