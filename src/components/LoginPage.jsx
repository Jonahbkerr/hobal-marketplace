import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) navigate('/');
    else setError(result.error);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">Sign In</button>
        <p className="text-sm text-center text-gray-500">Don't have an account? <Link to="/register" className="text-primary-600">Register</Link></p>
      </form>
      <div className="mt-4 bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
        <strong>Test accounts:</strong><br />
        customer@test.com / pass<br />
        seller@test.com / pass<br />
        admin@test.com / pass
      </div>
    </div>
  );
}
