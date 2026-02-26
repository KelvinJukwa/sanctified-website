import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh', padding: '90px 2rem 4rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem',
            letterSpacing: '0.4em', color: 'var(--gold)', marginBottom: '1rem' }}>
            GET IN TOUCH
          </p>
          <h1 style={{ fontSize: '3rem', color: 'var(--text)', marginBottom: '1rem' }}>Contact Us</h1>
          <div className="gold-line" style={{ margin: '0 auto 1.5rem', maxWidth: '150px' }} />
          <p style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '1.1rem' }}>
            Interested in booking Sanctified for your next Program? We'd love to hear from you.
          </p>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem',
            border: '1px solid rgba(201,168,76,0.3)', background: 'var(--card)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✦</div>
            <h3 style={{ color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>
              Message Received!
            </h3>
            <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
              Thank you for reaching out. We will get back to you soon. God bless!
            </p>
            <button onClick={() => setSent(false)} style={{
              marginTop: '2rem', padding: '0.75rem 2rem', background: 'transparent',
              border: '1px solid var(--gold)', color: 'var(--gold)', cursor: 'pointer',
              fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.15em'
            }}>Send Another</button>
          </div>
        ) : (
          <div style={{ background: 'var(--card)', border: '1px solid rgba(201,168,76,0.15)', padding: '3rem' }}>
            {[
              { key: 'name', label: 'Your Name', type: 'text' },
              { key: 'email', label: 'Email Address', type: 'email' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: 'var(--muted)', fontSize: '0.75rem',
                  letterSpacing: '0.2em', marginBottom: '0.5rem', textTransform: 'uppercase',
                  fontFamily: 'Cinzel, serif' }}>{f.label}</label>
                <input type={f.type} value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: '100%', padding: '0.85rem 1rem',
                    background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)',
                    color: 'var(--text)', fontFamily: 'Crimson Pro, serif',
                    fontSize: '1rem', outline: 'none' }}
                />
              </div>
            ))}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: 'var(--muted)', fontSize: '0.75rem',
                letterSpacing: '0.2em', marginBottom: '0.5rem', textTransform: 'uppercase',
                fontFamily: 'Cinzel, serif' }}>Message</label>
              <textarea value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={6}
                style={{ width: '100%', padding: '0.85rem 1rem',
                  background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)',
                  color: 'var(--text)', fontFamily: 'Crimson Pro, serif',
                  fontSize: '1rem', outline: 'none', resize: 'vertical' }}
              />
            </div>
            <button onClick={handleSubmit} style={{
              width: '100%', padding: '1rem', background: 'var(--gold)',
              color: 'var(--deep)', border: 'none', cursor: 'pointer',
              fontFamily: 'Cinzel, serif', fontSize: '0.85rem',
              letterSpacing: '0.25em', fontWeight: 600, textTransform: 'uppercase'
            }}>
              Send Message
            </button>
          </div>
        )}

        {/* Contact Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
          {[
            { label: 'Email', value: 'sanctified@example.com' },
            { label: 'Location', value: 'Harare, Zimbabwe' },
          ].map(item => (
            <div key={item.label} style={{ padding: '1.5rem', background: 'var(--card)',
              border: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
                letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                {item.label.toUpperCase()}
              </div>
              <div style={{ color: 'var(--muted)', fontStyle: 'italic' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}