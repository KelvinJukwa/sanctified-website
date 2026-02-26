import { useState } from 'react';

function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', borderTop: '1px solid var(--border)', padding: '3rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', marginBottom: '2rem', gap: '2rem' }} className="footer-grid">
          <div className="gold-line" />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: 'var(--gold)', letterSpacing: '0.25em', fontWeight: 700 }}>
              SANCTIFIED
            </div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--muted)', marginTop: '4px' }}>
              MUSIC 
            </div>
          </div>
          <div className="gold-line" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {[['/', 'Home'], ['/about', 'About'], ['/videos', 'Videos'], ['/gallery', 'Gallery'], ['/events', 'Events'], ['/contact', 'Contact']].map(([path, label]) => (
            <a key={path} href={path} style={{ textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--muted)', transition: 'color 0.3s' }}
              onMouseOver={(e) => (e.target.style.color = 'var(--gold)')}
              onMouseOut={(e) => (e.target.style.color = 'var(--muted)')}>
              {label}
            </a>
          ))}
        </div>
        <div className="gold-line" style={{ marginBottom: '1.5rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)' }}>
            © 2026 SANCTIFIED MUSIC · ALL RIGHTS RESERVED
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>
            Designed & maintained by{' '}
            <a href="https://huyafricatechnologies.co.zw/" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--gold)', textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.1em' }}
              onMouseOver={(e) => (e.target.style.color = 'var(--gold-light)')}
              onMouseOut={(e) => (e.target.style.color = 'var(--gold)')}>
              HUYAFRICA TECHNOLOGIES
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

const contactDetails = [
  {
    icon: '📞',
    label: 'Phone',
    lines: ['+263 77 123 4567', '+263 71 987 6543'],
    sub: 'Mon – Sat, 8am – 8pm',
  },
  {
    icon: '📧',
    label: 'Email',
    lines: ['sanctified@gmail.com', 'booking@sanctified.co.zw'],
    sub: 'We reply within 24 hours',
  },
  {
    icon: '📍',
    label: 'Location',
    lines: ['Harare, Zimbabwe'],
    sub: 'Seventh-day Adventist Gospel Group',
  },
  {
    icon: '🎵',
    label: 'Booking',
    lines: ['+263 77 123 4567'],
    sub: 'For event bookings & performances',
  },
];

