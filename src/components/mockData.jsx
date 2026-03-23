export const STORES = [
  { id: 1, name: 'TechGear', seller_id: 2, description: 'Premium electronics', logo: '💻', rating: 4.8 },
  { id: 2, name: 'ArtisanCraft', seller_id: 4, description: 'Handmade with love', logo: '🎨', rating: 4.9 },
  { id: 3, name: 'EcoWear', seller_id: 5, description: 'Sustainable fashion', logo: '🌿', rating: 4.6 }
];

export const PRODUCTS = [
  { id: 1, store_id: 1, title: 'Wireless Earbuds Pro', description: 'Noise-canceling Bluetooth earbuds with 24hr battery life. IPX5 water resistant.', price: 79.99, image: 'https://picsum.photos/seed/earbuds/600/400', category: 'Electronics', stock: 45, rating: 4.8, review_count: 124 },
  { id: 2, store_id: 2, title: 'Handmade Ceramic Vase', description: 'Wheel-thrown stoneware vase with unique glaze. Each piece is one of a kind.', price: 45.00, image: 'https://picsum.photos/seed/vase/600/400', category: 'Home & Garden', stock: 12, rating: 4.9, review_count: 67 },
  { id: 3, store_id: 3, title: 'Organic Cotton T-Shirt', description: '100% organic cotton, ethically made. Soft, breathable, and durable.', price: 29.99, image: 'https://picsum.photos/seed/tshirt/600/400', category: 'Fashion', stock: 200, rating: 4.6, review_count: 89 },
  { id: 4, store_id: 1, title: 'Smart Home Hub', description: 'Control all your smart devices from one place. Works with Alexa and Google Home.', price: 129.99, image: 'https://picsum.photos/seed/smarthome/600/400', category: 'Electronics', stock: 30, rating: 4.7, review_count: 203 },
  { id: 5, store_id: 2, title: 'Hand-Poured Soy Candle', description: 'Lavender & vanilla scented soy candle. Burns for 40+ hours.', price: 22.00, image: 'https://picsum.photos/seed/candle/600/400', category: 'Home & Garden', stock: 75, rating: 4.5, review_count: 45 },
  { id: 6, store_id: 3, title: 'Recycled Denim Jacket', description: 'Upcycled denim jacket with custom patches. One size fits most.', price: 89.99, image: 'https://picsum.photos/seed/jacket/600/400', category: 'Fashion', stock: 8, rating: 4.8, review_count: 32 },
  { id: 7, store_id: 1, title: 'USB-C Charging Cable 3-Pack', description: 'Braided nylon cables, 3ft/6ft/10ft. Fast charging compatible.', price: 15.99, image: 'https://picsum.photos/seed/cable/600/400', category: 'Electronics', stock: 500, rating: 4.3, review_count: 312 },
  { id: 8, store_id: 2, title: 'Macramé Wall Hanging', description: 'Boho-style macramé art, hand-knotted cotton rope. 24 inches wide.', price: 55.00, image: 'https://picsum.photos/seed/macrame/600/400', category: 'Handmade', stock: 5, rating: 4.9, review_count: 28 }
];

export const REVIEWS = [
  { id: 1, product_id: 1, user_id: 1, user_name: 'Jane C.', rating: 5, comment: 'Best earbuds I have ever owned! Sound quality is amazing.', created_at: '2026-03-10' },
  { id: 2, product_id: 1, user_id: 6, user_name: 'Mike R.', rating: 4, comment: 'Great sound but could be more comfortable for long wear.', created_at: '2026-03-08' },
  { id: 3, product_id: 2, user_id: 1, user_name: 'Jane C.', rating: 5, comment: 'Absolutely gorgeous! The glaze is even more beautiful in person.', created_at: '2026-03-05' }
];

export const CATEGORIES = ['Electronics', 'Fashion', 'Home & Garden', 'Handmade', 'Sports', 'Books'];

export function getStore(storeId) {
  return STORES.find(s => s.id === storeId);
}
