// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSKtfWWbQvBs0WmYGS5mKg_DGVhY1C6NU",
  authDomain: "gifting-c0-webapp.firebaseapp.com",
  projectId: "gifting-c0-webapp",
  storageBucket: "gifting-c0-webapp.firebasestorage.app",
  messagingSenderId: "122819137634",
  appId: "1:122819137634:web:2a996ee94ab2e3e3c0c13b",
  measurementId: "G-LQV1SS3RPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Set up authentication providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

export default app;