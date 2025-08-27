import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign, 
  Shield,
  Zap,
  Target
} from "lucide-react";

const kpiData = [
  {
    title: "Active Alerts",
    value: "147",
    change: "+12%",
    trend: "up",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    title: "High Severity",
    value: "23",
    change: "-8%",
    trend: "down",
    icon: Shield,
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  },
  {
    title: "Analyst Hours Saved",
    value: "142h",
    change: "+34%",
    trend: "up",
    icon: Clock,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    title: "Federation Participants",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Cost Savings (Monthly)",
    value: "$89.2K",
    change: "+28%",
    trend: "up",
    icon: DollarSign,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    title: "Model Accuracy",
    value: "94.7%",
    change: "+2.1%",
    trend: "up",
    icon: Target,
    color: "text-accent",
    bgColor: "bg-accent/10"
  }
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="bg-card border-border hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
            <div className="flex items-center space-x-1 mt-1">
              <Badge 
                variant={kpi.trend === "up" ? "default" : "secondary"}
                className={kpi.trend === "up" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}
              >
                {kpi.change}
              </Badge>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function SystemHealthCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-primary" />
          <span>System Health</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>ML Model Performance</span>
            <span className="text-success">94.7%</span>
          </div>
          <Progress value={94.7} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Data Ingestion Rate</span>
            <span className="text-success">98.2%</span>
          </div>
          <Progress value={98.2} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Federation Sync</span>
            <span className="text-warning">87.5%</span>
          </div>
          <Progress value={87.5} className="h-2" />
        </div>
        
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Overall Status</span>
            <Badge variant="default" className="bg-success text-success-foreground">
              Operational
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}