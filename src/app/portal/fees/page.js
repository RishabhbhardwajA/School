'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PortalFees() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('parent_token')) {
      router.push('/portal/login');
    }
  }, [router]);

  const handlePayMock = (method) => {
    // Show spinner overlay
    setLoading(true);

    // Simulate Fake Razorpay Popup Network Request
    setTimeout(() => {
      setLoading(false);
      
      // Realistically, Razorpay opens an iframe modal. 
      // We simulate a successful payment after 1 second of "processing".
      alert(`Simulated Razorpay / PayU Modal opened for ${method}...`);
      
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000); // Wait another 2s to simulate payment processing

    }, 800);
  };

  if (success) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ background: 'white', padding: '60px', textAlign: 'center', maxWidth: '500px', width: '90%' }}>
          <div style={{ fontSize: '4rem', color: '#4CAF50', marginBottom: '24px' }}>✅</div>
          <h2 style={{ color: 'var(--navy)', marginBottom: '16px' }}>Payment Successful!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
            Thank you for paying ₹22,500. A receipt has been sent to your registered email ID.
            Transaction ID: #RZP_834782BCHJ
          </p>
          <Link href="/portal/dashboard" className="btn btn-gold">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <nav className="portal-nav" style={{ background: 'var(--navy)', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '1.5rem' }}>🎓</span>
          <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>DEPS Parent Portal</span>
        </div>
        <div className="portal-nav-actions" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Fee Desk</span>
          <button onClick={() => { localStorage.removeItem('parent_token'); router.push('/portal/login'); }} className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', fontSize: '0.85rem' }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 16px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <Link href="/portal/dashboard" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginBottom: '24px' }}>
            &larr; Back to Dashboard
          </Link>

          <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 8px 16px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div className="fee-header" style={{ background: 'linear-gradient(135deg, var(--navy), #1A365D)', color: 'white', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: '24px' }}>
              <div>
                <p style={{ margin: '0 0 8px 0', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Quarterly Due</p>
                <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Term 2 Fees</h1>
                <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>Student: Rohan Sharma | Class: X-B</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '0 0 8px 0', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Total Amount</p>
                <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--gold)' }}>₹22,500</h2>
              </div>
            </div>

            <div style={{ padding: '40px 32px' }}>
              <h3 style={{ color: 'var(--navy)', marginBottom: '24px', borderBottom: '2px solid #eee', paddingBottom: '12px' }}>
                Select Payment Method
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button onClick={() => handlePayMock('UPI')} className="glass-panel" style={{ background: '#F5F9FF', border: '1px solid #1976D2', padding: '24px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#1976D2', display: 'block', fontSize: '1.1rem', marginBottom: '4px' }}>Google Pay / PhonePe / Paytm</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Zero processing fees. Instant confirmation.</span>
                  </div>
                  <span style={{ fontSize: '1.5rem' }}>📱</span>
                </button>

                <button onClick={() => handlePayMock('Credit Card')} className="glass-panel" style={{ background: '#FAFAFA', border: '1px solid #E0E0E0', padding: '24px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: 'var(--navy)', display: 'block', fontSize: '1.1rem', marginBottom: '4px' }}>Credit / Debit Card</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Visa, MasterCard, RuPay accepted.</span>
                  </div>
                  <span style={{ fontSize: '1.5rem' }}>💳</span>
                </button>

                <button onClick={() => handlePayMock('Net Banking')} className="glass-panel" style={{ background: '#FAFAFA', border: '1px solid #E0E0E0', padding: '24px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: 'var(--navy)', display: 'block', fontSize: '1.1rem', marginBottom: '4px' }}>Net Banking</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>All major Indian banks supported.</span>
                  </div>
                  <span style={{ fontSize: '1.5rem' }}>🏦</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, flexDirection: 'column', color: 'white' }}>
          <div style={{ width: '60px', height: '60px', border: '6px solid rgba(255,255,255,0.2)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <h2 style={{ marginTop: '24px' }}>Connecting to Razorpay Secure Gateway...</h2>
          <p style={{ opacity: 0.7 }}>Please do not refresh the page.</p>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { to { transform: rotate(360deg); } }` }} />
        </div>
      )}
    </>
  );
}
