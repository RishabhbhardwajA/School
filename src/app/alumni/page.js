'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SubNavbar from '@/components/SubNavbar';

export default function AlumniWall() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/alumni')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setAlumni(data.data);
        } else {
          // Fallback demo data if DB is empty / unconnected
          setAlumni([
            { name: "Dr. Ananya Sharma", passingYear: 2012, currentRole: "Neurosurgeon at AIIMS, Delhi", achievement: "Gold Medalist MBBS" },
            { name: "Rahul Verma", passingYear: 2015, currentRole: "Software Engineer at Google, MTV", achievement: "AIR 24 - JEE Advanced" },
            { name: "Priya Desai", passingYear: 2018, currentRole: "IAS Officer, UP Cadre", achievement: "UPSC Civil Services Rank 8" },
            { name: "Vikram Singh", passingYear: 2010, currentRole: "Founder & CEO, TechNova", achievement: "Forbes 30 Under 30 Asia" }
          ]);
        }
        setLoading(false);
      })
      .catch(() => {
        // Fallback demo data on error
        setAlumni([
          { name: "Dr. Ananya Sharma", passingYear: 2012, currentRole: "Neurosurgeon at AIIMS, Delhi", achievement: "Gold Medalist MBBS" },
          { name: "Rahul Verma", passingYear: 2015, currentRole: "Software Engineer at Google, MTV", achievement: "AIR 24 - JEE Advanced" },
          { name: "Priya Desai", passingYear: 2018, currentRole: "IAS Officer, UP Cadre", achievement: "UPSC Civil Services Rank 8" },
          { name: "Vikram Singh", passingYear: 2010, currentRole: "Founder & CEO, TechNova", achievement: "Forbes 30 Under 30 Asia" }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <SubNavbar activePage="Alumni Wall" />

      {/* Hero Section */}
      <section className="section" style={{ background: 'var(--navy)', color: 'white', padding: '80px 0 60px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0%', left: '0%', width: '100%', height: '100%', background: 'linear-gradient(45deg, rgba(212,175,55,0.1) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="overline" style={{ color: 'var(--gold)' }}>Legacy of Excellence</p>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Wall of Fame</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            Join our 15,000+ strong global alumni network. Discover where our graduates are leading change today.
          </p>
        </div>
      </section>

      {/* Board Results Trust Banner */}
      <section style={{ background: 'var(--gold)', color: 'var(--navy)', padding: '24px 0', textAlign: 'center', fontWeight: 'bold' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '24px' }}>
          <div>🏆 100% CBSE Pass Rate</div>
          <div>🌟 Top 1% in JEE/NEET</div>
          <div>🌍 Admits to Ivy League & Premier Indian Institutes</div>
        </div>
      </section>

      {/* Alumni Grid */}
      <section className="section section-alt" style={{ minHeight: '60vh' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading alumni records...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
              {alumni.map((alum, i) => (
                <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '32px', textAlign: 'center', borderRadius: 'var(--radius-xl)' }}>
                  
                  {/* Avatar Circle */}
                  <div style={{ width: '100px', height: '100px', margin: '0 auto 20px auto', borderRadius: '50%', background: 'var(--navy)', border: '3px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                    🎓
                  </div>

                  <h3 style={{ color: 'var(--navy)', marginBottom: '8px', fontSize: '1.4rem' }}>{alum.name}</h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', fontWeight: 500 }}>
                    Class of {alum.passingYear}
                  </div>
                  
                  <div style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--navy)', padding: '12px 16px', borderRadius: '24px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px', display: 'inline-block' }}>
                    {alum.achievement}
                  </div>

                  <hr style={{ border: 'none', borderBottom: '1px dashed rgba(0,0,0,0.1)', margin: '16px 0' }} />
                  
                  <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                    {alum.currentRole}
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
