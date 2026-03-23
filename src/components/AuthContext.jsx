import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = [
  { id: 1, email: 'customer@test.com', password: 'pass', name: 'Jane Customer', role: 'customer' },
  { id: 2, email: 'seller@test.com', password: 'pass', name: 'Bob Seller', role: 'seller' },
  { id: 3, email: 'admin@test.com', password: 'pass', name: 'Admin User', role: 'admin' }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) { setUser(found); return { success: true }; }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => setUser(null);
  const register = (name, email, password, role) => {
    const newUser = { id: Date.now(), email, password, name, role: role || 'customer' };
    MOCK_USERS.push(newUser);
    setUser(newUser);
    return { success: true };
  };

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
