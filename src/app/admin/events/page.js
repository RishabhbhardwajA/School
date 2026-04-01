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

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ date: '', title: '', desc: '', tag: 'Notice' });
  const [editing, setEditing] = useState(null);
  const router = useRouter();

  const fetchData = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
    fetch('/api/events', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (d.success) setEvents(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    if (editing) {
      await fetch('/api/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: editing, ...form }),
      });
      setEditing(null);
    } else {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
    }
    setForm({ date: '', title: '', desc: '', tag: 'Notice' });
    fetchData();
  };

  const deleteEvent = async (id) => {
    if (!confirm('Delete this event?')) return;
    const token = localStorage.getItem('admin_token');
    await fetch(`/api/events?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchData();
  };

  const startEdit = (ev) => {
    setEditing(ev._id);
    setForm({ date: ev.date, title: ev.title, desc: ev.desc, tag: ev.tag });
  };

  return (
    <div className="admin-layout">
      <AdminSidebar active="Events" />
      <main className="admin-main" style={{ animation: 'pageSlideIn 0.5s ease-out' }}>
        <div className="admin-header">
          <h1>Events & Notices</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Manage events displayed on the homepage &quot;Stay Connected&quot; section</p>
        </div>

        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '16px' }}>{editing ? '✏️ Edit Event' : '➕ Add New Event'}</h3>
          <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} onSubmit={handleSubmit}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Date</label>
              <input type="text" value={form.date} onChange={e => setForm({...form, date: e.target.value})} placeholder="e.g. March 15, 2026" required />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Title</label>
              <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Event title" required />
            </div>
            <div className="form-group" style={{ margin: 0, gridColumn: 'span 2' }}>
              <label>Description</label>
              <input type="text" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} placeholder="Short description" required />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Tag</label>
              <select value={form.tag} onChange={e => setForm({...form, tag: e.target.value})}>
                <option>Sports</option><option>Academic</option><option>Notice</option><option>Activity</option><option>Cultural</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'end' }}>
              <button type="submit" className="btn btn-gold">{editing ? 'Update Event' : 'Add Event'}</button>
              {editing && <button type="button" className="btn btn-outline" style={{ border: '1px solid var(--outline)', color: 'var(--text-primary)' }} onClick={() => { setEditing(null); setForm({ date: '', title: '', desc: '', tag: 'Notice' }); }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead><tr><th>Date</th><th>Title</th><th>Description</th><th>Tag</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>Loading...</td></tr>
              ) : events.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No events found</td></tr>
              ) : events.map((ev, i) => (
                <tr key={ev._id || i}>
                  <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{ev.date}</td>
                  <td style={{ fontWeight: 600 }}>{ev.title}</td>
                  <td style={{ maxWidth: '300px', color: 'var(--text-secondary)' }}>{ev.desc}</td>
                  <td><span className="event-tag" style={{ display: 'inline-block', padding: '4px 12px', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', borderRadius: '50px', background: 'var(--surface)', color: 'var(--navy)' }}>{ev.tag}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => startEdit(ev)} style={{ padding: '6px 14px', fontSize: '0.78rem', background: '#E3F2FD', color: '#0D47A1', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>✏️ Edit</button>
                      <button onClick={() => deleteEvent(ev._id)} style={{ padding: '6px 14px', fontSize: '0.78rem', background: '#fff', color: '#B71C1C', border: '1px solid #EF9A9A', borderRadius: '4px', cursor: 'pointer' }}>🗑️ Delete</button>
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
