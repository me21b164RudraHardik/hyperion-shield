import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, FunnelChart, Funnel } from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  UserPlus, 
  DollarSign, 
  Activity,
  Search,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Link } from "react-router-dom";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

// Mock data
const kpiData = {
  totalRevenue: { value: 2485000, change: 12.5, period: "vs last month" },
  activeClients: { value: 1247, change: -2.3, period: "vs last month" },
  newClients: { value: 156, change: 18.7, period: "vs last month" },
  activationRate: { value: 78.5, change: 5.2, period: "vs last month" },
  arpu: { value: 1993, change: 15.1, period: "vs last month" }
};

const revenueOverTime = [
  { date: '2024-01-01', brokerage: 145000, turnover: 2450000 },
  { date: '2024-01-02', brokerage: 162000, turnover: 2680000 },
  { date: '2024-01-03', brokerage: 158000, turnover: 2590000 },
  { date: '2024-01-04', brokerage: 174000, turnover: 2890000 },
  { date: '2024-01-05', brokerage: 169000, turnover: 2750000 },
  { date: '2024-01-06', brokerage: 185000, turnover: 3100000 },
  { date: '2024-01-07', brokerage: 192000, turnover: 3240000 }
];

const revenueMix = [
  { name: 'Equity', value: 45, amount: 1118250 },
  { name: 'F&O', value: 35, amount: 869750 },
  { name: 'Currency', value: 15, amount: 372750 },
  { name: 'Commodity', value: 5, amount: 124250 }
];

const clientFunnel = [
  { name: 'Accounts Opened', value: 856, fill: 'hsl(var(--primary))' },
  { name: 'Accounts Activated', value: 672, fill: 'hsl(var(--secondary))' },
  { name: 'First Trade Made', value: 524, fill: 'hsl(var(--accent))' }
];

const subBrokerData = [
  { id: 'SB001', name: 'Mumbai Financial Services', newClients: 45, activeClients: 234, brokerage: 456780 },
  { id: 'SB002', name: 'Delhi Capital Partners', newClients: 38, activeClients: 189, brokerage: 387650 },
  { id: 'SB003', name: 'Bangalore Securities', newClients: 29, activeClients: 156, brokerage: 298740 },
  { id: 'SB004', name: 'Chennai Investment Co', newClients: 22, activeClients: 145, brokerage: 267890 },
  { id: 'SB005', name: 'Pune Trading House', newClients: 18, activeClients: 123, brokerage: 234560 }
];

const topClients = [
  { clientId: 'CL001', name: 'Aditya Enterprises', brokerage: 89750, trades: 342 },
  { clientId: 'CL002', name: 'Priya Investments', brokerage: 76890, trades: 298 },
  { clientId: 'CL003', name: 'Rohit Trading Co', brokerage: 65430, trades: 245 },
  { clientId: 'CL004', name: 'Sneha Capital', brokerage: 58920, trades: 234 },
  { clientId: 'CL005', name: 'Vikram Securities', brokerage: 52340, trades: 189 },
  { clientId: 'CL006', name: 'Kavya Holdings', brokerage: 47650, trades: 167 },
  { clientId: 'CL007', name: 'Arjun Traders', brokerage: 43280, trades: 156 },
  { clientId: 'CL008', name: 'Meera Investments', brokerage: 39870, trades: 145 },
  { clientId: 'CL009', name: 'Karan Financial', brokerage: 36450, trades: 134 },
  { clientId: 'CL010', name: 'Tanya Securities', brokerage: 33290, trades: 123 }
];

