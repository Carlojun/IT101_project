import React, { useState } from 'react';
import { Bell, Info, Home, ShoppingCart, MessageCircle, User } from 'lucide-react';
import '../NotificationPage.css';

const NotificationPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('All');

  // --- REMOTE IMAGES (Sunglasses Subject) ---
  const IMG_ORDER_1 = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=150&q=80"; // Aviators
  const IMG_ORDER_2 = "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=150&q=80"; // Wayfarers
  const IMG_PROMO = "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=150&q=80"; // Promo collection

  const notifications = [
    {
      id: 1, 
      type: 'order', 
      title: 'Order Delivered',
      message: 'Your Aviator Classics have arrived. Enjoy your new view!',
      time: '2 hours ago', 
      read: false,
      image: IMG_ORDER_1
    },
    {
      id: 2, 
      type: 'promo', 
      title: '20% Off Polarized',
      message: 'Exclusive deal on our premium polarized collection. Code: SUN20',
      time: '5 hours ago', 
      read: true,
      image: IMG_PROMO
    },
    {
      id: 3, 
      type: 'system', 
      title: 'Password Updated',
      message: 'Your account security details were updated successfully.',
      time: '1 day ago', 
      read: true,
      image: null // System alerts keep the icon
    },
    {
      id: 4, 
      type: 'order', 
      title: 'Order Shipped',
      message: 'Your Midnight Wayfarers are on the way to you.',
      time: '2 days ago', 
      read: true,
      image: IMG_ORDER_2
    }
  ];

  const filteredList = activeTab === 'All' 
    ? notifications 
    : notifications.filter(n => n.type === (activeTab === 'Orders' ? 'order' : 'promo'));

  return (
    <div className="notif-container">
      {/* HEADER */}
      <div className="notif-header">
        <h2>Notifications</h2>
        <button className="mark-read-btn">Mark all read</button>
      </div>

      {/* TABS */}
      <div className="filter-tabs">
        {['All', 'Orders', 'Promotions'].map((tab) => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="notif-list">
        {filteredList.map((item) => (
          <div key={item.id} className={`notif-item ${!item.read ? 'unread' : ''}`}>
            
            {/* Image or Icon */}
            <div className="notif-media">
              {item.image ? (
                <img src={item.image} alt="notification subject" className="notif-img" />
              ) : (
                <div className="notif-icon-circle system">
                  <Info size={20} />
                </div>
              )}
            </div>

            <div className="notif-content">
              <div className="notif-top">
                <h4>{item.title}</h4>
                <span className="notif-time">{item.time}</span>
              </div>
              <p>{item.message}</p>
            </div>
            {!item.read && <div className="unread-dot"></div>}
          </div>
        ))}
        
        {filteredList.length === 0 && (
          <div className="empty-state">
            <Bell size={40} color="#ccc" />
            <p>No notifications yet</p>
          </div>
        )}
      </div>

      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => onNavigate('home')}><Home size={22} /><span>Home</span></button>
        <button className="nav-item" onClick={() => onNavigate('cart')}><ShoppingCart size={22} /><span>My Cart</span></button>
        <button className="nav-item" onClick={() => onNavigate('messages')}><MessageCircle size={22} /><span>Messages</span></button>
        <button className="nav-item active"><Bell size={22} /><span>Notification</span></button>
        <button className="nav-item" onClick={() => onNavigate('me')}><User size={22} /><span>Me</span></button>
      </nav>
    </div>
  );
};

export default NotificationPage;