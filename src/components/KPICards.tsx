import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  DollarSign, 
  Shield,
  Zap,
  Target
} from "lucide-react";

// Updated kpiData with light-mode Tailwind CSS classes
const kpiData = [
  {
    title: "Active Alerts",
    value: "147",
    change: "+12%",
    trend: "up", // An increase in alerts is negative
    icon: AlertTriangle,
    color: "text-amber-600",
    bgColor: "bg-amber-100"
  },
  {
    title: "High Severity",
    value: "23",
    change: "-8%",
    trend: "down", // A decrease is positive
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  {
    title: "Analyst Hours Saved",
    value: "142h",
    change: "+34%",
    trend: "up", // An increase is positive
    icon: Clock,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Federation Participants",
    value: "8",
    change: "+2",
    trend: "up", // An increase is positive
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Cost Savings (Monthly)",
    value: "$89.2K",
    change: "+28%",
    trend: "up", // An increase is positive
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Model Accuracy",
    value: "94.7%",
    change: "+2.1%",
    trend: "up", // An increase is positive
    icon: Target,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100"
  }
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {kpiData.map((kpi, index) => {
        // Determine badge color based on trend and context
        const isPositiveChange = (kpi.title === "Active Alerts" || kpi.title === "High Severity") 
            ? kpi.trend === 'down' 
            : kpi.trend === 'up';

        return (
          <Card key={index} className="bg-white border-gray-200 hover:shadow-md transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <div className="flex items-center space-x-1 mt-1">
                <Badge 
                  variant="secondary"
                  className={isPositiveChange 
                    ? "bg-green-100 text-green-700 font-medium" 
                    : "bg-red-100 text-red-700 font-medium"}
                >
                  {kpi.change}
                </Badge>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export function SystemHealthCard() {
  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-800">
          <Zap className="w-5 h-5 text-primary" />
          <span>System Health</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>ML Model Performance</span>
            <span className="font-medium text-green-600">94.7%</span>
          </div>
          <Progress value={94.7} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Data Ingestion Rate</span>
            <span className="font-medium text-green-600">98.2%</span>
          </div>
          <Progress value={98.2} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Federation Sync</span>
            <span className="font-medium text-amber-600">87.5%</span>
          </div>
          <Progress value={87.5} className="h-2" />
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Overall Status</span>
            <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white">
              Operational
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}