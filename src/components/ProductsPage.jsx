import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ALL_PRODUCTS, CATEGORIES } from './mockData';
import { RevealOnScroll } from './useScrollReveal';

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const queryFilter = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const filtered = useMemo(() => {
    let products = [...ALL_PRODUCTS];

    if (queryFilter) {
      const q = queryFilter.toLowerCase();
      products = products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      products = products.filter((p) => p.category === selectedCategory);
    }

    products = products.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return products;
  }, [queryFilter, selectedCategory, sortBy, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {queryFilter ? `Results for "${queryFilter}"` : selectedCategory ? CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Products' : 'All Products'}
          </h1>
          <p className="text-white/40 text-sm mt-1">{filtered.length} products found</p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-glass py-2 px-4 text-sm w-auto"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="glass-card p-5 mb-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Categories</h3>
            <button
              onClick={() => setSelectedCategory('')}
              className={`block w-full text-left text-sm py-1.5 px-2 rounded-lg transition-colors ${!selectedCategory ? 'text-neon-cyan bg-neon-cyan/10' : 'text-white/50 hover:text-white/80'}`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`block w-full text-left text-sm py-1.5 px-2 rounded-lg transition-colors ${selectedCategory === cat.id ? 'text-neon-cyan bg-neon-cyan/10' : 'text-white/50 hover:text-white/80'}`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Price Range</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="input-glass text-sm py-1.5 w-20 text-center"
                placeholder="Min"
              />
              <span className="text-white/30">–</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="input-glass text-sm py-1.5 w-20 text-center"
                placeholder="Max"
              />
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-white/50 text-lg">No products found</p>
              <p className="text-white/30 text-sm mt-2">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product, index) => (
                <div key={product.id} style={{ animationDelay: `${index * 80}ms` }} className="animate-fade-in-up">
                  <Link to={`/product/${product.id}`} className="glass-card overflow-hidden group cursor-pointer card-hover">
                    <div className="relative aspect-square overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 img-zoom" />
                      {product.badge && <span className="absolute top-3 left-3 badge">{product.badge}</span>}
                      {product.originalPrice && (
                        <span className="absolute top-3 right-3 text-xs font-semibold text-neon-green bg-neon-green/10 px-2 py-1 rounded-full border border-neon-green/20 animate-badge-pop">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-white/40 mb-1">{product.seller}</p>
                      <h3 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2 group-hover:text-neon-cyan transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map((s) => <span key={s} className={s <= Math.round(product.rating) ? 'star-filled' : 'star-empty'}>★</span>)}
                        </div>
                        <span className="text-xs text-white/30">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">${product.price}</span>
                        {product.originalPrice && <span className="text-sm text-white/30 line-through">${product.originalPrice}</span>}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
