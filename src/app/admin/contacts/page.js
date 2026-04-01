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

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  const fetchData = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
    fetch('/api/contacts', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (d.success) setContacts(d.data); else router.push('/admin/login'); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('admin_token');
    await fetch(`/api/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this query?')) return;
    const token = localStorage.getItem('admin_token');
    await fetch(`/api/contacts/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchData();
    setSelected(null);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar active="Contact Queries" />
      <main className="admin-main">
        <div className="admin-header">
          <h1>Contact Queries</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{contacts.length} total queries</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '24px' }}>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Phone</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>Loading...</td></tr>
                ) : contacts.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No queries yet</td></tr>
                ) : contacts.map((c) => (
                  <tr key={c._id} onClick={() => setSelected(c)} style={{ cursor: 'pointer', background: selected?._id === c._id ? 'var(--surface)' : '' }}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>{c.phone}</td>
                    <td><span className={`status-badge ${c.status}`}>{c.status}</span></td>
                    <td style={{ fontSize: '0.82rem' }}>{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {c.status !== 'resolved' && <button onClick={(e) => { e.stopPropagation(); updateStatus(c._id, 'resolved'); }} style={{ padding: '4px 10px', fontSize: '0.72rem', background: '#E8F5E9', color: '#1B5E20', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>✓ Resolve</button>}
                        {c.status === 'new' && <button onClick={(e) => { e.stopPropagation(); updateStatus(c._id, 'read'); }} style={{ padding: '4px 10px', fontSize: '0.72rem', background: '#E3F2FD', color: '#0D47A1', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>👁 Read</button>}
                        <button onClick={(e) => { e.stopPropagation(); deleteItem(c._id); }} style={{ padding: '4px 10px', fontSize: '0.72rem', background: '#fff', color: '#B71C1C', border: '1px solid #EF9A9A', borderRadius: '4px', cursor: 'pointer' }}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem' }}>Query Details</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
                <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>{selected.name}</p>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</label>
                <p>{selected.phone}</p>
              </div>
              {selected.email && <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                <p>{selected.email}</p>
              </div>}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</label>
                <p style={{ background: 'var(--surface)', padding: '16px', borderRadius: 'var(--radius-md)', lineHeight: '1.7', marginTop: '8px' }}>{selected.message}</p>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</label>
                <p><span className={`status-badge ${selected.status}`}>{selected.status}</span></p>
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Received On</label>
                <p>{new Date(selected.createdAt).toLocaleString('en-IN')}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
