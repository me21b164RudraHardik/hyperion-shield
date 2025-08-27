import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, Users, Share2, TrendingUp, Eye, Filter } from "lucide-react";

export default function GraphAnalytics() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Graph Analytics</h1>
        <p className="text-muted-foreground">Entity relationship mapping and suspicious pattern detection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border h-96">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="w-5 h-5 text-primary" />
                <span>Entity Relationship Graph</span>
                <Badge variant="outline" className="ml-auto">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full flex items-center justify-center">
              <div className="text-center">
                <Network className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Interactive Graph Visualization</h3>
                <p className="text-muted-foreground mb-4">Graph analytics engine loading...</p>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Load Sample Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls and Metrics */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Detection Algorithms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Share2 className="w-4 h-4 mr-2" />
                Wash Trade Cycles
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Related Accounts
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Unusual Patterns
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Graph Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Nodes</span>
                <span className="font-medium">2,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Edges</span>
                <span className="font-medium">8,231</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Suspicious Clusters</span>
                <span className="font-medium text-warning">12</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}