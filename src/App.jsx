import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/config';

// IMPORT PAGES
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import HomePage from './components/HomePage';
import MePage from './components/MePage';
import NotificationPage from './components/NotificationPage';
import MessagesPage from './components/MessagesPage';
import CartPage from './components/CartPage';
import CategoryPage from './components/CategoryPage';

import './App.css'; 

function App() {
  const [user, setUser] = useState(null);
  
  // Available Views: 'login', 'signup', 'home', 'me', 'notifications', 'messages', 'cart', 'category'
  const [currentView, setCurrentView] = useState('login'); 
  const [loading, setLoading] = useState(true);
  
  // State to track which category was clicked
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 1. CHECK AUTH STATUS
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // If user is logged in but currently on login/signup page, move them to home
        if (currentView === 'login' || currentView === 'signup') {
          setCurrentView('home');
        }
      } else {
        setUser(null);
        setCurrentView('login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentView]);

  // 2. HANDLERS
  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  const handleNavigate = (viewName) => {
    setCurrentView(viewName);
  };

  // Handler for clicking "View More" on a category
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentView('category');
  };

  // 3. LOADING SCREEN
  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Loading...
      </div>
    );
  }

  // 4. RENDER VIEWS
  return (
    <div className="app-container">
      
      {/* AUTH PAGES */}
      {!user && currentView === 'login' && (
        <LoginPage 
          onLoginSuccess={handleLoginSuccess} 
          onToggle={() => setCurrentView('signup')} 
        />
      )}

      {!user && currentView === 'signup' && (
        <SignupPage 
          onSignupSuccess={handleLoginSuccess} 
          onToggle={() => setCurrentView('login')} 
        />
      )}

      {/* MAIN APP PAGES */}
      
      {/* HOME PAGE */}
      {user && currentView === 'home' && (
        <HomePage 
          user={user} 
          onLogout={handleLogout} 
          onNavigate={handleNavigate} 
          onCategorySelect={handleCategorySelect} 
        />
      )}

      {/* CATEGORY PAGE (With the Fix) */}
      {user && currentView === 'category' && (
        <CategoryPage 
          category={selectedCategory}
          onBack={() => setCurrentView('home')}
          onNavigate={handleNavigate} /* <--- THIS WAS THE MISSING LINK */
        />
      )}

      {/* ME / PROFILE PAGE */}
      {user && currentView === 'me' && (
        <MePage 
          user={user} 
          onLogout={handleLogout} 
          onNavigate={handleNavigate} 
        />
      )}

      {/* NOTIFICATIONS PAGE */}
      {user && currentView === 'notifications' && (
        <NotificationPage 
          onNavigate={handleNavigate} 
        />
      )}

      {/* MESSAGES PAGE */}
      {user && currentView === 'messages' && (
        <MessagesPage 
          onNavigate={handleNavigate} 
        />
      )}

      {/* CART PAGE */}
      {user && currentView === 'cart' && (
        <CartPage 
          onNavigate={handleNavigate} 
        />
      )}
    </div>
  );
}

export default App;