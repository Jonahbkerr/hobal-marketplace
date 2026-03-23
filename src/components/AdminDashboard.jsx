import { useState } from 'react';
import { useAuth } from './AuthContext';

const MOCK_USERS_LIST = [
  { id: 1, name: 'Jane Customer', email: 'customer@test.com', role: 'customer', status: 'active', joined: '2026-01-15' },
  { id: 2, name: 'Bob Seller', email: 'seller@test.com', role: 'seller', status: 'active', joined: '2026-02-01', store: 'TechGear' },
  { id: 4, name: 'Sarah Artisan', email: 'sarah@test.com', role: 'seller', status: 'active', joined: '2026-01-20', store: 'ArtisanCraft' },
  { id: 5, name: 'Tom Green', email: 'tom@test.com', role: 'seller', status: 'suspended', joined: '2026-03-01', store: 'EcoWear' }
];

const MOCK_DISPUTES = [
  { id: 1, order_id: 'MH-001', customer: 'Jane Customer', seller: 'TechGear', reason: 'Item not as described', status: 'open', amount: 79.99, created: '2026-03-20' },
  { id: 2, order_id: 'MH-002', customer: 'Mike R.', seller: 'EcoWear', reason: 'Never received item', status: 'investigating', amount: 29.99, created: '2026-03-18' }
];

const TABS = ['overview', 'users', 'disputes', 'settings'];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState('overview');
  const [commissionRate, setCommissionRate] = useState(10);
  const [users, setUsers] = useState(MOCK_USERS_LIST);
  const [disputes, setDisputes] = useState(MOCK_DISPUTES);

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-16 text-gray-400">Access denied. Admin account required.</div>;
  }

  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
  };

  const resolveDispute = (id, resolution) => {
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: resolution } : d));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <div className="flex gap-2 mb-6 border-b">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium capitalize ${tab === t ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}>{t}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border p-4"><div className="text-2xl mb-1">👥</div><div className="text-2xl font-bold">{users.length}</div><div className="text-sm text-gray-500">Total Users</div></div>
          <div className="bg-white rounded-xl border p-4"><div className="text-2xl mb-1">🏪</div><div className="text-2xl font-bold">{users.filter(u => u.role === 'seller').length}</div><div className="text-sm text-gray-500">Active Sellers</div></div>
          <div className="bg-white rounded-xl border p-4"><div className="text-2xl mb-1">⚠️</div><div className="text-2xl font-bold text-red-500">{disputes.filter(d => d.status === 'open').length}</div><div className="text-sm text-gray-500">Open Disputes</div></div>
          <div className="bg-white rounded-xl border p-4"><div className="text-2xl mb-1">💰</div><div className="text-2xl font-bold">{commissionRate}%</div><div className="text-sm text-gray-500">Commission Rate</div></div>
        </div>
      )}

      {tab === 'users' && (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr><th className="text-left p-3">User</th><th className="text-left p-3">Role</th><th className="text-left p-3">Store</th><th className="text-left p-3">Status</th><th className="text-left p-3">Joined</th><th className="p-3">Actions</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="p-3"><div className="font-medium">{u.name}</div><div className="text-xs text-gray-400">{u.email}</div></td>
                  <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${u.role === 'seller' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{u.role}</span></td>
                  <td className="p-3 text-gray-500">{u.store || '—'}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{u.status}</span></td>
                  <td className="p-3 text-gray-500">{u.joined}</td>
                  <td className="p-3 text-center">
                    <button onClick={() => toggleUserStatus(u.id)} className={`text-xs ${u.status === 'active' ? 'text-red-500' : 'text-green-500'} hover:underline`}>
                      {u.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'disputes' && (
        <div className="space-y-4">
          {disputes.map(d => (
            <div key={d.id} className="bg-white rounded-xl border p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-semibold">Order #{d.order_id}</span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${d.status === 'open' ? 'bg-red-100 text-red-700' : d.status === 'investigating' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{d.status}</span>
                </div>
                <span className="text-sm text-gray-400">{d.created}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2"><strong>{d.customer}</strong> vs <strong>{d.seller}</strong> — {d.reason}</p>
              <p className="text-sm font-semibold mb-3">Amount: ${d.amount.toFixed(2)}</p>
              {d.status !== 'resolved' && (
                <div className="flex gap-2">
                  <button onClick={() => resolveDispute(d.id, 'resolved')} className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">Resolve — Refund Customer</button>
                  <button onClick={() => resolveDispute(d.id, 'resolved')} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-300">Resolve — Side with Seller</button>
                  {d.status === 'open' && <button onClick={() => resolveDispute(d.id, 'investigating')} className="text-yellow-600 text-xs hover:underline">Mark Investigating</button>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'settings' && (
        <div className="max-w-lg bg-white rounded-xl border p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Platform Commission Rate</h3>
            <div className="flex items-center gap-4">
              <input type="range" min="1" max="30" value={commissionRate} onChange={e => setCommissionRate(Number(e.target.value))} className="flex-1" />
              <span className="text-lg font-bold w-16 text-right">{commissionRate}%</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Applied to all transactions via Stripe Connect</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Seller Verification</h3>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Require ID verification for new sellers</label>
            <label className="flex items-center gap-2 text-sm mt-1"><input type="checkbox" defaultChecked /> Require bank account linking via Stripe</label>
          </div>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700">Save Settings</button>
        </div>
      )}
    </div>
  );
}
