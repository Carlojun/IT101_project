import React, { useState } from 'react';
import { 
  Minus, Plus, Trash2, ArrowLeft,
  Home, ShoppingCart, MessageCircle, Bell, User 
} from 'lucide-react';
import '../CartPage.css';

const CartPage = ({ onNavigate }) => {
  // Dummy Cart Data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Luxury Rose Bouquet',
      price: 45.00,
      quantity: 1,
      image: null, // Placeholder for image logic
      variant: 'Red Roses'
    },
    {
      id: 2,
      name: 'Assorted Truffles Box',
      price: 24.50,
      quantity: 2,
      image: null,
      variant: '12 Pieces'
    },
    {
      id: 3,
      name: 'Scented Soy Candle',
      price: 15.00,
      quantity: 1,
      image: null,
      variant: 'Vanilla Bean'
    }
  ]);

  // Calculate Total
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  // Handlers
  const updateQuantity = (id, change) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="cart-container">
      {/* HEADER */}
      <div className="cart-header">
        <button className="back-btn" onClick={() => onNavigate('home')}>
          <ArrowLeft size={24} />
        </button>
        <h2>My Cart ({cartItems.length})</h2>
        <button className="clear-btn" onClick={() => setCartItems([])}>Clear</button>
      </div>

      {/* CART CONTENT */}
      <div className="cart-content">
        {cartItems.length > 0 ? (
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {/* Placeholder for Product Image */}
                  <span>Img</span>
                </div>
                
                <div className="cart-item-details">
                  <div className="item-top">
                    <div>
                      <h3>{item.name}</h3>
                      <p className="item-variant">{item.variant}</p>
                    </div>
                    <button className="delete-btn" onClick={() => removeItem(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="item-bottom">
                    <span className="item-price">${item.price.toFixed(2)}</span>
                    
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-icon-circle">
              <ShoppingCart size={40} />
            </div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet.</p>
            <button className="start-shopping-btn" onClick={() => onNavigate('home')}>
              Start Shopping
            </button>
          </div>
        )}
      </div>

      {/* ORDER SUMMARY (Only show if cart has items) */}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="divider"></div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      )}

      {/* BOTTOM NAV */}
      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => onNavigate('home')}>
          <Home size={22} /><span>Home</span>
        </button>
        <button className="nav-item active">
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

export default CartPage;