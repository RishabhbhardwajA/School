'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');
  const router = useRouter();

  const fetchData = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
    fetch('/api/faqs', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (d.success) setFaqs(d.data); else router.push('/admin/login'); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const addFaq = async (e) => {
    e.preventDefault();
    if (!newQ.trim() || !newA.trim()) return;
    const token = localStorage.getItem('admin_token');
    await fetch('/api/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ q: newQ, a: newA, order: faqs.length }),
    });
    setNewQ('');
    setNewA('');
    fetchData();
  };

  const deleteFaq = async (id) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    const token = localStorage.getItem('admin_token');
    await fetch(`/api/faqs?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchData();
  };

  const toggleActive = async (faq) => {
    const token = localStorage.getItem('admin_token');
    await fetch('/api/faqs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: faq._id, active: !faq.active }),
    });
    fetchData();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar active="FAQs" />
      <main className="admin-main">
        <div className="admin-header">
          <h1>FAQ Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Manage the Frequently Asked Questions displayed on the homepage</p>
        </div>

        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '16px' }}>Add New FAQ</h3>
          <form style={{ display: 'grid', gap: '16px' }} onSubmit={addFaq}>
            <input type="text" value={newQ} onChange={e => setNewQ(e.target.value)} placeholder="Question (e.g. What are the school timings?)" required
              style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem' }} />
            <textarea value={newA} onChange={e => setNewA(e.target.value)} placeholder="Answer..." required rows={3}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)', fontSize: '0.92rem', resize: 'vertical' }} />
            <button type="submit" className="btn btn-gold" style={{ justifySelf: 'start' }}>Save FAQ</button>
          </form>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead><tr><th>Question & Answer</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} style={{ textAlign: 'center', padding: '40px' }}>Loading...</td></tr>
              ) : faqs.length === 0 ? (
                <tr><td colSpan={3} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No FAQs found</td></tr>
              ) : faqs.map((f, i) => (
                <tr key={f._id || i}>
                  <td style={{ maxWidth: '600px' }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>{f.q}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>{f.a}</div>
                  </td>
                  <td><span className={`status-badge ${f.active !== false ? 'approved' : 'rejected'}`}>{f.active !== false ? 'Active' : 'Hidden'}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => toggleActive(f)}
                        style={{ padding: '6px 14px', fontSize: '0.78rem', background: f.active !== false ? '#FFEBEE' : '#E8F5E9', color: f.active !== false ? '#B71C1C' : '#1B5E20', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                        {f.active !== false ? 'Hide' : 'Show'}
                      </button>
                      <button onClick={() => deleteFaq(f._id)}
                        style={{ padding: '6px 14px', fontSize: '0.78rem', background: '#fff', color: '#B71C1C', border: '1px solid #EF9A9A', borderRadius: '4px', cursor: 'pointer' }}>
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
