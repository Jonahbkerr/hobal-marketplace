import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, FEATURED_PRODUCTS, TOP_SELLERS } from './mockData';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? 'star-filled' : 'star-empty'}>
          ★
        </span>
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="glass-card overflow-hidden group cursor-pointer">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 badge">{product.badge}</span>
        )}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 text-xs font-semibold text-neon-green bg-neon-green/10 px-2 py-1 rounded-full border border-neon-green/20">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-white/40 mb-1">{product.seller}</p>
        <h3 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2 group-hover:text-neon-cyan transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-white/30">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-white/30 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-dots">
        {/* Decorative orbs */}
        <div className="glow-orb w-96 h-96 bg-neon-purple -top-48 -left-48" />
        <div className="glow-orb w-80 h-80 bg-neon-cyan -bottom-40 right-0" />
        <div className="glow-orb w-64 h-64 bg-neon-magenta top-20 right-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              Marketplace of the Future
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 text-center">
              <span className="text-white">Discover </span>
              <span className="gradient-text">Extraordinary</span>
              <br />
              <span className="text-white">Products</span>
            </h1>
            <p className="text-lg text-white/50 max-w-xl mb-8 leading-relaxed mx-auto text-center">
              A curated multi-vendor marketplace connecting you with innovative sellers and unique products from around the world.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/products" className="btn-gradient text-base">
                Start Exploring
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/register" className="btn-outline text-base">
                Become a Seller
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-14">
              <div>
                <p className="text-3xl font-bold text-white">12k+</p>
                <p className="text-sm text-white/40">Active Sellers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">84k+</p>
                <p className="text-sm text-white/40">Products Listed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">99.2%</p>
                <p className="text-sm text-white/40">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Browse Categories</h2>
          <Link to="/products" className="text-sm text-neon-cyan hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="glass-card p-5 text-center group cursor-pointer"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <p className="text-sm font-medium text-white/80 group-hover:text-neon-cyan transition-colors">{cat.name}</p>
              <p className="text-xs text-white/30 mt-1">{cat.count.toLocaleString()} items</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Featured Products</h2>
          <Link to="/products" className="text-sm text-neon-cyan hover:underline">See All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Top Sellers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOP_SELLERS.map((seller) => (
            <div key={seller.id} className="glass-card p-6 flex flex-col items-center text-center">
              <img src={seller.avatar} alt={seller.name} className="w-16 h-16 rounded-full mb-3 border-2 border-neon-purple/30" />
              <h3 className="font-semibold text-white">{seller.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <StarRating rating={seller.rating} />
                <span className="text-xs text-white/40">{seller.rating}</span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-white/40">
                <span>{seller.products} products</span>
                <span>{seller.sales} sales</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass-card p-12 text-center relative overflow-hidden">
          <div className="glow-orb w-64 h-64 bg-neon-purple -top-32 -left-32" />
          <div className="glow-orb w-48 h-48 bg-neon-cyan -bottom-24 -right-24" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-3">Stay Ahead of the Curve</h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">Get notified about trending products, exclusive deals, and new sellers joining the marketplace.</p>
            <div className="flex max-w-md mx-auto gap-3">
              <input type="email" placeholder="Enter your email" className="input-glass flex-1" />
              <button className="btn-gradient whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-glass-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Marketplace</h4>
              <div className="flex flex-col gap-2">
                <Link to="/products" className="text-sm text-white/40 hover:text-neon-cyan transition-colors">Browse Products</Link>
                <Link to="/products" className="text-sm text-white/40 hover:text-neon-cyan transition-colors">Categories</Link>
                <Link to="/products" className="text-sm text-white/40 hover:text-neon-cyan transition-colors">Top Sellers</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">For Sellers</h4>
              <div className="flex flex-col gap-2">
                <Link to="/register" className="text-sm text-white/40 hover:text-neon-cyan transition-colors">Start Selling</Link>
                <Link to="/seller" className="text-sm text-white/40 hover:text-neon-cyan transition-colors">Seller Dashboard</Link>
                <Link to="/" className="text-sm text-white/40 hover:text-neon-cyan transition-colors">Seller Guide</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-sm text-white/40 hover:text-neon-cyan transition-colors">Help Center</Link>
                <Link to="/" className="text-sm text-white/40 hover:text-neon-cyan transition-colors">Contact Us</Link>
                <Link to="/" className="text-sm text-white/40 hover:text-neon-cyan transition-colors">Disputes</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-sm text-white/40 hover:text-neon-cyan transition-colors">About</Link>
                <Link to="/" className="text-sm text-white/40 hover:text-neon-cyan transition-colors">Privacy Policy</Link>
                <Link to="/" className="text-sm text-white/40 hover:text-neon-cyan transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-glass-border flex items-center justify-between">
            <p className="text-sm text-white/30">© 2026 HOBAL Marketplace. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/20">Powered by</span>
              <span className="text-xs font-semibold gradient-text">HOBAL</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;
