import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Download, Star, Shield, BarChart3, AlertTriangle, Users } from "lucide-react";

export default function Marketplace() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Compliance Marketplace</h1>
        <p className="text-muted-foreground">Installable compliance applications and modules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Available Apps */}
        {[
          {
            name: "Advanced Surveillance",
            description: "Enhanced ML-powered surveillance with deep learning models",
            category: "Surveillance",
            price: "Enterprise",
            rating: 4.8,
            installs: "12K+",
            icon: AlertTriangle,
            status: "available",
            features: ["Real-time detection", "Custom algorithms", "API integration"]
          },
          {
            name: "Regulatory Reporting",
            description: "Automated compliance reporting for multiple jurisdictions",
            category: "Reporting",
            price: "Premium",
            rating: 4.6,
            installs: "8.5K+",
            icon: BarChart3,
            status: "installed",
            features: ["Multi-jurisdiction", "Automated filing", "Audit trails"]
          },
          {
            name: "Enhanced AuditShield",
            description: "Advanced blockchain integration with smart contracts",
            category: "Audit",
            price: "Enterprise",
            rating: 4.9,
            installs: "5.2K+",
            icon: Shield,
            status: "available",
            features: ["Smart contracts", "Multi-chain", "Zero-knowledge proofs"]
          },
          {
            name: "Federation Manager Pro",
            description: "Advanced federated learning with secure multi-party computation",
            category: "Federation",
            price: "Enterprise",
            rating: 4.7,
            installs: "3.1K+",
            icon: Users,
            status: "trial",
            features: ["SMPC protocols", "Privacy budgeting", "Consortium management"]
          },
          {
            name: "Graph Analytics Plus",
            description: "Advanced graph algorithms and pattern recognition",
            category: "Analytics",
            price: "Premium",
            rating: 4.5,
            installs: "6.8K+",
            icon: Target,
            status: "available",
            features: ["Graph ML", "Pattern mining", "Network analysis"]
          },
          {
            name: "Risk Scoring Engine",
            description: "AI-powered risk assessment and scoring platform",
            category: "Risk Management",
            price: "Premium",
            rating: 4.4,
            installs: "9.2K+",
            icon: BarChart3,
            status: "available",
            features: ["ML scoring", "Real-time updates", "Custom models"]
          }
        ].map((app, index) => (
          <Card key={index} className="bg-card border-border hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <app.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{app.name}</CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">
                      {app.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs">{app.rating}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{app.description}</p>
              
              <div className="space-y-2">
                <div className="text-xs font-medium">Key Features:</div>
                <div className="flex flex-wrap gap-1">
                  {app.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{app.installs} installs</span>
                <span className="font-medium">{app.price}</span>
              </div>
              
              <Button 
                className="w-full" 
                variant={app.status === "installed" ? "outline" : "default"}
                disabled={app.status === "installed"}
              >
                {app.status === "installed" && <Download className="w-4 h-4 mr-2" />}
                {app.status === "installed" ? "Installed" : 
                 app.status === "trial" ? "Start Trial" : "Install"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Installed Apps */}
      <Card className="bg-card border-border mt-8">
        <CardHeader>
          <CardTitle>Installed Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Core Surveillance", version: "v2.1", status: "active" },
              { name: "Basic Reporting", version: "v1.8", status: "active" },
              { name: "AuditShield Core", version: "v1.5", status: "active" },
              { name: "Graph Analytics", version: "v1.3", status: "active" }
            ].map((app, index) => (
              <div key={index} className="p-3 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{app.name}</span>
                  <Badge variant="outline" className="text-xs">{app.version}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs text-muted-foreground">{app.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}