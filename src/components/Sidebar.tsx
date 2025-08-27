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
  Zap
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart3,
    description: "Overview & KPIs"
  },
  {
    title: "Case Manager",
    href: "/cases",
    icon: AlertTriangle,
    description: "Alerts & Investigation"
  },
  {
    title: "Graph Analytics",
    href: "/graph",
    icon: Network,
    description: "Entity Relationships"
  },
  {
    title: "Rule Engine",
    href: "/rules",
    icon: FileText,
    description: "Reg-as-Code"
  },
  {
    title: "Federation Console",
    href: "/federation",
    icon: Users,
    description: "Federated Learning"
  },
  {
    title: "Connectors",
    href: "/connectors",
    icon: Database,
    description: "Data Ingestion"
  },
  {
    title: "Audit Shield",
    href: "/audit",
    icon: Lock,
    description: "Merkle Proofs"
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    icon: Target,
    description: "Compliance Apps"
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Configuration"
  }
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-sidebar border-r border-sidebar-border h-screen transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-sidebar-foreground">Hyperion</h1>
              <p className="text-xs text-sidebar-foreground/60">UCP v1.0</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
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
                  "w-full justify-start h-10 transition-all",
                  collapsed ? "px-2" : "px-3",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg" 
                    : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon className={cn("w-4 h-4", collapsed ? "mr-0" : "mr-3")} />
                {!collapsed && (
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-xs opacity-70">{item.description}</span>
                  </div>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-sidebar-foreground">Security Status</span>
            </div>
            <div className="text-xs text-sidebar-foreground/70">
              All systems operational
            </div>
          </div>
        </div>
      )}
    </div>
  );
}