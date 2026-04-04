import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Shell from './components/layout/Shell';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './components/ui/DataTable';

const queryClient = new QueryClient();

// Sample data for testing DataTable
interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}

const columns: ColumnDef<LogEntry>[] = [
  { accessorKey: 'timestamp', header: 'Timestamp' },
  { accessorKey: 'level', header: 'Level' },
  { accessorKey: 'message', header: 'Message' },
];

const data: LogEntry[] = [
  { id: '1', timestamp: '2026-04-04 13:40:01', level: 'info', message: 'System initialized' },
  { id: '2', timestamp: '2026-04-04 13:45:22', level: 'warn', message: 'High memory usage' },
  { id: '3', timestamp: '2026-04-04 13:50:10', level: 'error', message: 'Failed to connect to backend' },
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
            <Route path="flows" element={<Placeholder title="Flows" />} />
            <Route path="threats" element={<Placeholder title="Threats" />} />
            <Route path="dns" element={<Placeholder title="DNS" />} />
            <Route path="tls" element={<Placeholder title="TLS" />} />
            <Route path="http" element={<Placeholder title="HTTP" />} />
            <Route path="icmp" element={<Placeholder title="ICMP" />} />
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
