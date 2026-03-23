import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, role);
    navigate(role === 'seller' ? '/seller' : '/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="glow-orb w-72 h-72 bg-neon-magenta -top-10 right-0 blur-3xl opacity-50" />
      <div className="glow-orb w-56 h-56 bg-neon-purple bottom-10 -left-10 blur-3xl opacity-50" />

      <div className="glass-card p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Join HOBAL</h1>
          <p className="text-white/40 text-sm">Create your marketplace account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/50 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-glass w-full"
              placeholder="John Doe"
              required
            />
          </div>
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
            <label className="block text-sm text-white/50 mb-1">I want to</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-glass w-full"
            >
              <option value="customer">Shop (Customer)</option>
              <option value="seller">Sell (Seller)</option>
            </select>
          </div>
          <button type="submit" className="btn-gradient w-full justify-center py-3 rounded-lg font-medium">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-white/40 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-neon-cyan hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
