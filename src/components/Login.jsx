import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { 
  loginWithGoogle, 
  loginWithFacebook, 
  loginWithApple
} from '../services/AuthServices';
import '../AuthPages.css';

const LoginPage = () => { 
  const navigate = useNavigate();
  
  // --- MAIN LOGIN STATES ---
  const [phoneNumber, setPhoneNumber] = useState(''); // Changed from email
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // --- FORGOT PASSWORD STATES ---
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [fpStep, setFpStep] = useState(1); // 1=Phone, 2=OTP, 3=NewPassword
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // --- UI STATES ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // ==========================================
  // 1. MAIN LOGIN HANDLER
  // ==========================================
  const handleSubmit = async () => {
    setError('');
    setSuccessMessage('');

    if (!phoneNumber || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    // TODO: Connect to your Phone/Password Login API
    // const result = await loginWithPhone(phoneNumber, password);
    
    // Simulating Login Logic
    setTimeout(() => {
        setLoading(false);
        // If success:
        navigate('/'); 
        // If error: setError('Invalid phone number or password');
    }, 1500);
  };

  // ==========================================
  // 2. FORGOT PASSWORD HANDLERS
  // ==========================================
  
  // Step 1: Send OTP to Phone
  const handleSendFpOtp = async () => {
    setError('');
    if (!phoneNumber) { setError('Please enter your phone number'); return; }
    if (phoneNumber.length < 10) { setError('Invalid phone number'); return; }

    setLoading(true);
    // TODO: Send SMS API Call
    setTimeout(() => {
        setLoading(false);
        setFpStep(2); // Move to OTP step
    }, 1000);
  };

  // Step 2: Verify OTP
  const handleVerifyFpOtp = async () => {
    setError('');
    if (otp.length !== 6) { setError('Please enter a valid 6-digit code'); return; }

    setLoading(true);
    // TODO: Verify OTP API Call
    setTimeout(() => {
        setLoading(false);
        setFpStep(3); // Move to Password Reset step
    }, 1000);
  };

  // Step 3: Set New Password
  const handleResetPassword = async () => {
    setError('');
    if (!newPassword || !confirmNewPassword) { setError('Please fill all fields'); return; }
    if (newPassword !== confirmNewPassword) { setError('Passwords do not match'); return; }
    if (newPassword.length < 6) { setError('Password must be at least 6 characters'); return; }

    setLoading(true);
    // TODO: Update Password API Call
    setTimeout(() => {
        setLoading(false);
        setSuccessMessage('Password reset successfully! Please login.');
        // Reset states to go back to main login
        setIsForgotPassword(false);
        setFpStep(1);
        setPassword(''); 
    }, 1500);
  };

  // ==========================================
  // 3. SOCIAL LOGIN
  // ==========================================
  const handleSocialLogin = async (platform) => {
    setError('');
    setLoading(true);
    // Simulate social login
    setTimeout(() => {
        setLoading(false);
        navigate('/'); 
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-grid">
          {/* Left Side - Branding */}
          <div className="branding-section">
            <div className="branding-content">
              <div className="header">
                <img src={Logo} alt="Logo" className="brand-logo" style={{ width: '100px', height: 'auto' }}/>
                <p className="company-name">The Gifting Co.</p>
              </div>
              <div className="tagline">
                <p>Elegance Delivered</p><p>Every Moment</p><p>Perfected</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="form-section">
            {error && <div style={{backgroundColor: '#fee', color: '#c33', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}
            {successMessage && <div style={{backgroundColor: '#d4edda', color: '#155724', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center'}}>{successMessage}</div>}

            {/* --- FORGOT PASSWORD SECTION --- */}
            {isForgotPassword ? (
               <>
                {/* Back Button Logic */}
                {fpStep === 1 && <button onClick={() => setIsForgotPassword(false)} className="back-button">← Back to Login</button>}
                {fpStep === 2 && <button onClick={() => setFpStep(1)} className="back-button"><FaArrowLeft style={{marginRight:'5px'}}/> Change Number</button>}
                
                <div className="form-fields" style={{ marginTop: '20px' }}>
                  
                  {/* FP STEP 1: ENTER PHONE */}
                  {fpStep === 1 && (
                    <>
                        <div className="input-group">
                            <label className="input-label">Phone Number</label>
                            <input 
                                type="tel" 
                                placeholder="Enter your number" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                                className="input-field" 
                                style={{ color: 'black' }}
                            />
                        </div>
                        <button onClick={handleSendFpOtp} className="submit-button" disabled={loading} style={{ marginTop: '1rem' }}>
                            {loading ? 'SENDING...' : 'SEND CODE'}
                        </button>
                    </>
                  )}

                  {/* FP STEP 2: ENTER OTP */}
                  {fpStep === 2 && (
                    <>
                        <div style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#555', fontSize: '0.9rem' }}>
                          Enter the code sent to <br/><strong>{phoneNumber}</strong>
                        </div>
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Enter 6-digit code" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                                className="input-field" 
                                maxLength={6}
                                style={{ color: 'black', textAlign: 'center', letterSpacing: '3px', fontSize: '1.2rem' }}
                            />
                        </div>
                        <button onClick={handleVerifyFpOtp} className="submit-button" disabled={loading} style={{ marginTop: '1rem' }}>
                            {loading ? 'VERIFYING...' : 'VERIFY'}
                        </button>
                    </>
                  )}

                  {/* FP STEP 3: NEW PASSWORD */}
                  {fpStep === 3 && (
                    <>
                        <div className="input-group">
                            <label className="input-label">New Password</label>
                            <div className="password-wrapper">
                                <input type={showPassword ? "text" : "password"} placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-field" style={{ color: 'black' }}/>
                                <button type="button" className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Confirm Password</label>
                            <input type="password" placeholder="Confirm new password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="input-field" style={{ color: 'black' }}/>
                        </div>
                        <button onClick={handleResetPassword} className="submit-button" disabled={loading} style={{ marginTop: '1rem' }}>
                            {loading ? 'SAVING...' : 'RESET PASSWORD'}
                        </button>
                    </>
                  )}

                </div>
               </>
            ) : (
              /* --- NORMAL LOGIN SECTION --- */
              <>
                <div className="form-fields">
                  <div className="input-group">
                    <label className="input-label">Phone Number</label>
                    <input 
                        type="tel" 
                        placeholder="Enter your number" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        className="input-field" 
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} 
                        style={{ color: 'black' }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Password</label>
                    <div className="password-wrapper">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="input-field" 
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} 
                        style={{ color: 'black' }}
                      />
                      <button type="button" className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                        {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="form-options">
                    <label className="checkbox-label" style={{ color: "black" }}><input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="checkbox" /> Remember Me</label>
                    <button className="link-button" style={{ color: "black" }} onClick={() => { setIsForgotPassword(true); setFpStep(1); }}>Forgot Password?</button>
                  </div>
                  <button onClick={handleSubmit} className="submit-button" disabled={loading}>{loading ? 'LOADING...' : 'LOGIN'}</button>
                
                  <p className="or-text" style={{ textAlign: "center", marginTop: "1rem"}}>OR LOGIN WITH</p>
                  <div className="social-buttons">
                    <button onClick={() => handleSocialLogin('Google')} className="social-button"><FcGoogle size={24} /></button>
                    <button onClick={() => handleSocialLogin('Apple')} className="social-button"><FaApple size={24} color="black" /></button>
                    <button onClick={() => handleSocialLogin('Facebook')} className="social-button"><FaFacebook size={24} color="#1877F2" /></button>
                  </div>
                  </div>
                  
                  <div className="toggle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginTop: '4rem' }}>
                    <p className="toggle-text" style={{ margin: 0 }}>Don't have an account?</p>
                    <button 
                        onClick={() => navigate('/signup')} 
                        className="toggle-link" 
                        style={{ background: 'none', border: 'none', padding: 0, fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}
                    >
                        Sign Up
                    </button>
                  </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showTerms && (
        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Terms & Conditions</h3>
              <button className="close-modal-btn" onClick={() => setShowTerms(false)}>&times;</button>
            </div>
            <div className="modal-body">{TERMS_CONTENT}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const TERMS_CONTENT = (
    <>
      <p><strong>Last Updated: January 2026</strong></p>
      <p>Welcome to The Gifting Co...</p>
    </>
  );

export default LoginPage;