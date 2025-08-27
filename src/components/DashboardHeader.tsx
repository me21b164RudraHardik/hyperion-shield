import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, User, Shield, AlertTriangle } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Unified Compliance Platform</h1>
          <p className="text-sm text-muted-foreground">Real-time surveillance and federated analytics</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cases, accounts..."
              className="pl-10 pr-4 py-2 w-64 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Alert Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs">
              3
            </Badge>
          </Button>

          {/* Security Status */}
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-success/10 border border-success/20">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm text-success font-medium">Secure</span>
          </div>

          {/* User Profile */}
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="text-sm">Analyst</span>
          </Button>
        </div>
      </div>
    </header>
  );
}