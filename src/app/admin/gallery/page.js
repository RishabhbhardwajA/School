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

export default function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const [formData, setFormData] = useState({ imageUrl: '', caption: '', category: 'campus' });
  const [isAdding, setIsAdding] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const textData = await res.json();
      if (textData.success) setGallery(textData.data);
    } catch {
      console.error('Failed to load gallery');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
    fetchGallery().then(() => setLoading(false));
  }, [router]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setMsg('');
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ imageUrl: '', caption: '', category: 'campus' });
        setIsAdding(false);
        setMsg('Image added to gallery!');
        fetchGallery();
      }
    } catch {
      setMsg('Error adding image');
    }
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this image from the gallery?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      fetchGallery();
    } catch {
      alert('Failed to delete');
    }
  };

  if (loading) return <div className="admin-layout"><AdminSidebar active="Gallery" /><main className="admin-main">Loading...</main></div>;

  return (
    <div className="admin-layout">
      <AdminSidebar active="Gallery" />
      <main className="admin-main">
        <div className="admin-header">
          <h1>Media Gallery</h1>
          <button className="btn btn-gold" onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? 'Cancel' : '+ Add Image URL'}
          </button>
        </div>

        {msg && <div style={{ background: '#E8F5E9', color: '#1B5E20', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>{msg}</div>}

        {isAdding && (
          <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--navy)' }}>Add New Media</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>For this demo, please paste a direct image URL (e.g., from Unsplash or Imgur).</p>
            <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input type="url" placeholder="https://image-url.com/photo.jpg" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} required className="form-input" style={{ gridColumn: 'span 2' }} />
              <input type="text" placeholder="Caption (e.g. Annual Sports Day)" value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} required className="form-input" />
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="form-input">
                <option value="campus">Campus Infrastructure</option>
                <option value="sports">Sports</option>
                <option value="events">Events</option>
                <option value="academics">Academics</option>
                <option value="cultural">Cultural</option>
                <option value="other">Other</option>
              </select>
              <button type="submit" className="btn btn-navy" style={{ gridColumn: 'span 2' }}>Upload Media</button>
            </form>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {gallery.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>No media found</div>
          ) : (
            gallery.map(img => (
              <div key={img._id} className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ 
                  height: '180px', 
                  borderRadius: 'var(--radius-md)', 
                  background: `url(${img.imageUrl}) center/cover no-repeat`,
                  marginBottom: '16px',
                  border: '1px solid rgba(0,0,0,0.1)'
                }} />
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: 'var(--navy)' }}>{img.caption}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', background: 'rgba(212,175,55,0.1)', color: 'var(--gold)', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                    {img.category}
                  </span>
                  <button onClick={() => handleDelete(img._id)} className="btn btn-sm" style={{ background: 'none', border: 'none', color: '#D32F2F', cursor: 'pointer', padding: 0 }}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
