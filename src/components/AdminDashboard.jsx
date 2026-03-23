import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';


const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'Active' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@shop.com', role: 'seller', status: 'Active' },
  { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'customer', status: 'Banned' },
  { id: 4, name: 'Emma Brown', email: 'emma@store.com', role: 'seller', status: 'Active' },
];

const mockOrders = [
  { id: '#ORD-001', customer: 'John Doe', total: '$125.50', seller: 'Sarah Smith', status: 'Completed', date: '2024-01-20' },
  { id: '#ORD-002', customer: 'Alice Chen', total: '$89.00', seller: 'Emma Brown', status: 'Processing', date: '2024-01-19' },
  { id: '#ORD-003', customer: 'Bob Taylor', total: '$256.75', seller: 'Sarah Smith', status: 'Pending', date: '2024-01-18' },
];

const mockDisputes = [
  { id: 1, order: '#ORD-003', buyer: 'Bob Taylor', seller: 'Sarah Smith', issue: 'Item not received', status: 'Open', date: '2024-01-20' },
  { id: 2, order: '#ORD-987', buyer: 'Alice Chen', seller: 'Emma Brown', issue: 'Damaged product', status: 'Resolved', date: '2024-01-15' },
];

function AdminDashboard() {
  const [counts, setCounts] = useState({ users: 0, sellers: 0 });
  
  useEffect(() => {
    let frameId;
    const duration = 800;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCounts({
        users: Math.round(2847 * progress),
        sellers: Math.round(342 * progress)
      });
      
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };
    
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const { user } = useAuth();
  const [commissionRate, setCommissionRate] = useState(15);
  const [users, setUsers] = useState(mockUsers);

  const stats = {
    totalUsers: counts.users,
    sellers: counts.sellers,
    revenue: '$45,672',
    disputes: 23,
  };


  const handleBanUser = (userId) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: 'Banned' } : u
    ));
  };

  const handleUnbanUser = (userId) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: 'Active' } : u
    ));
  };

  const handleResolveDispute = (disputeId) => {
    alert(`Resolved dispute ${disputeId}`);
  };

  return (
    <div className="min-h-screen bg-surface pt-8 pb-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="glow-orb w-96 h-96 bg-red-500/30 rounded-full -top-48 -left-48"></div>
        <div className="glow-orb w-96 h-96 bg-neon-cyan/20 rounded-full bottom-0 right-0"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
          <p className="text-white/60 text-lg">Platform oversight and management</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="glass-card p-6 relative overflow-hidden group animate-fade-in-up delay-100">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-white/60 text-sm font-medium mb-1">Total Users</p>
            <h3 className="text-3xl font-bold text-white">{stats.totalUsers}</h3>
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm animate-fade-in-up delay-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+23 this week</span>
            </div>
          </div>

          <div className="glass-card p-6 relative overflow-hidden group animate-fade-in-up delay-200">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-white/60 text-sm font-medium mb-1">Active Sellers</p>
            <h3 className="text-3xl font-bold text-white">{stats.sellers}</h3>
            <div className="mt-4 flex items-center gap-2 text-neon-cyan text-sm animate-fade-in-up delay-300">
              <span>+5 new sellers</span>
            </div>
          </div>

          <div className="glass-card p-6 relative overflow-hidden group animate-fade-in-up delay-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-white/60 text-sm font-medium mb-1">Platform Revenue</p>
            <h3 className="text-3xl font-bold text-white">{stats.revenue}</h3>
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm animate-fade-in-up delay-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+18.5%</span>
            </div>
          </div>

          <div className="glass-card p-6 relative overflow-hidden group animate-fade-in-up delay-400">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-white/60 text-sm font-medium mb-1">Open Disputes</p>
            <h3 className={`text-3xl font-bold ${stats.disputes > 0 ? 'text-red-400 animate-badge-pop' : 'text-white'}`}>{stats.disputes}</h3>
            <div className="mt-4 flex items-center gap-2 text-yellow-400 text-sm animate-fade-in-up delay-500">
              <span className={`w-2 h-2 rounded-full ${stats.disputes > 0 ? 'bg-yellow-400 animate-pulse' : 'bg-gray-400'}`}></span>
              Requires attention
            </div>
          </div>
        </div>

        {/* Commission Settings */}
        <div className="glass-card p-6 mb-10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-neon-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Platform Commission Settings
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex-1 max-w-md">
              <label className="block text-white/60 text-sm mb-2">Commission Rate (%)</label>
              <input
                type="number"
                value={commissionRate}
                onChange={(e) => setCommissionRate(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                className="input-glass w-full"
              />
            </div>
            <button 
              onClick={() => alert(`Commission rate updated to ${commissionRate}%`)}
              className="btn-gradient whitespace-nowrap"
            >
              Save Settings
            </button>
          </div>
          <p className="text-white/50 text-sm mt-4">
            This is the percentage of each sale that goes to the platform. Sellers receive the remaining amount.
          </p>
        </div>

        {/* User Management */}
        <div className="glass-card p-6 mb-10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            User Management
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-sm font-medium text-white/60 py-3 px-4">User</th>
                  <th className="text-left text-sm font-medium text-white/60 py-3 px-4">Role</th>
                  <th className="text-left text-sm font-medium text-white/60 py-3 px-4">Status</th>
                  <th className="text-right text-sm font-medium text-white/60 py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className={`border-b border-white/5 hover:bg-white/10 transition-colors duration-100 animate-fade-in-up ${index % 2 === 0 ? 'delay-[80ms]' : 'delay-[160ms]'}`}>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-white/60 text-sm">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge ${user.role === 'seller' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : user.role === 'admin' ? 'bg-red-500/20 text-red-400 border-red-500/30' : ''}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge ${user.status === 'Active' ? '' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        {user.status === 'Active' ? (
                          <button 
                            onClick={() => handleBanUser(user.id)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-150 btn-press hover:shadow-sm"
                            title="Ban user"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleUnbanUser(user.id)}
                            className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all duration-150 btn-press hover:shadow-sm"
                            title="Unban user"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders & Disputes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Recent Orders
            </h2>
            <div className="space-y-3">
              {mockOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5">
                  <div>
                    <p className="text-white font-medium">{order.id}</p>
                    <p className="text-white/60 text-sm">{order.customer} • {order.seller}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-semibold">{order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disputes */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Disputes & Issues
            </h2>
            <div className="space-y-3">
              {mockDisputes.map((dispute) => (
                <div key={dispute.id} className={`p-4 rounded-xl border ${
                  dispute.status === 'Open' ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className={`font-medium ${dispute.status === 'Open' ? 'text-red-400' : 'text-emerald-400'}`}>
                        {dispute.issue}
                      </p>
                      <p className="text-white/60 text-sm">{dispute.order}</p>
                    </div>
                    {dispute.status === 'Open' && (
                      <span className="animate-pulse w-2 h-2 bg-red-400 rounded-full"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{dispute.buyer} vs {dispute.seller}</span>
                    <button 
                      onClick={() => handleResolveDispute(dispute.id)}
                      disabled={dispute.status === 'Resolved'}
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        dispute.status === 'Open' 
                          ? 'bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30' 
                          : 'bg-emerald-500/20 text-emerald-400 cursor-default'
                      }`}
                    >
                      {dispute.status === 'Open' ? 'Resolve' : dispute.status}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="glass-card p-6 mt-10">
          <h3 className="text-lg font-semibold text-white mb-4">Admin Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-white/60 text-sm">Administrator</p>
              <p className="text-white font-medium">{user?.name || 'Platform Admin'}</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/60 text-sm">Email</p>
              <p className="text-white font-medium">{user?.email || 'admin@hobal.com'}</p>
            </div>
            <div className="flex items-end">
              <button className="btn-outline ml-auto">
                View Audit Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
