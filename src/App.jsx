import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // 1. Import Router tools
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/config';

// IMPORT PAGES
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import HomePage from './components/homepage';
import MePage from './components/MePage';
import NotificationPage from './components/NotificationPage';
import MessagesPage from './components/MessagesPage';
import CartPage from './components/CartPage';
import CategoryPage from './components/CategoryPage';

import './App.css'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // We keep this state to pass data to the category page
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 1. CHECK AUTH STATUS
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. LOADING SCREEN
  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Loading...
      </div>
    );
  }

  // 3. RENDER ROUTES
  return (
    <BrowserRouter> {/* Everything must be inside BrowserRouter */}
      <div className="app-container">
        <Routes>
          {/* --- PUBLIC ROUTES (Login/Signup) --- */}
          {/* If user is ALREADY logged in, force them to Home ("/") */}
          <Route 
            path="/login" 
            element={!user ? <LoginPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <SignupPage /> : <Navigate to="/" />} 
          />

          {/* --- PROTECTED ROUTES (Require Login) --- */}
          {/* If user is NOT logged in, force them to Login ("/login") */}
          
          <Route 
            path="/" 
            element={user ? (
              <HomePage 
                user={user} 
                onCategorySelect={setSelectedCategory} // Still needed to set state
              />
            ) : <Navigate to="/login" />} 
          />

          <Route 
            path="/me" 
            element={user ? <MePage user={user} /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/notifications" 
            element={user ? <NotificationPage /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/messages" 
            element={user ? <MessagesPage /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/cart" 
            element={user ? <CartPage /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/category" 
            element={user ? (
              <CategoryPage category={selectedCategory} />
            ) : <Navigate to="/login" />} 
          />

          {/* Catch-all: Redirect unknown URLs to Home */}
          <Route path="*" element={<Navigate to="/" />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;