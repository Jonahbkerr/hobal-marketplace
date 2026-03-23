import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ALL_PRODUCTS } from './mockData';
import { useCart } from './CartContext';
import { RevealOnScroll } from './useScrollReveal';

function ProductDetailPage() {
  const { id } = useParams();
  const product = ALL_PRODUCTS.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [cartBounce, setCartBounce] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
        <Link to="/products" className="btn-gradient">Browse Products</Link>
      </div>
    );
  }

  const related = ALL_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
        <Link to="/" className="hover:text-neon-cyan transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-neon-cyan transition-colors">Products</Link>
        <span>/</span>
        <span className="text-white/60">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Image */}
        <RevealOnScroll>
          <div className="glass-card overflow-hidden">
            <div className="overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </RevealOnScroll>

        {/* Info */}
        <RevealOnScroll animation="animate-slide-in-right">
          <div>
          {product.badge && <span className="badge mb-3 inline-block">{product.badge}</span>}
          <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
          <p className="text-white/40 mb-4">by <span className="text-neon-cyan">{product.seller}</span></p>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map((s) => <span key={s} className={`text-lg ${s <= Math.round(product.rating) ? 'star-filled' : 'star-empty'} hover:scale-125 transition-transform duration-150`}>★</span>)}
            </div>
            <span className="text-white/50">{product.rating}</span>
            <span className="text-white/30">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl font-bold text-white">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-white/30 line-through">${product.originalPrice}</span>
                <span className="text-sm font-semibold text-neon-green bg-neon-green/10 px-2 py-1 rounded-full border border-neon-green/20">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <div className="glass-card p-5 mb-6">
            <p className="text-white/60 leading-relaxed">
              Experience cutting-edge design and premium quality with the {product.name}. Crafted by {product.seller}, this product combines innovative technology with stunning aesthetics. Perfect for those who demand the extraordinary.
            </p>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center glass-card overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-colors btn-press">−</button>
              <span className="px-4 py-3 text-white font-medium min-w-[48px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-colors btn-press">+</button>
            </div>
            <button onClick={() => { addToCart(product, quantity); setCartBounce(true); setTimeout(() => setCartBounce(false), 500); }} className={`btn-gradient flex-1 justify-center text-base py-3.5 ${cartBounce ? 'animate-cart-bounce' : ''}`}>
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </button>
          </div>

          <button className="btn-outline w-full justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Add to Wishlist
          </button>
          </div>
        </RevealOnScroll>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-1 border-b border-glass-border mb-6">
          {['description', 'reviews', 'seller'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? 'border-neon-cyan text-neon-cyan' : 'border-transparent text-white/40 hover:text-white/60'}`}
            >
              {tab === 'seller' ? 'Seller Info' : tab}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Product Description</h3>
            <p className="text-white/50 leading-relaxed mb-4">
              The {product.name} represents the pinnacle of modern design and functionality. Every detail has been meticulously crafted to deliver an unparalleled experience.
            </p>
            <ul className="space-y-2 text-white/50">
              <li className="flex items-center gap-2"><span className="text-neon-green">✓</span> Premium quality materials</li>
              <li className="flex items-center gap-2"><span className="text-neon-green">✓</span> 1-year manufacturer warranty</li>
              <li className="flex items-center gap-2"><span className="text-neon-green">✓</span> Free shipping on orders over $50</li>
              <li className="flex items-center gap-2"><span className="text-neon-green">✓</span> 30-day return policy</li>
            </ul>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {[
                { name: 'Alex M.', rating: 5, text: 'Absolutely incredible quality! Exceeded all my expectations.', date: '2 days ago' },
                { name: 'Sarah K.', rating: 4, text: 'Great product, shipping was fast. Minor packaging issue but the product itself is perfect.', date: '1 week ago' },
                { name: 'Jordan L.', rating: 5, text: 'This is my second purchase from this seller. Consistently amazing quality.', date: '2 weeks ago' },
              ].map((review, i) => (
                <div key={i} className="border-b border-glass-border pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center text-sm font-medium text-neon-purple">
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-medium text-white text-sm">{review.name}</span>
                    </div>
                    <span className="text-xs text-white/30">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[1,2,3,4,5].map((s) => <span key={s} className={`text-sm ${s <= review.rating ? 'star-filled' : 'star-empty'}`}>★</span>)}
                  </div>
                  <p className="text-sm text-white/50">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'seller' && (
          <div className="glass-card p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-xl font-bold text-white">
                {product.seller.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{product.seller}</h3>
                <p className="text-sm text-white/40">Verified Seller · Member since 2024</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-white/50">
              <span>Response time: ~2 hours</span>
              <span>Ship rate: 99%</span>
              <span>Rating: {product.rating}/5</span>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <RevealOnScroll>
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="glass-card overflow-hidden group cursor-pointer card-hover">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 img-zoom" />
                    {p.badge && <span className="absolute top-3 left-3 badge">{p.badge}</span>}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-white/40 mb-1">{p.seller}</p>
                    <h3 className="text-sm font-semibold text-white/90 mb-2 group-hover:text-neon-cyan transition-colors">{p.name}</h3>
                    <span className="text-lg font-bold text-white">${p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </RevealOnScroll>
      )}
    </div>
  );
}

export default ProductDetailPage;
