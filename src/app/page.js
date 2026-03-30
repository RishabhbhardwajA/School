'use client';
import { useState, useEffect, useRef } from 'react';

/* ====== SCROLL REVEAL HOOK ====== */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const els = ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ====== COUNTER ANIMATION ====== */
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const num = parseInt(target);
        const duration = 2000;
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= num) { setCount(num); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ====== ANNOUNCEMENT BAR ====== */
function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState([
    '🎓 Admissions Open for 2026-27 — Limited Seats Available!',
    '🏆 100% Board Results — 5th Consecutive Year of Excellence',
    '📅 Annual Sports Day — March 15, 2026',
    '📞 Call +91 11-2345-6789 for Admission Enquiry',
  ]);
  useEffect(() => {
    fetch('/api/announcements').then(r => r.json()).then(d => {
      if (d.data?.length) setAnnouncements(d.data.map(a => a.text));
    }).catch(() => {});
  }, []);
  return (
    <div className="announcement-bar">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {announcements.map((a, i) => <span key={`a1-${i}`}>{a}</span>)}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {announcements.map((a, i) => <span key={`a2-${i}`}>{a}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ====== NAVBAR ====== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="/" className="nav-logo">
          <div className="logo-icon">DE</div>
          <div className="logo-text">
            <h3>Delhi Excellence</h3>
            <small>Public School — CBSE Affiliated</small>
          </div>
        </a>
        <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <li><a href="#about">About</a></li>
          <li>
            <a href="#academics">Academics ▾</a>
            <div className="dropdown-menu">
              <a href="#academics">Curriculum</a>
              <a href="#academics">Streams</a>
              <a href="#facilities">Smart Classrooms</a>
              <a href="#achievements">Results</a>
            </div>
          </li>
          <li>
            <a href="/admissions">Admissions ▾</a>
            <div className="dropdown-menu">
              <a href="/admissions">Admission Process</a>
              <a href="/admissions#fees">Fee Structure</a>
              <a href="/admissions#eligibility">Eligibility</a>
              <a href="/admissions#documents">Documents</a>
              <a href="/admissions#apply">Apply Online</a>
            </div>
          </li>
          <li><a href="#facilities">Facilities</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-cta">
          <a href="/admissions#apply" className="btn btn-gold btn-sm">Apply Now</a>
        </div>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}

/* ====== HERO ====== */
function Hero() {
  return (
    <section className="hero" style={{ background: `url('/hero-school.png') center/cover no-repeat` }}>
      <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,31,63,0.95) 0%, rgba(10,31,63,0.6) 60%, rgba(10,31,63,0.1) 100%)', zIndex: 1 }}></div>
      <div className="hero-pattern" style={{ zIndex: 1, opacity: 0.5 }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
        <div className="hero-content" style={{ maxWidth: '700px' }}>
          <p className="overline" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>CBSE Affiliated • Estd. 1985 • Delhi</p>
          <h1 style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>Shaping <span>Future Leaders</span> Since 1985</h1>
          <p style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)', fontWeight: '500' }}>Where academic excellence meets holistic development. Join Delhi&apos;s premier institution with 38+ years of legacy, 100% board results, and world-class facilities.</p>
          <div className="hero-ctas">
            <a href="/admissions#apply" className="btn btn-gold btn-lg">Schedule Campus Visit</a>
            <a href="/admissions" className="btn btn-outline btn-lg">Download Prospectus</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== TRUST BAR ====== */
function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="container">
        <div className="trust-bar-grid">
          <div className="trust-item"><h3><AnimatedCounter target="38" suffix="+" /></h3><p>Years of Legacy</p></div>
          <div className="trust-item"><h3><AnimatedCounter target="100" suffix="%" /></h3><p>Board Results</p></div>
          <div className="trust-item"><h3><AnimatedCounter target="15000" suffix="+" /></h3><p>Successful Alumni</p></div>
          <div className="trust-item"><h3><AnimatedCounter target="250" suffix="+" /></h3><p>Awards Won</p></div>
        </div>
      </div>
    </section>
  );
}

/* ====== ABOUT ====== */
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text reveal-left">
            <p className="overline">About Us</p>
            <h2>A Legacy of Excellence Since 1985</h2>
            <p>Delhi Excellence Public School stands as a beacon of quality education in the heart of the capital. For over 38 years, we have been nurturing young minds with a perfect blend of academic rigor and holistic development.</p>
            <p>Affiliated with CBSE and recognized by the Government of NCT Delhi, our institution has consistently delivered 100% board results while fostering creativity, sportsmanship, and strong moral values rooted in Indian traditions with a global outlook.</p>
            <a href="#principal" className="btn btn-navy" style={{marginTop: '20px'}}>Principal&apos;s Message →</a>
          </div>
          <div className="about-image reveal-right">
            <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop" alt="Delhi Excellence Public School Campus" />
          </div>
        </div>
        <div className="values-grid" style={{marginTop: '60px'}}>
          <div className="value-card glass-card reveal stagger-1">
            <div className="icon">👁️</div>
            <h4>Our Vision</h4>
            <p>To nurture global citizens rooted in Indian values, equipped for the challenges of tomorrow.</p>
          </div>
          <div className="value-card glass-card reveal stagger-2">
            <div className="icon">🧭</div>
            <h4>Our Mission</h4>
            <p>Delivering holistic education through innovation, discipline, and compassionate mentorship.</p>
          </div>
          <div className="value-card glass-card reveal stagger-3">
            <div className="icon">🛡️</div>
            <h4>Core Values</h4>
            <p>Integrity, Excellence, Compassion, Leadership — the four pillars of our educational philosophy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== PRINCIPAL ====== */
function Principal() {
  return (
    <section id="principal" className="section section-navy">
      <div className="container">
        <div className="principal-grid reveal">
          <div className="principal-photo">
            <div className="photo-ring">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face" alt="Principal Dr. Rajesh Kumar Sharma" />
            </div>
          </div>
          <div className="principal-message">
            <div className="quote-mark">&ldquo;</div>
            <p className="overline">Principal&apos;s Message</p>
            <blockquote>Dear Parents, at Delhi Excellence Public School, we believe every child carries limitless potential. Our commitment extends beyond textbooks — we shape character, build resilience, and inspire lifelong learning. With 38 years of trust, we promise your child a journey of growth, safety, and unmatched academic rigor. Welcome to our family.</blockquote>
            <div className="signature">
              <div className="gold-line"></div>
              <div className="signature-text">
                <h4>Dr. Rajesh Kumar Sharma</h4>
                <p>M.Ed, Ph.D — Principal, Delhi Excellence Public School</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== FACILITIES ====== */
function Facilities() {
  const facilities = [
    { image: '/fac-classroom.png', title: 'Smart Classrooms', desc: 'Interactive digital boards and projectors in every classroom for immersive learning.' },
    { image: '/fac-lab.png', title: 'Science & Computer Labs', desc: 'State-of-the-art laboratories for Physics, Chemistry, Biology, and Computer Science.' },
    { image: '/fac-pool.png', title: 'Olympic Swimming Pool', desc: 'Temperature-controlled 25m swimming pool with certified coaches and lifeguards.' },
    { image: '/fac-sports.png', title: 'Indoor Sports Complex', desc: 'Basketball, badminton, table tennis courts with international-standard flooring.' },
    { image: '/fac-library.png', title: 'Library & Media Center', desc: '20,000+ books, digital resources, quiet study zones, and a multimedia corner.' },
    { image: '/fac-auditorium.png', title: 'Auditorium (1000+ Seats)', desc: 'Acoustically designed performance hall for events, seminars, and cultural programs.' },
  ];
  return (
    <section id="facilities" className="section section-alt">
      <div className="container">
        <div className="section-header reveal">
          <p className="overline">Our Campus</p>
          <h2>A 50-Acre Campus Designed for Excellence</h2>
          <p>World-class infrastructure that inspires learning, creativity, and growth.</p>
        </div>
        <div className="facilities-grid">
          {facilities.map((f, i) => (
            <div className={`facility-card glass-card reveal stagger-${i % 3 + 1}`} key={i}>
              <div className="card-image" style={{ background: 'none' }}>
                <img src={f.image} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="gold-accent"></div>
              <div className="card-body">
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign: 'center', marginTop: '40px'}} className="reveal">
          <a href="#gallery" className="btn btn-gold">Take a Virtual Campus Tour →</a>
        </div>
      </div>
    </section>
  );
}

/* ====== ACADEMICS ====== */
function Academics() {
  const [activeTab, setActiveTab] = useState(4);
  const tabs = ['Pre-Primary', 'Primary', 'Middle', 'Secondary', 'Sr. Secondary'];
  const allStreams = [
    [{ title: 'Foundational Learning', subjects: ['Phonics & Literacy', 'Numeracy Skills', 'Creative Arts', 'Physical Play', 'Rhymes & Storytelling'], path: 'Early Childhood Development' }],
    [{ title: 'Primary Years (I-V)', subjects: ['English & Hindi', 'Mathematics', 'EVS / General Science', 'Computer Basics', 'Art & Craft'], path: 'Base Building & Exploration' }],
    [{ title: 'Middle Years (VI-VIII)', subjects: ['English, Hindi, 3rd Lang', 'Mathematics', 'Science', 'Social Science', 'IT Skills'], path: 'Pre-Secondary Foundation' }],
    [{ title: 'Secondary (IX-X)', subjects: ['English', 'Hindi Course A/B', 'Mathematics', 'Science', 'Social Science, IT'], path: 'Board Exam Preparation' }],
    [
      { title: 'Science (PCM/PCB)', subjects: ['Physics', 'Chemistry', 'Mathematics / Biology', 'English', 'Computer Science / Physical Ed.'], path: 'Engineering, Medicine, Research' },
      { title: 'Commerce', subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'], path: 'CA, MBA, Banking, Finance' },
      { title: 'Humanities', subjects: ['History', 'Political Science', 'Geography / Psychology', 'Economics', 'English'], path: 'Law, Civil Services, Journalism' }
    ]
  ];
  return (
    <section id="academics" className="section" style={{ minHeight: '600px' }}>
      <div className="container">
        <div className="section-header reveal">
          <p className="overline">Curriculum</p>
          <h2>Academic Excellence at Every Level</h2>
          <p>CBSE affiliated curriculum with emphasis on conceptual understanding and practical application.</p>
        </div>
        <div className="academics-tabs reveal">
          {tabs.map((t, i) => (
            <button key={i} className={`tab-btn ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>{t}</button>
          ))}
        </div>
        <div className="streams-grid" style={{ opacity: 1, visibility: 'visible', display: 'grid' }}>
          {(allStreams[activeTab] || []).map((s, i) => (
            <div className="stream-card glass-card" key={`stream-${activeTab}-${i}`} style={{ transform: 'none', opacity: 1 }}>
              <h4>{s.title}</h4>
              <ul>{s.subjects.map((sub, j) => <li key={`sub-${j}`}>{sub}</li>)}</ul>
              <p style={{marginTop: '16px', fontSize: '0.82rem', color: 'var(--gold-dark)', fontWeight: '600'}}>Career: {s.path}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== ACHIEVEMENTS ====== */
function Achievements() {
  return (
    <section id="achievements" className="section section-alt">
      <div className="container">
        <div className="section-header reveal">
          <p className="overline">Our Pride</p>
          <h2>Numbers That Speak Excellence</h2>
        </div>
        <div className="stats-grid">
          {[
            { num: '38', suf: '+', label: 'Years of Legacy' },
            { num: '100', suf: '%', label: 'Board Pass Rate' },
            { num: '15000', suf: '+', label: 'Successful Alumni' },
            { num: '250', suf: '+', label: 'Awards Won' },
          ].map((s, i) => (
            <div className={`stat-card reveal stagger-${i + 1}`} key={i}>
              <div className="stat-number"><AnimatedCounter target={s.num} suffix={s.suf} /></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="university-logos reveal">
          {['IIT Delhi', 'AIIMS', 'Delhi University', 'JNU', 'BITS Pilani', 'NIT', 'LSR', 'SRCC', 'Oxford', 'Cambridge'].map((u, i) => (
            <span key={i}>{u}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== TESTIMONIALS ====== */
function Testimonials() {
  const testimonials = [
    { name: 'Mrs. Priya Sharma', role: 'Parent — Class VIII', quote: 'The transformation in my son\'s confidence and academics since joining DEPS has been remarkable. The teachers here truly care about each child\'s individual growth.', initials: 'PS' },
    { name: 'Mr. Anil Gupta', role: 'Parent — Class X', quote: 'From world-class facilities to a dedicated faculty — DEPS is the best investment we made for our daughter\'s future. Their attention to discipline and values is exceptional.', initials: 'AG' },
    { name: 'Ananya Verma', role: 'Alumna, Batch 2022 — IIT Delhi', quote: 'DEPS shaped who I am today. The discipline, values, and friendships I built here are the foundations for my success. Forever grateful to my mentors.', initials: 'AV' },
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="section-header reveal">
          <p className="overline">What Parents Say</p>
          <h2>Trusted by 5,000+ Families</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className={`testimonial-card glass-card reveal stagger-${i + 1}`} key={i}>
              <div className="quote-icon">&ldquo;</div>
              <div className="stars">★★★★★</div>
              <p className="quote">{t.quote}</p>
              <div className="author">
                <div className="author-avatar">{t.initials}</div>
                <div className="author-info">
                  <h5>{t.name}</h5>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== EVENTS ====== */
function Events() {
  const events = [
    { date: 'March 15, 2026', title: 'Annual Sports Day', desc: 'Inter-house athletics, swimming, and team sports competitions.', tag: 'Sports' },
    { date: 'April 5, 2026', title: 'Science Exhibition', desc: 'Student-led innovations and working models showcase.', tag: 'Academic' },
    { date: 'April 20, 2026', title: 'Parent-Teacher Meet', desc: 'Quarterly academic review and progress discussion.', tag: 'Notice' },
  ];
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header reveal">
          <p className="overline">Latest Updates</p>
          <h2>Stay Connected</h2>
        </div>
        <div className="events-grid">
          {events.map((e, i) => (
            <div className={`event-card glass-card reveal stagger-${i + 1}`} key={i}>
              <div className="event-date">{e.date}</div>
              <div className="event-body">
                <h4>{e.title}</h4>
                <p>{e.desc}</p>
                <span className="event-tag">{e.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== SAFETY ====== */
function Safety() {
  const items = [
    { icon: '📹', title: 'CCTV Surveillance' },
    { icon: '🛡️', title: 'Trained Security' },
    { icon: '🏥', title: 'Medical Room' },
    { icon: '🚌', title: 'GPS-Tracked Buses' },
    { icon: '👶', title: 'Child Protection' },
  ];
  return (
    <section className="section section-navy">
      <div className="container">
        <div className="section-header reveal">
          <p className="overline" style={{color: 'var(--gold-light)'}}>Safety & Security</p>
          <h2>Your Child&apos;s Safety is Our Priority</h2>
          <p>Multi-layered security systems ensuring a safe and nurturing environment.</p>
        </div>
        <div className="safety-grid">
          {items.map((item, i) => (
            <div className={`safety-item reveal stagger-${i + 1}`} key={i}>
              <div className="safety-icon">{item.icon}</div>
              <h5>{item.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== GALLERY PREVIEW ====== */
function GalleryPreview() {
  const images = [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400&h=400&fit=crop',
  ];
  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="section-header reveal">
          <p className="overline">Gallery</p>
          <h2>Life at Delhi Excellence</h2>
        </div>
        <div className="gallery-grid reveal">
          {images.map((img, i) => (
            <div className="gallery-item" key={i}>
              <img src={img} alt={`Campus life ${i + 1}`} loading="lazy" />
              <div className="gallery-overlay"><p>Campus Life</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== FAQ ====== */
function FAQ() {
  const faqs = [
    { q: 'What is the student-teacher ratio?', a: 'We maintain a healthy 1:25 student-teacher ratio to ensure personalized attention for every child.' },
    { q: 'What are the school timings?', a: 'Summer: 7:30 AM - 2:30 PM | Winter: 8:00 AM - 3:00 PM. Pre-primary has shorter hours.' },
    { q: 'What safety measures are in place?', a: 'We have 200+ CCTV cameras, trained security guards, visitor management system, GPS-tracked buses with female attendants, on-campus medical room, and a strict child protection policy.' },
    { q: 'Are scholarships available?', a: 'Yes, merit-based scholarships are offered to top performers in entrance tests and board exams. Up to 50% fee waiver available.' },
    { q: 'Do you provide transport?', a: 'Yes, a fleet of 40+ AC buses covers all major Delhi NCR routes with GPS tracking and trained staff.' },
    { q: 'How can parents track student progress?', a: 'Through our Parent Portal app, quarterly PTMs, and regular SMS/email updates on attendance and grades.' },
  ];
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header reveal">
          <p className="overline">FAQ</p>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details className="faq-details glass-card reveal" key={i}>
              <summary className="faq-summary">
                {f.q}
                <span className="faq-custom-icon">+</span>
              </summary>
              <div className="faq-content">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== CONTACT ====== */
function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // MOCK SUBMISSION FOR DEMO
    setTimeout(() => {
      setStatus({ type: 'success', text: 'Thank you! We will get back to you shortly.' });
      setForm({ name: '', phone: '', email: '', message: '' });
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header reveal">
          <p className="overline">Get In Touch</p>
          <h2>We&apos;d Love to Hear From You</h2>
        </div>
        <div className="contact-grid">
          <div className="reveal-left">
            <div className="contact-info-item">
              <div className="info-icon">📍</div>
              <div><h5>Address</h5><p>NH-8, Dwarka Sector 21, New Delhi — 110077</p></div>
            </div>
            <div className="contact-info-item">
              <div className="info-icon">📞</div>
              <div><h5>Phone</h5><p>+91 11-2345-6789 | +91 98765-43210</p></div>
            </div>
            <div className="contact-info-item">
              <div className="info-icon">✉️</div>
              <div><h5>Email</h5><p>info@delhiexcellence.edu.in</p></div>
            </div>
            <div className="contact-info-item">
              <div className="info-icon">🕐</div>
              <div><h5>Office Hours</h5><p>Mon - Sat: 8:00 AM - 4:00 PM</p></div>
            </div>
          </div>
          <div className="reveal-right">
            {status?.type === 'success' && <div className="form-message success">✅ {status.text}</div>}
            {status?.type === 'error' && <div className="form-message error">❌ {status.text}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required placeholder="How can we help you?" />
              </div>
              <button type="submit" className="btn btn-gold btn-lg" disabled={loading} style={{width: '100%'}}>
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </div>
        </div>
        <div className="map-container reveal">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.7036232518396!2d77.0517!3d28.5633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMzJzQ4LjAiTiA3N8KwMDMnMDYuMSJF!5e0!3m2!1sen!2sin!4v1700000000000"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Delhi Excellence Public School Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

/* ====== FOOTER ====== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-text">Delhi Excellence Public School</div>
            <p>Shaping future leaders with a perfect blend of academic excellence and holistic development since 1985. CBSE Affiliated.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">ig</a>
              <a href="#" aria-label="Twitter">tw</a>
              <a href="#" aria-label="YouTube">yt</a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About School</a></li>
              <li><a href="#academics">Academics</a></li>
              <li><a href="/admissions">Admissions</a></li>
              <li><a href="#facilities">Facilities</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4>Academics</h4>
            <ul className="footer-links">
              <li><a href="#academics">Pre-Primary</a></li>
              <li><a href="#academics">Primary School</a></li>
              <li><a href="#academics">Middle School</a></li>
              <li><a href="#academics">Secondary</a></li>
              <li><a href="#academics">Sr. Secondary</a></li>
              <li><a href="#achievements">Results</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><span className="icon">📍</span> NH-8, Dwarka Sector 21, New Delhi — 110077</p>
            <p><span className="icon">📞</span> +91 11-2345-6789</p>
            <p><span className="icon">✉️</span> info@delhiexcellence.edu.in</p>
            <p><span className="icon">🕐</span> Mon-Sat: 8:00 AM - 4:00 PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Delhi Excellence Public School. All Rights Reserved.</p>
          <p>CBSE Affiliation No: 2730XXX | Privacy Policy | Terms</p>
        </div>
      </div>
    </footer>
  );
}

/* ====== MAIN PAGE ====== */
export default function HomePage() {
  const pageRef = useReveal();
  return (
    <div ref={pageRef}>
      <Navbar />
      <AnnouncementBar />
      <Hero />
      <TrustBar />
      <About />
      <Principal />
      <Facilities />
      <Academics />
      <Achievements />
      <Testimonials />
      <Events />
      <Safety />
      <GalleryPreview />
      <FAQ />
      <ContactSection />
      <Footer />
    </div>
  );
}
