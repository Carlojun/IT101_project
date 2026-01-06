import React, { useState } from 'react';
import { 
  Bell, Package, Tag, Info, 
  Home, ShoppingCart, MessageCircle, User 
} from 'lucide-react';
import '../NotificationPage.css';

const NotificationPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('All');

  const notifications = [
    {
      id: 1, type: 'order', title: 'Order Delivered',
      message: 'Your package #123456 has been delivered successfully. Enjoy your gift!',
      time: '2 hours ago', read: false,
    },
    {
      id: 2, type: 'promo', title: '20% Off Vouchers!',
      message: 'Exclusive deal just for you! Use code GIFT20 at checkout.',
      time: '5 hours ago', read: true,
    },
    {
      id: 3, type: 'system', title: 'Security Alert',
      message: 'New login detected from a new device.',
      time: '1 day ago', read: true,
    },
    {
      id: 4, type: 'order', title: 'Order Shipped',
      message: 'Your order #987654 is on its way to the recipient.',
      time: '2 days ago', read: true,
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'order': return <Package size={20} />;
      case 'promo': return <Tag size={20} />;
      default: return <Info size={20} />;
    }
  };

  const filteredList = activeTab === 'All' 
    ? notifications 
    : notifications.filter(n => n.type === (activeTab === 'Orders' ? 'order' : 'promo'));

  return (
    <div className="notif-container">
      {/* HEADER */}
      <div className="notif-header">
        <h2>Notifications</h2>
        <button className="mark-read-btn">Mark all as read</button>
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
            <div className={`notif-icon-circle ${item.type}`}>
              {getIcon(item.type)}
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

      {/* BOTTOM NAV */}
      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => onNavigate('home')}>
          <Home size={22} /><span>Home</span>
        </button>
        <button className="nav-item" onClick={() => onNavigate('cart')}>
          <ShoppingCart size={22} />
          <span>Cart</span>
        </button>
        
        {/* Navigates to Messages */}
        <button className="nav-item" onClick={() => onNavigate('messages')}>
          <MessageCircle size={22} /><span>Messages</span>
        </button>
        
        {/* Active State */}
        <button className="nav-item active">
          <Bell size={22} /><span>Notifications</span>
        </button>
        
        {/* Navigates to Me */}
        <button className="nav-item" onClick={() => onNavigate('me')}>
          <User size={22} /><span>Me</span>
        </button>
      </nav>
    </div>
  );
};

export default NotificationPage;