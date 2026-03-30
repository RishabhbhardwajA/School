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
        <li style={{ marginTop: '32px' }}><button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', fontWeight: '500', background: 'none', border: 'none', width: '100%', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>🚪 Logout</button></li>
      </ul>
    </aside>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // MOCK DATA FOR DEMO PURPOSES
    setStats({
      totalAdmissions: 245,
      pendingAdmissions: 42,
      totalContacts: 108,
      newContacts: 15,
      activeAnnouncements: 4
    });
    setLoading(false);
  }, [router]);

  if (loading) return <div className="login-page"><p style={{color: 'white', fontSize: '1.2rem'}}>Loading...</p></div>;

  return (
    <div className="admin-layout">
      <AdminSidebar active="Dashboard" />
      <main className="admin-main">
        <div className="admin-header">
          <h1>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Welcome back, Admin</p>
        </div>
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="stat-value">{stats?.totalAdmissions || 0}</div>
            <div className="stat-label">Total Applications</div>
          </div>
          <div className="admin-stat-card" style={{ borderLeftColor: '#E65100' }}>
            <div className="stat-value" style={{ color: '#E65100' }}>{stats?.pendingAdmissions || 0}</div>
            <div className="stat-label">Pending Review</div>
          </div>
          <div className="admin-stat-card" style={{ borderLeftColor: '#1B5E20' }}>
            <div className="stat-value" style={{ color: '#1B5E20' }}>{stats?.approvedAdmissions || 0}</div>
            <div className="stat-label">Approved</div>
          </div>
          <div className="admin-stat-card" style={{ borderLeftColor: '#0D47A1' }}>
            <div className="stat-value" style={{ color: '#0D47A1' }}>{stats?.newContacts || 0}</div>
            <div className="stat-label">New Inquiries</div>
          </div>
        </div>

        {/* Recent Applications */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Recent Applications</h3>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead><tr><th>Student</th><th>Parent</th><th>Class</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {stats?.recentAdmissions?.length ? stats.recentAdmissions.map((a, i) => (
                  <tr key={i}>
                    <td>{a.studentName}</td>
                    <td>{a.parentName}</td>
                    <td>{a.classApplying}</td>
                    <td><span className={`status-badge ${a.status}`}>{a.status}</span></td>
                    <td>{new Date(a.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                )) : <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No applications yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Contacts */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Recent Contact Queries</h3>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Phone</th><th>Message</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {stats?.recentContacts?.length ? stats.recentContacts.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{c.phone}</td>
                    <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</td>
                    <td><span className={`status-badge ${c.status}`}>{c.status}</span></td>
                    <td>{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                )) : <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No queries yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
