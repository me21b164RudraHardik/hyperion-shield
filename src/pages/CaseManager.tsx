import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Eye, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  User,
  FileText,
  Network,
  Shield,
  Lock,
  CheckCircle,
  XCircle,
  Zap
} from "lucide-react";

// Extended mock data for case management
const casesData = [
  {
    id: "CASE-2024-001",
    type: "Insider Trading",
    account: "ACC-789234",
    client: "Harrison Mills",
    severity: "HIGH",
    confidence: 94.7,
    created: "2024-01-15 09:23",
    updated: "2024-01-15 10:45",
    status: "OPEN",
    assignee: "Sarah Chen",
    description: "Unusual volume spike 48h before earnings announcement",
    evidence: {
      trades: 24,
      communications: 3,
      documents: 7
    },
    xai: {
      topFeatures: [
        { name: "Volume Spike", contribution: 0.43, description: "Trading volume 12.3x average" },
        { name: "Timing Pattern", contribution: 0.31, description: "Orders placed 48h before announcement" },
        { name: "Price Impact", contribution: 0.26, description: "Significant price movement following trades" }
      ]
    }
  },
  {
    id: "CASE-2024-002", 
    type: "Wash Trading",
    account: "ACC-456123",
    client: "Mitchell Corp",
    severity: "MEDIUM",
    confidence: 87.3,
    created: "2024-01-15 08:45",
    updated: "2024-01-15 11:20",
    status: "IN_PROGRESS",
    assignee: "Alex Rodriguez",
    description: "Circular trading pattern detected between related accounts",
    evidence: {
      trades: 156,
      communications: 0,
      documents: 3
    },
    xai: {
      topFeatures: [
        { name: "Circular Pattern", contribution: 0.52, description: "15 round-trip trades detected" },
        { name: "Related Accounts", contribution: 0.28, description: "Same beneficial ownership" },
        { name: "Zero Net Position", contribution: 0.20, description: "No economic exposure gained" }
      ]
    }
  },
  {
    id: "CASE-2024-003",
    type: "Market Manipulation",
    account: "ACC-321654",
    client: "Phoenix Trading LLC",
    severity: "HIGH",
    confidence: 91.2,
    created: "2024-01-15 07:12",
    updated: "2024-01-15 09:30",
    status: "ESCALATED", 
    assignee: "Maria Santos",
    description: "Large order placement followed by immediate cancellation",
    evidence: {
      trades: 89,
      communications: 1,
      documents: 12
    },
    xai: {
      topFeatures: [
        { name: "Cancel Ratio", contribution: 0.48, description: "94% of orders cancelled" },
        { name: "Price Impact", contribution: 0.35, description: "Significant market movement" },
        { name: "Order Size", contribution: 0.17, description: "Large relative to average daily volume" }
      ]
    }
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

export default function CaseManager() {
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredCases = casesData.filter(case_ => {
    const matchesSearch = case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Cases List */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span>Active Cases</span>
                <Badge variant="outline" className="ml-auto">
                  {filteredCases.length}
                </Badge>
              </CardTitle>
              
              {/* Search and Filters */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant={statusFilter === "ALL" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setStatusFilter("ALL")}
                  >
                    All
                  </Button>
                  <Button 
                    variant={statusFilter === "OPEN" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setStatusFilter("OPEN")}
                  >
                    Open
                  </Button>
                  <Button 
                    variant={statusFilter === "ESCALATED" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setStatusFilter("ESCALATED")}
                  >
                    Escalated
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="space-y-2 max-h-96 overflow-y-auto p-4">
                {filteredCases.map((case_) => (
                  <div
                    key={case_.id}
                    onClick={() => setSelectedCase(case_)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedCase.id === case_.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-mono text-sm font-medium">{case_.id}</div>
                        <div className="text-sm text-muted-foreground">{case_.client}</div>
                      </div>
                      <Badge className={getSeverityColor(case_.severity)}>
                        {case_.severity}
                      </Badge>
                    </div>
                    
                    <div className="text-sm font-medium mb-1">{case_.type}</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {case_.description}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={getStatusColor(case_.status)}>
                        {case_.status.replace("_", " ")}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        <span>{case_.confidence}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Case Details */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{selectedCase.id}</span>
                    <Badge className={getSeverityColor(selectedCase.severity)}>
                      {selectedCase.severity}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(selectedCase.status)}>
                      {selectedCase.status.replace("_", " ")}
                    </Badge>
                  </CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">
                    {selectedCase.type} • {selectedCase.client} • Confidence: {selectedCase.confidence}%
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate STR
                  </Button>
                  <Button variant="outline" size="sm">
                    <Lock className="w-4 h-4 mr-2" />
                    Audit Proof
                  </Button>
                  <Button variant="default" size="sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Escalate
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                  <TabsTrigger value="xai">XAI Analysis</TabsTrigger>
                  <TabsTrigger value="graph">Graph View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Case Information</div>
                      <div className="space-y-1 text-sm">
                        <div><span className="text-muted-foreground">Account:</span> {selectedCase.account}</div>
                        <div><span className="text-muted-foreground">Client:</span> {selectedCase.client}</div>
                        <div><span className="text-muted-foreground">Created:</span> {selectedCase.created}</div>
                        <div><span className="text-muted-foreground">Updated:</span> {selectedCase.updated}</div>
                        <div><span className="text-muted-foreground">Assignee:</span> {selectedCase.assignee}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Evidence Summary</div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 rounded bg-muted/50 text-center">
                          <div className="text-lg font-bold">{selectedCase.evidence.trades}</div>
                          <div className="text-xs text-muted-foreground">Trades</div>
                        </div>
                        <div className="p-2 rounded bg-muted/50 text-center">
                          <div className="text-lg font-bold">{selectedCase.evidence.communications}</div>
                          <div className="text-xs text-muted-foreground">Comms</div>
                        </div>
                        <div className="p-2 rounded bg-muted/50 text-center">
                          <div className="text-lg font-bold">{selectedCase.evidence.documents}</div>
                          <div className="text-xs text-muted-foreground">Docs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">Description</div>
                    <div className="p-3 rounded-lg bg-muted/30 text-sm">
                      {selectedCase.description}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="evidence" className="space-y-4">
                  <div className="text-sm">Evidence details would be displayed here...</div>
                </TabsContent>
                
                <TabsContent value="xai" className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-3">Explainable AI Analysis</div>
                    <div className="space-y-3">
                      {selectedCase.xai.topFeatures.map((feature, index) => (
                        <div key={index} className="p-3 rounded-lg border border-border">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-sm">{feature.name}</div>
                            <Badge variant="outline">
                              {(feature.contribution * 100).toFixed(1)}%
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {feature.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="graph" className="space-y-4">
                  <div className="h-64 rounded-lg bg-muted/30 flex items-center justify-center">
                    <div className="text-center">
                      <Network className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">Graph visualization would appear here</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}