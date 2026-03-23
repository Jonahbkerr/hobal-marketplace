import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary-600">MarketHub</Link>
        
        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/products" className="text-gray-600 hover:text-primary-600">Browse</Link>
          {user?.role === 'seller' && <Link to="/seller" className="text-gray-600 hover:text-primary-600">Seller Dashboard</Link>}
          {user?.role === 'admin' && <Link to="/admin" className="text-gray-600 hover:text-primary-600">Admin Panel</Link>}
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg py-2">
            <Link to="/products" className="block px-4 py-2 text-gray-600 hover:text-primary-600" onClick={() => setMenuOpen(false)}>Browse</Link>
            {user?.role === 'seller' && (
              <Link to="/seller" className="block px-4 py-2 text-gray-600 hover:text-primary-600" onClick={() => setMenuOpen(false)}>Seller Dashboard</Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="block px-4 py-2 text-gray-600 hover:text-primary-600" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Link to="/cart" className="text-gray-600 hover:text-primary-600 flex items-center">🛒 Cart {cartCount > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-1.5 ml-1">{cartCount}</span>}</Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{user.name}</span>
              <button onClick={logout} className="text-sm text-red-500 hover:text-red-700">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
