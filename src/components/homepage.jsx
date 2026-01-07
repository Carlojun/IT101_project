import React, { useState } from 'react';
import { 
  Search, Heart, ShoppingCart, Home, MessageCircle, Bell, User, Check 
} from 'lucide-react';
import { logout } from '../services/AuthServices.js';
import '../homepage.css';

// --- REMOTE IMAGES (Unsplash - Subject: Sunglasses Only) ---
// Hero: Sunglasses on sandy beach
const IMG_HERO = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80";

// Categories: Isolated/Product focused
const IMG_CAT_MEN = "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"; // Wayfarer style on surface
const IMG_CAT_WOMEN = "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80"; // Stylish frames
const IMG_CAT_UNISEX = "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=600&q=80"; // Red frames on table
const IMG_CAT_ACC = "https://images.unsplash.com/photo-1627483262268-9c96d8aaf21d?auto=format&fit=crop&w=600&q=80"; // Case close up

// Featured Products
const IMG_PROD_AVIATOR = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80";
const IMG_PROD_WAYFARER = "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80";
const IMG_PROD_ROUND = "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80";
const IMG_PROD_CLUB = "https://images.unsplash.com/photo-1612276529731-4b21494e6d71?auto=format&fit=crop&w=600&q=80";

const HomePage = ({ user, onLogout, onNavigate, onCategorySelect }) => {
  const [favorites, setFavorites] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const categories = [
    { name: 'Men', image: IMG_CAT_MEN },
    { name: 'Women', image: IMG_CAT_WOMEN }, 
    { name: 'Unisex', image: IMG_CAT_UNISEX },
    { name: 'Accessories', image: IMG_CAT_ACC },
  ];

  const monthPicks = [
    { id: 1, name: 'The Aviator Classic', price: '₱4,500', image: IMG_PROD_AVIATOR }, 
    { id: 2, name: 'Midnight Wayfarer', price: '₱3,850', image: IMG_PROD_WAYFARER },
    { id: 3, name: 'Retro Round Gold', price: '₱4,200', image: IMG_PROD_ROUND },
    { id: 4, name: 'Matte Black Club', price: '₱3,950', image: IMG_PROD_CLUB },
  ];

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      onLogout();
    }
  };

  const toggleFavorite = (id) => {
    const isLiked = favorites.includes(id);
    setFavorites((prev) => 
      isLiked ? prev.filter(item => item !== id) : [...prev, id]
    );

    if (!isLiked) {
      setToast({ show: true, message: 'Added to Wishlist' });
      setTimeout(() => {
        setToast({ show: false, message: '' });
      }, 3000);
    }
  };

  const handleAddToCart = (id) => {
    setAddingToCart(id); 
    setTimeout(() => {
      setAddingToCart(null);
    }, 1000);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="company-name">SUNGLA.</h1>
          </div>
          
          <div className="search-bar">
            <input type="text" placeholder="Search for shades..." />
            <button className="search-button">
              <Search size={18} color="white" />
            </button>
          </div>

          <div className="header-actions">
            <span className="welcome-text">
              Hello, {user?.displayName || 'Guest'}
            </span>
            <div className="header-avatar" onClick={() => onNavigate('me')}>
              <User size={20} color="#333" />
            </div>
          </div>
        </div>
      </header>

      <main className="home-main">
        <section className="hero-section" style={{ 
          background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${IMG_HERO})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <h2 className="hero-title">See the World Clearly</h2>
          <button className="shop-now-btn">SHOP COLLECTION</button>
          <div className="hero-features">
            <span>UV Protection</span>
            <span>Premium Polarized</span>
            <span>Lifetime Warranty</span>
          </div>
        </section>

        {/* --- CATEGORY SECTION --- */}
        <section className="category-section">
          <h3 className="section-title">Collections</h3>
          <div className="category-grid">
            {categories.map((cat, idx) => (
              <div key={idx} className="category-card">
                <div className="category-image">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h4>{cat.name}</h4>
                <button 
                  className="view-more-btn"
                  onClick={() => onCategorySelect(cat.name)}
                >
                  Discover
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* --- PRODUCTS SECTION --- */}
        <section className="products-section">
          <h3 className="section-title">Trending Now</h3>
          <div className="products-grid">
            {monthPicks.map((product) => {
              const isLiked = favorites.includes(product.id);
              const isAdding = addingToCart === product.id;

              return (
                <div key={product.id} className="product-card">
                  <div className="product-badge" onClick={() => toggleFavorite(product.id)}>
                    <Heart 
                      size={18} 
                      color={isLiked ? "#333" : "#999"} 
                      fill={isLiked ? "#333" : "none"} 
                    />
                  </div>
                  
                  <div className="product-image">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  
                  <h4 className="product-name">{product.name}</h4>
                  
                  <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    
                    <button 
                      className="add-to-cart-btn" 
                      onClick={() => handleAddToCart(product.id)}
                      data-adding={isAdding ? "true" : "false"}
                    >
                      {isAdding ? (
                        <div className="success-content">
                          <Check size={16} />
                        </div>
                      ) : (
                        <ShoppingCart size={16} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <div className={`toast-notification ${toast.show ? 'show' : ''}`}>
        <span>{toast.message}</span>
      </div>

      <nav className="bottom-nav">
        <button className="nav-item active" onClick={() => onNavigate('home')}>
          <Home size={22} /><span>Home</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('cart')}>
          <ShoppingCart size={22} /><span>My Cart</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('messages')}>
          <MessageCircle size={22} /><span>Messages</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('notifications')}>
          <Bell size={22} /><span>Notification</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('me')}>
          <User size={22} /><span>Me</span>
        </button>
      </nav>
    </div>
  );
};

export default HomePage;