import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { 
  TrendingUp, 
  Users, 
  UserPlus, 
  DollarSign, 
  Activity,
  Search,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const PIE_CHART_COLORS = ['#3b82f6', '#60a5fa', '#a78bfa', '#c4b5fd'];
const FUNNEL_COLORS = ['#3b82f6', '#60a5fa', '#a78bfa'];

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
  { name: 'Accounts Opened', value: 856, fill: FUNNEL_COLORS[0] },
  { name: 'Accounts Activated', value: 672, fill: FUNNEL_COLORS[1] },
  { name: 'First Trade Made', value: 524, fill: FUNNEL_COLORS[2] }
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
];

export default function GrowthDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("MTD");
  const [selectedSegment, setSelectedSegment] = useState("Overall");
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (amount) => {
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
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen text-gray-900">
      {/* Header with Period Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Growth & Performance Dashboard</h1>
          <p className="text-gray-500">Business analytics and revenue insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 bg-white border-gray-300">
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
        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
              Total Brokerage Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {formatCurrency(kpiData.totalRevenue.value)}
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">
                {kpiData.totalRevenue.change}% {kpiData.totalRevenue.period}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Users className="w-4 h-4 mr-2 text-indigo-500" />
              Active Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {kpiData.activeClients.value.toLocaleString()}
            </div>
            <div className="flex items-center space-x-1">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-500">
                    {Math.abs(kpiData.activeClients.change)}% {kpiData.activeClients.period}
                </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <UserPlus className="w-4 h-4 mr-2 text-purple-500" />
              New Client Acquisitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {kpiData.newClients.value}
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">
                {kpiData.newClients.change}% {kpiData.newClients.period}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-amber-500" />
              Client Activation Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {kpiData.activationRate.value}%
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">
                {kpiData.activationRate.change}% {kpiData.activationRate.period}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-teal-500" />
              Avg. Revenue Per User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {formatCurrency(kpiData.arpu.value)}
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">
                {kpiData.arpu.change}% {kpiData.arpu.period}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-800">Brokerage & Turnover Over Time</CardTitle>
              <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                <SelectTrigger className="w-32 bg-white border-gray-300">
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
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [formatCurrency(Number(value)), name === 'brokerage' ? 'Brokerage' : 'Turnover']}
                />
                <Line type="monotone" dataKey="brokerage" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="turnover" stroke="#a78bfa" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Revenue Mix by Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueMix} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {revenueMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px'
                  }}
                  formatter={(value, name) => [`${value}% (${formatCurrency(revenueMix.find(r => r.name === name)?.amount || 0)})`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">Client Growth Funnel</CardTitle>
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
                <div className="text-sm font-medium text-gray-800">{stage.name}</div>
                {index < clientFunnel.length - 1 && (
                  <div className="text-xs text-gray-500 mt-1">
                    {((clientFunnel[index + 1].value / stage.value) * 100).toFixed(1)}% conversion
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-800">Sub-Broker Performance</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search sub-brokers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-white border-gray-300"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-500">Sub-Broker</TableHead>
                  <TableHead className="text-right text-gray-500">New Clients</TableHead>
                  <TableHead className="text-right text-gray-500">Active Clients</TableHead>
                  <TableHead className="text-right text-gray-500">Brokerage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubBrokers.map((broker) => (
                  <TableRow key={broker.id} className="border-gray-200">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-800">{broker.name}</div>
                        <div className="text-sm text-gray-500">{broker.id}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-gray-100 text-gray-800">{broker.newClients}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-gray-800">{broker.activeClients}</TableCell>
                    <TableCell className="text-right font-medium text-gray-800">
                      {formatCurrency(broker.brokerage)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Top Performing Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-500">Client</TableHead>
                  <TableHead className="text-right text-gray-500">Trades</TableHead>
                  <TableHead className="text-right text-gray-500">Brokerage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topClients.map((client, index) => (
                  <TableRow key={client.clientId} className="border-gray-200">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <span className="text-right text-gray-800">
                          #{index + 1}
                        </span>
                        <div>
                          <a 
                            href={`/cases?client=${client.clientId}`}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            {client.name}
                          </a>
                          <div className="text-sm text-gray-500">{client.clientId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-gray-800">{client.trades}</TableCell>
                    <TableCell className="text-right font-medium text-gray-800">
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

