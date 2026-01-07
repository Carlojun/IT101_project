import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Removed local Logo import
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { 
  loginWithPhoneAndPassword,
  loginWithGoogle, 
  loginWithFacebook, 
  loginWithApple
} from '../services/AuthServices';
import '../AuthPages.css';

const LoginPage = () => { 
  const navigate = useNavigate();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Forgot Password States
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [fpStep, setFpStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // --- 1. MAIN LOGIN HANDLER ---
  const handleSubmit = async () => {
    setError('');
    setSuccessMessage('');

    if (!phoneNumber || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    // Call Firebase Auth Service
    const result = await loginWithPhoneAndPassword(phoneNumber, password);

    setLoading(false);

    if (result.success) {
      navigate('/', { replace: true });
    } else {
      let msg = result.error;
      if(msg.includes('auth/invalid-credential')) msg = 'Invalid phone number or password.';
      setError(msg);
    }
  };

  // --- 2. SOCIAL LOGIN HANDLER ---
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
      setError(result?.error || 'Login failed');
    }
  };

  // --- 3. FORGOT PASSWORD (Mocked) ---
  const handleSendFpOtp = async () => {
    setError('');
    if (!phoneNumber) { setError('Please enter your phone number'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setFpStep(2); }, 1000);
  };

  const handleVerifyFpOtp = async () => {
    setError('');
    if (otp.length !== 6) { setError('Please enter a valid 6-digit code'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setFpStep(3); }, 1000);
  };

  const handleResetPassword = async () => {
    setError('');
    if (!newPassword || !confirmNewPassword) { setError('Please fill all fields'); return; }
    if (newPassword !== confirmNewPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setSuccessMessage('Password reset successfully! Please login.');
        setIsForgotPassword(false);
        setFpStep(1);
        setPassword(''); 
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-grid">
          {/* BRANDING SECTION */}
          <div className="branding-section">
            <div className="branding-content">
              <div className="header">
                {/* Replaced Logo Image with Text */}
                <h1 className="company-name" style={{fontSize: '2.5rem', margin: 0}}>SUNGLA.</h1>
              </div>
              <div className="tagline">
                <p>Shade Your World.</p>
                <p>Iconic Style.</p>
                <p>Premium Quality.</p>
              </div>
            </div>
          </div>

          {/* FORM SECTION */}
          <div className="form-section">
            {error && <div className="error-msg" style={{backgroundColor: '#fee', color: '#c33', padding: '0.8rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem'}}>{error}</div>}
            {successMessage && <div className="success-msg" style={{backgroundColor: '#d4edda', color: '#155724', padding: '0.8rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem'}}>{successMessage}</div>}

            {isForgotPassword ? (
               /* Forgot Password UI */
               <>
                {fpStep === 1 && <button onClick={() => setIsForgotPassword(false)} className="back-button">← Back to Login</button>}
                {fpStep === 2 && <button onClick={() => setFpStep(1)} className="back-button"><FaArrowLeft style={{marginRight:'5px'}}/> Change Number</button>}
                <div className="form-fields" style={{ marginTop: '20px' }}>
                  {fpStep === 1 && (<><div className="input-group"><label className="input-label">Phone Number</label><input type="tel" placeholder="Enter your number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="input-field" style={{ color: 'black' }}/></div><button onClick={handleSendFpOtp} className="submit-button" disabled={loading} style={{ marginTop: '1rem' }}>{loading ? 'SENDING...' : 'SEND CODE'}</button></>)}
                  {fpStep === 2 && (<><div className="input-group"><input type="text" placeholder="Enter 6-digit code" value={otp} onChange={(e) => setOtp(e.target.value)} className="input-field" maxLength={6} style={{ color: 'black', textAlign: 'center', letterSpacing: '4px' }}/></div><button onClick={handleVerifyFpOtp} className="submit-button" disabled={loading} style={{ marginTop: '1rem' }}>{loading ? 'VERIFYING...' : 'VERIFY'}</button></>)}
                  {fpStep === 3 && (<><div className="input-group"><label className="input-label">New Password</label><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-field" style={{ color: 'black' }}/></div><div className="input-group"><label className="input-label">Confirm Password</label><input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="input-field" style={{ color: 'black' }}/></div><button onClick={handleResetPassword} className="submit-button" disabled={loading} style={{ marginTop: '1rem' }}>{loading ? 'SAVING...' : 'RESET PASSWORD'}</button></>)}
                </div>
               </>
            ) : (
              /* Main Login UI */
              <>
                <div className="form-fields">
                  <div className="input-group">
                    <label className="input-label">Phone Number</label>
                    <input type="tel" placeholder="Enter your number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="input-field" onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} style={{ color: 'black' }}/>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Password</label>
                    <div className="password-wrapper">
                      <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} style={{ color: 'black' }}/>
                      <button type="button" className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">{showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}</button>
                    </div>
                  </div>
                  <div className="form-options">
                    <label className="checkbox-label" style={{ color: "black" }}><input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="checkbox" /> Remember Me</label>
                    <button className="link-button" style={{ color: "black" }} onClick={() => { setIsForgotPassword(true); setFpStep(1); }}>Forgot Password?</button>
                  </div>
                  
                  <button onClick={handleSubmit} className="submit-button" disabled={loading}>
                    {loading ? 'LOADING...' : 'LOGIN'}
                  </button>
                
                  <p className="or-text" style={{ textAlign: "center", marginTop: "1rem"}}>OR LOGIN WITH</p>
                  <div className="social-buttons">
                    <button onClick={() => handleSocialLogin('Google')} className="social-button"><FcGoogle size={24} /></button>
                    <button onClick={() => handleSocialLogin('Apple')} className="social-button"><FaApple size={24} color="black" /></button>
                    <button onClick={() => handleSocialLogin('Facebook')} className="social-button"><FaFacebook size={24} color="#1877F2" /></button>
                  </div>
                </div>
                <div className="toggle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginTop: '4rem' }}>
                    <p className="toggle-text" style={{ margin: 0 }}>Don't have an account?</p>
                    <button onClick={() => navigate('/signup')} className="toggle-link" style={{ background: 'none', border: 'none', padding: 0, fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}>Sign Up</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {showTerms && (<div className="modal-overlay" onClick={() => setShowTerms(false)}><div className="modal-content"><button className="close-modal-btn" onClick={() => setShowTerms(false)}>&times;</button>{TERMS_CONTENT}</div></div>)}
    </div>
  );
};
const TERMS_CONTENT = (<><p><strong>Last Updated: January 2026</strong></p><p>Welcome to Sungla...</p></>);
export default LoginPage;