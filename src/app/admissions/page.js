'use client';
import { useState, useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function AdmissionsPage() {
  const pageRef = useReveal();
  const [form, setForm] = useState({ studentName: '', parentName: '', phone: '', email: '', classApplying: '', dob: '', gender: '', address: '', previousSchool: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // MOCK SUBMISSION FOR DEMO
    setTimeout(() => {
      setStatus('success'); 
      setForm({ studentName: '', parentName: '', phone: '', email: '', classApplying: '', dob: '', gender: '', address: '', previousSchool: '', message: '' });
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }, 1500);
  };

  return (
    <div ref={pageRef}>
      {/* Navbar */}
      <nav className="navbar scrolled">
        <div className="navbar-inner">
          <a href="/" className="nav-logo">
            <div className="logo-icon">DE</div>
            <div className="logo-text"><h3>Delhi Excellence</h3><small>Public School — CBSE Affiliated</small></div>
          </a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#academics">Academics</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#fees">Fees</a></li>
            <li><a href="#apply">Apply</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
          <div className="nav-cta"><a href="#apply" className="btn btn-gold btn-sm">Apply Now</a></div>
        </div>
      </nav>

      {/* Hero */}
      <section className="section section-navy" style={{ paddingTop: '140px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="overline" style={{ color: 'var(--gold-light)' }}>Admissions 2026-27</p>
          <h1 style={{ color: 'white', marginBottom: '16px' }}>Your Child&apos;s Journey Begins Here</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '600px', margin: '0 auto 32px', fontSize: '1.1rem' }}>
            Limited seats available for the academic session 2026-27. Join Delhi&apos;s premier institution.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#apply" className="btn btn-gold btn-lg">Apply Online</a>
            <a href="#fees" className="btn btn-outline btn-lg">View Fee Structure</a>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section id="process" className="section">
        <div className="container">
          <div className="section-header reveal">
            <p className="overline">Admission Process</p>
            <h2>4 Simple Steps to Enroll</h2>
          </div>
          <div className="steps-grid">
            {[
              { num: '1', title: 'Online Registration', desc: 'Fill the online application form with student and parent details.' },
              { num: '2', title: 'Entrance Assessment', desc: 'Written test and interaction round as per class applied.' },
              { num: '3', title: 'Campus Visit', desc: 'Visit the school, meet faculty, and explore our facilities.' },
              { num: '4', title: 'Admission Offer', desc: 'Receive confirmation letter and complete enrollment formalities.' },
            ].map((s, i) => (
              <div className={`step-card glass-card reveal stagger-${i + 1}`} key={i}>
                <div className="step-number">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section id="eligibility" className="section section-alt">
        <div className="container">
          <div className="section-header reveal">
            <p className="overline">Eligibility</p>
            <h2>Age Criteria & Requirements</h2>
          </div>
          <div className="fee-table-wrapper reveal">
            <table className="fee-table">
              <thead><tr><th>Class</th><th>Age Requirement</th><th>Admission Basis</th></tr></thead>
              <tbody>
                <tr><td>Pre-Primary (Nursery)</td><td>3+ years as on March 31</td><td>Interaction</td></tr>
                <tr><td>Primary (Class I)</td><td>5.5+ years as on March 31</td><td>Interaction + Activity</td></tr>
                <tr><td>Class VI</td><td>10+ years</td><td>Written Test + Interview</td></tr>
                <tr><td>Class IX</td><td>13+ years</td><td>Written Test + Interview</td></tr>
                <tr><td>Class XI</td><td>Based on Class X results</td><td>Merit + Counselling</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section id="documents" className="section">
        <div className="container">
          <div className="section-header reveal">
            <p className="overline">Documents</p>
            <h2>Required Documents</h2>
          </div>
          <div className="streams-grid reveal">
            {[
              ['Birth Certificate', 'Aadhaar Card (Student + Parents)', 'Previous School TC'],
              ['Report Card (Last 2 years)', '4 Passport Size Photos', 'Medical Fitness Certificate'],
              ['Address Proof', 'Caste Certificate (if applicable)', 'Transfer Certificate (if applicable)'],
            ].map((group, gi) => (
              <div className="stream-card" key={gi}>
                <ul>{group.map((doc, di) => <li key={di}>✓ {doc}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section id="fees" className="section section-alt">
        <div className="container">
          <div className="section-header reveal">
            <p className="overline">Fee Structure</p>
            <h2>Transparent Fee Details — 2026-27</h2>
          </div>
          <div className="fee-table-wrapper reveal">
            <table className="fee-table">
              <thead>
                <tr><th>Class Group</th><th>Annual Tuition</th><th>Development Fee</th><th>Activity Fee</th><th>Total Annual</th></tr>
              </thead>
              <tbody>
                <tr><td>Nursery - KG</td><td className="amount">₹85,000</td><td>₹15,000</td><td>₹10,000</td><td className="amount">₹1,10,000</td></tr>
                <tr><td>Class I - V</td><td className="amount">₹95,000</td><td>₹15,000</td><td>₹12,000</td><td className="amount">₹1,22,000</td></tr>
                <tr><td>Class VI - VIII</td><td className="amount">₹1,05,000</td><td>₹18,000</td><td>₹12,000</td><td className="amount">₹1,35,000</td></tr>
                <tr><td>Class IX - X</td><td className="amount">₹1,15,000</td><td>₹20,000</td><td>₹15,000</td><td className="amount">₹1,50,000</td></tr>
                <tr><td>Class XI - XII</td><td className="amount">₹1,25,000</td><td>₹22,000</td><td>₹18,000</td><td className="amount">₹1,65,000</td></tr>
              </tbody>
            </table>
          </div>
          <div className="reveal" style={{ marginTop: '24px', padding: '20px', background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline)' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <strong>Note:</strong> Fees payable in quarterly installments. One-time admission fee: ₹25,000 (non-refundable). Transport fee extra based on route distance. Sibling discount: 10% on tuition fee.
            </p>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <p className="overline">Important Dates</p>
            <h2>Admission Calendar 2026-27</h2>
          </div>
          <div className="events-grid">
            {[
              { date: 'Nov 1, 2025', title: 'Registration Opens', desc: 'Online and offline registration begins.' },
              { date: 'Feb 15, 2026', title: 'Last Date to Apply', desc: 'Final deadline for application submission.' },
              { date: 'Mar 1, 2026', title: 'Entrance Test', desc: 'Written test for Classes VI and above.' },
              { date: 'Mar 15, 2026', title: 'Results Declared', desc: 'Admission test results published.' },
              { date: 'Every Saturday', title: 'Campus Visit Days', desc: 'By appointment — call admissions office.' },
              { date: 'Apr 1, 2026', title: 'Session Begins', desc: 'New academic session starts.' },
            ].map((e, i) => (
              <div className={`event-card reveal stagger-${(i % 3) + 1}`} key={i}>
                <div className="event-date">{e.date}</div>
                <div className="event-body"><h4>{e.title}</h4><p>{e.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header reveal">
            <p className="overline">Resources</p>
            <h2>Quick Downloads</h2>
          </div>
          <div className="downloads-grid">
            {[
              { icon: '📄', title: 'School Prospectus 2026-27', size: 'PDF • 4.2 MB' },
              { icon: '📝', title: 'Application Form', size: 'PDF • 1.1 MB' },
              { icon: '💰', title: 'Fee Structure Details', size: 'PDF • 800 KB' },
              { icon: '📅', title: 'Academic Calendar', size: 'PDF • 1.5 MB' },
              { icon: '📋', title: 'School Rules & Guidelines', size: 'PDF • 2.3 MB' },
              { icon: '🚌', title: 'Transport Route Map', size: 'PDF • 3.0 MB' },
            ].map((d, i) => (
              <div className={`download-card glass-card reveal stagger-${(i % 3) + 1}`} key={i}>
                <div className="dl-icon">{d.icon}</div>
                <div className="dl-info"><h5>{d.title}</h5><p>{d.size}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section id="apply" className="section section-navy">
        <div className="container">
          <div className="section-header reveal">
            <p className="overline" style={{ color: 'var(--gold-light)' }}>Apply Online</p>
            <h2>Admission Application Form</h2>
            <p>Fill in the details below and our admissions team will contact you within 24 hours.</p>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {status === 'success' && <div className="form-message success">✅ Application submitted successfully! We will contact you shortly.</div>}
            {status === 'error' && <div className="form-message error">❌ Something went wrong. Please try again.</div>}
            <form onSubmit={handleSubmit} className="reveal" style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(10px)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <div className="form-row">
                <div className="form-group">
                  <label style={{color: 'var(--gold-light)'}}>Student Name *</label>
                  <input type="text" value={form.studentName} onChange={e => setForm({...form, studentName: e.target.value})} required placeholder="Full name of student" style={{background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.15)'}} />
                </div>
                <div className="form-group">
                  <label style={{color: 'var(--gold-light)'}}>Parent/Guardian Name *</label>
                  <input type="text" value={form.parentName} onChange={e => setForm({...form, parentName: e.target.value})} required placeholder="Full name" style={{background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.15)'}} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label style={{color: 'var(--gold-light)'}}>Phone *</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required placeholder="+91 XXXXX XXXXX" style={{background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.15)'}} />
                </div>
                <div className="form-group">
                  <label style={{color: 'var(--gold-light)'}}>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="parent@email.com" style={{background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.15)'}} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label style={{color: 'var(--gold-light)'}}>Class Applying For *</label>
                  <select value={form.classApplying} onChange={e => setForm({...form, classApplying: e.target.value})} required style={{background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.15)'}}>
                    <option value="">Select Class</option>
                    <option value="Nursery">Nursery</option><option value="KG">KG</option>
                    <option value="I">Class I</option><option value="II">Class II</option><option value="III">Class III</option><option value="IV">Class IV</option><option value="V">Class V</option>
                    <option value="VI">Class VI</option><option value="VII">Class VII</option><option value="VIII">Class VIII</option>
                    <option value="IX">Class IX</option><option value="X">Class X</option><option value="XI">Class XI</option><option value="XII">Class XII</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{color: 'var(--gold-light)'}}>Date of Birth</label>
                  <input type="date" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} style={{background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.15)'}} />
                </div>
              </div>
              <div className="form-group">
                <label style={{color: 'var(--gold-light)'}}>Previous School</label>
                <input type="text" value={form.previousSchool} onChange={e => setForm({...form, previousSchool: e.target.value})} placeholder="Name of previous school (if any)" style={{background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.15)'}} />
              </div>
              <div className="form-group">
                <label style={{color: 'var(--gold-light)'}}>Additional Message</label>
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Any specific requirements or questions..." rows={4} style={{background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.15)'}} />
              </div>
              <button type="submit" className="btn btn-gold btn-lg" disabled={loading} style={{width: '100%'}}>
                {loading ? 'Submitting Application...' : '📩 Submit Admission Application'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>© 2026 Delhi Excellence Public School. All Rights Reserved.</p>
            <p>CBSE Affiliation No: 2730XXX</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
