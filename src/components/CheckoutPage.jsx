import React, { useState } from 'react';
import { ArrowLeft, MapPin, CreditCard, Banknote, Truck, CheckCircle, Home } from 'lucide-react';
import '../CheckoutPage.css';

const CheckoutPage = ({ onNavigate, cartItems = [] }) => {
  const [paymentMethod, setPaymentMethod] = useState('COD'); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock Remote Image (Sunglasses Subject)
  const IMG_PROD = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=60";

  const displayItems = cartItems.length > 0 ? cartItems : [
    { id: 1, name: 'Aviator Classic', price: 4500.00, quantity: 1, image: IMG_PROD, variant: 'Gold Frame' },
    { id: 2, name: 'Wayfarer Matte', price: 3800.00, quantity: 1, image: IMG_PROD, variant: 'Black Polarized' },
  ];

  const subtotal = displayItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 150.00;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      // Auto-redirect after 3 seconds, or let user click "Back to Home"
      setTimeout(() => { onNavigate('home'); }, 3000);
    }, 2000);
  };

  return (
    <div className="checkout-container">
      {/* HEADER */}
      <div className="checkout-header">
        <button className="back-btn" onClick={() => onNavigate('cart')}>
          <ArrowLeft size={24} color="#1a1a1a" />
        </button>
        <h2 style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>Secure Checkout</h2>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="checkout-content">
        
        {/* ADDRESS */}
        <section className="checkout-section">
          <div className="section-header">
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
               <MapPin size={18} className="section-icon" color="#1a1a1a" />
               <h3 style={{ color: '#1a1a1a' }}>Shipping Address</h3>
            </div>
            <button className="edit-link" style={{ color: '#666' }}>CHANGE</button>
          </div>
          <div className="address-card">
            <p className="user-name" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#1a1a1a' }}>Guest User</p>
            <p className="user-address" style={{ color: '#666' }}>123 Fashion Ave, Metro Manila</p>
          </div>
        </section>

        {/* ORDER SUMMARY */}
        <section className="checkout-section">
          <div className="section-header">
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
              <Truck size={18} className="section-icon" color="#1a1a1a" />
              <h3 style={{ color: '#1a1a1a' }}>Order Summary</h3>
            </div>
          </div>
          <div className="order-items-list">
            {displayItems.map((item) => (
              <div key={item.id} className="order-item-row">
                <div className="item-img-box">
                  <img src={item.image} alt="product" />
                </div>
                <div className="item-info">
                  <h4 style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>{item.name}</h4>
                  <span className="item-variant" style={{ color: '#777' }}>{item.variant}</span>
                  <div className="item-qty-price">
                    <span style={{ color: '#777' }}>x{item.quantity}</span>
                    <span className="price" style={{ color: '#1a1a1a', fontWeight: 700 }}>₱{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PAYMENT METHOD */}
        <section className="checkout-section">
          <div className="section-header">
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
              <CreditCard size={18} className="section-icon" color="#1a1a1a" />
              <h3 style={{ color: '#1a1a1a' }}>Payment Method</h3>
            </div>
          </div>
          <div className="payment-options">
            <label className={`payment-option ${paymentMethod === 'COD' ? 'active' : ''}`}>
              <div className="pay-left">
                <Banknote size={20} color={paymentMethod === 'COD' ? '#1a1a1a' : '#777'} />
                <span style={{ color: '#1a1a1a' }}>Cash on Delivery</span>
              </div>
              <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
            </label>
            <label className={`payment-option ${paymentMethod === 'Card' ? 'active' : ''}`}>
              <div className="pay-left">
                <CreditCard size={20} color={paymentMethod === 'Card' ? '#1a1a1a' : '#777'} />
                <span style={{ color: '#1a1a1a' }}>Credit / Debit Card</span>
              </div>
              <input type="radio" name="payment" checked={paymentMethod === 'Card'} onChange={() => setPaymentMethod('Card')} />
            </label>
          </div>
        </section>

        {/* COST BREAKDOWN */}
        <section className="checkout-section cost-section">
          <div className="cost-row">
            <span style={{ color: '#666' }}>Subtotal</span>
            <span style={{ color: '#1a1a1a' }}>₱{subtotal.toLocaleString()}</span>
          </div>
          <div className="cost-row">
            <span style={{ color: '#666' }}>Shipping</span>
            <span style={{ color: '#1a1a1a' }}>₱{shipping.toLocaleString()}</span>
          </div>
          <div className="cost-divider"></div>
          <div className="cost-row total">
            <span style={{ color: '#1a1a1a' }}>Total Payment</span>
            <span className="total-amount" style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>
              ₱{total.toLocaleString()}
            </span>
          </div>
        </section>
        
        {/* Spacer */}
        <div style={{ height: '150px' }}></div>
      </div>
      
      {/* FOOTER */}
      <div className="checkout-footer">
        <div className="footer-total">
          <span style={{ color: '#666' }}>Total Payment</span>
          <h4 style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>₱{total.toLocaleString()}</h4>
        </div>
        <button 
          className="place-order-btn" 
          onClick={handlePlaceOrder} 
          disabled={isProcessing}
          style={{ backgroundColor: '#1a1a1a' }} // Explicit Black
        >
          {isProcessing ? 'PROCESSING...' : 'PLACE ORDER'}
        </button>
      </div>

      {/* SUCCESS MODAL - NEUTRAL THEME */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon" style={{ backgroundColor: '#1a1a1a' }}>
              <CheckCircle size={40} color="white" />
            </div>
            <h3 style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>Confirmed!</h3>
            <p style={{ color: '#666' }}>Your shades are on the way.</p>
            <button 
              className="home-btn" 
              onClick={() => onNavigate('home')}
              style={{ 
                marginTop: '1rem', 
                background: 'transparent', 
                border: '1px solid #1a1a1a', 
                color: '#1a1a1a',
                padding: '0.6rem 1.2rem',
                borderRadius: '2px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;