export default function GrowthDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("MTD");
  const [selectedSegment, setSelectedSegment] = useState("Overall");
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredSubBrokers = subBrokerData.filter(broker =>
    broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    broker.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header with Period Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Growth & Performance Dashboard</h1>
          <p className="text-muted-foreground">Business analytics and revenue insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7D">This Week</SelectItem>
              <SelectItem value="MTD">MTD</SelectItem>
              <SelectItem value="QTD">QTD</SelectItem>
              <SelectItem value="YTD">YTD</SelectItem>
              <SelectItem value="Custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Total Brokerage Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">
              {formatCurrency(kpiData.totalRevenue.value)}
            </div>
            <div className="flex items-center space-x-1">
              {kpiData.totalRevenue.change > 0 ? (
                <ArrowUpRight className="w-4 h-4 text-success" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-destructive" />
              )}
              <span className={`text-sm ${kpiData.totalRevenue.change > 0 ? 'text-success' : 'text-destructive'}`}>
                {Math.abs(kpiData.totalRevenue.change)}% {kpiData.totalRevenue.period}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Active Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">
              {kpiData.activeClients.value.toLocaleString()}
            </div>
            <div className="flex items-center space-x-1">
              {kpiData.activeClients.change > 0 ? (
                <ArrowUpRight className="w-4 h-4 text-success" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-destructive" />
              )}
              <span className={`text-sm ${kpiData.activeClients.change > 0 ? 'text-success' : 'text-destructive'}`}>
                {Math.abs(kpiData.activeClients.change)}% {kpiData.activeClients.period}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <UserPlus className="w-4 h-4 mr-2" />
              New Client Acquisitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">
              {kpiData.newClients.value}
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-4 h-4 text-success" />
              <span className="text-sm text-success">
                {kpiData.newClients.change}% {kpiData.newClients.period}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Client Activation Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">
              {kpiData.activationRate.value}%
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-4 h-4 text-success" />
              <span className="text-sm text-success">
                {kpiData.activationRate.change}% {kpiData.activationRate.period}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Average Revenue Per User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">
              {formatCurrency(kpiData.arpu.value)}
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-4 h-4 text-success" />
              <span className="text-sm text-success">
                {kpiData.arpu.change}% {kpiData.arpu.period}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Over Time */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Brokerage & Turnover Over Time</CardTitle>
              <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Overall">Overall</SelectItem>
                  <SelectItem value="Equity">Equity</SelectItem>
                  <SelectItem value="F&O">F&O</SelectItem>
                  <SelectItem value="Currency">Currency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [
                    name === 'brokerage' ? formatCurrency(Number(value)) : formatCurrency(Number(value)),
                    name === 'brokerage' ? 'Brokerage' : 'Turnover'
                  ]}
                />
                <Line type="monotone" dataKey="brokerage" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="turnover" stroke="hsl(var(--secondary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Mix */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Mix by Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueMix}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {revenueMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [`${value}% (${formatCurrency(revenueMix.find(r => r.name === name)?.amount || 0)})`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Client Growth Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Client Growth Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {clientFunnel.map((stage, index) => (
              <div key={stage.name} className="text-center">
                <div className="mb-4">
                  <div 
                    className="mx-auto rounded-lg p-6 text-white font-bold text-2xl"
                    style={{ backgroundColor: stage.fill, width: `${100 - index * 15}%` }}
                  >
                    {stage.value.toLocaleString()}
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground">{stage.name}</div>
                {index < clientFunnel.length - 1 && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {((clientFunnel[index + 1].value / stage.value) * 100).toFixed(1)}% conversion
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sub-Broker Leaderboard */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sub-Broker Performance</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search sub-brokers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sub-Broker</TableHead>
                  <TableHead className="text-right">New Clients</TableHead>
                  <TableHead className="text-right">Active Clients</TableHead>
                  <TableHead className="text-right">Brokerage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubBrokers.map((broker) => (
                  <TableRow key={broker.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{broker.name}</div>
                        <div className="text-sm text-muted-foreground">{broker.id}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{broker.newClients}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{broker.activeClients}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(broker.brokerage)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Performing Clients */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Trades</TableHead>
                  <TableHead className="text-right">Brokerage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topClients.map((client, index) => (
                  <TableRow key={client.clientId}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                        <div>
                          <Link 
                            to={`/cases?client=${client.clientId}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {client.name}
                          </Link>
                          <div className="text-sm text-muted-foreground">{client.clientId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{client.trades}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(client.brokerage)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}