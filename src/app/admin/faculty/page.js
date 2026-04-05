'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({ name: '', subject: '', qualifications: '', experience: 0 });
  const [isAdding, setIsAdding] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchFaculty = async () => {
    try {
      const res = await fetch('/api/faculty');
      const textData = await res.json();
      if (textData.success) setFaculty(textData.data);
    } catch {
      console.error('Failed to load faculty');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
    fetchFaculty().then(() => setLoading(false));
  }, [router]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setMsg('');
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ name: '', subject: '', qualifications: '', experience: 0 });
        setIsAdding(false);
        setMsg('Faculty member added!');
        fetchFaculty();
      }
    } catch {
      setMsg('Error adding faculty');
    }
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this faculty member?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      await fetch(`/api/faculty/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      fetchFaculty();
    } catch {
      alert('Failed to delete');
    }
  };

  if (loading) return <div className="admin-layout"><AdminSidebar active="Faculty" /><main className="admin-main">Loading...</main></div>;

  return (
    <div className="admin-layout">
      <AdminSidebar active="Faculty" />
      <main className="admin-main">
        <div className="admin-header">
          <h1>Manage Faculty</h1>
          <button className="btn btn-gold" onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? 'Cancel' : '+ Add Teacher'}
          </button>
        </div>

        {msg && <div style={{ background: '#E8F5E9', color: '#1B5E20', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>{msg}</div>}

        {isAdding && (
          <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--navy)' }}>Add New Faculty</h3>
            <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input type="text" placeholder="Full Name (e.g. Dr. Rajesh Kumar)" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="form-input" />
              <input type="text" placeholder="Subject (e.g. Physics)" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} required className="form-input" />
              <input type="text" placeholder="Degrees (e.g. M.Sc, Ph.D)" value={formData.qualifications} onChange={e => setFormData({...formData, qualifications: e.target.value})} required className="form-input" />
              <input type="number" placeholder="Years of Experience" value={formData.experience} onChange={e => setFormData({...formData, experience: parseInt(e.target.value) || 0})} required className="form-input" min="0" />
              <button type="submit" className="btn btn-navy" style={{ gridColumn: 'span 2' }}>Save Profile</button>
            </form>
          </div>
        )}

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Teacher Name</th>
                <th>Subject</th>
                <th>Qualifications</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No faculty records found</td></tr>
              ) : (
                faculty.map(f => (
                  <tr key={f._id}>
                    <td><strong style={{ color: 'var(--navy)' }}>{f.name}</strong></td>
                    <td>{f.subject}</td>
                    <td>{f.qualifications}</td>
                    <td>{f.experience} yrs</td>
                    <td>
                      <button onClick={() => handleDelete(f._id)} className="btn btn-sm" style={{ background: '#FFEBEE', color: '#D32F2F' }}>Remove</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
