import React, { useState } from 'react';
import { 
  Minus, Plus, Trash2, ArrowLeft,
  Home, ShoppingCart, MessageCircle, Bell, User 
} from 'lucide-react';
import '../CartPage.css';

const CartPage = ({ onNavigate }) => {
  // Remote Images (Subject: Sunglasses)
  const IMG_AVIATOR = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=60";
  const IMG_CAT_EYE = "https://images.unsplash.com/photo-1509631179647-b8d22038bf35?auto=format&fit=crop&w=300&q=60";
  const IMG_CASE = "https://images.unsplash.com/photo-1627483262268-9c96d8aaf21d?auto=format&fit=crop&w=300&q=60";

  const [cartItems, setCartItems] = useState([
    {
      id: 1, name: 'Luxury Aviators', price: 4500.00, quantity: 1, image: IMG_AVIATOR, variant: 'Gold Frame'
    },
    {
      id: 2, name: 'Oversized Cat Eye', price: 3800.00, quantity: 2, image: IMG_CAT_EYE, variant: 'Black'
    },
    {
      id: 3, name: 'Leather Case', price: 850.00, quantity: 1, image: IMG_CASE, variant: 'Brown'
    }
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 150.00;
  const total = subtotal + shipping;

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
      <div className="cart-header">
        <button className="back-btn" onClick={() => onNavigate('home')}><ArrowLeft size={24} /></button>
        <h2>My Cart ({cartItems.length})</h2>
        <button className="clear-btn" onClick={() => setCartItems([])}>Clear</button>
      </div>

      <div className="cart-content">
        {cartItems.length > 0 ? (
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    <span>No Img</span>
                  )}
                </div>
                <div className="cart-item-details">
                  <div className="item-top">
                    <div><h3>{item.name}</h3><p className="item-variant">{item.variant}</p></div>
                    <button className="delete-btn" onClick={() => removeItem(item.id)}><Trash2 size={18} /></button>
                  </div>
                  <div className="item-bottom">
                    <span className="item-price">₱{item.price.toFixed(2)}</span>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-icon-circle"><ShoppingCart size={40} /></div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet.</p>
            <button className="start-shopping-btn" onClick={() => onNavigate('home')}>Start Shopping</button>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div className="summary-row"><span>Subtotal</span><span>₱{subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>₱{shipping.toFixed(2)}</span></div>
          <div className="divider"></div>
          <div className="summary-total"><span>Total</span><span>₱{total.toFixed(2)}</span></div>
          <button className="checkout-btn" onClick={() => onNavigate('checkout')}>Proceed to Checkout</button>
        </div>
      )}
      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => onNavigate('home')}><Home size={22} /><span>Home</span></button>
        <button className="nav-item active"><ShoppingCart size={22} /><span>My Cart</span></button>
        <button className="nav-item" onClick={() => onNavigate('messages')}><MessageCircle size={22} /><span>Messages</span></button>
        <button className="nav-item" onClick={() => onNavigate('notifications')}><Bell size={22} /><span>Notification</span></button>
        <button className="nav-item" onClick={() => onNavigate('me')}><User size={22} /><span>Me</span></button>
      </nav>
    </div>
  );
};
export default CartPage;