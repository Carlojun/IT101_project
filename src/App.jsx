import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/config';

// --- IMPORT YOUR PAGES ---
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import HomePage from './components/homepage';
import MePage from './components/MePage';
import NotificationPage from './components/NotificationPage';
import MessagesPage from './components/MessagesPage';
import CartPage from './components/CartPage';
import CategoryPage from './components/CategoryPage';
import CheckoutPage from './components/CheckoutPage';

import './App.css';

// --- MAIN CONTENT WRAPPER ---
// We need this wrapper to use the 'useNavigate' hook, 
// which must be inside <BrowserRouter>
const AppContent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('The Flower Shop'); // Default

  const navigate = useNavigate();

  // 1. Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Central Navigation Handler
  // This function bridges your components' "onNavigate('string')" to React Router
  const handleNavigate = (destination) => {
    if (destination === 'home') navigate('/');
    else navigate(`/${destination}`);
  };

  // 3. Category Handler
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate('/category');
  };

  // 4. Logout Handler
  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      <Route 
        path="/login" 
        element={!user ? <LoginPage /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/signup" 
        element={!user ? <SignupPage /> : <Navigate to="/" replace />} 
      />

      {/* --- PROTECTED ROUTES --- */}
      <Route 
        path="/" 
        element={user ? (
          <HomePage 
            user={user} 
            onNavigate={handleNavigate} 
            onCategorySelect={handleCategorySelect}
            onLogout={handleLogout}
          />
        ) : <Navigate to="/login" replace />} 
      />

      <Route 
        path="/cart" 
        element={user ? (
          <CartPage onNavigate={handleNavigate} />
        ) : <Navigate to="/login" replace />} 
      />

      <Route 
        path="/messages" 
        element={user ? (
          <MessagesPage onNavigate={handleNavigate} />
        ) : <Navigate to="/login" replace />} 
      />

      <Route 
        path="/notifications" 
        element={user ? (
          <NotificationPage onNavigate={handleNavigate} />
        ) : <Navigate to="/login" replace />} 
      />

      <Route 
        path="/me" 
        element={user ? (
          <MePage 
            user={user} 
            onNavigate={handleNavigate} 
            onLogout={handleLogout} 
          />
        ) : <Navigate to="/login" replace />} 
      />

      <Route 
        path="/category" 
        element={user ? (
          <CategoryPage 
            category={selectedCategory} 
            onNavigate={handleNavigate}
            onBack={() => navigate('/')} // Back button goes to Home
          />
        ) : <Navigate to="/login" replace />} 
      />

      <Route 
        path="/checkout" 
        element={user ? (
          <CheckoutPage onNavigate={handleNavigate} />
        ) : <Navigate to="/login" replace />} 
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// --- ROOT COMPONENT ---
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;