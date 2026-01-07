import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, CreditCard, ChevronRight, 
  Banknote, Truck, CheckCircle 
} from 'lucide-react';
import '../CheckoutPage.css';

// Import a sample image for the summary
import cart1 from '../assets/download (2).jpeg';
import cart2 from '../assets/Truffles Assortment Gift Box - Etsy.jpeg';
import cart3 from '../assets/Vanilla Bean Candle White Jar Soy Wax Candle.jpeg';

const CheckoutPage = ({ onNavigate, cartItems = [] }) => {
  // --- STATES ---
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to Cash on Delivery
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock Items if none passed (for visualization)
  const displayItems = cartItems.length > 0 ? cartItems : [
    { id: 1, name: 'Luxury Rose Bouquet', price: 10000.00, quantity: 1, image: cart1, variant: 'Red Roses' },
    { id: 2, name: 'Assorted Truffles', price: 500.00, quantity: 2, image: cart2, variant: '12 Pieces' },
    {
          id: 3,
          name: 'Scented Soy Candle',
          price: 300.00,
          quantity: 1,
          image:cart3, 
          variant: 'Vanilla Bean'
        }
  ];

  // Calculations
  const subtotal = displayItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 200.00;
  const total = subtotal + shipping;

  // --- HANDLER: PLACE ORDER ---
  const handlePlaceOrder = () => {
    setIsProcessing(true);

    // Simulate API Call
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        onNavigate('home'); 
      }, 2500);
    }, 2000);
  };

  return (
    <div className="checkout-container">
      {/* HEADER */}
      <div className="checkout-header">
        <button className="back-btn" onClick={() => onNavigate('cart')}>
          <ArrowLeft size={24} />
        </button>
        <h2>Checkout</h2>
        <div style={{ width: 24 }}></div> {/* Spacer for alignment */}
      </div>

      <div className="checkout-content">
        
        {/* 1. DELIVERY ADDRESS */}
        <section className="checkout-section">
          <div className="section-header">
            <MapPin size={18} className="section-icon" />
            <h3>Delivery Address</h3>
            <button className="edit-link">Edit</button>
          </div>
          <div className="address-card">
            <p className="user-name">Bea (Default)</p>
            <p className="user-phone">(+63) 912 345 6789</p>
            <p className="user-address">
              Unit 402, Emerald Tower, Rizal Street,<br/>
              Davao City, Philippines, 8000
            </p>
          </div>
        </section>

        {/* 2. ORDER ITEMS */}
        <section className="checkout-section">
          <div className="section-header">
            <Truck size={18} className="section-icon" />
            <h3>Order Summary</h3>
          </div>
          <div className="order-items-list">
            {displayItems.map((item) => (
              <div key={item.id} className="order-item-row">
                <div className="item-img-box">
                  {item.image ? <img src={item.image} alt="product" /> : <span>Img</span>}
                </div>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <span className="item-variant">{item.variant}</span>
                  <div className="item-qty-price">
                    <span>x{item.quantity}</span>
                    <span className="price">₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. PAYMENT METHOD */}
        <section className="checkout-section">
          <div className="section-header">
            <CreditCard size={18} className="section-icon" />
            <h3>Payment Method</h3>
          </div>
          <div className="payment-options">
            
            <label className={`payment-option ₱{paymentMethod === 'COD' ? 'active' : ''}`}>
              <div className="pay-left">
                <Banknote size={20} />
                <span>Cash on Delivery</span>
              </div>
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'COD'} 
                onChange={() => setPaymentMethod('COD')} 
              />
            </label>

            <label className={`payment-option ₱{paymentMethod === 'GCash' ? 'active' : ''}`}>
              <div className="pay-left">
                <div className="gcash-icon">G</div>
                <span>GCash / E-Wallet</span>
              </div>
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'GCash'} 
                onChange={() => setPaymentMethod('GCash')} 
              />
            </label>

            <label className={`payment-option ₱{paymentMethod === 'Card' ? 'active' : ''}`}>
              <div className="pay-left">
                <CreditCard size={20} />
                <span>Credit / Debit Card</span>
              </div>
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'Card'} 
                onChange={() => setPaymentMethod('Card')} 
              />
            </label>

          </div>
        </section>

        {/* 4. COST BREAKDOWN */}
        <section className="checkout-section cost-section">
          <div className="cost-row">
            <span>Merchandise Subtotal</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>
          <div className="cost-row">
            <span>Shipping Fee</span>
            <span>₱{shipping.toFixed(2)}</span>
          </div>
          <div className="cost-divider"></div>
          <div className="cost-row total">
            <span>Total Payment</span>
            <span className="total-amount">₱{total.toFixed(2)}</span>
          </div>
        </section>

        <div style={{ height: '80px' }}></div> {/* Spacer for bottom bar */}
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="checkout-footer">
        <div className="footer-total">
          <span>Total</span>
          <h4>₱{total.toFixed(2)}</h4>
        </div>
        <button 
          className="place-order-btn" 
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </div>

      {/* SUCCESS MODAL OVERLAY */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <CheckCircle size={40} color="white" />
            </div>
            <h3>Order Placed!</h3>
            <p>Your order has been successfully placed. We will notify you once it ships.</p>
            <button onClick={() => onNavigate('home')} className="home-btn">
              Back to Home
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CheckoutPage;