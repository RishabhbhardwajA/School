'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FeeCalculator() {
  const [routes, setRoutes] = useState([]);
  
  // Calculator State
  const [selectedClass, setSelectedClass] = useState('Primary'); // Pre-Primary, Primary, Middle, Senior
  const [transportNeeded, setTransportNeeded] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState('');
  const [mealPlan, setMealPlan] = useState(false);

  useEffect(() => {
    fetch('/api/transport').then(r => r.json()).then(d => {
      if (d.success) setRoutes(d.data);
    }).catch(() => {});
  }, []);

  // Base Fees
  const classFees = {
    'Pre-Primary': { tuition: 5000, lab: 0, activity: 1000 },
    'Primary': { tuition: 6500, lab: 500, activity: 1200 },
    'Middle': { tuition: 7500, lab: 1000, activity: 1500 },
    'Senior': { tuition: 9000, lab: 2000, activity: 1500 },
  };

  const currentClassRates = classFees[selectedClass];
  
  // Calculate Totals per Month
  let monthlyTotal = currentClassRates.tuition + currentClassRates.lab + currentClassRates.activity;
  
  if (transportNeeded && selectedRouteId) {
    const route = routes.find(r => r._id === selectedRouteId);
    if (route) monthlyTotal += route.monthlyFee;
  }

  if (mealPlan) monthlyTotal += 2000; // Fixed 2000/mo meal plan

  const quarterlyTotal = monthlyTotal * 3;

  return (
    <>
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
            <li><Link href="/campus">Campus</Link></li>
            <li><Link href="/admissions" className="btn btn-gold btn-sm" style={{ color: 'var(--navy)' }}>Apply</Link></li>
          </ul>
        </div>
      </nav>

      <section className="section" style={{ background: 'var(--navy)', color: 'white', padding: '60px 0 40px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Interactive Fee Calculator</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            Estimate your child's quarterly and monthly school fees instantly.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: '#f8fafc', minHeight: '60vh' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px', alignItems: 'start' }}>
          
          {/* Controls */}
          <div className="glass-panel" style={{ background: 'white', padding: '32px' }}>
            <h3 style={{ marginBottom: '24px', color: 'var(--navy)', borderBottom: '2px solid var(--gray-light)', paddingBottom: '12px' }}>1. Select Academic Level</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              {Object.keys(classFees).map(c => (
                <button 
                  key={c}
                  onClick={() => setSelectedClass(c)}
                  style={{ 
                    padding: '16px', 
                    borderRadius: 'var(--radius-md)', 
                    border: `2px solid ${selectedClass === c ? 'var(--gold)' : 'var(--gray-light)'}`,
                    background: selectedClass === c ? 'rgba(212,175,55,0.05)' : 'white',
                    color: 'var(--navy)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >{c}</button>
              ))}
            </div>

            <h3 style={{ marginBottom: '24px', color: 'var(--navy)', borderBottom: '2px solid var(--gray-light)', paddingBottom: '12px' }}>2. Optional Services</h3>
            
            {/* Transport Toggle */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, color: 'var(--navy)', cursor: 'pointer', marginBottom: '12px' }}>
                <input type="checkbox" checked={transportNeeded} onChange={(e) => {
                  setTransportNeeded(e.target.checked);
                  if (!e.target.checked) setSelectedRouteId('');
                }} style={{ width: '20px', height: '20px' }} />
                Requires School Transport (AC Bus)
              </label>

              {transportNeeded && (
                <div style={{ marginLeft: '32px', padding: '16px', background: 'var(--gray-light)', borderRadius: 'var(--radius-md)' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Select Route / Area:</label>
                  <select 
                    value={selectedRouteId} 
                    onChange={e => setSelectedRouteId(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
                  >
                    <option value="">-- Choose your nearest pickup location --</option>
                    {routes.map(r => (
                      <option key={r._id} value={r._id}>{r.routeName} (₹{r.monthlyFee}/mo)</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Meal Plan Toggle */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, color: 'var(--navy)', cursor: 'pointer' }}>
                <input type="checkbox" checked={mealPlan} onChange={(e) => setMealPlan(e.target.checked)} style={{ width: '20px', height: '20px' }} />
                Opt-in for Daily Nutritional Meal Plan (₹2,000/mo)
              </label>
            </div>

          </div>

          {/* Receipt / Output Box */}
          <div style={{ background: 'var(--navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '32px', position: 'sticky', top: '100px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ color: 'var(--gold)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Fee Estimate</span>
              <span>{selectedClass}</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.9 }}>
                <span>Tuition Fee</span>
                <span>₹{currentClassRates.tuition.toLocaleString()}/mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.9 }}>
                <span>Lab & IT Fee</span>
                <span>₹{currentClassRates.lab.toLocaleString()}/mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.9 }}>
                <span>Activity Fee</span>
                <span>₹{currentClassRates.activity.toLocaleString()}/mo</span>
              </div>
              
              {transportNeeded && selectedRouteId && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64B5F6' }}>
                  <span>Transport Fee</span>
                  <span>₹{routes.find(r => r._id === selectedRouteId)?.monthlyFee.toLocaleString()}/mo</span>
                </div>
              )}

              {mealPlan && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64B5F6' }}>
                  <span>Meal Plan</span>
                  <span>₹2,000/mo</span>
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)' }}>Monthly Total</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹{monthlyTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <span style={{ fontSize: '1rem', color: 'var(--gold)' }}>Quarterly Total (Payable)</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--gold)' }}>₹{quarterlyTotal.toLocaleString()}</span>
              </div>
            </div>

            <Link href="/admissions" className="btn btn-gold" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
              Begin Registration
            </Link>
            <p style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.6, marginTop: '16px' }}>
              *Estimate excludes one-time admission & security deposit fee of ₹25,000.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
