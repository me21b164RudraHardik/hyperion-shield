import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Lock, Shield, CheckCircle, FileText, Hash, Key } from "lucide-react";

export default function AuditShield() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Audit Shield</h1>
        <p className="text-muted-foreground">Merkle proof generation and blockchain audit trails</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Merkle Tree Generator */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-primary" />
              <span>Merkle Proof Generator</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Case ID for Proof</label>
              <Input placeholder="CASE-2024-001" />
            </div>
            
            <Button className="w-full">
              <Hash className="w-4 h-4 mr-2" />
              Generate Merkle Proof
            </Button>
            
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="text-sm font-medium mb-2">Sample Proof Structure</div>
              <div className="font-mono text-xs space-y-1">
                <div>Root: 0x7a8b2c4d...</div>
                <div>Path: [0x3f1e2d3c..., 0x9b7a6e5f...]</div>
                <div>Leaf: 0x5c4b3a2f...</div>
                <div>Timestamp: 2024-01-15T10:30:00Z</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-success" />
              <span>Proof Verification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Merkle Root Hash</label>
              <Input placeholder="0x7a8b2c4d..." />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Case Data Hash</label>
              <Input placeholder="0x5c4b3a2f..." />
            </div>
            
            <Button variant="outline" className="w-full">
              <CheckCircle className="w-4 h-4 mr-2" />
              Verify Proof
            </Button>
            
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center space-x-2 text-success">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Verification Status: Valid</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Log */}
      <Card className="bg-card border-border mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-accent" />
            <span>Audit Trail</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { 
                id: "CASE-2024-001", 
                action: "Proof Generated", 
                timestamp: "2024-01-15 10:30:00",
                hash: "0x7a8b2c4d...",
                status: "verified"
              },
              { 
                id: "CASE-2024-002", 
                action: "Case Sealed", 
                timestamp: "2024-01-15 09:15:00",
                hash: "0x3f1e2d3c...",
                status: "verified"
              },
              { 
                id: "CASE-2024-003", 
                action: "Evidence Locked", 
                timestamp: "2024-01-15 08:45:00",
                hash: "0x9b7a6e5f...",
                status: "pending"
              }
            ].map((entry, index) => (
              <div key={index} className="p-4 rounded-lg border border-border hover:bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-medium">{entry.id}</span>
                    <Badge variant="outline">{entry.action}</Badge>
                  </div>
                  <Badge 
                    variant={entry.status === "verified" ? "default" : "outline"}
                    className={entry.status === "verified" ? "bg-success/20 text-success" : ""}
                  >
                    {entry.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>Timestamp: {entry.timestamp}</div>
                  <div>Hash: {entry.hash}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Integration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm">Blockchain Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Network</span>
                <Badge variant="outline">Hyperledger Fabric</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Connection</span>
                <Badge variant="default" className="bg-success/20 text-success">Connected</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Last Block</span>
                <span className="text-sm font-mono">#1,247,832</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm">Cryptographic Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Signing Key</span>
                <Badge variant="outline">RSA-2048</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Key Status</span>
                <Badge variant="default" className="bg-success/20 text-success">Active</Badge>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                <Key className="w-4 h-4 mr-2" />
                Rotate Keys
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}