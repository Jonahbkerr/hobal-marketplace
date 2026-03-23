import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const STEPS = ['Shipping', 'Payment', 'Review'];

function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = cartTotal >= 50 ? 0 : 5.99;

  if (orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">✨</div>
        <h1 className="text-3xl font-bold text-white mb-3">Order Confirmed!</h1>
        <p className="text-white/50 mb-2">Order #HOB-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
        <p className="text-white/40 mb-8">You'll receive a confirmation email shortly.</p>
        <Link to="/products" className="btn-gradient">Continue Shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Nothing to Checkout</h1>
        <Link to="/products" className="btn-gradient">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 ${i <= step ? 'text-neon-cyan' : 'text-white/30'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? 'bg-neon-cyan/20 border border-neon-cyan/40' : 'bg-white/5 border border-white/10'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-neon-cyan/40' : 'bg-white/10'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {step === 0 && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/50 mb-1">First Name</label>
                    <input type="text" className="input-glass" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-1">Last Name</label>
                    <input type="text" className="input-glass" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1">Email</label>
                  <input type="email" className="input-glass" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1">Address</label>
                  <input type="text" className="input-glass" placeholder="123 Future St" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-white/50 mb-1">City</label>
                    <input type="text" className="input-glass" placeholder="Metro City" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-1">State</label>
                    <input type="text" className="input-glass" placeholder="CA" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-1">ZIP</label>
                    <input type="text" className="input-glass" placeholder="90210" />
                  </div>
                </div>
              </div>
              <button onClick={() => setStep(1)} className="btn-gradient mt-6">Continue to Payment</button>
            </div>
          )}

          {step === 1 && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/50 mb-1">Card Number</label>
                  <input type="text" className="input-glass" placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/50 mb-1">Expiry Date</label>
                    <input type="text" className="input-glass" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-1">CVC</label>
                    <input type="text" className="input-glass" placeholder="123" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(0)} className="btn-outline">Back</button>
                <button onClick={() => setStep(2)} className="btn-gradient">Review Order</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Review Your Order</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-glass-border last:border-0">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-white/40">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-outline">Back</button>
                <button
                  onClick={() => { clearCart(); setOrderPlaced(true); }}
                  className="btn-gradient flex-1 justify-center"
                >
                  Place Order — ${(cartTotal + shipping).toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-72">
          <div className="glass-card p-5 sticky top-24">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">{items.length} items</span>
                <span className="text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Shipping</span>
                <span className="text-white">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-glass-border pt-2 flex justify-between font-semibold">
                <span className="text-white">Total</span>
                <span className="text-white">${(cartTotal + shipping).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
