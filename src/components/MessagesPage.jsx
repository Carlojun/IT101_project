import React, { useState } from 'react';
import { 
  Search, Edit, Home, ShoppingCart, MessageCircle, Bell, User
} from 'lucide-react';
import '../MessagesPage.css';

const MessagesPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('All');

  // Dummy Data
  const conversations = [
    {
      id: 1,
      name: 'The Flower Shop',
      lastMessage: 'Your bouquet is ready for delivery! 🌸',
      time: '2m ago',
      unread: 2,
      online: true,
      initial: 'F'
    },
    {
      id: 2,
      name: 'Support Team',
      lastMessage: 'How can we help you with your order?',
      time: '1h ago',
      unread: 0,
      online: false,
      initial: 'S'
    },
    {
      id: 3,
      name: 'Gift Wrapping Co.',
      lastMessage: 'Sent you a photo of the wrapping paper.',
      time: '1 day ago',
      unread: 0,
      online: false,
      initial: 'G'
    },
    {
      id: 4,
      name: 'Delivery Rider',
      lastMessage: 'I am near your location.',
      time: '2 days ago',
      unread: 0,
      online: false,
      initial: 'D'
    }
  ];

  // Filter Logic (Optional implementation)
  const displayList = activeTab === 'Unread' 
    ? conversations.filter(c => c.unread > 0) 
    : conversations;

  return (
    <div className="messages-container">
      {/* HEADER */}
      <div className="messages-header">
        <div className="header-top">
          <h2>Messages</h2>
          <button className="new-chat-btn"><Edit size={20} /></button>
        </div>
        
        {/* Search Bar */}
        <div className="msg-search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search messages..." />
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="msg-tabs">
        {['All', 'Unread', 'Groups'].map((tab) => (
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
              <div className="chat-avatar">
                {chat.initial}
              </div>
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
        <button className="nav-item" onClick={() => onNavigate('home')}>
          <Home size={22} /><span>Home</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('cart')}>
          <ShoppingCart size={22} />
          <span>Cart</span>
        </button>
        
        {/* Active State */}
        <button className="nav-item active">
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

export default MessagesPage;