import React, { useState, useRef } from 'react';
import { 
  User, Settings, Heart, HelpCircle, 
  CreditCard, Package, Truck, Star, 
  ChevronRight, Home, ShoppingCart, MessageCircle, Bell,
  Award, LogOut, Camera 
} from 'lucide-react';
import { logout } from '../services/AuthServices.js';
import '../MePage.css';

const MePage = ({ user, onNavigate, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // REMOTE IMAGE: Minimalist sunglasses on neutral background
  // Subject: Sunglasses only
  const DEFAULT_BG = "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80";

  const [profileImage, setProfileImage] = useState(() => localStorage.getItem('userProfileImage') || null);
  const [backgroundImage, setBackgroundImage] = useState(() => localStorage.getItem('userBackgroundImage') || DEFAULT_BG);

  const profileInputRef = useRef(null);
  const backgroundInputRef = useRef(null);
  
  const handleLogoutClick = async () => {
    const result = await logout();
    if (result.success) onLogout();
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (type === 'profile') {
          setProfileImage(base64String);
          localStorage.setItem('userProfileImage', base64String);
        }
        if (type === 'background') {
          setBackgroundImage(base64String);
          localStorage.setItem('userBackgroundImage', base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="me-container">
      <input type="file" ref={profileInputRef} onChange={(e) => handleImageChange(e, 'profile')} style={{ display: 'none' }} accept="image/*" />
      <input type="file" ref={backgroundInputRef} onChange={(e) => handleImageChange(e, 'background')} style={{ display: 'none' }} accept="image/*" />

      {/* HEADER */}
      <div className="profile-header" style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${backgroundImage})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center'
        }}>
        
        {isEditing && (
          <button className="bg-edit-btn" onClick={() => backgroundInputRef.current.click()}>
            <Camera size={18} /><span>Change Cover</span>
          </button>
        )}

        <h3 className="page-title">Profile</h3>
        
        <div className="profile-card">
          <div className="avatar-section">
            <div className="avatar-circle">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="uploaded-avatar" />
              ) : (
                <span className="avatar-initials">{user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}</span>
              )}
              {isEditing && (
                <div className="avatar-overlay" onClick={() => profileInputRef.current.click()}>
                  <Camera size={20} color="white" />
                </div>
              )}
            </div>
            {!isEditing && <div className="badge-icon"><Award size={10} color="white" /></div>}
          </div>
          
          <div className="user-info">
            <div className="name-row">
              <h2 className="user-name">{user?.displayName || 'Sungla Member'}</h2>
              <span className="user-email">{user?.email || 'member@sungla.com'}</span>
              <div className="member-pill"><span>VIP Access</span><ChevronRight size={10} /></div>
            </div>
          </div>
          
          <button className={`edit-btn ${isEditing ? 'save-mode' : ''}`} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="me-content">
        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-value">3</span>
            <span className="stat-label">Orders</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">12</span>
            <span className="stat-label">Wishlist</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">500</span>
            <span className="stat-label">Points</span>
          </div>
        </div>

        {/* Purchases Box */}
        <div className="section-box purchases-box">
          <div className="box-header">
            <h3>My Orders</h3>
            <span className="view-history">View All <ChevronRight size={14} /></span>
          </div>
          <div className="purchases-grid">
            <div className="purchase-item">
              <div className="icon-circle"><CreditCard size={20} /></div>
              <span>Unpaid</span>
            </div>
            <div className="purchase-item">
              <div className="icon-circle"><Package size={20} /></div>
              <span>Processing</span>
            </div>
            <div className="purchase-item">
              <div className="icon-circle"><Truck size={20} /></div>
              <span>Shipped</span>
            </div>
            <div className="purchase-item">
              <div className="icon-circle"><Star size={20} /></div>
              <span>Review</span>
            </div>
          </div>
        </div>

        {/* Menu List */}
        <div className="section-box menu-list">
          <div className="menu-item">
            <div className="menu-left"><Heart size={20} className="menu-icon" /><span>My Wishlist</span></div>
            <ChevronRight size={18} color="#ccc" />
          </div>
          <div className="menu-item">
            <div className="menu-left"><User size={20} className="menu-icon" /><span>Account Details</span></div>
            <ChevronRight size={18} color="#ccc" />
          </div>
          <div className="menu-item">
            <div className="menu-left"><Settings size={20} className="menu-icon" /><span>App Settings</span></div>
            <ChevronRight size={18} color="#ccc" />
          </div>
          <div className="menu-item">
            <div className="menu-left"><HelpCircle size={20} className="menu-icon" /><span>Help Center</span></div>
            <ChevronRight size={18} color="#ccc" />
          </div>
        </div>

        {/* Logout */}
        <button className="logout-row-btn" onClick={handleLogoutClick}>
          <LogOut size={20} /><span>Sign Out</span>
        </button>
      </div>

      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => onNavigate('home')}><Home size={22} /><span>Home</span></button>
        <button className="nav-item" onClick={() => onNavigate('cart')}><ShoppingCart size={22} /><span>My Cart</span></button>
        <button className="nav-item" onClick={() => onNavigate('messages')}><MessageCircle size={22} /><span>Messages</span></button>
        <button className="nav-item" onClick={() => onNavigate('notifications')}><Bell size={22} /><span>Notification</span></button>
        <button className="nav-item active"><User size={22} /><span>Me</span></button>
      </nav>
    </div>
  );
};

export default MePage;