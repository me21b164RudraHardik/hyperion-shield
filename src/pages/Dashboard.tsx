import { KPICards, SystemHealthCard } from "@/components/KPICards";
import { AlertsTable } from "@/components/AlertsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Network, 
  Shield, 
  Users,
  Activity,
  Globe,
  Zap,
  AlertTriangle
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* KPI Cards */}
      <KPICards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Alerts Table */}
        <div className="lg:col-span-2">
          <AlertsTable />
        </div>
        
        {/* Right Sidebar - System Health */}
        <div className="space-y-6">
          <SystemHealthCard />
          
          {/* Federation Status */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Federation Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Participants</span>
                <Badge variant="default" className="bg-primary/20 text-primary">
                  8 Brokers
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Last Training Round</span>
                  <span className="text-success">Completed</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Model Accuracy</span>
                  <span className="font-medium">94.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Next Round</span>
                  <span className="text-muted-foreground">In 2h 14m</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">Privacy-Preserved Learning Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-accent" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-4 h-4 text-primary" />
                  <div>
                    <div className="font-medium text-sm">Review High Priority</div>
                    <div className="text-xs text-muted-foreground">23 cases pending</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <Network className="w-4 h-4 text-accent" />
                  <div>
                    <div className="font-medium text-sm">Run Graph Analysis</div>
                    <div className="text-xs text-muted-foreground">Detect new patterns</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left rounded-lg bg-warning/10 hover:bg-warning/20 border border-warning/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-warning" />
                  <div>
                    <div className="font-medium text-sm">Generate Audit Report</div>
                    <div className="text-xs text-muted-foreground">Weekly compliance</div>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Bottom Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Detection Rate Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">87.2%</div>
            <div className="flex items-center space-x-1">
              <Activity className="w-4 h-4 text-success" />
              <span className="text-sm text-success">+5.3% improvement</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              False Positive Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">3.8%</div>
            <div className="flex items-center space-x-1">
              <Activity className="w-4 h-4 text-success" />
              <span className="text-sm text-success">-1.2% reduction</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Resolution Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">4.2h</div>
            <div className="flex items-center space-x-1">
              <Activity className="w-4 h-4 text-success" />
              <span className="text-sm text-success">-1.8h faster</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Regulatory Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">99.6%</div>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-sm text-success">Fully compliant</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}