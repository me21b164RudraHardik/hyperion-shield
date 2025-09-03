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
  Zap,
} from "lucide-react";

// CORRECTED: Extended mock data for case management including graph data
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
    evidence: { trades: 24, communications: 3, documents: 7 },
    xai: {
      topFeatures: [
        { name: "Volume Spike", contribution: 0.43, description: "Trading volume 12.3x average" },
        { name: "Timing Pattern", contribution: 0.31, description: "Orders placed 48h before announcement" },
        { name: "Price Impact", contribution: 0.26, description: "Significant price movement following trades" },
      ],
    },
    graphData: {
      nodes: [
        { id: "ACC-789234", x: 300, y: 150, type: "Account" },
        { id: "Harrison Mills", x: 100, y: 150, type: "Client" },
        { id: "Trade-123", x: 300, y: 50, type: "Trade" },
        { id: "Trade-124", x: 500, y: 50, type: "Trade" },
        { id: "Sarah Chen", x: 300, y: 250, type: "Assignee" },
      ],
      links: [
        { source: "Harrison Mills", target: "ACC-789234", type: "owns" },
        { source: "ACC-789234", target: "Trade-123", type: "executed" },
        { source: "ACC-789234", target: "Trade-124", type: "executed" },
        { source: "Sarah Chen", target: "ACC-789234", type: "investigates" },
      ],
    },
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
    evidence: { trades: 156, communications: 0, documents: 3 },
    xai: {
      topFeatures: [
        { name: "Circular Pattern", contribution: 0.52, description: "15 round-trip trades detected" },
        { name: "Related Accounts", contribution: 0.28, description: "Same beneficial ownership" },
        { name: "Zero Net Position", contribution: 0.20, description: "No economic exposure gained" },
      ],
    },
    graphData: {
      nodes: [
        { id: "ACC-456123", x: 200, y: 150, type: "Account" },
        { id: "ACC-987654", x: 400, y: 150, type: "Related Acct" },
        { id: "Mitchell Corp", x: 300, y: 50, type: "Client" },
        { id: "Alex Rodriguez", x: 300, y: 250, type: "Assignee" },
      ],
      links: [
        { source: "Mitchell Corp", target: "ACC-456123", type: "owns" },
        { source: "Mitchell Corp", target: "ACC-987654", type: "owns" },
        { source: "ACC-456123", target: "ACC-987654", type: "wash trades" },
        { source: "Alex Rodriguez", target: "ACC-456123", type: "investigates" },
      ],
    },
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
    evidence: { trades: 89, communications: 1, documents: 12 },
    xai: {
      topFeatures: [
        { name: "Cancel Ratio", contribution: 0.48, description: "94% of orders cancelled" },
        { name: "Price Impact", contribution: 0.35, description: "Significant market movement" },
        { name: "Order Size", contribution: 0.17, description: "Large relative to average daily volume" },
      ],
    },
    graphData: {
      nodes: [
        { id: "ACC-321654", x: 250, y: 150, type: "Account" },
        { id: "Phoenix Trading LLC", x: 100, y: 50, type: "Client" },
        { id: "Spoofing Event", x: 450, y: 150, type: "Event" },
        { id: "Maria Santos", x: 250, y: 250, type: "Assignee" },
      ],
      links: [
        { source: "Phoenix Trading LLC", target: "ACC-321654", type: "owns" },
        { source: "ACC-321654", target: "Spoofing Event", type: "caused" },
        { source: "Maria Santos", target: "ACC-321654", type: "investigates" },
      ],
    },
  },
];

const getSeverityColor = (severity) => {
  switch (severity) {
    case "CRITICAL":
      return "bg-destructive text-destructive-foreground";
    case "HIGH":
      return "bg-orange-500 text-white"; // Using a distinct color for high severity
    case "MEDIUM":
      return "bg-yellow-500 text-black"; // Using a distinct color for medium
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "OPEN":
      return "bg-yellow-500/20 text-yellow-500";
    case "IN_PROGRESS":
      return "bg-primary/20 text-primary";
    case "ESCALATED":
      return "bg-destructive/20 text-destructive";
    case "CLOSED":
      return "bg-green-500/20 text-green-500";
    default:
      return "bg-muted/20 text-muted-foreground";
  }
};

