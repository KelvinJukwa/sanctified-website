import { useState } from 'react';

const initialImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600', caption: 'Worship Night 2024' },
  { id: 2, url: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600', caption: 'Annual Concert' },
  { id: 3, url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', caption: 'Recording Session' },
  { id: 4, url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600', caption: 'Youth Camp Performance' },
];

export default function Gallery() {
  const [images, setImages] = useState(initialImages);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ url: '', caption: '' });
  const [selected, setSelected] = useState(null);

  const addImage = () => {
    if (!form.url) return;
    setImages([...images, { id: Date.now(), ...form }]);
    setForm({ url: '', caption: '' });
    setShowForm(false);
  };

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh', padding: '90px 2rem 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem',
            letterSpacing: '0.4em', color: 'var(--gold)', marginBottom: '1rem' }}>
            MOMENTS & MEMORIES
          </p>
          <h1 style={{ fontSize: '3rem', color: 'var(--text)', marginBottom: '1rem' }}>Gallery</h1>
          <div className="gold-line" style={{ margin: '0 auto', maxWidth: '150px' }} />
        </div>

        <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
          <button onClick={() => setShowForm(!showForm)} style={{
            padding: '0.8rem 2rem', background: 'var(--gold)', color: 'var(--deep)',
            border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif',
            fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 600
          }}>
            + Add Photo
          </button>
        </div>

        {showForm && (
          <div style={{ background: 'var(--card)', border: '1px solid rgba(201,168,76,0.3)',
            padding: '2rem', marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '1rem', letterSpacing: '0.2em' }}>
              ADD NEW PHOTO
            </h3>
            {['url', 'caption'].map(field => (
              <div key={field} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: 'var(--muted)', fontSize: '0.75rem',
                  letterSpacing: '0.2em', marginBottom: '0.5rem', textTransform: 'uppercase',
                  fontFamily: 'Cinzel, serif' }}>
                  {field === 'url' ? 'Image URL' : 'Caption'}
                </label>
                <input
                  value={form[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  placeholder={field === 'url' ? 'https://...' : 'Description of photo'}
                  style={{ width: '100%', padding: '0.75rem 1rem',
                    background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)',
                    color: 'var(--text)', fontFamily: 'Crimson Pro, serif', fontSize: '1rem', outline: 'none' }}
                />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button onClick={addImage} style={{
                padding: '0.75rem 2rem', background: 'var(--gold)', color: 'var(--deep)',
                border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif',
                fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 600
              }}>Save Photo</button>
              <button onClick={() => setShowForm(false)} style={{
                padding: '0.75rem 2rem', background: 'transparent',
                border: '1px solid rgba(201,168,76,0.3)', color: 'var(--muted)',
                cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.75rem'
              }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Masonry Grid */}
        <div style={{ columns: '3', columnGap: '1rem' }}>
          {images.map(img => (
            <div key={img.id} onClick={() => setSelected(img)}
              style={{ breakInside: 'avoid', marginBottom: '1rem', cursor: 'pointer',
                border: '1px solid rgba(201,168,76,0.1)', overflow: 'hidden', position: 'relative' }}>
              <img src={img.url} alt={img.caption}
                style={{ width: '100%', display: 'block', transition: 'transform 0.3s' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'}
              />
              <div style={{ padding: '0.75rem', background: 'var(--card)' }}>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>{img.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selected && (
          <div onClick={() => setSelected(null)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '2rem', cursor: 'pointer'
          }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
              <img src={selected.url} alt={selected.caption}
                style={{ width: '100%', border: '1px solid rgba(201,168,76,0.3)' }} />
              <p style={{ textAlign: 'center', color: 'var(--gold)', marginTop: '1rem',
                fontFamily: 'Cinzel, serif', letterSpacing: '0.2em', fontSize: '0.85rem' }}>
                {selected.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}