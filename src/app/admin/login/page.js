'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './admin-auth.css';

export default function AdminAuth() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const router = useRouter();

  // DB Health State
  const [dbStatus, setDbStatus] = useState('checking'); // checking | connected | error
  const [dbErrorMsg, setDbErrorMsg] = useState('');

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    fetch('/api/db-check')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'connected') {
          setDbStatus('connected');
        } else {
          setDbStatus('error');
          setDbErrorMsg(data.error || 'Connection Failed');
        }
      })
      .catch((err) => {
        setDbStatus('error');
        setDbErrorMsg('Network failed to reach server.');
      });
  }, []);

  // Signup State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupSecret, setSignupSecret] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('admin_token', data.token);
        router.push('/admin/dashboard');
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch {
      setLoginError('Connection error. Please try again.');
    }
    setLoginLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError('');
    setSignupSuccess('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: signupName, email: signupEmail, password: signupPassword, secretKey: signupSecret }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setSignupSuccess('Account created successfully! Redirecting...');
        localStorage.setItem('admin_token', data.token);
        setTimeout(() => router.push('/admin/dashboard'), 1500);
      } else {
        setSignupError(data.error || 'Signup failed (Is your MongoDB connection string correct?)');
      }
    } catch {
      setSignupError('Connection error. Please check your internet or database URI.');
    }
    setSignupLoading(false);
  };

  return (
    <div className="auth-page">
      {/* MongoDB Status Pill at the top left corner */}
      <div style={{ position: 'absolute', top: '24px', left: '24px', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 100, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        {dbStatus === 'checking' && <><span style={{ color: 'yellow' }}>⏳</span> <span style={{ color: 'white' }}>Verifying DB Connection...</span></>}
        {dbStatus === 'connected' && <><span style={{ color: '#4CAF50' }}>🟢</span> <span style={{ color: 'white' }}>MongoDB Live</span></>}
        {dbStatus === 'error' && <><span style={{ color: '#F44336' }}>🔴</span> <span style={{ color: 'white' }}>DB Error: {dbErrorMsg}</span></>}
      </div>

      <div className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form className="auth-form" onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <span>Register a new admin access account</span>
            {signupError && <div className="api-error">{signupError}</div>}
            {signupSuccess && <div className="api-success">{signupSuccess}</div>}
            <input type="text" placeholder="Full Name" value={signupName} onChange={e => setSignupName(e.target.value)} required />
            <input type="email" placeholder="Email Address" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required />
            <input type="password" placeholder="🔑 Admin Secret Key" value={signupSecret} onChange={e => setSignupSecret(e.target.value)} required style={{ borderColor: 'var(--gold)', background: 'rgba(212,175,55,0.05)' }} />
            <button className="auth-btn" type="submit" disabled={signupLoading}>
              {signupLoading ? 'Registering...' : 'Sign Up'}
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form className="auth-form" onSubmit={handleLogin}>
            <h1>Admin Sign In</h1>
            <span>Enter your email and password</span>
            {loginError && <div className="api-error">{loginError}</div>}
            <input type="email" placeholder="admin@delhiexcellence.edu.in" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'none', margin: '15px 0' }}>Forgot your password?</a>
            <button className="auth-btn" type="submit" disabled={loginLoading}>
              {loginLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Overlay Container representing the sliding blue panel */}
        <div className="overlay-container">
          <div className="overlay">
            
            <div className="overlay-panel overlay-left">
              <h1 style={{ color: 'white', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Welcome Back!</h1>
              <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '24px' }}>To keep connected with us please login with your personal info</p>
              <button className="auth-btn ghost" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
            </div>
            
            <div className="overlay-panel overlay-right">
              <h1 style={{ color: 'white', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Hello, Partner!</h1>
              <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '24px' }}>Enter your personal details and start journey with us</p>
              <button className="auth-btn ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
