import React, { useState } from 'react';
import { Shield, UserCheck, SlidersHorizontal, AlertTriangle, UserX, CheckCircle, Percent, FileText, PieChart, Landmark, ArrowRight, Clock, FileCheck2, UserPlus } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// --- UI Components ---
const Card = ({ children, className }) => <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
const CardContent = ({ children, className }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const Badge = ({ children, variant, className }) => {
    const variants = {
        destructive: 'border-transparent bg-destructive/20 text-destructive',
        warning: 'border-transparent bg-yellow-500/20 text-yellow-500',
        success: 'border-transparent bg-green-500/20 text-green-500',
        info: 'border-transparent bg-blue-500/20 text-blue-500',
    };
    return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}>{children}</span>;
};
const Tabs = ({ tabs, activeTab, setActiveTab }) => (
    <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`${
                        activeTab === tab.name
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                    {tab.icon}
                    <span>{tab.name}</span>
                </button>
            ))}
        </nav>
    </div>
);

// --- Mock Data ---
const iaSuitabilityData = {
    chartData: {
        labels: ['Conservative Clients', 'Moderate Clients', 'Aggressive Clients'],
        datasets: [
            { label: 'Low-Risk Advice', data: [150, 80, 20], backgroundColor: 'rgba(75, 192, 192, 0.6)' },
            { label: 'Medium-Risk Advice', data: [25, 120, 50], backgroundColor: 'rgba(255, 206, 86, 0.6)' },
            { label: 'High-Risk Advice', data: [5, 45, 90], backgroundColor: 'rgba(255, 99, 132, 0.6)' },
        ],
    },
    alerts: [
        { id: 'IAS-015', client: 'Anjali Verma', riskProfile: 'Conservative', advisor: 'Suresh Gupta', issue: 'Advised High-Risk Penny Stock (TILEX)', status: 'Escalated' },
        { id: 'IAS-016', client: 'Vikram Rathore', riskProfile: 'Conservative', advisor: 'Suresh Gupta', issue: 'Advised F&O Derivative Product', status: 'Pending Review' },
    ]
};

const preTradeRequests = [
    { id: 'PTC-011', employee: 'Priya Sharma (RA)', request: 'SELL 500x TCS', systemCheck: 'Auto-Approved', status: 'Approved' },
    { id: 'PTC-012', employee: 'Karan Singh (Employee)', request: 'BUY 1000x ADANIENT', systemCheck: 'Requires Review', status: 'Pending' },
    { id: 'PTC-013', employee: 'Ravi Kumar (RA)', request: 'BUY 200x RELIANCE', systemCheck: 'Violation Detected', status: 'Rejected' },
];

const raBlackoutAlerts = [
    { id: 'RAV-001', analyst: 'Ravi Kumar', tradeDate: '2025-09-02', stock: 'RELIANCE', reportDate: '2025-09-04', violation: 'Trade 2 days before report', status: 'Pending Review' },
    { id: 'RAV-002', analyst: 'Priya Sharma', tradeDate: '2025-08-28', stock: 'TCS', reportDate: '2025-08-27', violation: 'Trade 1 day after report', status: 'Pending Review' },
];

const pmOversightData = [
    { id: 'PM-01', manager: 'Anand Desai', clients: 45, aum: '₹150 Cr', openIssues: 2, reportingStatus: 'On Track', lastAudit: '2025-07-15' },
    { id: 'PM-02', manager: 'Sunita Rao', clients: 30, aum: '₹95 Cr', openIssues: 0, reportingStatus: 'On Track', lastAudit: '2025-07-20' },
    { id: 'PM-03', manager: 'Rajesh Nair', clients: 52, aum: '₹210 Cr', openIssues: 1, reportingStatus: 'Delayed', lastAudit: '2025-06-30' },
];

const pmPortfolioBreaches = [
    { caseId: 'PMB-001', pm: 'Anand Desai', client: 'C-234', issue: 'Single Stock Concentration > 25% (ADANIENT)', status: 'Pending Review' },
    { caseId: 'PMB-002', pm: 'Rajesh Nair', client: 'C-451', issue: 'Sector Concentration > 35% (IT)', status: 'Action Required' },
    { caseId: 'PMB-003', pm: 'Anand Desai', client: 'C-199', issue: 'Investment in Unlisted Securities > 10%', status: 'Pending Review' },
];

// --- Page Sections ---

const IASuitabilityReview = () => (
    <div className="mt-6 space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Advice Suitability Matrix</CardTitle>
                <p className="text-sm text-muted-foreground">Comparing client risk profiles against the risk level of advised products.</p>
            </CardHeader>
            <CardContent>
                <div className="h-72">
                    <Bar options={{ responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }} data={iaSuitabilityData.chartData} />
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>High-Risk Suitability Mismatches</CardTitle></CardHeader>
            <CardContent>
                {iaSuitabilityData.alerts.map(alert => (
                    <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 border-b last:border-b-0">
                        <div className="flex items-center space-x-4">
                            <AlertTriangle className="w-6 h-6 text-destructive" />
                            <div>
                                <p className="font-semibold">{alert.client} (<span className="text-muted-foreground">Profile: {alert.riskProfile}</span>)</p>
                                <p className="text-sm text-destructive">{alert.issue}</p>
                                <p className="text-xs text-muted-foreground">Advisor: {alert.advisor}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Badge variant={alert.status === 'Escalated' ? 'destructive' : 'warning'}>{alert.status}</Badge>
                            <button className="text-primary hover:underline text-sm font-semibold">View Case</button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
);

const RAMonitoring = () => (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>RA Pre-Trade Clearance</CardTitle>
                <p className="text-sm text-muted-foreground">Approval queue for Research Analyst trades.</p>
            </CardHeader>
            <CardContent>
                <table className="w-full text-sm">
                    <tbody>
                        {preTradeRequests.filter(r => r.employee.includes('(RA)')).map(req => (
                            <tr key={req.id} className="border-b last:border-0">
                                <td className="py-3 font-semibold">{req.employee}</td>
                                <td className="py-3">{req.request}</td>
                                <td className="py-3">
                                    <Badge variant={req.systemCheck === 'Violation Detected' ? 'destructive' : req.systemCheck === 'Auto-Approved' ? 'success' : 'warning'}>
                                        {req.systemCheck}
                                    </Badge>
                                </td>
                                <td className="py-3 text-right">
                                    {req.status === 'Pending' ? (
                                        <div className="flex gap-2 justify-end">
                                            <button className="text-xs text-green-500 hover:underline">Approve</button>
                                            <button className="text-xs text-red-500 hover:underline">Deny</button>
                                        </div>
                                    ) : (
                                        <span className={`font-semibold text-xs ${req.status === 'Approved' ? 'text-success' : 'text-destructive'}`}>{req.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>RA Trading Blackout Violations</CardTitle>
                <p className="text-sm text-muted-foreground">Active alerts for trades violating blackout periods.</p>
            </CardHeader>
            <CardContent>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <tbody>
                            {raBlackoutAlerts.map(alert => (
                                <tr key={alert.id} className="border-b border-border hover:bg-muted/50 last:border-0">
                                    <td className="py-3">
                                        <p className="font-semibold text-destructive">{alert.violation}</p>
                                        <p className="text-xs text-muted-foreground">{alert.analyst} traded {alert.stock}</p>
                                    </td>
                                    <td className="py-3 text-right">
                                        <Badge variant='warning'>{alert.status}</Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    </div>
);

const PMOversight = () => (
    <div className="mt-6 space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Portfolio Manager Performance & Compliance</CardTitle>
                <p className="text-sm text-muted-foreground">Monitoring PMs for AUM, client reporting, and policy adherence.</p>
            </CardHeader>
            <CardContent>
                <table className="w-full text-sm text-left">
                     <thead className="text-xs text-muted-foreground uppercase bg-background">
                        <tr>
                            <th className="px-4 py-3">Portfolio Manager</th>
                            <th className="px-4 py-3">Clients</th>
                            <th className="px-4 py-3">AUM</th>
                            <th className="px-4 py-3">Open Issues</th>
                            <th className="px-4 py-3">Client Reporting Status</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pmOversightData.map(pm => (
                             <tr key={pm.id} className="border-b border-border hover:bg-muted/50">
                                <td className="px-4 py-3 font-semibold">{pm.manager}</td>
                                <td className="px-4 py-3">{pm.clients}</td>
                                <td className="px-4 py-3">{pm.aum}</td>
                                <td className="px-4 py-3"><Badge variant={pm.openIssues > 0 ? 'warning' : 'success'}>{pm.openIssues}</Badge></td>
                                <td className="px-4 py-3"><Badge variant={pm.reportingStatus === 'Delayed' ? 'destructive' : 'success'}>{pm.reportingStatus}</Badge></td>
                                <td className="px-4 py-3"><button className="text-primary hover:underline text-xs font-semibold">View Details</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
         <Card>
            <CardHeader><CardTitle>Active Portfolio Breaches (SEBI PMS Regulations)</CardTitle></CardHeader>
            <CardContent>
                 {pmPortfolioBreaches.map(breach => (
                    <div key={breach.caseId} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 border-b last:border-b-0">
                        <div className="flex items-center space-x-4">
                            <Percent className="w-6 h-6 text-destructive" />
                            <div>
                                <p className="font-semibold">{breach.client} (<span className="text-muted-foreground">PM: {breach.pm}</span>)</p>
                                <p className="text-sm text-destructive">{breach.issue}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Badge variant='destructive'>{breach.status}</Badge>
                            <button className="text-primary hover:underline text-sm font-semibold">Investigate</button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
);


export default function AdvisoryCompliancePage() {
    const [activeTab, setActiveTab] = useState('IA Suitability Review');
    
    const tabs = [
        { name: 'IA Suitability Review', icon: <UserCheck className="w-5 h-5" /> },
        { name: 'RA Monitoring', icon: <UserX className="w-5 h-5" /> },
        { name: 'PM Oversight', icon: <Landmark className="w-5 h-5" /> },
    ];

    const kpis = [
        { title: 'Suitability Mismatches', value: 2, icon: <AlertTriangle className="text-destructive" /> },
        { title: 'RA Blackout Violations', value: 2, icon: <UserX className="text-destructive" /> },
        { title: 'PM Portfolio Breaches', value: 3, icon: <Percent className="text-destructive" /> },
        { title: 'PM Reports Delayed', value: 1, icon: <FileText className="text-warning" /> },
    ];
    
    return (
        <div className="p-6 bg-background min-h-screen text-foreground">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Compliance Command Center</h1>
                    <p className="text-muted-foreground mt-1">Dedicated oversight for IA, RA, and PM activities.</p>
                </div>
                 <button className="flex items-center space-x-2 px-4 py-2 text-sm rounded-lg border bg-card hover:bg-muted">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Configure Rules</span>
                </button>
            </div>

            {/* KPI Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map(kpi => (
                    <Card key={kpi.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                            {kpi.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{kpi.value}</div>
                            <p className="text-xs text-muted-foreground">Active cases requiring attention</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <div className="mt-8">
                <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div>
                {activeTab === 'IA Suitability Review' && <IASuitabilityReview />}
                {activeTab === 'RA Monitoring' && <RAMonitoring />}
                {activeTab === 'PM Oversight' && <PMOversight />}
            </div>
        </div>
    );
}

