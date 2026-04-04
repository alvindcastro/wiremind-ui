import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Shell from './components/layout/Shell';
import FlowsPage from './pages/flows/FlowsPage';
import ThreatsPage from './pages/threats/ThreatsPage';
import DNSPage from './pages/dns/DNSPage';
import TLSPage from './pages/tls/TLSPage';
import HTTPPage from './pages/http/HTTPPage';
import ICMPPage from './pages/icmp/ICMPPage';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './components/ui/DataTable';
import { ThreatBadge } from './components/ui/ThreatBadge';

const queryClient = new QueryClient();

// Sample data for testing DataTable
interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  threat_score: number;
}

const columns: ColumnDef<LogEntry>[] = [
  { accessorKey: 'timestamp', header: 'Timestamp' },
  { accessorKey: 'level', header: 'Level' },
  { 
    accessorKey: 'threat_score', 
    header: 'Threat Score',
    cell: ({ getValue }) => <ThreatBadge score={getValue<number>()} />
  },
  { accessorKey: 'message', header: 'Message' },
];

const data: LogEntry[] = [
  { id: '1', timestamp: '2026-04-04 13:40:01', level: 'info', message: 'System initialized', threat_score: 0 },
  { id: '2', timestamp: '2026-04-04 13:45:22', level: 'warn', message: 'High memory usage', threat_score: 5 },
  { id: '3', timestamp: '2026-04-04 13:50:10', level: 'error', message: 'Failed to connect to backend', threat_score: 9 },
];

// Placeholder components for routes
const Dashboard = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
    <p className="text-zinc-400 mb-6">Welcome to Wiremind dashboard.</p>
    <div className="max-w-4xl">
      <h3 className="text-lg font-semibold mb-2">Recent System Logs (DataTable Demo)</h3>
      <DataTable columns={columns} data={data} />
    </div>
  </div>
);

const Placeholder = ({ title }: { title: string }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-zinc-400">Content for {title} page is coming soon.</p>
  </div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shell />}>
            <Route index element={<Dashboard />} />
            <Route path="flows" element={<FlowsPage />} />
            <Route path="threats" element={<ThreatsPage />} />
            <Route path="dns" element={<DNSPage />} />
            <Route path="tls" element={<TLSPage />} />
            <Route path="http" element={<HTTPPage />} />
            <Route path="icmp" element={<ICMPPage />} />
            <Route path="jobs" element={<Placeholder title="Jobs" />} />
            <Route path="graph" element={<Placeholder title="Network Graph" />} />
            <Route path="config" element={<Placeholder title="IOC Config" />} />
            <Route path="*" element={<Placeholder title="404 Not Found" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
