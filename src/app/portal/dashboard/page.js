'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PortalDashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('parent_token')) {
      router.push('/portal/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('parent_token');
    router.push('/portal/login');
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* Portal Navbar */}
      <nav className="portal-nav" style={{ background: 'var(--navy)', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '1.5rem' }}>🎓</span>
          <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>DEPS Parent Portal</span>
        </div>
        <div className="portal-nav-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Welcome, Mr. Sharma</span>
          <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', fontSize: '0.85rem' }}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        
        {/* Left Sidebar - Student Profile */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--navy), #1A365D)', height: '120px', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '80px', borderRadius: '50%', background: '#ffcc80', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
              👦
            </div>
          </div>
          <div style={{ padding: '56px 24px 24px 24px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 4px 0', color: 'var(--navy)' }}>Rohan Sharma</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Class X - Section B</p>
            <p style={{ margin: '4px 0 16px 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Roll No: 202610</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', borderTop: '1px solid #eee', paddingTop: '16px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Attendance</div>
                <div style={{ fontWeight: 600, color: '#2E7D32' }}>94%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Last Test Avg</div>
                <div style={{ fontWeight: 600, color: 'var(--navy)' }}>88/100</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Content */}
        <div>
          <h2 style={{ color: 'var(--navy)', marginBottom: '24px' }}>Overview Dashboard</h2>
          
          {/* Quick Actions / Alerts */}
          <div className="dashboard-cards" style={{ marginBottom: '32px' }}>
            
            {/* Fee Alert Card */}
            <div className="glass-panel" style={{ background: 'linear-gradient(to right, #FFF3E0, #FFE0B2)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ color: '#E65100', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚠️</span> Term 2 Fee Due
                </h4>
                <p style={{ margin: 0, color: '#BF360C', fontSize: '0.9rem' }}>Dear Parent, the quarterly fee is due on the 10th of this month.</p>
              </div>
              <Link href="/portal/fees" className="btn btn-navy" style={{ alignSelf: 'stretch', textAlign: 'center' }}>
                Pay ₹22,500 Online
              </Link>
            </div>

          </div>

          <div className="dashboard-cards">
            {/* Recent Homework */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '24px' }}>
              <h3 style={{ color: 'var(--navy)', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '16px' }}>Recent Homework</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--navy)', fontSize: '0.95rem' }}>Mathematics</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Solve Ex 4.2 Q1-Q10</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', background: '#E8F5E9', color: '#1B5E20', padding: '4px 8px', borderRadius: '4px', alignSelf: 'start' }}>Done</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--navy)', fontSize: '0.95rem' }}>Science (Physics)</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Draw ray diagrams for lenses</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', background: '#FFF3E0', color: '#E65100', padding: '4px 8px', borderRadius: '4px', alignSelf: 'start' }}>Pending</span>
                </li>
              </ul>
            </div>

            {/* Timetable / Classes Today */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '24px' }}>
              <h3 style={{ color: 'var(--navy)', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '16px' }}>Today's Schedule</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span style={{ width: '80px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>08:00 AM</span>
                  <span style={{ fontWeight: 600, color: 'var(--navy)' }}>English Literature</span>
                </li>
                <li style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span style={{ width: '80px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>09:00 AM</span>
                  <span style={{ fontWeight: 600, color: 'var(--navy)' }}>Mathematics</span>
                </li>
                <li style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span style={{ width: '80px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>10:30 AM</span>
                  <span style={{ fontWeight: 600, color: '#1976D2' }}>Sports / P.E.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-grid { display: grid; grid-template-columns: 300px 1fr; gap: 32px; }
        .dashboard-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 900px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .dashboard-cards { grid-template-columns: 1fr; }
          .portal-nav { flex-direction: column; align-items: stretch !important; gap: 12px; }
          .portal-nav-actions { justify-content: space-between; }
        }
        @media (max-width: 480px) {
          .dashboard-grid { padding: 16px 8px !important; gap: 16px; }
          .portal-nav-actions span { display: none; }
        }
      `}} />
    </div>
  );
}
