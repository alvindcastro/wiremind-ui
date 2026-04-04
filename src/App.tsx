import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Shell from './components/layout/Shell';

const queryClient = new QueryClient();

// Placeholder components for routes
const Dashboard = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
    <p className="text-zinc-400">Welcome to Wiremind dashboard.</p>
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
