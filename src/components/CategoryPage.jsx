import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Heart, ShoppingCart, Check, Filter, 
  Home, MessageCircle, Bell, User 
} from 'lucide-react';
import '../CategoryPage.css';

// --- IMPORT IMAGES ---
import RedRoseImg from '../assets/Ms.jpeg';
import SunflowerImg from '../assets/Bright & Cheerful Sunflower Bouquet.jpeg';
import TulipImg from '../assets/bouquet of flowers!! 💐.jpeg';
import OrchidImg from '../assets/download (3).jpeg';
import CandyImg from '../assets/download (4).jpeg'; // Assuming you renamed the candy image or use a placeholder
import FerreroImg from '../assets/Truffles Assortment Gift Box - Etsy.jpeg';
import Gummy from '../assets/Strawberry + Mango Gummy Bears - Default Title.jpeg';
import Matcha from '../assets/download (5).jpeg';
import Liquer from '../assets/Anthon Berg Chocolate Liqueur Bottle Variety Collection - The Vermont Country Store.jpeg';
import SpaImg from '../assets/Spa Gift Box - Friendship Gift Box - Thinking of You Gift - Gift for her - Self Care Gift - Gift for Mom - Friendship Gift -Pampering Gift.jpeg';
import CoffeeSetImg from '../assets/download (6).jpeg';
import Wine from '../assets/10 Creative New Year Gift Box Ideas to Wow Your Loved Ones.jpeg';
import GiftBoxImg from '../assets/download (7).jpeg';
import Movie from '../assets/Movie.jpeg';
import MugImg from '../assets/__Personalized Merry Christmas with Photo & Name Coffee Mug.jpeg';
import Pen from '../assets/Pen.jpeg';
import Towel from '../assets/Terry Palmer Personalized Towel by Terry Palmer Personalized Towel _ Bridestory_com.jpeg';
import Keychain from '../assets/Keychain.jpeg';
import CustomBoxImg from '../assets/simple T-shirts ideas.jpeg';

const CategoryPage = ({ category, onBack, onNavigate }) => {
  const [favorites, setFavorites] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });
  
  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Recommended');
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // DATABASE OF ITEMS WITH IMAGES
  const productsDB = {
    'The Flower Shop': [
      { id: 101, name: 'Red Rose Bouquet', price: 1200, date: '2023-10-01', image: RedRoseImg },
      { id: 102, name: 'Sunflower Sunshine', price: 850, date: '2023-11-15', image: SunflowerImg },
      { id: 103, name: 'Tulip Garden', price: 1500, date: '2023-09-20', image: TulipImg },
      { id: 104, name: 'Dried Flower Vase', price: 650, date: '2023-12-01', image: OrchidImg }, // Reusing Orchid/Flower img
      { id: 105, name: 'Orchid Pot', price: 950, date: '2023-08-05', image: OrchidImg },
    ],
    'Candies & Chocolates': [
      { id: 201, name: 'Assorted Truffles', price: 500, date: '2023-10-10', image: FerreroImg },
      { id: 202, name: 'Dark Choco Bar', price: 150, date: '2023-11-01', image: CandyImg }, 
      { id: 203, name: 'Gummy Bear Jar', price: 300, date: '2023-09-15', image: Gummy }, 
      { id: 204, name: 'Matcha Pralines', price: 450, date: '2023-12-05', image: Matcha },
      { id: 205, name: 'Liqueur Chocolates', price: 600, date: '2023-08-20', image: Liquer },
    ],
    'Packs & Gifts': [
      { id: 301, name: 'Spa Essentials Kit', price: 1200, date: '2023-10-05', image: SpaImg },
      { id: 302, name: 'Coffee Lover Set', price: 950, date: '2023-11-20', image: CoffeeSetImg },
      { id: 303, name: 'Wine & Cheese Box', price: 2500, date: '2023-09-10', image: Wine },
      { id: 304, name: 'Fruit Basket', price: 800, date: '2023-12-10', image: GiftBoxImg },
      { id: 305, name: 'Movie Night Pack', price: 650, date: '2023-08-15', image: Movie },
    ],
    'Customize Gifts': [
      { id: 401, name: 'Engraved Pen', price: 450, date: '2023-10-12', image: Pen },
      { id: 402, name: 'Photo Mug', price: 250, date: '2023-11-25', image: MugImg },
      { id: 403, name: 'Embroidered Towel', price: 500, date: '2023-09-05', image: Towel },
      { id: 404, name: 'Custom Keychain', price: 150, date: '2023-12-15', image: Keychain },
      { id: 405, name: 'Printed T-Shirt', price: 600, date: '2023-08-30', image: CustomBoxImg },
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
                
                {/* --- IMAGE RENDERING FIX --- */}
                <div className="cat-product-image">
                    {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    ) : (
                        <span>No Img</span>
                    )}
                </div>
                {/* --------------------------- */}
                
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