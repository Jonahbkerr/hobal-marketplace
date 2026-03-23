import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white font-bold text-sm">
              H
            </div>
            <span className="text-xl font-bold gradient-text tracking-tight">HOBAL</span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, sellers, categories..."
                className="input-glass w-full pl-10 pr-4 py-2.5 text-sm"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            <Link to="/products" className="px-3 py-2 text-sm text-white/60 hover:text-neon-cyan transition-colors rounded-lg hover:bg-white/5">
              Explore
            </Link>
            <Link to="/cart" className="relative px-3 py-2 text-sm text-white/60 hover:text-neon-cyan transition-colors rounded-lg hover:bg-white/5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neon-magenta text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>}
            </Link>

            {/* User Menu or Sign In */}
            {user ? (
              <div className="flex items-center gap-2 ml-2">
                <span className="text-sm text-white/80 hidden sm:inline">{user.name || user.email.split('@')[0]}</span>
                {user.role === 'seller' && (
                  <Link to="/seller" className="px-3 py-1.5 text-xs bg-neon-purple/20 text-neon-purple rounded-lg hover:bg-neon-purple/30">
                    Dashboard
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin" className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                    Admin Panel
                  </Link>
                )}
                <button onClick={handleLogout} className="ml-2 btn-gradient text-sm py-1.5 px-4">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="ml-2 btn-gradient text-sm py-2 px-4">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