export default function CaseManager() {
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredCases = casesData.filter((case_) => {
    const matchesSearch =
      case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-background text-foreground min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Cases List */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span>Active Cases</span>
                <Badge variant="outline" className="ml-auto">
                  {filteredCases.length}
                </Badge>
              </CardTitle>

              {/* Search and Filters */}
              <div className="pt-4 space-y-3">
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

            <CardContent className="p-0 flex-grow overflow-hidden">
              <div className="space-y-2 h-full overflow-y-auto p-4">
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
                      <Badge className={getSeverityColor(case_.severity)}>{case_.severity}</Badge>
                    </div>

                    <div className="text-sm font-medium mb-1">{case_.type}</div>
                    <div className="text-xs text-muted-foreground mb-2">{case_.description}</div>

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
                    <Badge className={getSeverityColor(selectedCase.severity)}>{selectedCase.severity}</Badge>
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
                        <div>
                          <span className="text-muted-foreground">Account:</span> {selectedCase.account}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Client:</span> {selectedCase.client}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Created:</span> {selectedCase.created}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Updated:</span> {selectedCase.updated}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Assignee:</span> {selectedCase.assignee}
                        </div>
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
                    <div className="p-3 rounded-lg bg-muted/30 text-sm">{selectedCase.description}</div>
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
                            <Badge variant="outline">{(feature.contribution * 100).toFixed(1)}%</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{feature.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="graph" className="space-y-4">
                  <div className="h-96 rounded-lg bg-muted/30 flex items-center justify-center p-4 border border-border">
                    {selectedCase.graphData ? (
                      <svg width="100%" height="100%" viewBox="0 0 600 300">
                        {/* Define marker for arrowhead */}
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="8"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                          </marker>
                        </defs>
                        {/* Render Links */}
                        {selectedCase.graphData.links.map((link, index) => {
                          const sourceNode = selectedCase.graphData.nodes.find((n) => n.id === link.source);
                          const targetNode = selectedCase.graphData.nodes.find((n) => n.id === link.target);
                          return sourceNode && targetNode ? (
                            <g key={index}>
                              <line
                                x1={sourceNode.x}
                                y1={sourceNode.y}
                                x2={targetNode.x}
                                y2={targetNode.y}
                                stroke="#64748b"
                                strokeWidth="1.5"
                                markerEnd="url(#arrowhead)"
                              />
                              <text
                                x={(sourceNode.x + targetNode.x) / 2}
                                y={(sourceNode.y + targetNode.y) / 2 - 6}
                                fontSize="10"
                                fill="#94a3b8"
                                textAnchor="middle"
                              >
                                {link.type}
                              </text>
                            </g>
                          ) : null;
                        })}
                        {/* Render Nodes */}
                        {selectedCase.graphData.nodes.map((node) => (
                          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                            <circle r="25" fill="#3b82f6" stroke="#bfdbfe" strokeWidth="2" />
                            <text
                              fontSize="11"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="white"
                              className="font-semibold select-none"
                              style={{ pointerEvents: "none" }}
                            >
                              {/* Simple logic to shorten labels */}
                              {node.id.includes("-") ? node.id.split("-").pop().slice(0, 6) : node.id.split(" ")[0]}
                            </text>
                            <text y={38} fontSize="10" textAnchor="middle" fill="#94a3b8">
                              {node.type}
                            </text>
                          </g>
                        ))}
                      </svg>
                    ) : (
                      <div className="text-center">
                        <Network className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <div className="text-sm text-muted-foreground">No graph data available for this case.</div>
                      </div>
                    )}
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