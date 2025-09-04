import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart3, 
  Network, 
  Shield, 
  Users,
  Activity,
  Globe,
  Zap,
  AlertTriangle,
  MessageCircle,
  Send,
  X
} from "lucide-react";

// NOTE: In a real app, these would be separate files. For this prototype, they are included here.
// You can copy/paste these into their respective component files (e.g., /components/KPICards.js)

// --- MOCK COMPONENTS START ---

const Card = ({ children, className }) => <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
const CardContent = ({ children, className }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const Badge = ({ children, variant, className }) => {
    const variants = {
        default: 'border-transparent bg-primary text-primary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
    };
    return <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant] || variants.default} ${className}`}>{children}</div>;
};
const Progress = ({ value, className }) => (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-primary/20 ${className}`}>
        <div className="h-full w-full flex-1 bg-primary transition-all" style={{ transform: `translateX(-${100 - (value || 0)}%)` }}></div>
    </div>
);


const KPICards = () => {
    const kpiData = [
        { title: "Total Alerts Today", value: "142", change: "+12.5%", icon: <AlertTriangle className="w-6 h-6 text-destructive" />, changeColor: "text-destructive" },
        { title: "Cases Resolved", value: "78", change: "+5.8%", icon: <Shield className="w-6 h-6 text-success" />, changeColor: "text-success" },
        { title: "Active Analysts", value: "12", change: " ", icon: <Users className="w-6 h-6 text-primary" />, changeColor: "" },
        { title: "Avg. Resolution Time", value: "3.8h", change: "-15%", icon: <Activity className="w-6 h-6 text-success" />, changeColor: "text-success" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map(kpi => (
                <Card key={kpi.title} className="bg-card border-border hover:border-primary/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                        {kpi.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{kpi.value}</div>
                        <p className={`text-xs ${kpi.changeColor} mt-1`}>{kpi.change} from yesterday</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

const AlertsTable = () => {
    const alerts = [
        { id: 'CASE-0921', client: 'ACC-GHI-789', type: 'Insider Trading', risk: 'CRITICAL', time: '2m ago' },
        { id: 'CASE-0920', client: 'ACC-JKL-012', type: 'Wash Trade', risk: 'HIGH', time: '15m ago' },
        { id: 'CASE-0919', client: 'ACC-MNO-345', type: 'Spoofing', risk: 'HIGH', time: '45m ago' },
        { id: 'CASE-0918', client: 'ACC-PQR-678', type: 'Anomalous Volume', risk: 'MEDIUM', time: '1h ago' },
        { id: 'CASE-0917', client: 'ACC-STU-901', type: 'Layering', risk: 'MEDIUM', time: '2h ago' },
    ];
    return (
        <Card className="bg-card border-border">
            <CardHeader>
                <CardTitle>Real-Time Alerts</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-background">
                            <tr>
                                <th scope="col" className="px-6 py-3">Case ID</th>
                                <th scope="col" className="px-6 py-3">Client Account</th>
                                <th scope="col" className="px-6 py-3">Alert Type</th>
                                <th scope="col" className="px-6 py-3">Risk Level</th>
                                <th scope="col" className="px-6 py-3">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                          {alerts.map(alert => (
                            <tr key={alert.id} className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium text-blue-600">{alert.id}</td>
                              <td className="px-6 py-4 text-gray-700">{alert.client}</td>
                              <td className="px-6 py-4 text-gray-700">{alert.type}</td>
                              <td className="px-6 py-4">
                                <Badge className={
                                  alert.risk === 'CRITICAL' ? 'bg-red-100 text-red-800 font-semibold' :
                                  alert.risk === 'HIGH' ? 'bg-orange-100 text-orange-800 font-semibold' :
                                  'bg-amber-100 text-amber-800 font-semibold' // For MEDIUM
                                }>
                                  {alert.risk}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 text-gray-500">{alert.time}</td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

const SystemHealthCard = () => (
    <Card className="bg-card border-border">
        <CardHeader>
            <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>System Health</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <div className="flex justify-between text-sm mb-1"><span>Data Ingestion</span><span className="text-success font-medium">Nominal</span></div>
                <Progress value={95} />
            </div>
            <div>
                <div className="flex justify-between text-sm mb-1"><span>Rule Engine</span><span className="text-success font-medium">Optimal</span></div>
                <Progress value={100} />
            </div>
            <div>
                <div className="flex justify-between text-sm mb-1"><span>ML Model Inference</span><span className="text-warning font-medium">Elevated</span></div>
                <Progress value={70} className="[&>div]:bg-warning"/>
            </div>
        </CardContent>
    </Card>
);

// --- MOCK COMPONENTS END ---


// --- AI COPILOT COMPONENT START ---
const HyperionAICopilot = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hello! I am the Hyperion AI Co-pilot. I can help you with summaries, quick checks, and data queries. What can I do for you today?" }
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    const handleSend = () => {
        if (input.trim() === '') return;

        const userMessage = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        
        // Simulate AI response
        setTimeout(() => {
            let aiResponseText = "I'm not sure how to respond to that yet. Try asking for a summary of today's analysis.";
            if (input.toLowerCase().includes('summarize') || input.toLowerCase().includes('summary')) {
                 aiResponseText = "Of course. Today's summary: We've seen **142 total alerts**, a 12.5% increase from yesterday, primarily driven by anomalous volume in the F&O segment. One alert has been flagged as **CRITICAL** for potential insider trading (CASE-0921). System health is nominal, with ML inference latency slightly elevated due to market volatility. Would you like me to open the critical case for you?";
            } else if (input.toLowerCase().includes('health')) {
                aiResponseText = "System health is currently nominal. Data Ingestion and the Rule Engine are operating at 100%. ML Model Inference is showing slightly elevated latency but remains within acceptable parameters."
            }
            
            const aiMessage = { id: Date.now() + 1, sender: 'ai', text: aiResponseText };
            setMessages(prev => [...prev, aiMessage]);
        }, 1000);

        setInput('');
    };
    
    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
    }

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col z-50 animate-fade-in-up">
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-2">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-lg">Hyperion AI Co-pilot</h3>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-muted">
                    <X className="w-5 h-5 text-muted-foreground" />
                </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                            msg.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`} dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}>
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <div className='p-4 border-t border-border'>
                <div className="flex space-x-2 mb-2">
                    <button onClick={() => handleSuggestionClick("Summarize today's analysis")} className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full">Summarize today</button>
                    <button onClick={() => handleSuggestionClick("How is system health?")} className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full">System Health?</button>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask Hyperion AI..."
                        className="flex-1 p-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button onClick={handleSend} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
// --- AI COPILOT COMPONENT END ---


export default function Dashboard() {
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 bg-background text-foreground min-h-screen">
      {/* KPI Cards */}
      <KPICards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Alerts Table */}
        <div className="lg:col-span-2">
          <AlertsTable />
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          <SystemHealthCard />
          
          {/* Federation Status */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Federation Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Participants</span>
                <Badge variant="default" className="bg-primary/20 text-primary">
                  8 Brokers
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Last Training Round</span>
                  <span className="text-success">Completed</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Model Accuracy</span>
                  <span className="font-medium">94.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Next Round</span>
                  <span className="text-muted-foreground">In 2h 14m</span>
                </div>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">Privacy-Preserved Learning Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-accent" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-4 h-4 text-primary" />
                  <div>
                    <div className="font-medium text-sm">Review High Priority</div>
                    <div className="text-xs text-muted-foreground">23 cases pending</div>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 text-left rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <Network className="w-4 h-4 text-accent" />
                  <div>
                    <div className="font-medium text-sm">Run Graph Analysis</div>
                    <div className="text-xs text-muted-foreground">Detect new patterns</div>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 text-left rounded-lg bg-warning/10 hover:bg-warning/20 border border-warning/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-warning" />
                  <div>
                    <div className="font-medium text-sm">Generate Audit Report</div>
                    <div className="text-xs text-muted-foreground">Weekly compliance</div>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Bottom Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Detection Rate Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">87.2%</div>
                <div className="flex items-center space-x-1">
                  <Activity className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">+5.3% improvement</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  False Positive Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">3.8%</div>
                <div className="flex items-center space-x-1">
                  <Activity className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">-1.2% reduction</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Resolution Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">4.2h</div>
                <div className="flex items-center space-x-1">
                  <Activity className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">-1.8h faster</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Regulatory Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">99.6%</div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">Fully compliant</span>
                </div>
              </CardContent>
            </Card>
          </div>

      {/* AI Co-pilot Floating Action Button & Chat Window */}
      <div className="fixed bottom-6 right-6 z-40">
          <button 
              onClick={() => setIsCopilotOpen(true)} 
              className={`p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-110 ${isCopilotOpen ? 'hidden' : 'block'}`}
              aria-label="Open AI Copilot"
          >
              <MessageCircle className="w-8 h-8" />
          </button>
      </div>

      <HyperionAICopilot isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />

    </div>
  );
}
