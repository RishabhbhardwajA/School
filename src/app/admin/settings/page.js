'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    heroHeadline: '',
    heroSubheadline: '',
    aboutText: '',
    contactPhone: '',
    contactEmail: '',
    contactAddress: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) { router.push('/admin/login'); return; }
      try {
        const res = await fetch('/api/settings', { headers: { Authorization: `Bearer ${token}` } });
        const textData = await res.json();
        if (textData.success && textData.data) {
          setSettings(textData.data);
        } else {
          router.push('/admin/login');
        }
      } catch {
        router.push('/admin/login');
      }
      setLoading(false);
    };
    fetchData();
  }, [router]);

  const handleChange = (e) => setSettings({ ...settings, [e.target.name]: e.target.value });

  const saveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(settings),
      });
      if (res.ok) setMsg('Settings saved successfully!');
      else setMsg('Failed to save settings.');
    } catch {
      setMsg('Connection error.');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 4000);
  };

  if (loading) return <div className="admin-layout"><AdminSidebar active="Settings" /><main className="admin-main">Loading...</main></div>;

  return (
    <div className="admin-layout">
      <AdminSidebar active="Settings" />
      <main className="admin-main">
        <div className="admin-header">
          <h1>Site Settings</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Update the text across the public website</p>
        </div>

        {msg && (
          <div style={{ background: msg.includes('success') ? '#E8F5E9' : '#FFEBEE', color: msg.includes('success') ? '#1B5E20' : '#B71C1C', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
            {msg}
          </div>
        )}

        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
          <form style={{ display: 'grid', gap: '24px' }} onSubmit={saveSettings}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--outline)' }}>Hero Section</h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Main Headline</label>
                  <input type="text" name="heroHeadline" value={settings.heroHeadline || ''} onChange={handleChange}
                    style={{ width: '100%', padding: '12px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Sub Headline</label>
                  <textarea name="heroSubheadline" value={settings.heroSubheadline || ''} onChange={handleChange} rows={2}
                    style={{ width: '100%', padding: '12px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)', resize: 'vertical' }} />
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--outline)', marginTop: '16px' }}>About Us Section</h3>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Description Text</label>
                <textarea name="aboutText" value={settings.aboutText || ''} onChange={handleChange} rows={4}
                  style={{ width: '100%', padding: '12px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)', resize: 'vertical' }} />
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--outline)', marginTop: '16px' }}>Contact Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>School Phone Number</label>
                  <input type="text" name="contactPhone" value={settings.contactPhone || ''} onChange={handleChange}
                    style={{ width: '100%', padding: '12px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>School Email</label>
                  <input type="email" name="contactEmail" value={settings.contactEmail || ''} onChange={handleChange}
                    style={{ width: '100%', padding: '12px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)' }} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Full Address</label>
                  <input type="text" name="contactAddress" value={settings.contactAddress || ''} onChange={handleChange}
                    style={{ width: '100%', padding: '12px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)' }} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <button type="submit" className="btn btn-gold" disabled={saving} style={{ padding: '14px 32px', fontSize: '1rem' }}>
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
