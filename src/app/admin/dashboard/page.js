'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function AdminSidebar({ active }) {
  const router = useRouter();
  const links = [
    { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { href: '/admin/admissions', icon: '🎓', label: 'Admissions' },
    { href: '/admin/contacts', icon: '💬', label: 'Contact Queries' },
    { href: '/admin/announcements', icon: '📢', label: 'Announcements' },
    { href: '/admin/events', icon: '📅', label: 'Events' },
    { href: '/admin/faculty', icon: '👨‍🏫', label: 'Faculty' },
    { href: '/admin/transport', icon: '🚌', label: 'Transport' },
    { href: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
    { href: '/admin/broadcast', icon: '📣', label: 'Broadcasts' },
    { href: '/admin/faqs', icon: '❓', label: 'FAQs' },
    { href: '/admin/settings', icon: '⚙️', label: 'Settings' },
  ];
  const handleLogout = () => { localStorage.removeItem('admin_token'); router.push('/admin/login'); };
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h3>🏫 DEPS Admin</h3>
        <small>Management Portal</small>
      </div>
      <ul className="sidebar-nav">
        {links.map(l => (
          <li key={l.href}><Link href={l.href} className={active === l.label ? 'active' : ''}><span className="nav-icon">{l.icon}</span>{l.label}</Link></li>
        ))}
        <li style={{ marginTop: '32px' }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', fontWeight: '500', background: 'none', border: 'none', width: '100%', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'color 0.3s' }}>🚪 Logout</button>
        </li>
      </ul>
    </aside>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
    fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (d.success) setStats(d.data); else router.push('/admin/login'); })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));

    // Live clock
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }));
    }, 1000);
    setCurrentTime(new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }));
    return () => clearInterval(timer);
  }, [router]);

  if (loading) return (
    <div className="admin-layout">
      <AdminSidebar active="Dashboard" />
      <main className="admin-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid var(--surface)', borderTop: '4px solid var(--gold)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Loading dashboard...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </main>
    </div>
  );

  return (
    <div className="admin-layout">
      <AdminSidebar active="Dashboard" />
      <main className="admin-main" style={{ animation: 'pageSlideIn 0.5s ease-out' }}>

        {/* Welcome Banner */}
        <div className="welcome-banner">
          <h2>Welcome back, Admin 👋</h2>
          <p>Here&apos;s what&apos;s happening with your school portal today.</p>
          <div className="welcome-date">{currentTime}</div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <Link href="/admin/admissions" className="quick-action-card">
            <div className="qa-icon" style={{ background: '#FFF3E0', color: '#E65100' }}>🎓</div>
            <div className="qa-text"><h5>Admissions</h5><p>Review applications</p></div>
          </Link>
          <Link href="/admin/contacts" className="quick-action-card">
            <div className="qa-icon" style={{ background: '#E3F2FD', color: '#0D47A1' }}>💬</div>
            <div className="qa-text"><h5>Contact Queries</h5><p>Reply to inquiries</p></div>
          </Link>
          <Link href="/admin/announcements" className="quick-action-card">
            <div className="qa-icon" style={{ background: '#F3E5F5', color: '#6A1B9A' }}>📢</div>
            <div className="qa-text"><h5>Announcements</h5><p>Post updates</p></div>
          </Link>
          <Link href="/admin/faqs" className="quick-action-card">
            <div className="qa-icon" style={{ background: '#E8F5E9', color: '#1B5E20' }}>❓</div>
            <div className="qa-text"><h5>FAQs</h5><p>Manage questions</p></div>
          </Link>
          <Link href="/admin/settings" className="quick-action-card">
            <div className="qa-icon" style={{ background: '#FFF8E1', color: '#F57F17' }}>⚙️</div>
            <div className="qa-text"><h5>Site Settings</h5><p>Edit website content</p></div>
          </Link>
          <Link href="/" className="quick-action-card" target="_blank">
            <div className="qa-icon" style={{ background: '#E0F2F1', color: '#00695C' }}>🌐</div>
            <div className="qa-text"><h5>View Website</h5><p>Open live site</p></div>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="stat-value">{stats?.totalAdmissions || 0}</div>
                <div className="stat-label">Total Applications</div>
              </div>
              <div style={{ fontSize: '2rem', opacity: 0.2 }}>🎓</div>
            </div>
          </div>
          <div className="admin-stat-card" style={{ borderLeftColor: '#E65100' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="stat-value" style={{ color: '#E65100' }}>{stats?.pendingAdmissions || 0}</div>
                <div className="stat-label">Pending Review</div>
              </div>
              <div style={{ fontSize: '2rem', opacity: 0.2 }}>⏳</div>
            </div>
          </div>
          <div className="admin-stat-card" style={{ borderLeftColor: '#1B5E20' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="stat-value" style={{ color: '#1B5E20' }}>{stats?.approvedAdmissions || 0}</div>
                <div className="stat-label">Approved</div>
              </div>
              <div style={{ fontSize: '2rem', opacity: 0.2 }}>✅</div>
            </div>
          </div>
          <div className="admin-stat-card" style={{ borderLeftColor: '#0D47A1' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="stat-value" style={{ color: '#0D47A1' }}>{stats?.newContacts || 0}</div>
                <div className="stat-label">New Inquiries</div>
              </div>
              <div style={{ fontSize: '2rem', opacity: 0.2 }}>💬</div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Recent Tables + Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Left Column — Tables */}
          <div>
            {/* Recent Applications */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.1rem' }}>Recent Applications</h3>
                <Link href="/admin/admissions" style={{ fontSize: '0.82rem', color: 'var(--gold-dark)', fontWeight: 600 }}>View All →</Link>
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>Student</th><th>Parent</th><th>Class</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>
                    {stats?.recentAdmissions?.length ? stats.recentAdmissions.map((a, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{a.studentName}</td>
                        <td>{a.parentName}</td>
                        <td>{a.classApplying}</td>
                        <td><span className={`status-badge ${a.status}`}>{a.status}</span></td>
                        <td>{new Date(a.createdAt).toLocaleDateString('en-IN')}</td>
                      </tr>
                    )) : <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px' }}>No applications yet</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Contacts */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.1rem' }}>Recent Contact Queries</h3>
                <Link href="/admin/contacts" style={{ fontSize: '0.82rem', color: 'var(--gold-dark)', fontWeight: 600 }}>View All →</Link>
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>Name</th><th>Phone</th><th>Message</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>
                    {stats?.recentContacts?.length ? stats.recentContacts.map((c, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{c.name}</td>
                        <td>{c.phone}</td>
                        <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</td>
                        <td><span className={`status-badge ${c.status}`}>{c.status}</span></td>
                        <td>{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                      </tr>
                    )) : <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px' }}>No queries yet</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column — Activity Feed + System Info */}
          <div>
            <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', marginBottom: '24px' }}>
              <div style={{ padding: '20px 20px 12px', borderBottom: '1px solid var(--surface)' }}>
                <h3 style={{ fontSize: '1rem' }}>Recent Activity</h3>
              </div>
              <div className="activity-feed">
                {stats?.recentAdmissions?.slice(0, 3).map((a, i) => (
                  <div className="activity-item" key={`act-adm-${i}`}>
                    <div className={`activity-dot ${a.status === 'approved' ? 'green' : a.status === 'pending' ? 'orange' : 'blue'}`}></div>
                    <div className="activity-info">
                      <p>New admission: <strong>{a.studentName}</strong></p>
                      <small>{new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</small>
                    </div>
                  </div>
                ))}
                {stats?.recentContacts?.slice(0, 3).map((c, i) => (
                  <div className="activity-item" key={`act-con-${i}`}>
                    <div className="activity-dot blue"></div>
                    <div className="activity-info">
                      <p>Contact query from <strong>{c.name}</strong></p>
                      <small>{new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</small>
                    </div>
                  </div>
                ))}
                {!stats?.recentAdmissions?.length && !stats?.recentContacts?.length && (
                  <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    No recent activity
                  </div>
                )}
              </div>
            </div>

            {/* System Status */}
            <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>System Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Database</span>
                  <span className="live-badge">Connected</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Website</span>
                  <span className="live-badge">Live</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>CMS Version</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--navy)', fontWeight: 600 }}>v2.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
