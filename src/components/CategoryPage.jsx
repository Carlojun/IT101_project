import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Heart, ShoppingCart, Check, Filter, 
  Home, MessageCircle, Bell, User 
} from 'lucide-react';
import '../CategoryPage.css';

const CategoryPage = ({ category, onBack, onNavigate }) => {
  const [favorites, setFavorites] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Recommended');
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // --- REMOTE IMAGES (Subject: Sunglasses Only) ---
  const IMG_AVIATOR = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=60";
  const IMG_WAYFARER = "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=60";
  const IMG_ROUND = "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=500&q=60";
  const IMG_CAT = "https://images.unsplash.com/photo-1509631179647-b8d22038bf35?auto=format&fit=crop&w=500&q=60";
  const IMG_SPORT = "https://images.unsplash.com/photo-1556906781-9a412961d289?auto=format&fit=crop&w=500&q=60";
  const IMG_CASE = "https://images.unsplash.com/photo-1627483262268-9c96d8aaf21d?auto=format&fit=crop&w=500&q=60";
  const IMG_CLOTH = "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=500&q=60"; // Used generic glass image

  // SUNGLASSES DATABASE
  const productsDB = {
    'Men': [
      { id: 101, name: 'Carbon Fiber Pilot', price: 5500, date: '2023-10-01', image: IMG_AVIATOR },
      { id: 102, name: 'Square Acetate', price: 4200, date: '2023-11-15', image: IMG_WAYFARER },
      { id: 103, name: 'Sport Performance', price: 3800, date: '2023-09-20', image: IMG_SPORT },
    ],
    'Women': [
      { id: 201, name: 'Cat Eye Oversized', price: 4800, date: '2023-10-10', image: IMG_CAT },
      { id: 202, name: 'Rose Gold Round', price: 5100, date: '2023-11-01', image: IMG_ROUND }, 
      { id: 203, name: 'Tortoise Shell', price: 3900, date: '2023-09-15', image: IMG_WAYFARER }, 
    ],
    'Unisex': [
      { id: 301, name: 'Classic Wayfarer', price: 4500, date: '2023-10-05', image: IMG_WAYFARER },
      { id: 302, name: 'Minimal Metal', price: 4100, date: '2023-11-20', image: IMG_AVIATOR },
    ],
    'Accessories': [
      { id: 401, name: 'Leather Case', price: 850, date: '2023-10-12', image: IMG_CASE },
      { id: 402, name: 'Cleaning Kit', price: 450, date: '2023-11-25', image: IMG_CLOTH },
    ]
  };

  useEffect(() => {
    let items = [...(productsDB[category] || [])];
    if (sortBy === 'Latest') {
      items.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'Oldest') {
      items.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      items.sort((a, b) => a.id - b.id);
    }
    setDisplayedProducts(items);
  }, [category, sortBy]);

  const toggleFavorite = (id) => {
    const isLiked = favorites.includes(id);
    setFavorites((prev) => 
      isLiked ? prev.filter(item => item !== id) : [...prev, id]
    );
    if (!isLiked) {
      setToast({ show: true, message: 'Item added to Wishlist' });
      setTimeout(() => setToast({ show: false, message: '' }), 3000);
    }
  };

  const handleAddToCart = (id) => {
    setAddingToCart(id); 
    setTimeout(() => setAddingToCart(null), 1000);
  };

  return (
    <div className="category-page-container">
      <div className="cat-header">
        <button className="back-btn" onClick={onBack}><ArrowLeft size={24} color="#333" /></button>
        <h2 style={{color: '#333'}}>{category || 'Category'}</h2>
        <div className="header-right">
          <button className="header-icon-btn" onClick={() => onNavigate('cart')}><ShoppingCart size={22} /></button>
          <div className="filter-container">
            <button className={`filter-btn ${isFilterOpen ? 'active' : ''}`} onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Filter size={22} />
            </button>
            {isFilterOpen && (
              <div className="filter-dropdown">
                <button className={sortBy === 'Recommended' ? 'active' : ''} onClick={() => { setSortBy('Recommended'); setIsFilterOpen(false); }}>Recommended</button>
                <button className={sortBy === 'Latest' ? 'active' : ''} onClick={() => { setSortBy('Latest'); setIsFilterOpen(false); }}>Latest</button>
                <button className={sortBy === 'Oldest' ? 'active' : ''} onClick={() => { setSortBy('Oldest'); setIsFilterOpen(false); }}>Oldest</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sort-status">Showing: <span>{sortBy}</span></div>

      <div className="cat-content">
        <div className="cat-grid">
          {displayedProducts.map((product) => {
            const isLiked = favorites.includes(product.id);
            const isAdding = addingToCart === product.id;
            return (
              <div key={product.id} className="cat-product-card">
                <div className="cat-product-badge" onClick={() => toggleFavorite(product.id)}>
                  <Heart size={20} color={isLiked ? "#333" : "#ccc"} fill={isLiked ? "#333" : "none"} />
                </div>
                <div className="cat-product-image">
                    {product.image ? (
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span>No Img</span>
                    )}
                </div>
                <div className="cat-product-info">
                  <h4 style={{color:'#333'}}>{product.name}</h4>
                  <div className="cat-product-footer">
                    <span className="price" style={{color:'#666'}}>₱{product.price}</span>
                    <button className="cat-add-btn" onClick={() => handleAddToCart(product.id)} data-adding={isAdding ? "true" : "false"}>
                      {isAdding ? (
                        <div className="success-content"><Check size={16} color="white" /><span>Added</span></div>
                      ) : (
                        <ShoppingCart size={18} color="#333" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {displayedProducts.length === 0 && <div className="empty-cat">No items found.</div>}
      </div>
      <div className={`toast-notification ${toast.show ? 'show' : ''}`}><span>{toast.message}</span></div>
      <nav className="bottom-nav">
        <button className="nav-item active" onClick={() => onNavigate('home')}><Home size={22} /><span>Home</span></button>
        <button className="nav-item" onClick={() => onNavigate('cart')}><ShoppingCart size={22} /><span>My Cart</span></button>
        <button className="nav-item" onClick={() => onNavigate('messages')}><MessageCircle size={22} /><span>Messages</span></button>
        <button className="nav-item" onClick={() => onNavigate('notifications')}><Bell size={22} /><span>Notifications</span></button>
        <button className="nav-item" onClick={() => onNavigate('me')}><User size={22} /><span>Me</span></button>
      </nav>
    </div>
  );
};

export default CategoryPage;