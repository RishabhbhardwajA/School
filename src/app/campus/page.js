'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VirtualCampusTour() {
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setGallery(data.data);
        } else {
          // Fallback Fake Campus Tour Items
          setGallery([
            { title: "Smart Interactive Classroom", category: "Academics", url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800" },
            { title: "Olympic Sized Swimming Pool", category: "Sports", url: "https://images.unsplash.com/photo-1519315901367-f34f8a84610f?auto=format&fit=crop&q=80&w=800" },
            { title: "Advanced Physics Laboratory", category: "Academics", url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800" },
            { title: "Annual Cultural Fest 2025", category: "Events", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" },
            { title: "Lush Green Main Campus Front", category: "Infrastructure", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800" },
            { title: "Central Digital Library", category: "Academics", url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800" }
          ]);
        }
        setLoading(false);
      })
      .catch(() => {
        setGallery([
          { title: "Smart Interactive Classroom", category: "Academics", url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800" },
          { title: "Olympic Sized Swimming Pool", category: "Sports", url: "https://images.unsplash.com/photo-1519315901367-f34f8a84610f?auto=format&fit=crop&q=80&w=800" },
          { title: "Advanced Physics Laboratory", category: "Academics", url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800" },
          { title: "Annual Cultural Fest 2025", category: "Events", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" },
          { title: "Lush Green Main Campus Front", category: "Infrastructure", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800" },
          { title: "Central Digital Library", category: "Academics", url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800" }
        ]);
        setLoading(false);
      });
  }, []);

  const filteredGallery = filter === 'all' ? gallery : gallery.filter(item => item.category === filter);

  return (
    <>
      {/* Top Navbar Header Component - Simplified for aesthetic consistency */}
      <nav className="navbar scrolled">
        <div className="navbar-inner">
          <Link href="/" className="nav-logo">
            <div className="logo-icon">DE</div>
            <div className="logo-text">
              <h3 style={{ margin: 0 }}>Delhi Excellence</h3>
              <small>Public School</small>
            </div>
          </Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/faculty">Faculty</Link></li>
            <li><Link href="/alumni">Alumni Wall</Link></li>
            <li><Link href="/campus" style={{ color: 'var(--gold)' }}>Campus Tour</Link></li>
            <li><Link href="/admissions" className="btn btn-gold btn-sm" style={{ color: 'var(--navy)' }}>Apply</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section" style={{ background: 'var(--navy)', color: 'white', padding: '80px 0 60px 0', textAlign: 'center' }}>
        <div className="container">
          <p className="overline" style={{ color: 'var(--gold)' }}>Explore Our Infrastructure</p>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Virtual Campus Tour</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            Take a glimpse into our world-class facilities designed to foster holistic development and 21st-century learning.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section section-alt" style={{ minHeight: '60vh' }}>
        <div className="container">
          
          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {['all', 'campus', 'academics', 'events', 'sports', 'cultural'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '8px 24px',
                  borderRadius: '24px',
                  border: `1px solid ${filter === cat ? 'var(--gold)' : 'rgba(0,0,0,0.1)'}`,
                  background: filter === cat ? 'var(--gold)' : 'var(--white)',
                  color: filter === cat ? 'var(--navy)' : 'var(--text)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading gallery...</div>
          ) : filteredGallery.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>No images found in this category.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
              {filteredGallery.map((item, i) => (
                <div key={i} className="glass-card" style={{ padding: '8px', overflow: 'hidden' }}>
                  <div style={{ 
                    height: '250px', 
                    borderRadius: 'var(--radius-lg)', 
                    overflow: 'hidden',
                    position: 'relative',
                    background: `url(${item.imageUrl}) center/cover no-repeat`
                  }} />
                  <div style={{ padding: '16px 8px', textAlign: 'center', fontWeight: 600, color: 'var(--navy)' }}>
                    {item.caption}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
