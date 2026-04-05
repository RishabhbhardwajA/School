'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PortalLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('parent@deps.edu.in');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('parent_token', 'demo_token_123');
      router.push('/portal/dashboard');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--navy)' }}>
      {/* Left Branding Side */}
      <div className="login-left-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '60px', background: 'linear-gradient(135deg, rgba(10,31,63,0.9), rgba(10,31,63,0.8)), url("/hero-school.png") center/cover', color: 'white', justifyContent: 'space-between' }}>
        <div>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', color: 'white', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontWeight: 800, border: '2px solid var(--gold)' }}>DE</div>
            <span style={{ fontWeight: 600, fontSize: '1.2rem', letterSpacing: '1px' }}>DELHI EXCELLENCE</span>
          </Link>
        </div>
        
        <div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '24px', lineHeight: 1.1 }}>Partnering in your <span style={{ color: 'var(--gold)' }}>child's future.</span></h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '500px', lineHeight: 1.6 }}>
            The DEPS Parent LMS provides deep visibility into your child's academic progress, attendance records, circulars, and instant fee payments.
          </p>
        </div>

        <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>
          © {new Date().getFullYear()} Delhi Excellence Public School. All rights reserved.
        </div>
      </div>

      {/* Right Login Side */}
      <div style={{ flex: '0 0 500px', background: 'white', padding: '60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="login-right-panel">
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: '8px' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to your Parent Dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>Registered Email / Mobile Number</label>
            <input 
              type="text" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="form-input" 
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--text-primary)' }}
              required 
            />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)' }}>Password</label>
              <a href="#" style={{ fontSize: '0.8rem', color: 'var(--gold-dark)', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
            </div>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="form-input" 
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--text-primary)' }}
              required 
            />
          </div>

          <button type="submit" className="btn btn-navy" disabled={loading} style={{ marginTop: '16px', padding: '16px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
            {loading ? <span className="spinner"></span> : null}
            {loading ? 'Authenticating Securely...' : 'Login to LMS Dashboard'}
          </button>
          
          <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '16px', borderRadius: '8px', marginTop: '16px', border: '1px dashed var(--gold)' }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--navy)', textAlign: 'center', lineHeight: 1.5 }}>
              <strong>Demo Pitch Notice:</strong><br/>
              Use the pre-filled credentials to simulate a successful parent login experience.
            </p>
          </div>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '40px' }}>
          Having trouble? <a href="#" style={{ color: 'var(--navy)', fontWeight: 500 }}>Contact IT Support</a>
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .spinner {
          width: 20px; height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .login-left-panel {
            display: none !important;
          }
          .login-right-panel {
            flex: 1 !important;
            padding: 40px 24px !important;
          }
        }
        @media (max-width: 480px) {
          .login-right-panel {
            padding: 32px 16px !important;
          }
          .login-right-panel h2 {
            font-size: 1.6rem !important;
          }
        }
      `}} />
    </div>
  );
}
