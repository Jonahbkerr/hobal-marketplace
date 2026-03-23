import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password, role);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">I want to...</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="radio" value="customer" checked={role === 'customer'} onChange={e => setRole(e.target.value)} /> Shop</label>
            <label className="flex items-center gap-2 text-sm"><input type="radio" value="seller" checked={role === 'seller'} onChange={e => setRole(e.target.value)} /> Sell</label>
          </div>
        </div>
        <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">Create Account</button>
        <p className="text-sm text-center text-gray-500">Already have an account? <Link to="/login" className="text-primary-600">Sign In</Link></p>
      </form>
    </div>
  );
}
