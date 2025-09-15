import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, Users, DollarSign, CheckCircle, Settings, Database, TriangleAlert } from 'lucide-react';

const Dashboard: React.FC = () => {
  const kpis = [
    {
      title: 'Time saved (30d)',
      value: '+428h',
      change: '+12.5%',
      icon: Activity,
      trend: 'up'
    },
    {
      title: 'Cost avoided',
      value: '€21.7k',
      change: '+8.2%',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Exception rate',
      value: '2.1%',
      change: '-0.3%',
      icon: TriangleAlert,
      trend: 'down'
    },
    {
      title: 'SLA on-time',
      value: '98.4%',
      change: '+0.2%',
      icon: TrendingUp,
      trend: 'up'
    }
  ];

  const activeTools = [
    { name: "Invoice OCR", status: "OK", lastRun: "10:12", owner: "AP Ops", version: "1.4.2" },
    { name: "AP Approval", status: "Warning", lastRun: "09:58", owner: "Finance", version: "2.1.0" },
    { name: "Ticket Triage", status: "OK", lastRun: "10:10", owner: "Support", version: "0.9.7" },
  ];

  const getStatusBadge = (status: string) => {
    const variant = status === 'OK' ? 'default' : status === 'Warning' ? 'destructive' : 'secondary';
    return <Badge variant={variant}>{status}</Badge>;
  };

  const nextActions = [
    { label: 'Approve 3 exceptions', icon: CheckCircle, variant: 'default' as const },
    { label: 'Finish ERP field mapping', icon: Settings, variant: 'secondary' as const },
    { label: 'Connect DMS (drive)', icon: Database, variant: 'secondary' as const },
    { label: 'Review 1 failed run', icon: TriangleAlert, variant: 'destructive' as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your insurance management dashboard
        </p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                <p className={`text-xs ${kpi.trend === 'up' ? 'text-success' : kpi.trend === 'down' ? 'text-success' : 'text-destructive'}`}>
                  {kpi.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Tools */}
        <Card className="card-elevated lg:col-span-2">
          <CardHeader>
            <CardTitle>My Tools</CardTitle>
            <CardDescription>Active automation tools and their status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeTools.map((tool, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-foreground">{tool.name}</h4>
                      {getStatusBadge(tool.status)}
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <span>Last run: {tool.lastRun}</span>
                      <span>Owner: {tool.owner}</span>
                      <span>v{tool.version}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Agent Status */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Agent Status (24h)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-success">432</div>
                  <div className="text-xs text-muted-foreground">Runs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-destructive">7</div>
                  <div className="text-xs text-muted-foreground">Failures</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">3</div>
                  <div className="text-xs text-muted-foreground">Queued</div>
                </div>
              </div>
              {/* Sparkline placeholder */}
              <div className="h-16 bg-muted/50 rounded flex items-center justify-center text-xs text-muted-foreground">
                Sparkline Chart Placeholder
              </div>
            </CardContent>
          </Card>

          {/* Next Best Actions */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Next Best Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {nextActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant={action.variant}
                    className="w-full justify-start h-auto p-3"
                    size="sm"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;