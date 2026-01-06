import { 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile // <--- NEW IMPORT
} from 'firebase/auth';
import { 
  auth, 
  googleProvider, 
  facebookProvider, 
  appleProvider 
} from '../Firebase/config';

// Updated Sign Up: Accepts Name
export const signUpWithEmail = async (email, password, name) => {
  try {
    // 1. Create the user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // 2. Update the profile with the Name immediately
    if (name) {
      await updateProfile(userCredential.user, {
        displayName: name
      });
    }

    // 3. Return user with the new display name
    return { success: true, user: { ...userCredential.user, displayName: name } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Email/Password Login
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Password Reset
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Google Login
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Facebook Login
export const loginWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Apple Login
export const loginWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Check redirect result
export const checkRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      return { success: true, user: result.user };
    }
    return { success: false };
  } catch (error) {
    return { success: false, error: error.message };
  }
};