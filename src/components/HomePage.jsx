import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES as MOCK_CATEGORIES, getStore } from './mockData';

const FEATURED_PRODUCTS = PRODUCTS.slice(0, 4);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Unique Products from Trusted Sellers</h1>
          <p className="text-lg text-primary-100 mb-8">Shop from thousands of independent sellers — all in one checkout.</p>
          <Link to="/products" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg text-lg font-semibold inline-block">Start Shopping</Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {MOCK_CATEGORIES.map(cat => (
            <Link key={cat} to={`/products?category=${cat}`} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border">
              <div className="text-4xl mb-2">📦</div>
              <div className="font-semibold">{cat}</div>
              <div className="text-sm text-gray-500">{PRODUCTS.filter(p => p.category === cat).length.toLocaleString()} items</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map(p => (
              <Link key={p.id} to={`/products/${p.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{getStore(p.store_id)?.name || `Store #${p.store_id}`}</div>
                  <h3 className="font-semibold mb-1">{p.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-bold">${p.price.toFixed(2)}</span>
                    <span className="text-sm text-accent-500">★ {p.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div><div className="text-4xl mb-3">🔍</div><h3 className="font-semibold mb-2">Browse & Discover</h3><p className="text-gray-600 text-sm">Search thousands of products from verified sellers.</p></div>
          <div><div className="text-4xl mb-3">🛒</div><h3 className="font-semibold mb-2">One Cart, Many Sellers</h3><p className="text-gray-600 text-sm">Add items from different stores into a single cart.</p></div>
          <div><div className="text-4xl mb-3">✅</div><h3 className="font-semibold mb-2">Secure Checkout</h3><p className="text-gray-600 text-sm">Pay once — we handle splitting payments to each seller.</p></div>
        </div>
      </section>
    </div>
  );
}
