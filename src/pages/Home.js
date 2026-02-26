import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    image: '/aka.png',
    label: 'Worship Night 2024',
    subtitle: 'Lifting voices in praise'
  },
  {
    image: 'fadzi.jpeg',
    label: 'Annual Concert',
    subtitle: 'Spreading the Gospel through music'
  },
  {
    image: 'clive.png',
    label: 'In The Studio',
    subtitle: 'Creating music for His glory'
  },
  {
    image: 'joina.jpeg',
    label: 'Youth Rally',
    subtitle: 'Reaching the next generation'
  },
];

const galleryPreviews = [
  { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80', caption: 'Worship Night' },
  { url: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80', caption: 'Annual Concert' },
  { url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', caption: 'Studio Session' },
  { url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', caption: 'Youth Camp' },
  { url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80', caption: 'Performance' },
  { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80', caption: 'Soundcheck' },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % heroSlides.length);
        setAnimating(true);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => {
    setAnimating(false);
    setTimeout(() => { setCurrent(i); setAnimating(true); }, 200);
  };

  const slide = heroSlides[current];

  return (
    <div>

      {/* ═══ HERO SECTION ═══ */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

        {/* Background Image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${slide.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center 30%',
          opacity: animating ? 1 : 0,
          transform: animating ? 'scale(1)' : 'scale(1.03)',
          transition: 'opacity 0.6s ease, transform 6s ease'
        }} />

        {/* Overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,16,0.4) 0%, rgba(8,8,16,0.65) 60%, rgba(8,8,16,0.95) 100%)'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(8,8,16,0.4) 100%)'
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2, height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 2rem'
        }}>
          {/* Eyebrow */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            marginBottom: '1.5rem', opacity: animating ? 1 : 0,
            transition: 'opacity 0.6s ease 0.2s'
          }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
            <span style={{
              fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
              letterSpacing: '0.5em', color: 'var(--gold)', textTransform: 'uppercase'
            }}>
              Seventh-day Adventist · Gospel Music
            </span>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(4rem, 12vw, 9rem)', fontWeight: 900,
            color: 'var(--text)', lineHeight: 0.9, letterSpacing: '0.05em',
            marginBottom: '0.5rem',
            opacity: animating ? 1 : 0,
            transform: animating ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
            textShadow: '0 2px 40px rgba(0,0,0,0.5)'
          }}>
            SANCTIFIED
          </h1>

          {/* Slide Label */}
          <div style={{
            fontFamily: 'Crimson Pro, serif', fontStyle: 'italic',
            fontSize: '1.3rem', color: 'rgba(201,168,76,0.85)',
            marginTop: '1rem', marginBottom: '0.5rem',
            opacity: animating ? 1 : 0,
            transition: 'opacity 0.6s ease 0.5s'
          }}>
            {slide.subtitle}
          </div>

          <div className="gold-line" style={{ width: '200px', margin: '1.2rem auto' }} />

          {/* CTA Buttons */}
          <div style={{
            display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center',
            marginTop: '1rem',
            opacity: animating ? 1 : 0,
            transition: 'opacity 0.6s ease 0.6s'
          }}>
            <Link to="/videos" style={{
              padding: '0.9rem 2.5rem', background: 'var(--gold)',
              color: 'var(--deep)', textDecoration: 'none',
              fontFamily: 'Cinzel, serif', fontSize: '0.72rem',
              letterSpacing: '0.22em', fontWeight: 700,
              transition: 'all 0.3s', border: '1px solid var(--gold)'
            }}
              onMouseOver={e => { e.currentTarget.style.background = 'var(--gold-light)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'var(--gold)'; }}>
              Watch Videos
            </Link>
            <Link to="/events" style={{
              padding: '0.9rem 2.5rem', background: 'transparent',
              border: '1px solid rgba(201,168,76,0.6)',
              color: 'var(--text)', textDecoration: 'none',
              fontFamily: 'Cinzel, serif', fontSize: '0.72rem',
              letterSpacing: '0.22em', transition: 'all 0.3s'
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)'; e.currentTarget.style.color = 'var(--text)'; }}>
              Upcoming Events
            </Link>
          </div>
        </div>

        {/* Slide Indicators */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 3
        }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === current ? '32px' : '8px', height: '2px',
              background: i === current ? 'var(--gold)' : 'rgba(201,168,76,0.35)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.4s ease'
            }} />
          ))}
        </div>

        {/* Slide Label Bottom Left */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '2.5rem', zIndex: 3
        }}>
          <span style={{
            fontFamily: 'Cinzel, serif', fontSize: '0.62rem',
            letterSpacing: '0.25em', color: 'rgba(201,168,76,0.6)'
          }}>
            {String(current + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')} — {slide.label}
          </span>
        </div>
      </section>

      {/* ═══ ABOUT PREVIEW ═══ */}
      <section style={{ padding: '8rem 2rem', background: 'var(--dark)' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center'
        }} className="about-grid">

          {/* Left: Decorative Block */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '100%', paddingBottom: '110%', position: 'relative',
              border: '1px solid var(--border)'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `url(https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80)`,
                backgroundSize: 'cover', backgroundPosition: 'center'
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(8,8,16,0.3), rgba(201,168,76,0.08))'
              }} />
            </div>
            {/* Floating accent box */}
            <div style={{
              position: 'absolute', bottom: '-2rem', right: '-2rem',
              background: 'var(--card)', border: '1px solid var(--border)',
              padding: '1.5rem 2rem', zIndex: 2
            }}>
              <div style={{
                fontFamily: 'Cinzel, serif', fontSize: '2.5rem',
                color: 'var(--gold)', fontWeight: 700, lineHeight: 1
              }}>2018</div>
              <div style={{
                fontSize: '0.65rem', letterSpacing: '0.3em',
                color: 'var(--muted)', marginTop: '4px'
              }}>ESTABLISHED</div>
            </div>
          </div>

          {/* Right: Text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
              <span style={{
                fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
                letterSpacing: '0.45em', color: 'var(--gold)'
              }}>OUR STORY</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)',
              marginBottom: '1.5rem', lineHeight: 1.2
            }}>
              Music As A<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Divine Calling</em>
            </h2>

            <div className="gold-line-left" style={{ marginBottom: '2rem', maxWidth: '80px' }} />

            <p style={{
              color: 'var(--muted)', lineHeight: 2.1, fontSize: '1.1rem',
              marginBottom: '1.2rem', fontStyle: 'italic'
            }}>
              Sanctified was born in Harare, Zimbabwe from a deep conviction that music is one 
              of God's most powerful tools for reaching hearts. We are a Seventh-day Adventist 
              gospel group united by faith, passion, and purpose.
            </p>

            <p style={{
              color: 'var(--muted)', lineHeight: 2, fontSize: '1rem',
              marginBottom: '2.5rem'
            }}>
              From local churches to national camp meetings, we bring the message of hope 
              and salvation through every song we sing.
            </p>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '2.5rem' }}>
              {[{ n: '50+', l: 'Programs' }, { n: '10+', l: 'Songs' }, { n: '12', l: 'Members' }].map(s => (
                <div key={s.l}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--muted)', marginTop: '4px', fontFamily: 'Cinzel, serif' }}>{s.l}</div>
                </div>
              ))}
            </div>

            <Link to="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.9rem 2.2rem', border: '1px solid var(--gold)',
              color: 'var(--gold)', textDecoration: 'none',
              fontFamily: 'Cinzel, serif', fontSize: '0.7rem',
              letterSpacing: '0.22em', transition: 'all 0.3s'
            }}
              onMouseOver={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--deep)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}>
              Learn More About Us
              <span style={{ fontSize: '1rem' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ BIBLE VERSE BANNER ═══ */}
      <section style={{
        padding: '5rem 2rem', textAlign: 'center',
        background: `linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 50%, rgba(201,168,76,0.05) 100%)`,
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', color: 'var(--gold)', opacity: 0.25, fontFamily: 'Cinzel, serif', lineHeight: 1 }}>"</div>
          <p style={{
            fontStyle: 'italic', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            color: 'var(--text)', lineHeight: 1.9, margin: '0.5rem 0 1.5rem'
          }}>
            Praise him with the sounding of the trumpet, praise him with the harp and lyre,
            praise him with timbrel and dancing.
          </p>
          <div className="gold-line" style={{ maxWidth: '120px', margin: '0 auto 1rem' }} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--gold)' }}>
            PSALM 150:3–4
          </span>
        </div>
      </section>

      {/* ═══ GALLERY PREVIEW ═══ */}
      <section style={{ padding: '8rem 2rem', background: 'var(--deep)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>

          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.45em', color: 'var(--gold)' }}>
                  MOMENTS & MEMORIES
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)' }}>Our Gallery</h2>
            </div>
            <Link to="/gallery" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: 'var(--gold)', textDecoration: 'none',
              fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.2em',
              borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: '2px',
              transition: 'all 0.3s'
            }}>
              View Full Gallery →
            </Link>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: '6px'
          }}>
            {galleryPreviews.map((img, i) => (
              <div key={i} style={{
                position: 'relative', overflow: 'hidden',
                paddingBottom: i === 0 ? '65%' : '60%',
                gridColumn: i === 0 ? 'span 2' : 'span 1',
                cursor: 'pointer'
              }}>
                <img src={img.url} alt={img.caption} style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', transition: 'transform 0.6s ease'
                }}
                  onMouseOver={e => e.target.style.transform = 'scale(1.06)'}
                  onMouseOut={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(8,8,16,0.7) 0%, transparent 50%)',
                  transition: 'opacity 0.3s'
                }} />
                <div style={{
                  position: 'absolute', bottom: '1rem', left: '1.25rem'
                }}>
                  <span style={{
                    fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
                    letterSpacing: '0.2em', color: 'rgba(242,238,230,0.8)'
                  }}>{img.caption}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/gallery" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.9rem 2.5rem', border: '1px solid var(--border)',
              color: 'var(--text)', textDecoration: 'none',
              fontFamily: 'Cinzel, serif', fontSize: '0.7rem',
              letterSpacing: '0.22em', transition: 'all 0.3s'
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}>
              Browse All Photos →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{
        background: 'var(--dark)',
        borderTop: '1px solid var(--border)',
        padding: '3rem 2rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Top Footer */}
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

          {/* Nav Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['/', '/about', '/videos', '/gallery', '/events', '/contact'].map((path, i) => {
              const labels = ['Home', 'About', 'Videos', 'Gallery', 'Events', 'Contact'];
              return (
                <Link key={path} to={path} style={{
                  textDecoration: 'none', fontFamily: 'Cinzel, serif',
                  fontSize: '0.65rem', letterSpacing: '0.2em',
                  color: 'var(--muted)', transition: 'color 0.3s'
                }}
                  onMouseOver={e => e.target.style.color = 'var(--gold)'}
                  onMouseOut={e => e.target.style.color = 'var(--muted)'}>
                  {labels[i]}
                </Link>
              );
            })}
          </div>

          <div className="gold-line" style={{ marginBottom: '1.5rem' }} />

          {/* Bottom Footer */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '0.75rem'
          }}>
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
          .about-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}