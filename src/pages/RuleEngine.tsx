import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Play, Save, GitBranch, AlertTriangle, CheckCircle } from "lucide-react";

export default function RuleEngine() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Rule Engine</h1>
        <p className="text-muted-foreground">Reg-as-Code rule management and testing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rule Editor */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>Rule Editor</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Test
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              className="font-mono text-sm h-64"
              placeholder="rule_id: R-INS-001
title: Insider-like pre-announcement concentration
priority: HIGH
params:
  window_days: 30
  multiple: 10
  announcement_window_hours: 72
conditions:
  - name: avg_vol
    expr: 'avg(trades.quantity where trades.account_id == account and trades.timestamp >= now()-days(params.window_days))'
  - name: recent_buy
    expr: 'sum(trades.quantity where trades.account_id==account and trades.side==BUY and trades.timestamp >= announcement_ts - hours(params.announcement_window_hours))'
assert: 'recent_buy > avg_vol * params.multiple'
action:
  - type: raise_alert
    alert_type: InsiderConcentration"
            />
          </CardContent>
        </Card>

        {/* Rule Repository */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GitBranch className="w-5 h-5 text-accent" />
              <span>Rule Repository</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: "R-INS-001", title: "Insider Trading Detection", status: "active", version: "v1.2" },
                { id: "R-WSH-001", title: "Wash Trading Pattern", status: "active", version: "v2.1" },
                { id: "R-MAN-001", title: "Market Manipulation", status: "testing", version: "v1.0" },
                { id: "R-AML-001", title: "AML Suspicious Activity", status: "draft", version: "v0.9" }
              ].map((rule) => (
                <div key={rule.id} className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-mono text-sm font-medium">{rule.id}</div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{rule.version}</Badge>
                      <Badge 
                        variant={rule.status === "active" ? "default" : rule.status === "testing" ? "secondary" : "outline"}
                        className={
                          rule.status === "active" ? "bg-success/20 text-success" :
                          rule.status === "testing" ? "bg-warning/20 text-warning" :
                          "bg-muted/20 text-muted-foreground"
                        }
                      >
                        {rule.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm">{rule.title}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Results */}
      <Card className="bg-card border-border mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span>Rule Test Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm font-medium">Passed Tests</span>
              </div>
              <div className="text-2xl font-bold text-success">23</div>
            </div>
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium">Failed Tests</span>
              </div>
              <div className="text-2xl font-bold text-destructive">2</div>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Play className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Coverage</span>
              </div>
              <div className="text-2xl font-bold text-primary">94.7%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}