import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { getStore } from './mockData';

const COMMISSION_RATE = 0.10;

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }
  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  const commission = cartTotal * COMMISSION_RATE;
  const grouped = {};
  items.forEach(item => {
    const store = getStore(item.product.store_id);
    const key = store?.id || 0;
    if (!grouped[key]) grouped[key] = { store, items: [], subtotal: 0 };
    grouped[key].items.push(item);
    grouped[key].subtotal += item.product.price * item.quantity;
  });

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-2">Order #MH-{Date.now().toString().slice(-6)}</p>
        <p className="text-sm text-gray-400 mb-6">Payment has been split automatically to each seller via Stripe Connect.</p>
        <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-700 mb-6">
          <strong>Payment Breakdown:</strong>
          {Object.values(grouped).map(g => (
            <div key={g.store?.id}>{g.store?.name}: ${(g.subtotal * (1 - COMMISSION_RATE)).toFixed(2)} | Platform fee: ${(g.subtotal * COMMISSION_RATE).toFixed(2)}</div>
          ))}
        </div>
        <button onClick={() => navigate('/')} className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl border">
            <h2 className="font-semibold mb-3">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="First Name" className="border rounded-lg px-3 py-2 text-sm" defaultValue={user.name.split(' ')[0]} />
              <input placeholder="Last Name" className="border rounded-lg px-3 py-2 text-sm" defaultValue={user.name.split(' ')[1]} />
              <input placeholder="Street Address" className="border rounded-lg px-3 py-2 text-sm col-span-2" />
              <input placeholder="City" className="border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="ZIP Code" className="border rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border">
            <h2 className="font-semibold mb-3">Payment (Stripe Connect)</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 text-center">
              💳 Stripe payment form would appear here in production.
              <br />Click "Place Order" to simulate.
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border h-fit">
          <h2 className="font-semibold mb-3">Order Summary</h2>
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex justify-between text-sm py-1">
              <span className="text-gray-600">{product.title} × {quantity}</span>
              <span>${(product.price * quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr className="my-3" />
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm text-gray-400"><span>Platform fee ({COMMISSION_RATE * 100}%)</span><span>${commission.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold mt-2"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
          <button onClick={handlePlaceOrder} className="w-full mt-4 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700">Place Order</button>
        </div>
      </div>
    </div>
  );
}
