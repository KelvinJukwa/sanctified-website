import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/videos', label: 'Videos' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/events', label: 'Events' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      background: scrolled ? 'rgba(8,8,16,0.98)' : 'rgba(8,8,16,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.25)' : '1px solid rgba(201,168,76,0.1)',
      transition: 'all 0.4s ease',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none'
    }}>
      <div style={{
        maxWidth: '1300px', margin: '0 auto', padding: '0 2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '75px'
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <img
            src="/logo.png"
            alt="Sanctified Logo"
            style={{
              height: '48px', width: '48px', objectFit: 'contain',
              filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(5deg)',
            }}
          />
          <div>
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: '1.25rem',
              color: 'var(--gold)', letterSpacing: '0.18em', fontWeight: 700,
              lineHeight: 1
            }}>
              SANCTIFIED
            </div>
            <div style={{
              fontSize: '0.6rem', color: 'var(--muted)',
              letterSpacing: '0.35em', fontFamily: 'Crimson Pro, serif',
              marginTop: '3px'
            }}>
              ACAPELLA
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav">
          {links.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} style={{
                textDecoration: 'none',
                fontFamily: 'Cinzel, serif', fontSize: '0.7rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: active ? 'var(--gold)' : 'rgba(242,238,230,0.6)',
                position: 'relative', paddingBottom: '4px',
                transition: 'color 0.3s'
              }}
                onMouseOver={e => { if (!active) e.target.style.color = 'var(--text)'; }}
                onMouseOut={e => { if (!active) e.target.style.color = 'rgba(242,238,230,0.6)'; }}
              >
                {link.label}
                {active && (
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '1px', background: 'var(--gold)'
                  }} />
                )}
              </Link>
            );
          })}
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="hamburger" style={{
          background: 'none', border: '1px solid var(--border)',
          cursor: 'pointer', padding: '8px 10px',
          display: 'none', flexDirection: 'column', gap: '5px'
        }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '1px',
              background: 'var(--gold)',
              transition: 'all 0.3s',
              transform: open && i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                : open && i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                : open && i === 1 ? 'opacity: 0' : 'none'
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          background: 'rgba(8,8,16,0.99)', padding: '1rem 2.5rem 2rem',
          borderTop: '1px solid var(--border)'
        }}>
          {links.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '0.9rem 0',
              textDecoration: 'none', fontFamily: 'Cinzel, serif',
              fontSize: '0.8rem', letterSpacing: '0.18em',
              color: location.pathname === link.to ? 'var(--gold)' : 'var(--text)',
              borderBottom: '1px solid rgba(201,168,76,0.08)'
            }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}