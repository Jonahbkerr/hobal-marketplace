import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { PRODUCTS, REVIEWS, getStore } from './mockData';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const { user } = useAuth();

  if (!product) return <div className="text-center py-16 text-gray-400">Product not found.</div>;

  const store = getStore(product.store_id);
  const [reviews, setReviews] = useState(REVIEWS.filter(r => r.product_id === product.id));
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/products" className="text-sm text-primary-600 hover:underline mb-4 inline-block">← Back to Products</Link>
      <div className="grid md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.title} className="w-full rounded-xl shadow-sm" />
        <div>
          <div className="text-sm text-gray-500 mb-1">Sold by <Link to={`/store/${store?.id}`} className="text-primary-600 hover:underline">{store?.name}</Link></div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-accent-500 font-semibold">★ {product.rating}</span>
            <span className="text-sm text-gray-400">({product.review_count} reviews)</span>
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="text-3xl font-bold text-primary-600 mb-4">${product.price.toFixed(2)}</div>
          <div className="text-sm text-gray-500 mb-4">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</div>
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium">Qty:</label>
            <select value={qty} onChange={e => setQty(Number(e.target.value))} className="border rounded-lg px-3 py-2">
              {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <button onClick={() => {
            addToCart(product, qty);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
          }} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50" disabled={product.stock === 0}>
            {addedToCart ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        {reviews.length === 0 && <p className="text-gray-400">No reviews yet.</p>}
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.id} className="bg-white p-4 rounded-xl border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">{r.user_name}</span>
                <span className="text-sm text-gray-400">{r.created_at}</span>
              </div>
              <div className="text-accent-500 text-sm mb-1">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              <p className="text-gray-600 text-sm">{r.comment}</p>
            </div>
          ))}
        </div>

        {/* Review Submission Form */}
        {user ? (
          <div className="mt-8 bg-white p-6 rounded-xl border">
            <h3 className="font-semibold mb-4">Write a Review</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newComment.trim()) return;
              const newReview = {
                id: Date.now(),
                product_id: product.id,
                user_name: user.name,
                rating: newRating,
                comment: newComment,
                created_at: new Date().toISOString().split('T')[0]
              };
              setReviews([...reviews, newReview]);
              setNewComment('');
            }}>
              <div className="flex items-center gap-2 mb-4">
                <label className="text-sm font-medium">Rating:</label>
                <select value={newRating} onChange={e => setNewRating(Number(e.target.value))} className="border rounded-lg px-3 py-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <option key={rating} value={rating}>{rating} {rating === 1 ? 'Star' : 'Stars'}</option>
                  ))}
                </select>
              </div>
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                className="w-full border rounded-lg px-3 py-2 mb-4 h-24"
              />
              <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                Submit Review
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Sign in to write a review</p>
            <Link to="/login" className="text-primary-600 hover:underline font-medium">Sign In →</Link>
          </div>
        )}
      </section>
    </div>
  );
}
