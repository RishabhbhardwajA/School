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

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const fetchData = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
    const params = new URLSearchParams();
    if (filter !== 'all') params.set('status', filter);
    if (search) params.set('search', search);
    fetch(`/api/admissions?${params}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (d.success) setAdmissions(d.data); else router.push('/admin/login'); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [filter, search]);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('admin_token');
    await fetch(`/api/admissions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  const deleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    const token = localStorage.getItem('admin_token');
    await fetch(`/api/admissions/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchData();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar active="Admissions" />
      <main className="admin-main">
        <div className="admin-header">
          <h1>Admission Applications</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{admissions.length} total applications</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding: '10px 16px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)', fontSize: '0.88rem', width: '300px', background: 'var(--white)' }} />
          {['all', 'pending', 'approved', 'rejected', 'contacted'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`tab-btn ${filter === s ? 'active' : ''}`}
              style={{ padding: '8px 16px', fontSize: '0.82rem', textTransform: 'capitalize' }}>{s}</button>
          ))}
        </div>

        {/* Table */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr><th>Student</th><th>Parent</th><th>Class</th><th>Phone</th><th>Email</th><th>Status</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px' }}>Loading...</td></tr>
              ) : admissions.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No applications found</td></tr>
              ) : admissions.map((a) => (
                <tr key={a._id}>
                  <td style={{ fontWeight: 600 }}>{a.studentName}</td>
                  <td>{a.parentName}</td>
                  <td>{a.classApplying}</td>
                  <td>{a.phone}</td>
                  <td style={{ fontSize: '0.82rem' }}>{a.email}</td>
                  <td><span className={`status-badge ${a.status}`}>{a.status}</span></td>
                  <td style={{ fontSize: '0.82rem' }}>{new Date(a.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {a.status !== 'approved' && <button onClick={() => updateStatus(a._id, 'approved')} style={{ padding: '4px 10px', fontSize: '0.72rem', background: '#E8F5E9', color: '#1B5E20', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>✓ Approve</button>}
                      {a.status !== 'rejected' && <button onClick={() => updateStatus(a._id, 'rejected')} style={{ padding: '4px 10px', fontSize: '0.72rem', background: '#FFEBEE', color: '#B71C1C', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>✗ Reject</button>}
                      {a.status !== 'contacted' && <button onClick={() => updateStatus(a._id, 'contacted')} style={{ padding: '4px 10px', fontSize: '0.72rem', background: '#E3F2FD', color: '#0D47A1', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>📞 Contacted</button>}
                      <button onClick={() => deleteItem(a._id)} style={{ padding: '4px 10px', fontSize: '0.72rem', background: '#fff', color: '#B71C1C', border: '1px solid #EF9A9A', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>🗑️</button>
                    </div>
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
