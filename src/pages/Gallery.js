import { useState } from 'react';

const albums = [
  {
    id: 1,
    event: 'Easter Praise Concert',
    date: 'April 4, 2025',
    venue: 'Central SDA Church, Harare',
    cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', caption: 'Opening Worship' },
      { id: 2, url: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80', caption: 'Praise Session' },
      { id: 3, url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', caption: 'Full Congregation' },
      { id: 4, url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', caption: 'Group Performance' },
      { id: 5, url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', caption: 'Closing Prayer' },
      { id: 6, url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', caption: 'After Service' },
    ]
  },
  {
    id: 2,
    event: 'Youth Camp Rally',
    date: 'May 20, 2025',
    venue: 'Gweru SDA Camp, Gweru',
    cover: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', caption: 'Camp Opening' },
      { id: 2, url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', caption: 'Evening Worship' },
      { id: 3, url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', caption: 'Youth Praise' },
      { id: 4, url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', caption: 'Camp Fire Night' },
    ]
  },
  {
    id: 3,
    event: 'Annual Thanksgiving Concert',
    date: 'November 15, 2025',
    venue: 'Harare City SDA Church, Harare',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', caption: 'Sound Check' },
      { id: 2, url: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80', caption: 'Main Performance' },
      { id: 3, url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', caption: 'Special Number' },
      { id: 4, url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', caption: 'Group Photo' },
      { id: 5, url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', caption: 'Audience' },
    ]
  },
  {
    id: 4,
    event: 'Recording Studio Sessions',
    date: 'January 10, 2026',
    venue: 'SoundWave Studios, Harare',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', caption: 'In The Booth' },
      { id: 2, url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', caption: 'Harmony Session' },
      { id: 3, url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', caption: 'Mixing Board' },
    ]
  },
];

export default function Gallery() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openAlbum = (album) => {
    setSelectedAlbum(album);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (photo, index) => {
    setLightboxPhoto(photo);
    setLightboxIndex(index);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    const newIndex = (lightboxIndex - 1 + selectedAlbum.photos.length) % selectedAlbum.photos.length;
    setLightboxIndex(newIndex);
    setLightboxPhoto(selectedAlbum.photos[newIndex]);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    const newIndex = (lightboxIndex + 1) % selectedAlbum.photos.length;
    setLightboxIndex(newIndex);
    setLightboxPhoto(selectedAlbum.photos[newIndex]);
  };

  return (
    <div style={{ paddingTop: '75px', minHeight: '100vh', background: 'var(--deep)' }}>

      {/* ═══ PAGE HEADER ═══ */}
      <section style={{
        padding: '5rem 2rem 4rem',
        background: `radial-gradient(ellipse at top, rgba(201,168,76,0.1) 0%, transparent 60%), var(--dark)`,
        textAlign: 'center',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.5em', color: 'var(--gold)' }}>
            MOMENTS & MEMORIES
          </span>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--text)', marginBottom: '1rem', lineHeight: 1.1 }}>
          {selectedAlbum ? selectedAlbum.event : 'Gallery'}
        </h1>
        <div className="gold-line" style={{ margin: '0 auto 1.5rem', maxWidth: '150px' }} />

        {selectedAlbum ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              📅 {selectedAlbum.date}
            </span>
            <span style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>✦</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              📍 {selectedAlbum.venue}
            </span>
            <span style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>✦</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              🖼 {selectedAlbum.photos.length} Photos
            </span>
          </div>
        ) : (
          <p style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            Browse our collection of events, performances and memories
          </p>
        )}
      </section>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '4rem 2rem 0' }}>

        {/* ═══ BACK BUTTON (when inside album) ═══ */}
        {selectedAlbum && (
          <button
            onClick={() => setSelectedAlbum(null)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--muted)', cursor: 'pointer', padding: '0.6rem 1.5rem',
              fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.2em',
              marginBottom: '2.5rem', transition: 'all 0.3s'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            ← Back To All Albums
          </button>
        )}

        {/* ═══ ALBUMS VIEW ═══ */}
        {!selectedAlbum && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--gold)' }}>
                ALL ALBUMS
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '5rem'
            }}>
              {albums.map(album => (
                <div
                  key={album.id}
                  onClick={() => openAlbum(album)}
                  style={{
                    cursor: 'pointer', background: 'var(--card)',
                    border: '1px solid var(--border)', overflow: 'hidden',
                    transition: 'all 0.35s'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.querySelector('.album-cover').style.transform = 'scale(1.06)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.querySelector('.album-cover').style.transform = 'scale(1)';
                  }}
                >
                  {/* Cover Image */}
                  <div style={{ position: 'relative', paddingBottom: '65%', overflow: 'hidden' }}>
                    <img
                      className="album-cover"
                      src={album.cover}
                      alt={album.event}
                      style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover', transition: 'transform 0.5s ease'
                      }}
                    />
                    {/* Overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(8,8,16,0.85) 0%, transparent 50%)'
                    }} />
                    {/* Photo Count Badge */}
                    <div style={{
                      position: 'absolute', top: '1rem', right: '1rem',
                      background: 'rgba(8,8,16,0.75)', border: '1px solid rgba(201,168,76,0.4)',
                      padding: '4px 12px', backdropFilter: 'blur(4px)'
                    }}>
                      <span style={{
                        fontFamily: 'Cinzel, serif', fontSize: '0.58rem',
                        letterSpacing: '0.2em', color: 'var(--gold)'
                      }}>
                        {album.photos.length} PHOTOS
                      </span>
                    </div>
                  </div>

                  {/* Album Info */}
                  <div style={{ padding: '1.5rem', borderTop: '2px solid var(--gold)' }}>
                    <h3 style={{ color: 'var(--text)', fontSize: '1.1rem', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                      {album.event}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
                        📅 {album.date}
                      </span>
                      <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
                        📍 {album.venue}
                      </span>
                    </div>
                    <div style={{
                      marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      color: 'var(--gold)', fontFamily: 'Cinzel, serif',
                      fontSize: '0.62rem', letterSpacing: '0.2em'
                    }}>
                      VIEW ALBUM →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══ ALBUM PHOTOS VIEW ═══ */}
        {selectedAlbum && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--gold)' }}>
                {selectedAlbum.photos.length} PHOTOS
              </span>
            </div>

            {/* Masonry-style Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              marginBottom: '5rem'
            }} className="photo-grid">
              {selectedAlbum.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(photo, index)}
                  style={{
                    position: 'relative', overflow: 'hidden', cursor: 'pointer',
                    paddingBottom: index % 5 === 0 ? '70%' : '65%',
                    gridColumn: index % 5 === 0 ? 'span 2' : 'span 1',
                    background: 'var(--card)'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.querySelector('.photo-overlay').style.opacity = '1';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.querySelector('.photo-overlay').style.opacity = '0';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                  }}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', transition: 'transform 0.5s ease'
                    }}
                  />
                  {/* Hover overlay */}
                  <div className="photo-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(8,8,16,0.55)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    opacity: 0, transition: 'opacity 0.3s ease',
                    border: '1px solid rgba(201,168,76,0.3)'
                  }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      border: '1px solid var(--gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.2rem', marginBottom: '0.5rem'
                    }}>⊕</div>
                    <span style={{
                      fontFamily: 'Cinzel, serif', fontSize: '0.6rem',
                      letterSpacing: '0.2em', color: 'var(--gold)'
                    }}>VIEW</span>
                  </div>

                  {/* Caption */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(8,8,16,0.8), transparent)',
                    padding: '1.5rem 1rem 0.75rem'
                  }}>
                    <span style={{
                      fontFamily: 'Cinzel, serif', fontSize: '0.58rem',
                      letterSpacing: '0.15em', color: 'rgba(242,238,230,0.7)'
                    }}>
                      {photo.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ═══ LIGHTBOX ═══ */}
      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(8,8,16,0.96)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem'
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxPhoto(null)}
            style={{
              position: 'fixed', top: '1.5rem', right: '1.5rem',
              background: 'rgba(201,168,76,0.1)', border: '1px solid var(--border)',
              color: 'var(--gold)', cursor: 'pointer',
              width: '42px', height: '42px', fontSize: '1.1rem',
              fontFamily: 'Cinzel, serif', zIndex: 10
            }}
          >✕</button>

          {/* Prev */}
          <button
            onClick={prevPhoto}
            style={{
              position: 'fixed', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(201,168,76,0.1)', border: '1px solid var(--border)',
              color: 'var(--gold)', cursor: 'pointer',
              width: '48px', height: '48px', fontSize: '1.2rem', zIndex: 10
            }}
          >‹</button>

          {/* Next */}
          <button
            onClick={nextPhoto}
            style={{
              position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(201,168,76,0.1)', border: '1px solid var(--border)',
              color: 'var(--gold)', cursor: 'pointer',
              width: '48px', height: '48px', fontSize: '1.2rem', zIndex: 10
            }}
          >›</button>

          {/* Image */}
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '100%' }}>
            <img
              src={lightboxPhoto.url}
              alt={lightboxPhoto.caption}
              style={{
                width: '100%', maxHeight: '75vh',
                objectFit: 'contain', display: 'block',
                border: '1px solid rgba(201,168,76,0.2)'
              }}
            />
            {/* Caption & Counter */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '1rem 0.5rem 0'
            }}>
              <span style={{
                fontFamily: 'Cinzel, serif', fontSize: '0.7rem',
                letterSpacing: '0.2em', color: 'var(--gold)'
              }}>
                {lightboxPhoto.caption}
              </span>
              <span style={{
                fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
                letterSpacing: '0.2em', color: 'var(--muted)'
              }}>
                {lightboxIndex + 1} / {selectedAlbum.photos.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: 'var(--dark)', borderTop: '1px solid var(--border)', padding: '3rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center', marginBottom: '2rem', gap: '2rem'
          }} className="footer-grid">
            <div className="gold-line" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: 'var(--gold)', letterSpacing: '0.25em', fontWeight: 700 }}>SANCTIFIED</div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--muted)', marginTop: '4px' }}>GOSPEL MUSIC GROUP</div>
            </div>
            <div className="gold-line" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {[['/', 'Home'], ['/about', 'About'], ['/videos', 'Videos'], ['/gallery', 'Gallery'], ['/events', 'Events'], ['/contact', 'Contact']].map(([path, label]) => (
              <a key={path} href={path} style={{
                textDecoration: 'none', fontFamily: 'Cinzel, serif',
                fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--muted)', transition: 'color 0.3s'
              }}
                onMouseOver={e => e.target.style.color = 'var(--gold)'}
                onMouseOut={e => e.target.style.color = 'var(--muted)'}>
                {label}
              </a>
            ))}
          </div>

          <div className="gold-line" style={{ marginBottom: '1.5rem' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)' }}>
              © 2026 SANCTIFIED MUSIC  · ALL RIGHTS RESERVED
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>
              Designed & maintained by{' '}
              <a href="https://huyafricatechnologies.co.zw/" target="_blank" rel="noopener noreferrer" style={{
                color: 'var(--gold)', textDecoration: 'none',
                fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.1em'
              }}
                onMouseOver={e => e.target.style.color = 'var(--gold-light)'}
                onMouseOut={e => e.target.style.color = 'var(--gold)'}>
                HUYAFRICA TECHNOLOGIES
              </a>
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .photo-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .photo-grid > div { grid-column: span 1 !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .photo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}