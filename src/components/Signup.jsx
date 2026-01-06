import { useState } from 'react';
// 1. IMPORT THE LOGO
import Logo from '../assets/Logo.png';
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { 
  signUpWithEmail, 
  loginWithGoogle, 
  loginWithFacebook, 
  loginWithApple
} from '../services/AuthServices.js';
import '../AuthPages.css';

const SignupPage = ({ onToggle, onSignupSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const result = await signUpWithEmail(email, password, name);
    setLoading(false);
    if (result.success) onSignupSuccess(result.user);
    else setError(result.error);
  };

  const handleSocialLogin = async (platform) => {
    setError('');
    setLoading(true);
    let result;
    switch (platform) {
      case 'Google': result = await loginWithGoogle(); break;
      case 'Apple': result = await loginWithApple(); break;
      case 'Facebook': result = await loginWithFacebook(); break;
      default: result = { success: false, error: 'Unknown' };
    }
    setLoading(false);
    if (result.success) onSignupSuccess(result.user);
    else setError(result.error);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-grid">
          {/* Left Side - Branding */}
          <div className="branding-section">
            <div className="branding-content">
              <div className="header">
                {/* 2. REPLACE LOGO BOX WITH IMG */}
                <img src={Logo} alt="Logo" className="brand-logo" />
                <h1 className="company-name">The Gifting Co.</h1>
              </div>
              <div className="tagline">
                <p>Elegance Delivered</p><p>Every Moment</p><p>Perfected</p>
              </div>
              <div className="social-info">
                <ul>
                  <li>Instagram: TheGiftingCo_</li>
                  <li>Facebook: The Gifting Co.</li>
                  <li>Email: thegiftingco_official@gmail.com</li>
                  <li>Contact Number: (63+) 9036328941</li>
                </ul>
              </div>
            </div>
            <div className="footer"><p>ALL RIGHTS RESERVED</p></div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="form-section">
            <button onClick={onToggle} className="back-button">← Back to Login</button>
            <h2 className="form-title">GOOD DAY!</h2>
            <p className="form-subtitle">Sign up to Continue</p>
            {error && <div style={{backgroundColor: '#fee', color: '#c33', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}

            <div className="form-fields">
              <div className="input-group">
                <label className="input-label">Name</label>
                <input type="text" placeholder="Enter your fullname" value={name} onChange={(e) => setName(e.target.value)} className="input-field" disabled={loading} />
              </div>
              <div className="input-group">
                <label className="input-label">Email</label>
                <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" disabled={loading} />
              </div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="password-wrapper">
                  <input type={showPassword ? "text" : "password"} placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" disabled={loading} />
                  <button type="button" className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Confirm Password</label>
                <div className="password-wrapper">
                  <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" disabled={loading} onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} />
                  <button type="button" className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex="-1">
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>
              <button onClick={handleSubmit} className="submit-button" disabled={loading}>{loading ? 'LOADING...' : 'CONTINUE'}</button>
              <div className="social-section">
                <p className="or-text">OR</p>
                <div className="social-buttons">
                  <button onClick={() => handleSocialLogin('Google')} className="social-button"><FcGoogle size={24} /></button>
                  <button onClick={() => handleSocialLogin('Apple')} className="social-button"><FaApple size={24} color="black" /></button>
                  <button onClick={() => handleSocialLogin('Facebook')} className="social-button"><FaFacebook size={24} color="#1877F2" /></button>
                </div>
              </div>
              <p className="terms-text">By continuing you confirm that you agree with our <span className="terms-link" onClick={() => setShowTerms(true)}>terms & conditions</span></p>
            </div>
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
    <p>Welcome to The Gifting Co. By accessing or using our website, you agree to be bound by these Terms and Conditions.</p>
    
    <h4>1. Services</h4>
    <p>The Gifting Co. provides an online platform for purchasing gifts, flowers, and customized packages. We reserve the right to modify or discontinue any service at any time.</p>

    <h4>2. User Accounts</h4>
    <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>

    <h4>3. Orders & Pricing</h4>
    <p>All prices are subject to change without notice. We reserve the right to refuse or cancel any order for any reason, including errors in pricing or product availability.</p>

    <h4>4. Shipping & Delivery</h4>
    <p>Delivery times are estimates and not guaranteed. The Gifting Co. is not liable for delays caused by third-party couriers or unforeseen circumstances.</p>

    <h4>5. Returns & Refunds</h4>
    <p>Due to the perishable nature of flowers and food items, we do not accept returns on these products unless they arrive damaged. Please contact support within 24 hours of delivery for issues.</p>

    <h4>6. Privacy Policy</h4>
    <p>Your use of the website is also governed by our Privacy Policy. We respect your data and do not sell your personal information to third parties.</p>
  </>
);

export default SignupPage;