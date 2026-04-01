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
          <li key={l.href}>
            <Link href={l.href} className={active === l.label ? 'active' : ''}>
              <span className="nav-icon">{l.icon}</span>{l.label}
            </Link>
          </li>
        ))}
        <li style={{ marginTop: '32px' }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', background: 'none', border: 'none', width: '100%', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            🚪 Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default function AdminTransport() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const [formData, setFormData] = useState({ routeName: '', busNumber: '', monthlyFee: 0, driverName: '', driverPhone: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchRoutes = async () => {
    try {
      const res = await fetch('/api/transport');
      const textData = await res.json();
      if (textData.success) setRoutes(textData.data);
    } catch {
      console.error('Failed to load transport routes');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
    fetchRoutes().then(() => setLoading(false));
  }, [router]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setMsg('');
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/transport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, stops: [] }), // Stops left blank for MVP mock
      });
      if (res.ok) {
        setFormData({ routeName: '', busNumber: '', monthlyFee: 0, driverName: '', driverPhone: '' });
        setIsAdding(false);
        setMsg('Route added!');
        fetchRoutes();
      }
    } catch {
      setMsg('Error adding route');
    }
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this bus route?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      await fetch(`/api/transport/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      fetchRoutes();
    } catch {
      alert('Failed to delete');
    }
  };

  if (loading) return <div className="admin-layout"><AdminSidebar active="Transport" /><main className="admin-main">Loading...</main></div>;

  return (
    <div className="admin-layout">
      <AdminSidebar active="Transport" />
      <main className="admin-main">
        <div className="admin-header">
          <h1>Transport & Fleet Manager</h1>
          <button className="btn btn-gold" onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? 'Cancel' : '+ Add Route'}
          </button>
        </div>

        {msg && <div style={{ background: '#E8F5E9', color: '#1B5E20', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>{msg}</div>}

        {isAdding && (
          <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--navy)' }}>Add New Bus Route</h3>
            <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input type="text" placeholder="Route Area (e.g. Dwarka Sec-10)" value={formData.routeName} onChange={e => setFormData({...formData, routeName: e.target.value})} required className="form-input" />
              <input type="text" placeholder="Bus Number (e.g. DL-1P-1234)" value={formData.busNumber} onChange={e => setFormData({...formData, busNumber: e.target.value})} required className="form-input" />
              <input type="text" placeholder="Driver Name" value={formData.driverName} onChange={e => setFormData({...formData, driverName: e.target.value})} required className="form-input" />
              <input type="text" placeholder="Driver Phone" value={formData.driverPhone} onChange={e => setFormData({...formData, driverPhone: e.target.value})} required className="form-input" />
              <input type="number" placeholder="Monthly Fee (₹)" value={formData.monthlyFee} onChange={e => setFormData({...formData, monthlyFee: parseInt(e.target.value) || 0})} required className="form-input" min="0" style={{ gridColumn: 'span 2' }} />
              <button type="submit" className="btn btn-navy" style={{ gridColumn: 'span 2' }}>Save Route</button>
            </form>
          </div>
        )}

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Route Name</th>
                <th>Bus Number</th>
                <th>Monthly Fee</th>
                <th>Driver Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No transport routes configured</td></tr>
              ) : (
                routes.map(r => (
                  <tr key={r._id}>
                    <td><strong style={{ color: 'var(--navy)' }}>{r.routeName}</strong></td>
                    <td><span style={{ background: '#FFF3E0', color: '#E65100', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{r.busNumber}</span></td>
                    <td>₹{r.monthlyFee}/mo</td>
                    <td>
                      <div>{r.driverName}</div>
                      <small style={{ color: 'var(--text-muted)' }}>{r.driverPhone}</small>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(r._id)} className="btn btn-sm" style={{ background: '#FFEBEE', color: '#D32F2F' }}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
