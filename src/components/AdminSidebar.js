'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminSidebar({ active }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  return (
    <>
      {/* Desktop Sidebar - always visible on desktop, hidden on mobile */}
      <aside className="admin-sidebar admin-sidebar-desktop">
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
            <button 
              onClick={handleLogout} 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', 
                padding: '12px 24px', color: 'rgba(255,255,255,0.6)', 
                fontSize: '0.88rem', fontWeight: '500', background: 'none', 
                border: 'none', width: '100%', cursor: 'pointer', 
                fontFamily: 'var(--font-body)', transition: 'color 0.3s' 
              }}
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Mobile: Top bar + slide-in drawer */}
      <div className="admin-mobile-bar">
        <h3>🏫 DEPS Admin</h3>
        <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">☰</button>
      </div>

      {/* Mobile drawer overlay */}
      {sidebarOpen && (
        <div className="admin-drawer-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile drawer sidebar */}
      <aside className={`admin-sidebar admin-sidebar-mobile ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3>🏫 DEPS Admin</h3>
            <small>Management Portal</small>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)} 
            style={{ 
              background: 'none', border: 'none', color: 'white', 
              fontSize: '1.5rem', cursor: 'pointer', padding: '4px 8px' 
            }}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <ul className="sidebar-nav">
          {links.map(l => (
            <li key={l.href}>
              <Link 
                href={l.href} 
                className={active === l.label ? 'active' : ''}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="nav-icon">{l.icon}</span>{l.label}
              </Link>
            </li>
          ))}
          <li style={{ marginTop: '32px' }}>
            <button 
              onClick={handleLogout} 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', 
                padding: '12px 24px', color: 'rgba(255,255,255,0.6)', 
                fontSize: '0.88rem', fontWeight: '500', background: 'none', 
                border: 'none', width: '100%', cursor: 'pointer', 
                fontFamily: 'var(--font-body)', transition: 'color 0.3s' 
              }}
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
}
