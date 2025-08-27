import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import Dashboard from "./pages/Dashboard";
import CaseManager from "./pages/CaseManager";
import GraphAnalytics from "./pages/GraphAnalytics";
import RuleEngine from "./pages/RuleEngine";
import FederationConsole from "./pages/FederationConsole";
import Connectors from "./pages/Connectors";
import AuditShield from "./pages/AuditShield";
import Marketplace from "./pages/Marketplace";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/cases" element={<CaseManager />} />
                <Route path="/graph" element={<GraphAnalytics />} />
                <Route path="/rules" element={<RuleEngine />} />
                <Route path="/federation" element={<FederationConsole />} />
                <Route path="/connectors" element={<Connectors />} />
                <Route path="/audit" element={<AuditShield />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/settings" element={<SettingsPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
