import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Heart, ShoppingCart, Check, Filter, 
  Home, MessageCircle, Bell, User 
} from 'lucide-react';
import '../CategoryPage.css';

// 1. ENSURE onNavigate IS INCLUDED HERE
const CategoryPage = ({ category, onBack, onNavigate }) => {
  const [favorites, setFavorites] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });
  
  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Recommended');
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // DATABASE OF ITEMS
  const productsDB = {
    'The Flower Shop': [
      { id: 101, name: 'Red Rose Bouquet', price: 1200, date: '2023-10-01', image: 'Picture here' },
      { id: 102, name: 'Sunflower Sunshine', price: 850, date: '2023-11-15', image: 'Picture here' },
      { id: 103, name: 'Tulip Garden', price: 1500, date: '2023-09-20', image: 'Picture here' },
      { id: 104, name: 'Dried Flower Vase', price: 650, date: '2023-12-01', image: 'Picture here' },
      { id: 105, name: 'Orchid Pot', price: 950, date: '2023-08-05', image: 'Picture here' },
    ],
    'Candies & Chocolates': [
      { id: 201, name: 'Assorted Truffles', price: 500, date: '2023-10-10', image: 'Picture here' },
      { id: 202, name: 'Dark Choco Bar', price: 150, date: '2023-11-01', image: 'Picture here' },
      { id: 203, name: 'Gummy Bear Jar', price: 300, date: '2023-09-15', image: 'Picture here' },
      { id: 204, name: 'Matcha Pralines', price: 450, date: '2023-12-05', image: 'Picture here' },
      { id: 205, name: 'Liqueur Chocolates', price: 600, date: '2023-08-20', image: 'Picture here' },
    ],
    'Packs & Gifts': [
      { id: 301, name: 'Spa Essentials Kit', price: 1200, date: '2023-10-05', image: 'Picture here' },
      { id: 302, name: 'Coffee Lover Set', price: 950, date: '2023-11-20', image: 'Picture here' },
      { id: 303, name: 'Wine & Cheese Box', price: 2500, date: '2023-09-10', image: 'Picture here' },
      { id: 304, name: 'Fruit Basket', price: 800, date: '2023-12-10', image: 'Picture here' },
      { id: 305, name: 'Movie Night Pack', price: 650, date: '2023-08-15', image: 'Picture here' },
    ],
    'Customize Gifts': [
      { id: 401, name: 'Engraved Pen', price: 450, date: '2023-10-12', image: 'Picture here' },
      { id: 402, name: 'Photo Mug', price: 250, date: '2023-11-25', image: 'Picture here' },
      { id: 403, name: 'Embroidered Towel', price: 500, date: '2023-09-05', image: 'Picture here' },
      { id: 404, name: 'Custom Keychain', price: 150, date: '2023-12-15', image: 'Picture here' },
      { id: 405, name: 'Printed T-Shirt', price: 600, date: '2023-08-30', image: 'Picture here' },
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
      {/* HEADER */}
      <div className="cat-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <h2>{category || 'Category'}</h2>
        <div className="header-right">
          {/* Header Cart Button works */}
          <button className="header-icon-btn" onClick={() => onNavigate('cart')}>
            <ShoppingCart size={22} />
          </button>
          <div className="filter-container">
            <button 
              className={`filter-btn ${isFilterOpen ? 'active' : ''}`} 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
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

      {/* CONTENT */}
      <div className="cat-content">
        <div className="cat-grid">
          {displayedProducts.map((product) => {
            const isLiked = favorites.includes(product.id);
            const isAdding = addingToCart === product.id;

            return (
              <div key={product.id} className="cat-product-card">
                <div className="cat-product-badge" onClick={() => toggleFavorite(product.id)}>
                  <Heart size={20} color={isLiked ? "#a85768" : "#ccc"} fill={isLiked ? "#a85768" : "none"} />
                </div>
                
                <div className="cat-product-image">{product.image}</div>
                
                <div className="cat-product-info">
                  <h4>{product.name}</h4>
                  <div className="cat-product-footer">
                    <span className="price">₱{product.price}</span>
                    <button 
                      className="cat-add-btn" 
                      onClick={() => handleAddToCart(product.id)}
                      data-adding={isAdding ? "true" : "false"}
                    >
                      {isAdding ? (
                        <div className="success-content">
                          <Check size={16} color="white" />
                          <span>Added</span>
                        </div>
                      ) : (
                        <ShoppingCart size={18} color="#a85768" />
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

      <div className={`toast-notification ${toast.show ? 'show' : ''}`}>
        <span>{toast.message}</span>
        <Heart size={18} fill="white" color="white" />
      </div>

      {/* 2. BOTTOM NAV SECTION - FULLY FUNCTIONAL */}
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

export default CategoryPage;