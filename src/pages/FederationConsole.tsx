import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Globe, Shield, Zap, Play, TrendingUp } from "lucide-react";

export default function FederationConsole() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Federation Console</h1>
        <p className="text-muted-foreground">Privacy-preserving federated learning coordination</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Federation Status */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Active Participants</span>
                <Badge variant="default" className="bg-success/20 text-success ml-auto">
                  8 Connected
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Broker Alpha", status: "online", lastSync: "2m ago" },
                  { name: "Broker Beta", status: "online", lastSync: "1m ago" },
                  { name: "Broker Gamma", status: "syncing", lastSync: "now" },
                  { name: "Broker Delta", status: "online", lastSync: "3m ago" },
                  { name: "Broker Epsilon", status: "offline", lastSync: "1h ago" },
                  { name: "Broker Zeta", status: "online", lastSync: "2m ago" },
                  { name: "Broker Eta", status: "online", lastSync: "4m ago" },
                  { name: "Broker Theta", status: "online", lastSync: "1m ago" }
                ].map((broker, index) => (
                  <div key={index} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${
                        broker.status === "online" ? "bg-success" :
                        broker.status === "syncing" ? "bg-warning" : "bg-destructive"
                      }`} />
                      <span className="text-sm font-medium">{broker.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{broker.lastSync}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span>Training Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Round: 47</span>
                  <span>Target Accuracy: 95%</span>
                </div>
                <Progress value={73} className="h-2" />
                <div className="text-xs text-muted-foreground">Round 47 of 65 estimated</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-lg font-bold text-success">94.7%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">2.3%</div>
                  <div className="text-xs text-muted-foreground">Loss</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-warning">12m</div>
                  <div className="text-xs text-muted-foreground">ETA</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Federation Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Start New Round
              </Button>
              <Button variant="outline" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Privacy Audit
              </Button>
              <Button variant="outline" className="w-full">
                <Globe className="w-4 h-4 mr-2" />
                Export Model
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Security Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Encryption</span>
                <Badge variant="default" className="bg-success/20 text-success">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Differential Privacy</span>
                <Badge variant="default" className="bg-success/20 text-success">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Secure Aggregation</span>
                <Badge variant="default" className="bg-success/20 text-success">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Model Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Detection Rate</span>
                  <span className="font-medium">94.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>False Positives</span>
                  <span className="font-medium">3.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Privacy Budget</span>
                  <span className="font-medium">ε = 1.2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}