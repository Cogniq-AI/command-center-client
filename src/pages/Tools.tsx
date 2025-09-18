import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle, ModalTrigger, ModalClose, ModalFooter } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getTenantAgents, getAvailableAgents, addTenantAgent } from '@/lib/queries';
import { useTenant } from '@/providers/TenantProvider';

const Tools: React.FC = () => {
  const { toast } = useToast();
  const { tenant } = useTenant();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [tenantAgents, setTenantAgents] = useState<any[]>([]);
  const [availableAgents, setAvailableAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestForm, setRequestForm] = useState({
    environment: '',
    businessCase: '',
    timeline: ''
  });

  useEffect(() => {
    if (!tenant) return;

    const loadToolsData = async () => {
      try {
        const [active, available] = await Promise.all([
          getTenantAgents(),
          getAvailableAgents()
        ]);
        setTenantAgents(active);
        setAvailableAgents(available);
      } catch (error) {
        console.error('Error loading tools data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadToolsData();
  }, [tenant]);

  // Transform tenant agents for display
  const activeTools = tenantAgents.map(ta => ({
    name: ta.agents?.name || 'Unknown Agent',
    status: ta.status === 'active' ? 'OK' : 'Warning',
    lastRun: new Date(ta.created_at).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    owner: ta.agents?.category || 'System',
    version: '1.0.0',
    description: ta.agents?.description || 'No description available'
  }));

  // Transform available agents (not yet added to tenant)
  const inactiveTools = availableAgents
    .filter(agent => !tenantAgents.some(ta => ta.agents?.id === agent.id))
    .map(agent => ({
      id: agent.id,
      name: agent.name,
      roi: agent.sector ? `Sector: ${agent.sector}` : 'General purpose',
      prereq: agent.configuration_schema ? 'Configuration required' : 'Ready to use',
      description: agent.description || 'No description available'
    }));

  const getStatusBadge = (status: string) => {
    const variant = status === 'OK' ? 'default' : status === 'Warning' ? 'destructive' : 'secondary';
    return <Badge variant={variant}>{status}</Badge>;
  };

  const handleRequestSubmit = () => {
    if (!requestForm.environment || !requestForm.businessCase || !requestForm.timeline) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsRequestModalOpen(false);
    setRequestForm({ environment: '', businessCase: '', timeline: '' });
    toast({
      title: "Request submitted",
      description: "Your tool request has been submitted successfully"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tools & Utilities</h1>
        <p className="text-muted-foreground mt-2">
          Manage your automation tools and request new capabilities
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Clients see read-only configs; requests create scoped tickets
        </p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : activeTools.length > 0 ? (
              activeTools.map((tool, index) => (
              <Card key={index} className="card-elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    {getStatusBadge(tool.status)}
                  </div>
                  <CardDescription>v{tool.version} • Owner: {tool.owner}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Last run: <span className="font-medium text-foreground">{tool.lastRun}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Read-only config preview</Label>
                    <div className="bg-muted/50 p-3 rounded-md text-xs font-mono">
                      <div>enabled: true</div>
                      <div>schedule: "*/15 * * * *"</div>
                      <div>timeout: 300</div>
                      <div>retry_limit: 3</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No active tools configured
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : inactiveTools.length > 0 ? (
              inactiveTools.map((tool, index) => (
              <Card key={index} className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription>Available for activation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Benefit:</span>
                      <span className="font-medium text-success">{tool.roi}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Prerequisites:</span>
                      <span className="font-medium text-foreground">{tool.prereq}</span>
                    </div>
                  </div>

                  <Modal open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
                    <ModalTrigger asChild>
                      <Button className="w-full" variant="outline">
                        Request this tool
                      </Button>
                    </ModalTrigger>
                    <ModalContent>
                      <ModalHeader>
                        <ModalTitle>Request Tool: {tool.name}</ModalTitle>
                        <ModalDescription>
                          Fill out the form below to request access to this tool
                        </ModalDescription>
                      </ModalHeader>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="environment">Environment</Label>
                          <Select 
                            value={requestForm.environment} 
                            onValueChange={(value) => setRequestForm(prev => ({...prev, environment: value}))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select environment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sandbox">Sandbox</SelectItem>
                              <SelectItem value="prod">Prod</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="businessCase">Business case / use case</Label>
                          <Textarea
                            id="businessCase"
                            placeholder="Describe your business case and expected use case..."
                            value={requestForm.businessCase}
                            onChange={(e) => setRequestForm(prev => ({...prev, businessCase: e.target.value}))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="timeline">Expected timeline & budget acceptance</Label>
                          <Input
                            id="timeline"
                            placeholder="e.g., 2-3 weeks, budget approved up to €5k"
                            value={requestForm.timeline}
                            onChange={(e) => setRequestForm(prev => ({...prev, timeline: e.target.value}))}
                          />
                        </div>
                      </div>

                      <ModalFooter>
                        <ModalClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </ModalClose>
                        <Button onClick={handleRequestSubmit}>Submit Request</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </CardContent>
              </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                All available agents are already active
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tools;