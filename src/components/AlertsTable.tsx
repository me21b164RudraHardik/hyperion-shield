import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Filter, AlertTriangle, Clock, User, TrendingUp } from "lucide-react";

// Mock alert data
const alertsData = [
  {
    id: "CASE-2024-001",
    type: "Insider Trading",
    account: "ACC-789234",
    severity: "HIGH",
    confidence: 94.7,
    created: "2024-01-15 09:23",
    status: "OPEN",
    description: "Unusual volume spike 48h before earnings announcement"
  },
  {
    id: "CASE-2024-002", 
    type: "Wash Trading",
    account: "ACC-456123",
    severity: "MEDIUM",
    confidence: 87.3,
    created: "2024-01-15 08:45",
    status: "IN_PROGRESS",
    description: "Circular trading pattern detected between related accounts"
  },
  {
    id: "CASE-2024-003",
    type: "Market Manipulation",
    account: "ACC-321654",
    severity: "HIGH",
    confidence: 91.2,
    created: "2024-01-15 07:12",
    status: "OPEN", 
    description: "Large order placement followed by immediate cancellation"
  },
  {
    id: "CASE-2024-004",
    type: "AML Violation",
    account: "ACC-987321",
    severity: "CRITICAL",
    confidence: 96.8,
    created: "2024-01-14 16:30",
    status: "ESCALATED",
    description: "Structured deposits below reporting threshold"
  },
  {
    id: "CASE-2024-005",
    type: "Front Running",
    account: "ACC-147258",
    severity: "MEDIUM",
    confidence: 82.5,
    created: "2024-01-14 14:22",
    status: "CLOSED",
    description: "Trading ahead of large institutional orders"
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "CRITICAL": return "bg-destructive text-destructive-foreground";
    case "HIGH": return "bg-warning text-warning-foreground";
    case "MEDIUM": return "bg-primary text-primary-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "OPEN": return "bg-warning/20 text-warning";
    case "IN_PROGRESS": return "bg-primary/20 text-primary";
    case "ESCALATED": return "bg-destructive/20 text-destructive";
    case "CLOSED": return "bg-success/20 text-success";
    default: return "bg-muted/20 text-muted-foreground";
  }
};

export function AlertsTable() {
  const [filter, setFilter] = useState("ALL");

  const filteredAlerts = filter === "ALL" 
    ? alertsData 
    : alertsData.filter(alert => alert.status === filter);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span>Recent Alerts</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant={filter === "ALL" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("ALL")}
            >
              All
            </Button>
            <Button 
              variant={filter === "OPEN" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("OPEN")}
            >
              Open
            </Button>
            <Button 
              variant={filter === "ESCALATED" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("ESCALATED")}
            >
              Escalated
            </Button>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">Case ID</TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
              <TableHead className="text-muted-foreground">Account</TableHead>
              <TableHead className="text-muted-foreground">Severity</TableHead>
              <TableHead className="text-muted-foreground">Confidence</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Created</TableHead>
              <TableHead className="text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.map((alert) => (
              <TableRow key={alert.id} className="border-border hover:bg-muted/50">
                <TableCell className="font-mono text-sm">{alert.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{alert.type}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-48">
                      {alert.description}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{alert.account}</TableCell>
                <TableCell>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="font-medium">{alert.confidence}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(alert.status)}>
                    {alert.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{alert.created}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}