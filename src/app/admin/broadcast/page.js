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

export default function AdminBroadcast() {
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  
  const [formData, setFormData] = useState({ audience: 'All Parents', channel: 'Email', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) router.push('/admin/login');
    // Load local mock logs
    const saved = localStorage.getItem('mock_broadcast_logs');
    if (saved) setLogs(JSON.parse(saved));
  }, [router]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!formData.message) return;
    
    setIsSending(true);
    setProgress(0);

    // Simulate sending progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => finishSend(), 500);
          return 100;
        }
        return p + 20;
      });
    }, 400); // 2 seconds total
  };

  const finishSend = () => {
    setIsSending(false);
    setProgress(0);
    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      audience: formData.audience,
      channel: formData.channel,
      status: 'Delivered',
      message: formData.message,
      recipientsCount: formData.audience === 'All Parents' ? 2450 : 320
    };
    const newLogs = [newLog, ...logs];
    setLogs(newLogs);
    localStorage.setItem('mock_broadcast_logs', JSON.stringify(newLogs));
    setFormData({ audience: 'All Parents', channel: 'Email', message: '' });
    alert('Broadcast Sent Successfully via SendGrid / Twilio API integration!');
  };

  return (
    <div className="admin-layout">
      <AdminSidebar active="Broadcasts" />
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Bulk Comms Hub</h1>
            <p style={{ color: 'var(--text-muted)' }}>Send urgent notices via SMS & Email to Parents instantly.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          
          {/* Broadcaster UI */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '24px', color: 'var(--navy)', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '12px' }}>
              Create Broadcast
            </h3>
            
            <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Audience Segment</label>
                <select value={formData.audience} onChange={e => setFormData({...formData, audience: e.target.value})} className="form-input" style={{ width: '100%' }}>
                  <option>All Parents</option>
                  <option>Class X Parents</option>
                  <option>Class XII Parents</option>
                  <option>Transport Users Only</option>
                  <option>All Faculty & Staff</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Notification Channel</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" checked={formData.channel === 'Email'} onChange={() => setFormData({...formData, channel: 'Email'})} />
                    Email Newsletter
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" checked={formData.channel === 'SMS'} onChange={() => setFormData({...formData, channel: 'SMS'})} />
                    SMS Text Alert
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" checked={formData.channel === 'App Push'} onChange={() => setFormData({...formData, channel: 'App Push'})} />
                    App Push Notification
                  </label>
                </div>
              </div>

              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Message Body</label>
                <textarea 
                  value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})} 
                  className="form-input" 
                  style={{ width: '100%', height: '120px', resize: 'vertical' }} 
                  placeholder="Type your notice here..." 
                  required 
                />
              </div>

              {isSending ? (
                <div style={{ background: '#E3F2FD', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600, color: '#1565C0' }}>
                    <span>Broadcasting via AWS SNS...</span>
                    <span>{progress}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(21,101,192,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: '#1976D2', transition: 'width 0.4s' }} />
                  </div>
                </div>
              ) : (
                <button type="submit" className="btn btn-navy" style={{ padding: '16px', fontSize: '1.1rem', marginTop: '16px' }}>
                  🚀 Send to {formData.audience}
                </button>
              )}
            </form>
          </div>

          {/* History Panel */}
          <div>
            <h3 style={{ marginBottom: '24px', color: 'var(--navy)' }}>Recent Blasts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {logs.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', background: 'white', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
                  No recent broadcasts
                </div>
              ) : (
                logs.map(log => (
                  <div key={log.id} style={{ background: 'white', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: `4px solid ${log.channel === 'Email' ? '#4CAF50' : log.channel === 'SMS' ? '#2196F3' : '#9C27B0'}`, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--navy)' }}>{log.audience}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{log.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>{log.channel}</span>
                      <span style={{ fontSize: '0.75rem', background: '#E8F5E9', color: '#1B5E20', padding: '4px 8px', borderRadius: '4px' }}>Delivered to {log.recipientsCount} limits</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      "{log.message}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
