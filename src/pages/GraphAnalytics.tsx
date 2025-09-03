import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, Users, Share2, TrendingUp, Eye } from "lucide-react";

// Sample data representing a financial network
const sampleGraphData = {
  nodes: [
    { id: "ACC-101", x: 100, y: 150, type: "Account", suspicious: true },
    { id: "ACC-102", x: 300, y: 150, type: "Account", suspicious: true },
    { id: "Trader-A", x: 200, y: 50, type: "Trader" },
    { id: "Firm-X", x: 200, y: 250, type: "Firm" },
    { id: "ACC-201", x: 500, y: 100, type: "Account" },
    { id: "Trader-B", x: 500, y: 200, type: "Trader" },
  ],
  links: [
    { source: "Trader-A", target: "ACC-101", type: "controls" },
    { source: "Trader-A", target: "ACC-102", type: "controls" },
    { source: "ACC-101", target: "ACC-102", type: "traded_with" },
    { source: "ACC-102", target: "ACC-101", type: "traded_with" }, // Circular trade
    { source: "Firm-X", target: "Trader-A", type: "employs" },
    { source: "Trader-B", target: "ACC-201", type: "controls" },
    { source: "Firm-X", target: "Trader-B", type: "employs" },
  ],
};

const Node = ({ node }) => (
  <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="cursor-pointer group">
    <circle
      r="30"
      fill={node.suspicious ? "#ef4444" : "#3b82f6"} // red-500 for suspicious, blue-500 for normal
      stroke={node.suspicious ? "#fca5a5" : "#bfdbfe"} // red-300 or blue-200
      strokeWidth="2"
      className="transition-all duration-200 group-hover:r-32"
    />
    <text
      fontSize="12"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="white"
      className="font-semibold select-none"
      style={{ pointerEvents: "none" }}
    >
      {node.id.split("-").pop()}
    </text>
    <text y={42} fontSize="10" textAnchor="middle" fill="#94a3b8">
      {node.type}
    </text>
  </g>
);

const Link = ({ link, nodes, allLinks }) => {
  const sourceNode = nodes.find((n) => n.id === link.source);
  const targetNode = nodes.find((n) => n.id === link.target);
  if (!sourceNode || !targetNode) return null;

  // Calculate properties for drawing the line
  const dx = targetNode.x - sourceNode.x;
  const dy = targetNode.y - sourceNode.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const radius = 32; // Node radius (30) + a small gap (2)

  if (dist === 0) return null;
  
  // Calculate start and end points of the line to stop at the edge of the circle
  const sourceX = sourceNode.x + (dx / dist) * radius;
  const sourceY = sourceNode.y + (dy / dist) * radius;
  const targetX = targetNode.x - (dx / dist) * radius;
  const targetY = targetNode.y - (dy / dist) * radius;

  // --- FIX FOR OVERLAPPING TEXT ---
  // Default offset direction is 1
  let textOffsetMultiplier = 1;
  
  // Check if a reciprocal link exists (B->A for our A->B)
  const reciprocalIndex = allLinks.findIndex(
    otherLink => otherLink.source === link.target && otherLink.target === link.source
  );

  // Find the index of the current link
  const currentIndex = allLinks.findIndex(l => l.source === link.source && l.target === link.target && l.type === link.type);

  // If a reciprocal link exists and this link appears *after* it in the array,
  // flip its offset to the other side of the line.
  if (reciprocalIndex !== -1 && currentIndex > reciprocalIndex) {
    textOffsetMultiplier = -1;
  }
  // --- END OF FIX ---

  // For the text label, calculate a perpendicular offset to avoid overlap
  const textOffset = 15;
  const midX = (sourceNode.x + targetNode.x) / 2;
  const midY = (sourceNode.y + targetNode.y) / 2;
  
  // Normalized perpendicular vector
  const normDx = dx / dist;
  const normDy = dy / dist;

  const textX = midX - textOffset * normDy * textOffsetMultiplier;
  const textY = midY + textOffset * normDx * textOffsetMultiplier;

  return (
    <g>
      <line
        x1={sourceX}
        y1={sourceY}
        x2={targetX}
        y2={targetY}
        stroke="#475569" // slate-600
        strokeWidth="1.5"
        markerEnd="url(#arrowhead)"
      />
      <text
        x={textX}
        y={textY}
        fontSize="10"
        fill="#94a3b8"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {link.type.replace("_", " ")}
      </text>
    </g>
  );
};

export default function GraphAnalytics() {
  const [graphData, setGraphData] = useState(null);

  const loadData = () => {
    setGraphData(sampleGraphData);
  };

  return (
    <div className="p-6 bg-background min-h-screen text-foreground">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Graph Analytics</h1>
        <p className="text-muted-foreground">Entity relationship mapping and suspicious pattern detection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="w-5 h-5 text-primary" />
                <span>Entity Relationship Graph</span>
                {graphData && <Badge variant="secondary" className="ml-auto">Sample View</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)] p-4">
              {!graphData ? (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <Network className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Interactive Graph Visualization</h3>
                    <p className="text-muted-foreground mb-4">Click below to load a sample network.</p>
                    <Button variant="outline" onClick={loadData}>
                      <Eye className="w-4 h-4 mr-2" />
                      Load Sample Data
                    </Button>
                  </div>
                </div>
              ) : (
                <svg width="100%" height="100%" viewBox="0 0 600 300">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8.5" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
                    </marker>
                  </defs>
                  {graphData.links.map((link, i) => (
                    <Link key={i} link={link} nodes={graphData.nodes} allLinks={graphData.links} />
                  ))}
                  {graphData.nodes.map((node) => (
                    <Node key={node.id} node={node} />
                  ))}
                </svg>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Controls and Metrics */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Detection Algorithms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Share2 className="w-4 h-4 mr-2 text-primary" />
                Find Wash Trade Cycles
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2 text-primary" />
                Group Related Accounts
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                Analyze Unusual Patterns
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Graph Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Nodes</span>
                <span className="font-medium">{graphData ? graphData.nodes.length : "N/A"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Edges</span>
                <span className="font-medium">{graphData ? graphData.links.length : "N/A"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Suspicious Clusters</span>
                <span className="font-medium text-orange-500">{graphData ? "1" : "N/A"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

