import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, Users, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Active Policies',
      value: '12,847',
      change: '+12.5%',
      icon: Activity,
      trend: 'up'
    },
    {
      title: 'Claims This Month',
      value: '2,341',
      change: '+8.2%',
      icon: TrendingUp,
      trend: 'up'
    },
    {
      title: 'Active Agents',
      value: '1,248',
      change: '-2.1%',
      icon: Users,
      trend: 'down'
    },
    {
      title: 'Revenue (MTD)',
      value: '$2.8M',
      change: '+15.3%',
      icon: DollarSign,
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your insurance management dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: 'New policy created', time: '2 minutes ago', type: 'success' },
              { action: 'Claim processed', time: '5 minutes ago', type: 'info' },
              { action: 'Agent logged in', time: '12 minutes ago', type: 'neutral' },
              { action: 'System backup completed', time: '1 hour ago', type: 'success' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-foreground">{activity.action}</span>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { service: 'Policy Management', status: 'operational' },
              { service: 'Claims Processing', status: 'operational' },
              { service: 'Agent Portal', status: 'operational' },
              { service: 'Backup Systems', status: 'maintenance' }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-foreground">{service.service}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  service.status === 'operational' 
                    ? 'bg-success/20 text-success' 
                    : 'bg-warning/20 text-warning'
                }`}>
                  {service.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;