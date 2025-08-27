import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Database, Plus, Settings, Activity, CheckCircle, AlertTriangle } from "lucide-react";

export default function Connectors() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Data Connectors</h1>
          <p className="text-muted-foreground">Manage data ingestion and broker integrations</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Connector
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Connectors */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-primary" />
              <span>Active Connectors</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { 
                name: "Broker Alpha API", 
                type: "REST API", 
                status: "connected", 
                lastSync: "2m ago",
                records: "15.2K"
              },
              { 
                name: "Trading System Beta", 
                type: "SFTP", 
                status: "connected", 
                lastSync: "5m ago",
                records: "8.7K"
              },
              { 
                name: "Risk System Gamma", 
                type: "CSV Upload", 
                status: "error", 
                lastSync: "1h ago",
                records: "0"
              },
              { 
                name: "Compliance DB Delta", 
                type: "Database", 
                status: "connected", 
                lastSync: "1m ago",
                records: "23.1K"
              }
            ].map((connector, index) => (
              <div key={index} className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      connector.status === "connected" ? "bg-success" : "bg-destructive"
                    }`} />
                    <span className="font-medium">{connector.name}</span>
                  </div>
                  <Badge variant="outline">{connector.type}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>Last sync: {connector.lastSync}</div>
                  <div>Records: {connector.records}</div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="ghost">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Activity className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Connector Health */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-accent" />
              <span>System Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
                <CheckCircle className="w-6 h-6 text-success mx-auto mb-2" />
                <div className="text-lg font-bold">3</div>
                <div className="text-xs text-muted-foreground">Healthy</div>
              </div>
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
                <AlertTriangle className="w-6 h-6 text-destructive mx-auto mb-2" />
                <div className="text-lg font-bold">1</div>
                <div className="text-xs text-muted-foreground">Error</div>
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span>Data Ingestion Rate</span>
                <span className="text-success">2.3K/min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processing Latency</span>
                <span className="text-success">45ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Error Rate</span>
                <span className="text-warning">0.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Mapping */}
      <Card className="bg-card border-border mt-6">
        <CardHeader>
          <CardTitle>Field Mapping Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Source Fields</h3>
              <div className="space-y-2">
                {["trade_id", "account_ref", "instrument_code", "trade_time", "quantity", "price"].map((field) => (
                  <div key={field} className="p-2 rounded bg-muted/50 text-sm font-mono">
                    {field}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3">Target Schema</h3>
              <div className="space-y-2">
                {["trade_id", "account_id", "instrument_symbol", "timestamp_utc", "quantity", "price_minor"].map((field) => (
                  <div key={field} className="p-2 rounded bg-primary/10 text-sm font-mono">
                    {field}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}