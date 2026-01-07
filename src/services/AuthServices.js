import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile 
} from 'firebase/auth';
import { 
  auth, 
  googleProvider, 
  facebookProvider, 
  appleProvider 
} from '../Firebase/config';

// --- HELPER: CONVERT PHONE TO FAKE EMAIL ---
// This allows your Phone-based UI to work with Firebase's Email Auth system.
const formatPhoneToEmail = (phone) => {
  // Removes spaces or dashes if any
  const cleanPhone = phone.replace(/\D/g, ''); 
  return `${cleanPhone}@thegiftingco.com`;
};

// ==========================================
// 1. SIGN UP (Phone + Password)
// Matches the import in Signup.jsx
// ==========================================
export const signupWithPhoneAndPassword = async (phone, password, name = null) => {
  try {
    const email = formatPhoneToEmail(phone);
    
    // 1. Create the user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // 2. Update the profile with Name (if provided)
    if (name) {
      await updateProfile(userCredential.user, {
        displayName: name
      });
    }

    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ==========================================
// 2. LOGIN (Phone + Password)
// Matches the import in Login.jsx
// ==========================================
export const loginWithPhoneAndPassword = async (phone, password) => {
  try {
    const email = formatPhoneToEmail(phone);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ==========================================
// 3. PASSWORD RESET (Via Email)
// Note: Since we use fake emails, this won't actually email the user 
// unless they used a real email address as their ID.
// ==========================================
export const resetPassword = async (phoneOrEmail) => {
  try {
    let email = phoneOrEmail;
    // If input looks like a phone number, convert it
    if (!email.includes('@')) {
        email = formatPhoneToEmail(phoneOrEmail);
    }
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ==========================================
// 4. SOCIAL LOGINS
// ==========================================
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loginWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loginWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ==========================================
// 5. LOGOUT
// ==========================================
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};