const socials = [
  { label: 'Facebook', icon: 'f', url: 'https://facebook.com/sanctifiedgospel', color: 'rgba(66,103,178,0.8)' },
  { label: 'Instagram', icon: '✦', url: 'https://instagram.com/sanctifiedgospel', color: 'rgba(193,53,132,0.8)' },
  { label: 'YouTube', icon: '▶', url: 'https://youtube.com/@sanctifiedgospel', color: 'rgba(255,0,0,0.8)' },
  { label: 'WhatsApp', icon: '✉', url: 'https://wa.me/263771234567', color: 'rgba(37,211,102,0.8)' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSent(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setErrors({});
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.85rem 1rem',
    background: 'var(--deep)',
    border: `1px solid ${errors[field] ? 'rgba(220,80,80,0.6)' : 'rgba(201,168,76,0.2)'}`,
    color: 'var(--text)',
    fontFamily: 'Crimson Pro, serif',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    display: 'block',
    color: 'var(--muted)',
    fontSize: '0.68rem',
    letterSpacing: '0.25em',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    fontFamily: 'Cinzel, serif',
  };

  return (
    <div style={{ paddingTop: '75px', minHeight: '100vh', background: 'var(--deep)' }}>

      {/* PAGE HEADER */}
      <section style={{
        padding: '5rem 2rem 4rem',
        background: 'radial-gradient(ellipse at top, rgba(201,168,76,0.1) 0%, transparent 60%), var(--dark)',
        textAlign: 'center',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.5em', color: 'var(--gold)' }}>
            GET IN TOUCH
          </span>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--text)', marginBottom: '1rem', lineHeight: 1.1 }}>
          Contact Us
        </h1>
        <div className="gold-line" style={{ margin: '0 auto 1.5rem', maxWidth: '150px' }} />
        <p style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto' }}>
          Whether you want to book us for an event, collaborate, or simply say hello — we would love to hear from you
        </p>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem 0' }}>

        {/* CONTACT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '5rem' }}>
          {contactDetails.map((item) => (
            <div
              key={item.label}
              style={{ padding: '2rem 1.5rem', background: 'var(--card)', border: '1px solid var(--border)', textAlign: 'center', transition: 'all 0.3s' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                {item.label.toUpperCase()}
              </div>
              <div className="gold-line" style={{ margin: '0 auto 0.75rem', maxWidth: '60px' }} />
              {item.lines.map((line, i) => (
                <div key={i} style={{ color: 'var(--text)', fontSize: '0.95rem', marginBottom: '3px', letterSpacing: '0.05em' }}>
                  {line}
                </div>
              ))}
              <div style={{ color: 'var(--muted)', fontSize: '0.78rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT: FORM + SIDEBAR */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', marginBottom: '5rem', alignItems: 'start' }} className="contact-grid">

          {/* CONTACT FORM */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--gold)' }}>
                SEND US A MESSAGE
              </span>
            </div>

            {sent ? (
              <div style={{ padding: '4rem 2rem', border: '1px solid rgba(201,168,76,0.3)', background: 'var(--card)', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', color: 'var(--gold)', marginBottom: '1rem', fontFamily: 'Cinzel, serif' }}>✦</div>
                <h3 style={{ color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>Message Received!</h3>
                <p style={{ color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Thank you for reaching out to Sanctified. We will get back to you within 24 hours. God bless you!
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{ padding: '0.75rem 2rem', background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.72rem', letterSpacing: '0.2em', transition: 'all 0.3s' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--deep)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '2.5rem' }}>

                {/* Row 1: Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }} className="form-row">
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      style={inputStyle('name')}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                      onBlur={(e) => (e.target.style.borderColor = errors.name ? 'rgba(220,80,80,0.6)' : 'rgba(201,168,76,0.2)')}
                    />
                    {errors.name && <span style={{ color: 'rgba(220,80,80,0.8)', fontSize: '0.72rem', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      style={inputStyle('email')}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                      onBlur={(e) => (e.target.style.borderColor = errors.email ? 'rgba(220,80,80,0.6)' : 'rgba(201,168,76,0.2)')}
                    />
                    {errors.email && <span style={{ color: 'rgba(220,80,80,0.8)', fontSize: '0.72rem', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                  </div>
                </div>

                {/* Row 2: Phone + Subject */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }} className="form-row">
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+263 77 000 0000"
                      style={inputStyle('phone')}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      style={{ ...inputStyle('subject'), cursor: 'pointer', colorScheme: 'dark' }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
                    >
                      <option value="" style={{ background: 'var(--deep)' }}>Select a subject</option>
                      <option value="Booking" style={{ background: 'var(--deep)' }}>Event Booking</option>
                      <option value="Collaboration" style={{ background: 'var(--deep)' }}>Collaboration</option>
                      <option value="General" style={{ background: 'var(--deep)' }}>General Inquiry</option>
                      <option value="Media" style={{ background: 'var(--deep)' }}>Media & Press</option>
                      <option value="Prayer" style={{ background: 'var(--deep)' }}>Prayer Request</option>
                      <option value="Other" style={{ background: 'var(--deep)' }}>Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={6}
                    placeholder="Write your message here..."
                    style={{ ...inputStyle('message'), resize: 'vertical', lineHeight: 1.7 }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderColor = errors.message ? 'rgba(220,80,80,0.6)' : 'rgba(201,168,76,0.2)')}
                  />
                  {errors.message && <span style={{ color: 'rgba(220,80,80,0.8)', fontSize: '0.72rem', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
                </div>

                <button
                  onClick={handleSubmit}
                  style={{ width: '100%', padding: '1rem', background: 'var(--gold)', color: 'var(--deep)', border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.82rem', letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', transition: 'all 0.3s' }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'var(--gold-light)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'var(--gold)')}
                >
                  Send Message →
                </button>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Quick Contact */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '20px', height: '1px', background: 'var(--gold)' }} />
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.3em', color: 'var(--gold)' }}>QUICK CONTACT</span>
              </div>

              {/* Phone Numbers */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.75rem' }}>📞 PHONE</div>
                {['+263 77 123 4567', '+263 71 987 6543', '+263 78 456 7890'].map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.replace(/\s/g, '')}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', marginBottom: '0.4rem', background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s' }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.color = 'var(--gold)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                  >
                    <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✆</span>
                    {num}
                  </a>
                ))}
              </div>

              {/* Email */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.75rem' }}>📧 EMAIL</div>
                {['sanctified@gmail.com', 'booking@sanctified.co.zw'].map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    style={{ display: 'block', padding: '0.6rem 0.75rem', marginBottom: '0.4rem', background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', textDecoration: 'none', fontSize: '0.88rem', transition: 'all 0.3s', wordBreak: 'break-all' }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.color = 'var(--gold)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                  >
                    ✉ {email}
                  </a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/263771234567"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.85rem', background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.35)', color: 'rgba(37,211,102,0.9)', textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.2em', transition: 'all 0.3s' }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.2)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.6)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.12)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.35)'; }}
              >
                ✉ CHAT ON WHATSAPP
              </a>
            </div>

            {/* Social Media */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '20px', height: '1px', background: 'var(--gold)' }} />
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.3em', color: 'var(--gold)' }}>FOLLOW US</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', textDecoration: 'none', transition: 'all 0.3s' }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = s.color; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                  >
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#fff', flexShrink: 0 }}>
                      {s.icon}
                    </span>
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
                      {s.label}
                    </span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.75rem', opacity: 0.5 }}>→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Bible Verse */}
            <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', padding: '1.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: 'var(--gold)', opacity: 0.25, fontFamily: 'Cinzel, serif', lineHeight: 1, marginBottom: '0.5rem' }}>"</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.8, marginBottom: '1rem' }}>
                How beautiful are the feet of those who bring good news!
              </p>
              <div className="gold-line" style={{ margin: '0 auto 0.75rem', maxWidth: '60px' }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--gold)' }}>
                ROMANS 10:15
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}