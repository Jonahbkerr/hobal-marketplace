import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, getStore } from './mockData';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter(p => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (category && p.category !== category) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, category, sortBy, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-4 rounded-xl border space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sort By</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Price: ${priceRange[1]}</label>
              <input type="range" min="0" max="500" value={priceRange[1]} onChange={e => setPriceRange([0, Number(e.target.value)])} className="w-full" />
            </div>
            {(search || category) && (
              <button onClick={() => { setSearch(''); setCategory(''); }} className="text-sm text-primary-600 hover:underline">Clear Filters</button>
            )}
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-4">{filtered.length} products found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => {
              const store = getStore(p.store_id);
              return (
                <Link key={p.id} to={`/products/${p.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border">
                  <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1">{store?.name}</div>
                    <h3 className="font-semibold mb-1 line-clamp-1">{p.title}</h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{p.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-bold">${p.price.toFixed(2)}</span>
                      <span className="text-sm text-accent-500">★ {p.rating} ({p.review_count})</span>
                    </div>
                    {p.stock < 10 && <div className="text-xs text-red-500 mt-1">Only {p.stock} left!</div>}
                  </div>
                </Link>
              );
            })}
          </div>
          {filtered.length === 0 && <div className="text-center py-16 text-gray-400">No products match your filters.</div>}
        </div>
      </div>
    </div>
  );
}
