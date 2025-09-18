import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle, ModalTrigger, ModalClose, ModalFooter } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Play, Square, RotateCcw, Trash2, Eye, TestTube } from 'lucide-react';
import { getTenantAgents, getAgentJobsStats } from '@/lib/queries';
import { useTenant } from '@/providers/TenantProvider';

const Agent: React.FC = () => {
  const { toast } = useToast();
  const { tenant } = useTenant();
  const [agentState, setAgentState] = useState<'Running' | 'Stopped'>('Running');
  const [queueCount, setQueueCount] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'stop' | 'start' | 'clear' | 'rollback'>('stop');
  const [confirmForm, setConfirmForm] = useState({ reason: '', mfaCode: '' });
  const [tenantAgents, setTenantAgents] = useState<any[]>([]);
  const [jobsStats, setJobsStats] = useState({ total: 0, success: 0, failed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenant) return;

    const loadAgentData = async () => {
      try {
        const [agents, stats] = await Promise.all([
          getTenantAgents(),
          getAgentJobsStats(1) // Last 24 hours
        ]);
        setTenantAgents(agents);
        setJobsStats(stats);
        setQueueCount(stats.pending);
      } catch (error) {
        console.error('Error loading agent data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAgentData();
  }, [tenant]);

  const activeTools = tenantAgents.map(ta => ({
    name: ta.agents?.name || 'Unknown Agent'
  }));

  const handleDangerAction = (action: 'stop' | 'start' | 'clear' | 'rollback') => {
    setModalAction(action);
    setIsModalOpen(true);
    setConfirmForm({ reason: '', mfaCode: '' });
  };

  const handleConfirm = () => {
    if (!confirmForm.reason || !confirmForm.mfaCode) {
      toast({
        title: "Validation Error",
        description: "Please provide both reason and MFA code",
        variant: "destructive"
      });
      return;
    }

    // Update local state based on action
    if (modalAction === 'start') {
      setAgentState('Running');
      toast({ title: "Agent Started", description: "Agent has been started successfully" });
    } else if (modalAction === 'stop') {
      setAgentState('Stopped');
      toast({ title: "Agent Stopped", description: "Agent has been stopped safely" });
    } else if (modalAction === 'clear') {
      setQueueCount(0);
      toast({ title: "Queue Cleared", description: "All queued jobs have been cleared" });
    } else if (modalAction === 'rollback') {
      toast({ title: "Config Rolled Back", description: "Configuration has been rolled back to previous version" });
    }

    setIsModalOpen(false);
    setConfirmForm({ reason: '', mfaCode: '' });
  };

  const getModalTitle = () => {
    const actions = {
      stop: 'Stop Agent',
      start: 'Start Agent',
      clear: 'Clear Queue',
      rollback: 'Rollback Configuration'
    };
    return actions[modalAction];
  };

  const getModalDescription = () => {
    const descriptions = {
      stop: 'This will stop the agent and halt all running processes.',
      start: 'This will start the agent and resume automated processes.',
      clear: 'This will remove all jobs from the queue permanently.',
      rollback: 'This will revert to the previous configuration version.'
    };
    return descriptions[modalAction];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Agent Management</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and control your automation agent
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Policy & Guardrails */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Policy & Guardrails</CardTitle>
            <CardDescription>Current agent configuration and limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Allowed tools</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {activeTools.map((tool, index) => (
                  <Badge key={index} variant="secondary">{tool.name}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Thresholds</Label>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>HITL above = €2,500</div>
                <div>PII Masking = Enabled</div>
                <div>Daily cost cap = €120</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm">
                <TestTube className="h-4 w-4 mr-2" />
                Simulate on sample data
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View prompt & policy
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Agent Status */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Agent Status</CardTitle>
            <CardDescription>Current operational state</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">State:</span>
              <Badge variant={agentState === 'Running' ? 'default' : 'secondary'}>
                {agentState}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-success">{jobsStats.success}</div>
                <div className="text-xs text-muted-foreground">Success</div>
              </div>
              <div>
                <div className="text-xl font-bold text-destructive">{jobsStats.failed}</div>
                <div className="text-xs text-muted-foreground">Failed</div>
              </div>
              <div>
                <div className="text-xl font-bold text-warning">{jobsStats.pending}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="card-elevated border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Critical operations that affect agent behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="destructive"
              onClick={() => handleDangerAction(agentState === 'Running' ? 'stop' : 'start')}
              className="flex flex-col h-auto p-4"
            >
              {agentState === 'Running' ? (
                <>
                  <Square className="h-5 w-5 mb-2" />
                  Stop Agent
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mb-2" />
                  Start Agent
                </>
              )}
            </Button>

            <Button
              variant="destructive"
              onClick={() => handleDangerAction('clear')}
              className="flex flex-col h-auto p-4"
              disabled={queueCount === 0}
            >
              <Trash2 className="h-5 w-5 mb-2" />
              Clear Queue
            </Button>

            <Button
              variant="destructive"
              onClick={() => handleDangerAction('rollback')}
              className="flex flex-col h-auto p-4"
            >
              <RotateCcw className="h-5 w-5 mb-2" />
              Rollback Config
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle className="text-destructive">{getModalTitle()}</ModalTitle>
            <ModalDescription>
              {getModalDescription()}
            </ModalDescription>
          </ModalHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason (required)</Label>
              <Textarea
                id="reason"
                placeholder="Explain why you are performing this action..."
                value={confirmForm.reason}
                onChange={(e) => setConfirmForm(prev => ({...prev, reason: e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mfaCode">MFA Code (required)</Label>
              <Input
                id="mfaCode"
                type="password"
                placeholder="Enter your MFA code"
                value={confirmForm.mfaCode}
                onChange={(e) => setConfirmForm(prev => ({...prev, mfaCode: e.target.value}))}
              />
            </div>
          </div>

          <ModalFooter>
            <ModalClose asChild>
              <Button variant="outline">Cancel</Button>
            </ModalClose>
            <Button 
              variant="destructive" 
              onClick={handleConfirm}
              disabled={!confirmForm.reason || !confirmForm.mfaCode}
            >
              Confirm {getModalTitle()}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Agent;