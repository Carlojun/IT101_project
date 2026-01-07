import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa"; 
import { 
  signupWithPhoneAndPassword, 
  loginWithGoogle,
  loginWithFacebook,
  loginWithApple
} from '../services/AuthServices.js';
import '../AuthPages.css';

const SignupPage = () => {
  const navigate = useNavigate();

  // --- STATES ---
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- STEP 1: SEND OTP (Simulated for flow) ---
  const handleSendOtp = async () => {
    setError('');
    if (!phoneNumber) { setError('Please enter your phone number'); return; }
    // Basic regex for digits
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) { setError('Please enter a valid phone number (digits only)'); return; }

    setLoading(true);
    // Note: Real SMS requires Phone Auth Provider. For now we simulate the SMS step
    // so we can use Password Auth in Step 3.
    setTimeout(() => {
        setLoading(false);
        setStep(2); 
    }, 1000);
  };

  // --- STEP 2: VERIFY OTP (Simulated) ---
  const handleVerifyOtp = async () => {
    setError('');
    if (!otp) { setError('Please enter the code sent to your phone'); return; }
    if (otp.length !== 6) { setError('Invalid code'); return; }

    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setStep(3); 
    }, 1000);
  };

  // --- STEP 3: CREATE FIREBASE ACCOUNT ---
  const handleSignup = async () => {
    setError('');

    if (!password || !confirmPassword) { setError('Please fill in all password fields'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match!'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }

    setLoading(true);

    // Call Firebase Signup Service
    const result = await signupWithPhoneAndPassword(phoneNumber, password);

    setLoading(false);

    if (result.success) {
      // SUCCESS: App.jsx handles the redirect to "/"
      navigate("/", { replace: true });
    } else {
      // ERROR: Show Firebase error (e.g., "Email already in use")
      let msg = result.error;
      if (msg.includes('email-already-in-use')) msg = 'This phone number is already registered.';
      setError(msg);
    }
  };

  // Social Login
  const handleSocialLogin = async (platform) => {
    setError('');
    setLoading(true);
    
    let result;
    if (platform === 'Google') result = await loginWithGoogle();
    else if (platform === 'Facebook') result = await loginWithFacebook();
    else if (platform === 'Apple') result = await loginWithApple();

    setLoading(false);

    if (result && result.success) {
      navigate('/', { replace: true });
    } else {
      setError(result?.error || 'Signup failed');
    }
  };

  const renderBackButton = () => {
    if (step === 2) {
        return <button onClick={() => setStep(1)} className="back-button" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaArrowLeft /> Change Number</button>;
    }
    return null;
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-grid">
          {/* Left Side */}
          <div className="branding-section">
            <div className="branding-content">
              <div className="header">
                <img src={Logo} alt="Logo" className="brand-logo" style={{ width: '100px', height: 'auto' }}/>
                <h1 className="company-name">The Gifting Co.</h1>
              </div>
              <div className="tagline"><p>Elegance Delivered</p><p>Every Moment</p><p>Perfected</p></div>
            </div>
          </div>

          {/* Right Side */}
          <div className="form-section">
            {renderBackButton()}
            {error && <div style={{backgroundColor: '#fee', color: '#c33', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}

            <div className="form-fields">
              {/* STEP 1 */}
              {step === 1 && (
                <>
                    <div className="input-group">
                        <label className="input-label">Phone Number</label>
                        <input type="tel" placeholder="Enter your mobile number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="input-field" style={{ color: 'black' }} onKeyPress={(e) => e.key === 'Enter' && handleSendOtp()}/>
                    </div>
                    <button onClick={handleSendOtp} className="submit-button" disabled={loading}>{loading ? 'SENDING...' : 'SEND CODE'}</button>
                    <div className="social" style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <p className="or-text" style={{ textAlign: 'center' }}>OR SIGN UP WITH</p>
                        <div className="social-buttons" style={{ justifyContent: 'center' }}>
                          <button onClick={() => handleSocialLogin('Google')} className="social-button"><FcGoogle size={24} /></button>
                          <button onClick={() => handleSocialLogin('Apple')} className="social-button"><FaApple size={24} color="black" /></button>
                          <button onClick={() => handleSocialLogin('Facebook')} className="social-button"><FaFacebook size={24} color="#1877F2" /></button>
                        </div>
                    </div>
                </>
              )}
              {/* STEP 2 */}
              {step === 2 && (
                <>
                    <div style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#555', fontSize: '0.9rem' }}>Enter the code sent to <br/><strong>{phoneNumber}</strong></div>
                    <div className="input-group"><label className="input-label">Verification Code</label><input type="text" placeholder="Enter 6-digit code" value={otp} onChange={(e) => setOtp(e.target.value)} className="input-field" style={{ color: 'black', letterSpacing: '2px', textAlign: 'center', fontSize: '1.2rem' }} maxLength={6} onKeyPress={(e) => e.key === 'Enter' && handleVerifyOtp()}/></div>
                    <button onClick={handleVerifyOtp} className="submit-button" disabled={loading}>{loading ? 'VERIFYING...' : 'VERIFY CODE'}</button>
                    <div style={{ textAlign: 'center', marginTop: '10px' }}><button onClick={handleSendOtp} style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'underline', cursor: 'pointer' }}>Resend Code</button></div>
                </>
              )}
              {/* STEP 3 */}
              {step === 3 && (
                <>
                    <div style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#28a745', fontSize: '0.9rem', fontWeight: 'bold' }}>✓ Phone Verified! Set your password.</div>
                    <div className="input-group"><label className="input-label">Create Password</label><div className="password-wrapper"><input type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" style={{ color: 'black' }}/><button type="button" className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">{showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}</button></div></div>
                    <div className="input-group"><label className="input-label">Confirm Password</label><div className="password-wrapper"><input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" style={{ color: 'black' }} onKeyPress={(e) => e.key === 'Enter' && handleSignup()}/><button type="button" className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex="-1">{showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}</button></div></div>
                    <button onClick={handleSignup} className="submit-button" disabled={loading}>{loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}</button>
                </>
              )}
              
              <p className="terms-text" style={{ textAlign: 'center', marginTop: '-1rem', fontSize: '10px' }}>By signing up, you agree to The Gifting Co's <span className="terms-link" onClick={() => setShowTerms(true)} style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>Terms & Conditions</span></p>
              
              {step === 1 && (<div className="toggle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginTop: '4rem' }}><p className="toggle-text" style={{ margin: 0 }}>Have an account?</p><button onClick={() => navigate('/login')} className="toggle-link" style={{ background: 'none', border: 'none', padding: 0, fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}>Log In</button></div>)}
            </div>
          </div>
        </div>
      </div>
      {showTerms && (<div className="modal-overlay" onClick={() => setShowTerms(false)}><div className="modal-content"><button className="close-modal-btn" onClick={() => setShowTerms(false)}>&times;</button>{TERMS_CONTENT}</div></div>)}
    </div>
  );
};
const TERMS_CONTENT = (<><p><strong>Last Updated: January 2026</strong></p><p>Welcome to The Gifting Co...</p></>);
export default SignupPage;