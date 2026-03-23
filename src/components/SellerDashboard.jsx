import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const mockProducts = [
  { id: 1, name: 'Handmade Ceramic Vase', price: 45.00, stock: 12, sales: 89, status: 'Active' },
  { id: 2, name: 'Artisan Leather Wallet', price: 35.00, stock: 5, sales: 124, status: 'Active' },
  { id: 3, name: 'Silver Wire Earrings', price: 28.00, stock: 0, sales: 67, status: 'Out of Stock' },
  { id: 4, name: 'Wooden Cutting Board', price: 52.00, stock: 18, sales: 43, status: 'Active' },
];

const mockChartData = [65, 78, 92, 85, 105, 120, 145];

function SellerDashboard() {
  const [counts, setCounts] = useState({ products: 0, orders: 0 });
  
  useEffect(() => {
    let frameId;
    const duration = 800;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCounts({
        products: Math.round(4 * progress),
        orders: Math.round(342 * progress)
      });
      
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };
    
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const { user } = useAuth();
  const [products, setProducts] = useState(mockProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  const stats = {
    totalSales: '$12,847',
    products: counts.products,
    orders: counts.orders,
    revenue: '$8,935',
  };


  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit product ${id}`);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.stock) {
      setProducts([...products, {
        id: products.length + 1,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        sales: 0,
        status: 'Active'
      }]);
      setNewProduct({ name: '', price: '', stock: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-8 pb-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="glow-orb w-96 h-96 bg-neon-cyan/30 rounded-full -top-48 -left-48"></div>
        <div className="glow-orb w-96 h-96 bg-purple-500/20 rounded-full bottom-0 right-0"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold gradient-text mb-2">Seller Dashboard</h1>
          <p className="text-white/60 text-lg">Welcome back, {user?.name || 'Seller'}</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="glass-card p-6 relative overflow-hidden group animate-fade-in-up delay-100">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-white/60 text-sm font-medium mb-1">Total Sales</p>
            <h3 className="text-3xl font-bold text-white">{stats.totalSales}</h3>
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm animate-fade-in-up delay-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+12.5%</span>
            </div>
          </div>

          <div className="glass-card p-6 relative overflow-hidden group animate-fade-in-up delay-200">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-white/60 text-sm font-medium mb-1">Active Products</p>
            <h3 className="text-3xl font-bold text-white">{stats.products}</h3>
            <div className="mt-4 flex items-center gap-2 text-neon-cyan text-sm animate-fade-in-up delay-300">
              <span>{products.filter(p => p.stock > 0).length} in stock</span>
            </div>
          </div>

          <div className="glass-card p-6 relative overflow-hidden group animate-fade-in-up delay-300">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-magenta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-white/60 text-sm font-medium mb-1">Total Orders</p>
            <h3 className="text-3xl font-bold text-white">{stats.orders}</h3>
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm animate-fade-in-up delay-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+8.2%</span>
            </div>
          </div>

          <div className="glass-card p-6 relative overflow-hidden group animate-fade-in-up delay-400">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-white/60 text-sm font-medium mb-1">Revenue</p>
            <h3 className="text-3xl font-bold text-white">{stats.revenue}</h3>
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm animate-fade-in-up delay-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+15.3%</span>
            </div>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="glass-card p-6 mb-10">
          <h2 className="text-xl font-bold text-white mb-6">Sales Overview (Last 7 Days)</h2>
          <div className="flex items-end justify-between gap-4 h-64">
            {mockChartData.map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-neon-purple to-neon-cyan rounded-t-lg transition-all duration-500 hover:from-neon-magenta hover:to-neon-cyan"
                  style={{ height: `${value}%` }}
                ></div>
                <span className="text-white/60 text-sm mt-3">Day {index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Management */}
        <div className="glass-card p-6 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Product Management</h2>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-gradient hover:scale-105 hover:shadow-md transition-all duration-200 btn-press"
            >
              {showAddForm ? 'Cancel' : '+ Add New Product'}
            </button>
          </div>

          {/* Add Product Form */}
          {showAddForm && (
            <form onSubmit={handleAddProduct} className="glass-card p-6 mb-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Add New Product</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="input-glass"
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="input-glass"
                />
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="input-glass"
                />
              </div>
              <button type="submit" className="mt-4 btn-gradient w-full md:w-auto">
                Add Product
              </button>
            </form>
          )}

          {/* Products Table */}
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm font-medium text-white/60 py-3 px-4">Product</th>
                    <th className="text-left text-sm font-medium text-white/60 py-3 px-4">Price</th>
                    <th className="text-left text-sm font-medium text-white/60 py-3 px-4">Stock</th>
                    <th className="text-left text-sm font-medium text-white/60 py-3 px-4">Sales</th>
                    <th className="text-left text-sm font-medium text-white/60 py-3 px-4">Status</th>
                    <th className="text-right text-sm font-medium text-white/60 py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id} className={`border-b border-white/5 hover:bg-white/10 transition-colors duration-150 animate-fade-in-up ${index % 2 === 0 ? 'delay-[80ms]' : 'delay-[160ms]'}`}>
                      <td className="py-4 px-4 text-white font-medium">{product.name}</td>
                      <td className="py-4 px-4 text-white">${product.price.toFixed(2)}</td>
                      <td className="py-4 px-4 text-white">
                        {product.stock > 0 ? (
                          <span className="text-emerald-400">{product.stock} units</span>
                        ) : (
                          <span className="text-red-400">Out of stock</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-white/80">{product.sales}</td>
                      <td className="py-4 px-4">
                        <span className={`badge ${product.status === 'Active' ? '' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(product.id)}
                            className="p-2 text-neon-cyan hover:bg-neon-cyan/10 rounded-lg transition-all duration-150 btn-press hover:shadow-sm"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-150 btn-press hover:shadow-sm"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No products yet. Add your first product!</p>
            </div>
          )}
        </div>

        {/* Seller Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Seller Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/60">Store Name</span>
                <span className="text-white font-medium">{user?.storeName || 'Your Store'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/60">Email</span>
                <span className="text-white font-medium">{user?.email || 'seller@example.com'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-white/60">Join Date</span>
                <span className="text-white font-medium">Jan 15, 2024</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5 hover:border-neon-cyan/50 group">
                <svg className="w-6 h-6 text-neon-cyan mb-2 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-white/80 group-hover:text-neon-cyan transition-colors">View Reports</span>
              </button>
              <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5 hover:border-purple-500/50 group">
                <svg className="w-6 h-6 text-purple-500 mb-2 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm text-white/80 group-hover:text-purple-500 transition-colors">Payouts</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
