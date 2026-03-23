import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { getStore } from './mockData';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Browse our marketplace and find something you love!</p>
        <Link to="/products" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">Browse Products</Link>
      </div>
    );
  }

  // Group items by store
  const grouped = {};
  items.forEach(item => {
    const store = getStore(item.product.store_id);
    const key = store?.id || 0;
    if (!grouped[key]) grouped[key] = { store, items: [] };
    grouped[key].items.push(item);
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({items.length} items)</h1>
      <div className="space-y-6">
        {Object.values(grouped).map(group => (
          <div key={group.store?.id} className="bg-white rounded-xl border p-4">
            <div className="text-sm font-semibold text-gray-500 mb-3 pb-2 border-b">📦 Ships from: {group.store?.name}</div>
            {group.items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 py-3">
                <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <Link to={`/products/${product.id}`} className="font-semibold hover:text-primary-600">{product.title}</Link>
                  <div className="text-primary-600 font-bold">${product.price.toFixed(2)}</div>
                </div>
                <select value={quantity} onChange={e => updateQuantity(product.id, Number(e.target.value))} className="border rounded px-2 py-1 text-sm">
                  {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                </select>
                <div className="w-20 text-right font-semibold">${(product.price * quantity).toFixed(2)}</div>
                <button onClick={() => removeFromCart(product.id)} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-6 bg-white rounded-xl border p-4 flex items-center justify-between">
        <div className="text-lg font-bold">Total: ${cartTotal.toFixed(2)}</div>
        <Link to="/checkout" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700">Proceed to Checkout</Link>
      </div>
    </div>
  );
}
