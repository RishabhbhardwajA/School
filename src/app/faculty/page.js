'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FacultyDirectory() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/faculty')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setFaculty(data.data);
        } else {
          // Fallback Fake Faculty
          setFaculty([
            { name: "Dr. R.K. Menon", subject: "Administration", qualifications: "Ph.D. Education, M.Sc Physics", experience: 25 },
            { name: "Mrs. Sunita Verma", subject: "Mathematics", qualifications: "M.Sc Maths, B.Ed", experience: 18 },
            { name: "Mr. Rajiv Joshi", subject: "Physics", qualifications: "M.Sc Physics, B.Ed", experience: 15 },
            { name: "Ms. Anita Desai", subject: "English Literature", qualifications: "M.A. English, B.Ed", experience: 12 },
            { name: "Mr. Arun Kumar", subject: "Physical Education", qualifications: "B.P.Ed, NIS Coach", experience: 10 }
          ]);
        }
        setLoading(false);
      })
      .catch(() => {
        setFaculty([
          { name: "Dr. R.K. Menon", subject: "Administration", qualifications: "Ph.D. Education, M.Sc Physics", experience: 25 },
          { name: "Mrs. Sunita Verma", subject: "Mathematics", qualifications: "M.Sc Maths, B.Ed", experience: 18 },
          { name: "Mr. Rajiv Joshi", subject: "Physics", qualifications: "M.Sc Physics, B.Ed", experience: 15 },
          { name: "Ms. Anita Desai", subject: "English Literature", qualifications: "M.A. English, B.Ed", experience: 12 },
          { name: "Mr. Arun Kumar", subject: "Physical Education", qualifications: "B.P.Ed, NIS Coach", experience: 10 }
        ]);
        setLoading(false);
      });
  }, []);

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
            <li><Link href="/faculty" style={{ color: 'var(--gold)' }}>Faculty</Link></li>
            <li><Link href="/alumni">Alumni Wall</Link></li>
            <li><Link href="/campus">Campus</Link></li>
            <li><Link href="/admissions" className="btn btn-gold btn-sm" style={{ color: 'var(--navy)' }}>Apply</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section" style={{ background: 'var(--navy)', color: 'white', padding: '80px 0 60px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '150%', height: '200%', background: 'radial-gradient(circle at top, rgba(212,175,55,0.1) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="overline" style={{ color: 'var(--gold)' }}>Academic Leaders</p>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Our Faculty</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            Meet the exceptional educators driving holistic development and academic excellence at Delhi Excellence Public School.
          </p>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="section section-alt" style={{ minHeight: '60vh' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading teaching staff...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
              {faculty.map((member, i) => (
                <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                  
                  {/* Avatar / Image */}
                  <div style={{ background: 'linear-gradient(135deg, var(--navy), #1A365D)', height: '200px', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Placeholder Circle if no real image */}
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--white)', border: '4px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                      👩‍🏫
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '24px', flex: 1, textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--navy)', marginBottom: '8px', fontSize: '1.4rem' }}>{member.name}</h3>
                    <div style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {member.subject}
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(0,0,0,0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Degrees</div>
                        <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{member.qualifications}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Experience</div>
                        <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{member.experience} Years</div>
                      </div>
                    </div>
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
