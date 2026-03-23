import { useState } from 'react';
import { useAuth } from './AuthContext';
import { PRODUCTS, getStore } from './mockData';

const TABS = ['overview', 'products', 'orders', 'analytics'];

export default function SellerDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState('overview');
  const [products, setProducts] = useState(PRODUCTS.filter(p => p.store_id === 1));
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  if (!user || user.role !== 'seller') {
    return <div className="text-center py-16 text-gray-400">Access denied. Seller account required.</div>;
  }

  const totalRevenue = products.reduce((s, p) => s + p.price * (p.review_count || 10), 0);
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock < 10).length;

  const saveProduct = (formData) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
    } else {
      setProducts(prev => [...prev, { ...formData, id: Date.now(), store_id: 1, rating: 0, review_count: 0 }]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
      <div className="flex gap-2 mb-6 border-b">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium capitalize ${tab === t ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}>{t}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Products" value={products.length} icon="📦" />
          <StatCard label="Total Stock" value={totalStock} icon="🏷️" />
          <StatCard label="Low Stock" value={lowStockCount} icon="⚠️" color="red" />
          <StatCard label="Est. Revenue" value={`$${totalRevenue.toFixed(0)}`} icon="💰" />
        </div>
      )}

      {tab === 'products' && (
        <div>
          <button onClick={() => { setEditingProduct(null); setShowForm(true); }} className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm mb-4 hover:bg-primary-700">+ Add Product</button>
          {showForm && <ProductForm product={editingProduct} onSave={saveProduct} onCancel={() => { setShowForm(false); setEditingProduct(null); }} />}
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="text-left p-3">Product</th><th className="text-left p-3">Price</th><th className="text-left p-3">Stock</th><th className="text-left p-3">Rating</th><th className="p-3">Actions</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3 font-medium">{p.title}</td>
                    <td className="p-3">${p.price.toFixed(2)}</td>
                    <td className="p-3"><span className={p.stock < 10 ? 'text-red-500 font-semibold' : ''}>{p.stock}</span></td>
                    <td className="p-3">★ {p.rating}</td>
                    <td className="p-3 text-center">
                      <button onClick={() => { setEditingProduct(p); setShowForm(true); }} className="text-primary-600 hover:underline text-xs mr-2">Edit</button>
                      <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:underline text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="bg-white rounded-xl border p-6 text-center text-gray-400">
          <div className="text-4xl mb-2">📋</div>
          <p>Order management will show incoming orders grouped by status.</p>
          <p className="text-xs mt-2">Pending → Processing → Shipped → Delivered</p>
        </div>
      )}

      {tab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-semibold mb-3">Top Products by Reviews</h3>
            {products.sort((a, b) => b.review_count - a.review_count).slice(0, 5).map(p => (
              <div key={p.id} className="flex justify-between py-2 text-sm border-b last:border-0">
                <span>{p.title}</span>
                <span className="text-gray-500">{p.review_count} reviews</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-semibold mb-3">Revenue Split</h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between"><span>Gross Revenue</span><span className="font-semibold">${totalRevenue.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-500"><span>Platform Commission (10%)</span><span>-${(totalRevenue * 0.10).toFixed(2)}</span></div>
              <hr />
              <div className="flex justify-between font-bold"><span>Your Earnings</span><span className="text-green-600">${(totalRevenue * 0.90).toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="text-2xl mb-1">{icon}</div>
      <div className={`text-2xl font-bold ${color === 'red' ? 'text-red-500' : ''}`}>{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function ProductForm({ product, onSave, onCancel }) {
  const [title, setTitle] = useState(product?.title || '');
  const [price, setPrice] = useState(product?.price || '');
  const [stock, setStock] = useState(product?.stock || '');
  const [category, setCategory] = useState(product?.category || 'Electronics');
  const [description, setDescription] = useState(product?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, price: Number(price), stock: Number(stock), category, description, image: product?.image || 'https://picsum.photos/seed/' + Date.now() + '/600/400' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50 p-4 rounded-xl mb-4 space-y-3">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Product title" className="w-full border rounded-lg px-3 py-2 text-sm" required />
      <div className="grid grid-cols-3 gap-3">
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" step="0.01" className="border rounded-lg px-3 py-2 text-sm" required />
        <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="Stock" className="border rounded-lg px-3 py-2 text-sm" required />
        <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
          <option>Electronics</option><option>Fashion</option><option>Home & Garden</option><option>Handmade</option>
        </select>
      </div>
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" rows="2" className="w-full border rounded-lg px-3 py-2 text-sm" />
      <div className="flex gap-2">
        <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm">{product ? 'Update' : 'Create'} Product</button>
        <button type="button" onClick={onCancel} className="text-gray-500 text-sm">Cancel</button>
      </div>
    </form>
  );
}
