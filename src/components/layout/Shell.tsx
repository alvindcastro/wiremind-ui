import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  ShieldAlert, 
  Globe, 
  Lock, 
  FileJson, 
  Hash, 
  Briefcase, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Flows', href: '/flows', icon: Activity },
  { name: 'Threats', href: '/threats', icon: ShieldAlert },
  { name: 'DNS', href: '/dns', icon: Globe },
  { name: 'TLS', href: '/tls', icon: Lock },
  { name: 'HTTP', href: '/http', icon: FileJson },
  { name: 'ICMP', href: '/icmp', icon: Hash },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Network Graph', href: '/graph', icon: Settings }, // Using Settings as placeholder
  { name: 'IOC Config', href: '/config', icon: Settings },
];

export default function Shell() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "flex flex-col border-r border-zinc-800 bg-zinc-950 transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-800">
          {isSidebarOpen && <span className="text-xl font-bold tracking-tight">Wiremind</span>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-zinc-800 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                isActive 
                  ? "bg-zinc-800 text-white" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              )}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950">
          <h1 className="text-sm font-medium text-zinc-400">Project: Default</h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-medium">
              JD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
