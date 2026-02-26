import { useState } from 'react';

const initialVideos = [
  { id: 1, title: 'Jesu Anoti', url: 'https://youtu.be/nJN4u3PUcIw?si=UebWxL-ESpxEwUd_', description: 'Live at Eastlea Church Harare' },
  { id: 2, title: 'Great Is Thy Faithfulness', url: 'https://www.youtube.com/embed/6B9FBaHPNyg', description: 'Sunday service recording' },
];

export default function Videos() {
  const [videos, setVideos] = useState(initialVideos);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', url: '', description: '' });

  const addVideo = () => {
    if (!form.title || !form.url) return;
    let embedUrl = form.url;
    if (form.url.includes('watch?v=')) {
      embedUrl = form.url.replace('watch?v=', 'embed/');
    }
    setVideos([...videos, { id: Date.now(), ...form, url: embedUrl }]);
    setForm({ title: '', url: '', description: '' });
    setShowForm(false);
  };

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh', padding: '90px 2rem 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem',
            letterSpacing: '0.4em', color: 'var(--gold)', marginBottom: '1rem' }}>
            WATCH & WORSHIP
          </p>
          <h1 style={{ fontSize: '3rem', color: 'var(--text)', marginBottom: '1rem' }}>Videos</h1>
          <div className="gold-line" style={{ margin: '0 auto', maxWidth: '150px' }} />
        </div>

        {/* Add Video Button */}
        <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
          <button onClick={() => setShowForm(!showForm)} style={{
            padding: '0.8rem 2rem', background: 'var(--gold)', color: 'var(--deep)',
            border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif',
            fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 600
          }}>
            + Add Video
          </button>
        </div>

        {/* Add Video Form */}
        {showForm && (
          <div style={{ background: 'var(--card)', border: '1px solid rgba(201,168,76,0.3)',
            padding: '2rem', marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '1rem',
              letterSpacing: '0.2em' }}>ADD NEW VIDEO</h3>
            {['title', 'url', 'description'].map(field => (
              <div key={field} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: 'var(--muted)', fontSize: '0.75rem',
                  letterSpacing: '0.2em', marginBottom: '0.5rem', textTransform: 'uppercase',
                  fontFamily: 'Cinzel, serif' }}>
                  {field === 'url' ? 'YouTube URL' : field}
                </label>
                <input
                  value={form[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  placeholder={field === 'url' ? 'https://www.youtube.com/watch?v=...' : ''}
                  style={{ width: '100%', padding: '0.75rem 1rem',
                    background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)',
                    color: 'var(--text)', fontFamily: 'Crimson Pro, serif', fontSize: '1rem',
                    outline: 'none' }}
                />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button onClick={addVideo} style={{
                padding: '0.75rem 2rem', background: 'var(--gold)', color: 'var(--deep)',
                border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif',
                fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 600
              }}>Save Video</button>
              <button onClick={() => setShowForm(false)} style={{
                padding: '0.75rem 2rem', background: 'transparent',
                border: '1px solid rgba(201,168,76,0.3)', color: 'var(--muted)',
                cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.75rem'
              }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Videos Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', gap: '2rem' }}>
          {videos.map(video => (
            <div key={video.id} style={{ background: 'var(--card)',
              border: '1px solid rgba(201,168,76,0.1)' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={video.url}
                  title={video.title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allowFullScreen
                />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'var(--gold)', fontSize: '1rem',
                  letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{video.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem',
                  fontStyle: 'italic' }}>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}