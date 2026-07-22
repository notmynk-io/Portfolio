import React, { useState } from 'react';
import { LayoutDashboard, Users, ShoppingCart, Key, Database, ArrowUpRight, Search, CheckCircle } from 'lucide-react';

export const DashboardSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'database'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const usersList = [
    { id: 1, name: 'Apex Logistics Inc.', email: 'admin@apexlogistics.com', status: 'Active', plan: 'Enterprise Pro', date: '2023-11-12' },
    { id: 2, name: 'Sinha Retail Portal', email: 'contact@sinharetail.in', status: 'Active', plan: 'Custom E-Commerce', date: '2023-09-04' },
    { id: 3, name: 'Atal Tech Lab Portal', email: 'lab@ataltinkering.org', status: 'Active', plan: 'Non-Profit Web', date: '2023-04-18' },
    { id: 4, name: 'Gupta Medical Clinic', email: 'info@guptamed.com', status: 'Pending', plan: 'Business Starter', date: '2023-01-20' },
  ];

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              Freelance Client Portal & Admin Dashboard Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulates dynamic admin dashboards, role-based auth, and MySQL database management created for freelance clients.
          </p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'overview' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'users' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Clients & Roles
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'database' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            MySQL Inspector
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Total Client Deployments</div>
              <div className="text-2xl font-bold font-mono text-white">12 Websites</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                <ArrowUpRight className="w-3.5 h-3.5" /> 100% Uptime Guaranteed
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Database Query Latency</div>
              <div className="text-2xl font-bold font-mono text-cyan-400">4.2 ms avg</div>
              <div className="text-[11px] text-slate-400 font-mono">MySQL Index Optimized</div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Security Audit Score</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">98 / 100</div>
              <div className="text-[11px] text-emerald-400 font-mono">Bcrypt + CSRF Safe</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-xs">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search client records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <span className="text-xs font-mono text-slate-400">Showing {filteredUsers.length} Clients</span>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Client Name</th>
                  <th className="p-2.5">Contact Email</th>
                  <th className="p-2.5">Portal Type</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-white">{u.name}</td>
                    <td className="p-2.5 text-slate-400">{u.email}</td>
                    <td className="p-2.5 text-cyan-300">{u.plan}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'database' && (
        <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-300 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2 text-cyan-400 font-bold">
              <Database className="w-4 h-4" /> phpMyAdmin / MySQL Database Inspection
            </span>
            <span className="text-emerald-400 text-[11px]">Database: client_portal_prod</span>
          </div>

          <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-2">
            <div className="text-slate-400 text-[11px]">Executing Prepared Statement:</div>
            <pre className="text-cyan-300 bg-slate-900 p-2 rounded text-[11px] overflow-x-auto">
              <code>SELECT id, username, email, role, created_at FROM users WHERE active = 1 ORDER BY id DESC LIMIT 10;</code>
            </pre>
            <div className="text-[10px] text-slate-500 flex items-center justify-between">
              <span>Query Time: 0.0014 sec</span>
              <span className="text-emerald-400">Indexed Primary Key Match</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
