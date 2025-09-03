import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Shield,
  AlertTriangle,
  Network,
  Database,
  FileText,
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Target,
  Lock,
  TrendingUp,
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart3,
    description: "Overview & KPIs",
  },
  {
    title: "Growth Analytics",
    href: "/growth",
    icon: TrendingUp,
    description: "Business Performance",
  },
  {
    title: "Case Manager",
    href: "/cases",
    icon: AlertTriangle,
    description: "Alerts & Investigation",
  },
  {
    title: "Graph Analytics",
    href: "/graph",
    icon: Network,
    description: "Entity Relationships",
  },
  {
    title: "Advisory & Compliance",
    href: "/advisory",
    icon: Shield,
    description: "Regulatory Guidance",
  },
  {
    title: "Rule Engine",
    href: "/rules",
    icon: FileText,
    description: "Reg-as-Code",
  },
  {
    title: "Federation Console",
    href: "/federation",
    icon: Users,
    description: "Federated Learning",
  },
  {
    title: "Connectors",
    href: "/connectors",
    icon: Database,
    description: "Data Ingestion",
  },
  {
    title: "Audit Shield",
    href: "/audit",
    icon: Lock,
    description: "Merkle Proofs",
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    icon: Target,
    description: "Compliance Apps",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Configuration",
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "bg-gray-50 border-r border-gray-200 h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">Hyperion</h1>
              <p className="text-xs text-gray-500">UCP v1.0</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-200"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.href} to={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-auto transition-all py-2",
                  collapsed ? "px-2 h-10" : "px-3",
                  isActive
                    ? "shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <item.icon className={cn("w-4 h-4", collapsed ? "mr-0" : "mr-3")} />
                {!collapsed && (
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium leading-tight">{item.title}</span>
                    <span className="text-xs opacity-70 leading-tight">{item.description}</span>
                  </div>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}