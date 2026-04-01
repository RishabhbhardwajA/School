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
    { href: '/admin/faqs', icon: '❓', label: 'FAQs' },
    { href: '/admin/settings', icon: '⚙️', label: 'Settings' },
  ];
  const handleLogout = () => { localStorage.removeItem('admin_token'); router.push('/admin/login'); };
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header"><h3>🏫 DEPS Admin</h3><small>Management Portal</small></div>
      <ul className="sidebar-nav">
        {links.map(l => (<li key={l.href}><Link href={l.href} className={active === l.label ? 'active' : ''}><span className="nav-icon">{l.icon}</span>{l.label}</Link></li>))}
        <li style={{ marginTop: '32px' }}><button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', background: 'none', border: 'none', width: '100%', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>🚪 Logout</button></li>
      </ul>
    </aside>
  );
}

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [newText, setNewText] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
    fetch('/api/announcements')
      .then(r => r.json())
      .then(d => { if (d.success) setAnnouncements(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const addAnnouncement = async () => {
    if (!newText.trim()) return;
    const token = localStorage.getItem('admin_token');
    await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text: newText, active: true }),
    });
    setNewText('');
    fetchData();
  };

  const toggleActive = async (id, active) => {
    const token = localStorage.getItem('admin_token');
    await fetch('/api/announcements', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, active: !active }),
    });
    fetchData();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar active="Announcements" />
      <main className="admin-main">
        <div className="admin-header">
          <h1>Announcement Ticker</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Manage the scrolling announcement bar on the website</p>
        </div>

        {/* Add New */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Add New Announcement</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input type="text" value={newText} onChange={e => setNewText(e.target.value)} placeholder="e.g., 🎓 Admissions Open for 2026-27 — Apply Now!"
              style={{ flex: 1, padding: '12px 16px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }}
              onKeyDown={e => e.key === 'Enter' && addAnnouncement()} />
            <button onClick={addAnnouncement} className="btn btn-gold">Add</button>
          </div>
        </div>

        {/* Preview */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Preview</h3>
          <div className="announcement-bar" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <div className="marquee-wrapper">
              <div className="marquee-content">
                {[...announcements.filter(a => a.active), ...announcements.filter(a => a.active)].map((a, i) => (
                  <span key={i}>{a.text}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead><tr><th>Announcement Text</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} style={{ textAlign: 'center', padding: '40px' }}>Loading...</td></tr>
              ) : announcements.map((a, i) => (
                <tr key={a._id || i}>
                  <td style={{ maxWidth: '500px' }}>{a.text}</td>
                  <td><span className={`status-badge ${a.active ? 'approved' : 'rejected'}`}>{a.active ? 'Active' : 'Hidden'}</span></td>
                  <td>
                    <button onClick={() => toggleActive(a._id, a.active)}
                      style={{ padding: '6px 14px', fontSize: '0.78rem', background: a.active ? '#FFEBEE' : '#E8F5E9', color: a.active ? '#B71C1C' : '#1B5E20', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                      {a.active ? 'Hide' : 'Show'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
