import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4 opacity-30">🛒</div>
        <h1 className="text-2xl font-bold text-white mb-3">Your Cart is Empty</h1>
        <p className="text-white/40 mb-6">Discover amazing products from sellers worldwide</p>
        <Link to="/products" className="btn-gradient">Start Shopping</Link>
      </div>
    );
  }

  const shipping = cartTotal >= 50 ? 0 : 5.99;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="glass-card p-4 flex gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                    <p className="text-xs text-white/40">{item.seller}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-white/30 hover:text-neon-magenta transition-colors text-lg">×</button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center glass-card overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">−</button>
                    <span className="px-3 py-1.5 text-sm text-white font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">+</button>
                  </div>
                  <span className="text-lg font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="glass-card p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Subtotal</span>
                <span className="text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Shipping</span>
                <span className="text-white">{shipping === 0 ? <span className="text-neon-green">FREE</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-neon-cyan">Free shipping on orders over $50</p>
              )}
              <div className="border-t border-glass-border pt-3 flex justify-between">
                <span className="font-semibold text-white">Total</span>
                <span className="text-xl font-bold text-white">${(cartTotal + shipping).toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn-gradient w-full justify-center text-base py-3.5">
              Proceed to Checkout
            </Link>
            <Link to="/products" className="btn-outline w-full justify-center mt-3 text-sm">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
