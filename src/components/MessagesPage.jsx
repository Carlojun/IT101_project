import React, { useState } from 'react';
import { Search, Edit, Home, ShoppingCart, MessageCircle, Bell, User } from 'lucide-react';
import '../MessagesPage.css';

const MessagesPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('All');

  // --- REMOTE IMAGES (Sunglasses Subject) ---
  // Support Avatar: Professional minimalist sunglasses shot
  const IMG_SUPPORT = "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=150&q=80";
  // Logistics Avatar: Sunglasses in a case/box to imply shipping
  const IMG_LOGISTICS = "https://images.unsplash.com/photo-1627483262268-9c96d8aaf21d?auto=format&fit=crop&w=150&q=80";
  // Promo/Brand Avatar: Artistic sunglasses shot
  const IMG_BRAND = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=150&q=80";

  const conversations = [
    {
      id: 1, 
      name: 'Sungla Support', 
      lastMessage: 'Your return request for the Aviators has been approved.',
      time: '10m ago', 
      unread: 1, 
      online: true, 
      image: IMG_SUPPORT
    },
    {
      id: 2, 
      name: 'Logistics Team', 
      lastMessage: 'Your package is out for delivery.',
      time: '1h ago', 
      unread: 0, 
      online: false, 
      image: IMG_LOGISTICS
    },
    {
      id: 3, 
      name: 'Sungla Offers', 
      lastMessage: 'Check out our new Polarized collection!',
      time: '1 day ago', 
      unread: 0, 
      online: false, 
      image: IMG_BRAND
    }
  ];

  // Filter Logic
  const displayList = activeTab === 'Unread' 
    ? conversations.filter(c => c.unread > 0) 
    : conversations;

  return (
    <div className="messages-container">
      {/* HEADER */}
      <div className="messages-header">
        <div className="header-top">
          <h2>Messages</h2>
        </div>
        <div className="msg-search-bar">
          <Search size={18} className="search-icon"/>
          <input type="text" placeholder="Search conversations..."/>
        </div>
      </div>

      {/* TABS */}
      <div className="msg-tabs">
        {['All', 'Unread', 'Archived'].map((tab) => (
          <button 
            key={tab} 
            className={`msg-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CHAT LIST */}
      <div className="chat-list">
        {displayList.map((chat) => (
          <div key={chat.id} className="chat-item">
            <div className="chat-avatar-container">
              <img src={chat.image} alt={chat.name} className="chat-avatar-img" />
              {chat.online && <div className="online-dot"></div>}
            </div>
            
            <div className="chat-content">
              <div className="chat-top">
                <h4 className="chat-name">{chat.name}</h4>
                <span className="chat-time">{chat.time}</span>
              </div>
              <div className="chat-bottom">
                <p className={`chat-preview ${chat.unread > 0 ? 'bold' : ''}`}>
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                  <div className="unread-badge">{chat.unread}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => onNavigate('home')}><Home size={22} /><span>Home</span></button>
        <button className="nav-item" onClick={() => onNavigate('cart')}><ShoppingCart size={22} /><span>My Cart</span></button>
        <button className="nav-item active"><MessageCircle size={22} /><span>Messages</span></button>
        <button className="nav-item" onClick={() => onNavigate('notifications')}><Bell size={22} /><span>Notification</span></button>
        <button className="nav-item" onClick={() => onNavigate('me')}><User size={22} /><span>Me</span></button>
      </nav>
    </div>
  );
};

export default MessagesPage;