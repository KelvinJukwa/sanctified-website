import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) { setError('Please enter your email and password'); return; }
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Invalid email or password. Please try again.');
    } else {
      navigate('/admin/dashboard');
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleLogin(); };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Crimson Pro, serif', background: 'var(--deep)' }}>

      {/* LEFT PANEL */}
      <div className="login-left" style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,8,16,0.88) 0%, rgba(8,8,16,0.65) 60%, rgba(201,168,76,0.08) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '3rem' }}>
          <img src="/logo.png" alt="Sanctified" style={{ height: '110px', width: '110px', objectFit: 'contain', display: 'block', margin: '0 auto 2rem', filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(5deg)' }} />
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'var(--text)', fontWeight: 900, letterSpacing: '0.08em', lineHeight: 1, marginBottom: '0.75rem', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
            SANCTIFIED
          </h1>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.55em', color: 'var(--gold)', marginBottom: '2rem' }}>
            GOSPEL MUSIC GROUP
          </div>
          <div className="gold-line" style={{ margin: '0 auto 2rem', maxWidth: '200px' }} />
          <p style={{ fontStyle: 'italic', fontSize: '1.15rem', color: 'rgba(242,238,230,0.65)', lineHeight: 1.9, maxWidth: '400px', margin: '0 auto' }}>
            "Sing to the Lord a new song; sing to the Lord, all the earth."
          </p>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.38em', color: 'rgba(201,168,76,0.7)', marginTop: '1.25rem' }}>
            PSALM 96:1
          </p>
        </div>

        <div style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, textAlign: 'center' }}>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.56rem', letterSpacing: '0.28em', color: 'rgba(201,168,76,0.4)' }}>
            ADMIN PORTAL · HUYAFRICA TECHNOLOGIES
          </span>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right" style={{ width: '460px', flexShrink: 0, background: 'var(--dark)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2.5rem' }}>
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.4em', color: 'var(--gold)' }}>ADMIN ACCESS</span>
            </div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.2rem', color: 'var(--text)', marginBottom: '0.5rem', lineHeight: 1.15 }}>
              Welcome<br />Back
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', fontStyle: 'italic' }}>
              Sign in to manage the Sanctified website
            </p>
          </div>

          {error && (
            <div style={{ padding: '0.85rem 1rem', background: 'rgba(220,80,80,0.08)', border: '1px solid rgba(220,80,80,0.3)', marginBottom: '1.5rem', color: 'rgba(220,80,80,0.9)', fontSize: '0.88rem', fontStyle: 'italic' }}>
              ⚠ {error}
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--muted)', marginBottom: '0.5rem' }}>EMAIL ADDRESS</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} placeholder="admin@sanctified.co.zw"
              style={{ width: '100%', padding: '0.9rem 1rem', background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--text)', fontFamily: 'Crimson Pro, serif', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.3s' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--muted)', marginBottom: '0.5rem' }}>PASSWORD</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} placeholder="••••••••••"
              style={{ width: '100%', padding: '0.9rem 1rem', background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--text)', fontFamily: 'Crimson Pro, serif', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.3s' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
          </div>

          <button onClick={handleLogin} disabled={loading}
            style={{ width: '100%', padding: '1rem', background: loading ? 'rgba(201,168,76,0.5)' : 'var(--gold)', color: 'var(--deep)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.78rem', letterSpacing: '0.3em', fontWeight: 700, transition: 'all 0.3s', marginBottom: '1.5rem' }}
            onMouseOver={(e) => { if (!loading) e.currentTarget.style.background = 'var(--gold-light)'; }}
            onMouseOut={(e) => { if (!loading) e.currentTarget.style.background = loading ? 'rgba(201,168,76,0.5)' : 'var(--gold)'; }}>
            {loading ? 'SIGNING IN...' : 'SIGN IN →'}
          </button>

          <div className="gold-line" style={{ marginBottom: '1.5rem' }} />

          <div style={{ textAlign: 'center' }}>
            <a href="/" style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', textDecoration: 'none' }}
              onMouseOver={(e) => (e.target.style.color = 'var(--gold)')}
              onMouseOut={(e) => (e.target.style.color = 'var(--muted)')}>
              ← BACK TO WEBSITE
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-left { display: none !important; }
          .login-right { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}