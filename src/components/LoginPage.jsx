import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, role);
    navigate(role === 'seller' ? '/seller' : role === 'admin' ? '/admin' : '/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="glow-orb w-80 h-80 bg-neon-purple -top-20 -left-20 blur-3xl opacity-50" />
      <div className="glow-orb w-64 h-64 bg-neon-cyan bottom-0 right-10 blur-3xl opacity-50" />

      <div className="glass-card p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/40 text-sm">Sign in to your HOBAL account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/50 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass w-full"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glass w-full"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1">Sign in as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-glass w-full"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-gradient w-full justify-center py-3 rounded-lg font-medium">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-white/40 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-neon-cyan hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
