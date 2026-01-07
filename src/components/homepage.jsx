import React, { useState } from 'react';
import { 
  Search, Heart, ShoppingCart, Home, MessageCircle, Bell, User, Check 
} from 'lucide-react';
import { logout } from '../services/AuthServices.js';
import '../homepage.css';

// --- 1. IMPORT YOUR IMAGES ---
import Logo from '../assets/Logo.png';
import FlowerShopImg from '../assets/flowers1.png';
import CandyImg from '../assets/sweets4.jpg'; 
import PacksImg from '../assets/beautiful-golden-gift-box-flowers-260nw-2113230749.png';
import CustomImg from '../assets/flowers3.png';
// Import the product image
import RedRose from '../assets/Ms.jpeg'; 
import Ferrero from '../assets/Pink Bow Ferrero Rocher Chocolates.jpeg';
import Spa from '../assets/Spa Gift Box - Friendship Gift Box - Thinking of You Gift - Gift for her - Self Care Gift - Gift for Mom - Friendship Gift -Pampering Gift.jpeg';
import Mug from '../assets/__Personalized Merry Christmas with Photo & Name Coffee Mug.jpeg';
import Candle from '../assets/Marble Effect Jar Candle.jpeg';
import Pot from '../assets/Indoor Succulent Plants.jpeg';

const HomePage = ({ user, onLogout, onNavigate, onCategorySelect }) => {
  const [favorites, setFavorites] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  // --- 2. MAP IMAGES TO CATEGORIES ---
  const categories = [
    { name: 'The Flower Shop', image: FlowerShopImg },
    { name: 'Candies & Chocolates', image: CandyImg }, 
    { name: 'Packs & Gifts', image: PacksImg },
    { name: 'Customize Gifts', image: CustomImg },
  ];

  // 3. DATA: THIS MONTH'S PICK
  // We use the imported variables (like RedRose) for the image field.
  // For items without a specific image yet, I used 'CustomImg' as a placeholder.
  const monthPicks = [
    { id: 1, name: 'Classic Red Roses', price: '₱1,500', image: RedRose }, 
    { id: 2, name: 'Ferrero Rocher Box', price: '₱850', image: Ferrero },
    { id: 3, name: 'Spa Relaxation Kit', price: '₱1,200', image: Spa },
    { id: 4, name: 'Personalized Mug', price: '₱350', image: Mug },
    { id: 5, name: 'Lavender Scented Candle', price: '₱450', image: Candle },
    { id: 6, name: 'Succulent Pot Trio', price: '₱950', image: Pot },
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
      setToast({ show: true, message: 'Item added to Wishlist' });
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
            <img src={Logo} alt="The Gifting Co. Logo" className="brand-logo" />
          </div>
          
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button className="search-button">
              <Search size={18} color="white" />
            </button>
          </div>

          <div className="header-actions">
            <span className="welcome-text">
              Welcome, {user?.displayName || 'Bea'}
            </span>
            <div className="header-avatar" onClick={() => onNavigate('me')}>
              <User size={20} color="#a85768" />
            </div>
          </div>
        </div>
      </header>

      <main className="home-main">
        <section className="hero-section">
          <h2 className="hero-title">Give the Gift of Elegance</h2>
          <button className="shop-now-btn">SHOP NOW</button>
          <div className="hero-features">
            <span>100% Satisfaction Guarantee</span>
            <span>Same-Day Delivery</span>
            <span>1000+ 5 Star Reviews</span>
          </div>
        </section>

        {/* --- CATEGORY SECTION --- */}
        <section className="category-section">
          <h3 className="section-title">SHOP BY CATEGORY</h3>
          <div className="category-grid">
            {categories.map((cat, idx) => (
              <div key={idx} className="category-card">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="category-image"
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
                />
                <h4>{cat.name}</h4>
                <button 
                  className="view-more-btn"
                  onClick={() => onCategorySelect(cat.name)}
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* --- PRODUCTS SECTION (UPDATED) --- */}
        <section className="products-section">
          <h3 className="section-title">THIS MONTH'S PICK</h3>
          <div className="products-grid">
            {monthPicks.map((product) => {
              const isLiked = favorites.includes(product.id);
              const isAdding = addingToCart === product.id;

              return (
                <div key={product.id} className="product-card">
                  <div className="product-badge" onClick={() => toggleFavorite(product.id)}>
                    <Heart 
                      size={20} 
                      color={isLiked ? "#a85768" : "#ccc"} 
                      fill={isLiked ? "#a85768" : "none"} 
                    />
                  </div>
                  
                  {/* --- FIXED IMAGE RENDERING HERE --- */}
                  <div className="product-image" style={{ width: '100%', height: '150px', overflow: 'hidden', borderRadius: '8px', marginBottom: '10px' }}>
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
                          <span>Added</span>
                        </div>
                      ) : (
                        <ShoppingCart size={18} />
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
        <Heart size={18} fill="white" color="white" />
      </div>

      <nav className="bottom-nav">
        <button className="nav-item active" onClick={() => onNavigate('home')}>
          <Home size={22} /><span>Home</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('cart')}>
          <ShoppingCart size={22} /><span>Cart</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('messages')}>
          <MessageCircle size={22} /><span>Messages</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('notifications')}>
          <Bell size={22} /><span>Notifications</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('me')}>
          <User size={22} /><span>Me</span>
        </button>
      </nav>
    </div>
  );
};

export default HomePage;