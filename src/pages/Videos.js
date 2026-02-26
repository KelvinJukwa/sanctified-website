import { useState } from 'react';

const videos = [
  {
    id: 1,
    title: 'Amazing Grace',
    url: 'https://www.youtube.com/embed/CDdvReNKKuk',
    description: 'Live worship session',
    category: 'Live Performance'
  },
  {
    id: 2,
    title: 'Great Is Thy Faithfulness',
    url: 'https://www.youtube.com/embed/6B9FBaHPNyg',
    description: 'Sunday service recording',
    category: 'Worship'
  },
  {
    id: 3,
    title: 'How Great Thou Art',
    url: 'https://www.youtube.com/embed/ixaJBH5DRPA',
    description: 'Annual concert 2024',
    category: 'Concert'
  },
  {
    id: 4,
    title: 'Blessed Assurance',
    url: 'https://www.youtube.com/embed/8GMAqFBnFpI',
    description: 'Youth camp performance',
    category: 'Live Performance'
  },
];

const categories = ['All', 'Live Performance', 'Worship', 'Concert'];

export default function Videos() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [featured, setFeatured] = useState(videos[0]);

  const filtered = activeCategory === 'All'
    ? videos
    : videos.filter(v => v.category === activeCategory);

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
            WATCH & WORSHIP
          </span>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--text)', marginBottom: '1rem', lineHeight: 1.1 }}>
          Videos
        </h1>
        <div className="gold-line" style={{ margin: '0 auto 1.5rem', maxWidth: '150px' }} />
        <p style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
          Watch our latest performances, worship sessions and recordings
        </p>
      </section>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '4rem 2rem 0' }}>

        {/* ═══ FEATURED VIDEO ═══ */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--gold)' }}>
              NOW PLAYING
            </span>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start'
          }} className="featured-grid">

            {/* Video Player */}
            <div>
              <div style={{
                position: 'relative', paddingBottom: '56.25%', height: 0,
                background: 'var(--card)', border: '1px solid var(--border)'
              }}>
                <iframe
                  src={featured.url}
                  title={featured.title}
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '100%', border: 'none'
                  }}
                  allowFullScreen
                />
              </div>
              {/* Video Info */}
              <div style={{ padding: '1.5rem', background: 'var(--card)',
                border: '1px solid var(--border)', borderTop: '2px solid var(--gold)'
                }}>
                <div style={{
                  display: 'inline-block', padding: '3px 12px',
                  background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
                  fontFamily: 'Cinzel, serif', fontSize: '0.6rem',
                  letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '0.75rem'
                }}>
                  {featured.category}
                </div>
                <h2 style={{ color: 'var(--text)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {featured.title}
                </h2>
                <p style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '1rem' }}>
                  {featured.description}
                </p>
              </div>
            </div>

            {/* Up Next Sidebar */}
            <div>
              <div style={{
                fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
                letterSpacing: '0.3em', color: 'var(--muted)',
                marginBottom: '1rem', paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border)'
              }}>
                UP NEXT
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {videos.filter(v => v.id !== featured.id).map(video => (
                  <div
                    key={video.id}
                    onClick={() => setFeatured(video)}
                    style={{
                      display: 'flex', gap: '0.75rem', cursor: 'pointer',
                      padding: '0.75rem', background: 'var(--card)',
                      border: '1px solid var(--border)', transition: 'all 0.3s'
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
                      e.currentTarget.style.background = 'var(--card2)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.background = 'var(--card)';
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{
                      width: '90px', flexShrink: 0, position: 'relative',
                      background: 'var(--deep)', aspectRatio: '16/9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid var(--border)'
                    }}>
                      <img
                        src={`https://img.youtube.com/vi/${video.url.split('/embed/')[1]}/mqdefault.jpg`}
                        alt={video.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(8,8,16,0.3)'
                      }}>
                        <div style={{
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: 'rgba(201,168,76,0.8)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '8px', color: 'var(--deep)', paddingLeft: '2px'
                        }}>▶</div>
                      </div>
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        color: 'var(--text)', fontSize: '0.85rem',
                        marginBottom: '3px', lineHeight: 1.3,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                      }}>
                        {video.title}
                      </h4>
                      <p style={{ color: 'var(--muted)', fontSize: '0.75rem', fontStyle: 'italic' }}>
                        {video.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ DIVIDER ═══ */}
        <div className="gold-line" style={{ marginBottom: '3.5rem' }} />

        {/* ═══ ALL VIDEOS ═══ */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--gold)' }}>
                ALL VIDEOS
              </span>
            </div>

            {/* Category Filter */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.4rem 1.2rem',
                    background: activeCategory === cat ? 'var(--gold)' : 'transparent',
                    border: '1px solid',
                    borderColor: activeCategory === cat ? 'var(--gold)' : 'var(--border)',
                    color: activeCategory === cat ? 'var(--deep)' : 'var(--muted)',
                    cursor: 'pointer',
                    fontFamily: 'Cinzel, serif', fontSize: '0.62rem',
                    letterSpacing: '0.15em', transition: 'all 0.3s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Videos Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '5rem'
          }}>
            {filtered.map(video => (
              <div
                key={video.id}
                style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  overflow: 'hidden', transition: 'all 0.35s',
                  cursor: 'pointer'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => {
                  setFeatured(video);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', paddingBottom: '56.25%', background: 'var(--deep)' }}>
                  <img
                    src={`https://img.youtube.com/vi/${video.url.split('/embed/')[1]}/mqdefault.jpg`}
                    alt={video.title}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%', objectFit: 'cover'
                    }}
                  />
                  {/* Play button overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(8,8,16,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.3s'
                  }}>
                    <div style={{
                      width: '50px', height: '50px', borderRadius: '50%',
                      background: 'rgba(201,168,76,0.9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', color: 'var(--deep)', paddingLeft: '4px',
                      boxShadow: '0 0 20px rgba(201,168,76,0.4)'
                    }}>▶</div>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '1.25rem' }}>
                  <div style={{
                    display: 'inline-block', padding: '2px 10px',
                    background: 'rgba(201,168,76,0.08)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    fontFamily: 'Cinzel, serif', fontSize: '0.58rem',
                    letterSpacing: '0.18em', color: 'var(--gold)', marginBottom: '0.6rem'
                  }}>
                    {video.category}
                  </div>
                  <h3 style={{ color: 'var(--text)', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                    {video.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer style={{
        background: 'var(--dark)',
        borderTop: '1px solid var(--border)',
        padding: '3rem 2rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center', marginBottom: '2rem', gap: '2rem'
          }} className="footer-grid">
            <div className="gold-line" />
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Cinzel, serif', fontSize: '1.1rem',
                color: 'var(--gold)', letterSpacing: '0.25em', fontWeight: 700
              }}>SANCTIFIED</div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--muted)', marginTop: '4px' }}>
                MUSIC 
              </div>
            </div>
            <div className="gold-line" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {[['/', 'Home'], ['/about', 'About'], ['/videos', 'Videos'], ['/gallery', 'Gallery'], ['/events', 'Events'], ['/contact', 'Contact']].map(([path, label]) => (
              <a key={path} href={path} style={{
                textDecoration: 'none', fontFamily: 'Cinzel, serif',
                fontSize: '0.65rem', letterSpacing: '0.2em',
                color: 'var(--muted)', transition: 'color 0.3s'
              }}
                onMouseOver={e => e.target.style.color = 'var(--gold)'}
                onMouseOut={e => e.target.style.color = 'var(--muted)'}>
                {label}
              </a>
            ))}
          </div>

          <div className="gold-line" style={{ marginBottom: '1.5rem' }} />

          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem'
          }}>
            <p style={{
              fontFamily: 'Cinzel, serif', fontSize: '0.6rem',
              letterSpacing: '0.2em', color: 'var(--muted)'
            }}>
              © 2026 SANCTIFIED MUSIC · ALL RIGHTS RESERVED
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
        @media (max-width: 900px) {
          .featured-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}