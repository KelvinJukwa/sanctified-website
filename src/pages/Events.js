import { useState } from 'react';

const events = [
  {
    id: 1,
    title: 'Easter Praise Concert',
    date: '2026-04-04',
    time: '6:00 PM',
    venue: 'Central SDA Church, Harare',
    description: 'Join us for a powerful Easter praise and worship evening as we celebrate the resurrection of our Lord Jesus Christ.',
    category: 'Concert',
    ticketsAvailable: true,
    ticketUrl: 'https://ticketora.com/sanctified-easter-2026',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'Youth Camp Rally',
    date: '2026-05-20',
    time: '7:30 PM',
    venue: 'Gweru SDA Camp, Gweru',
    description: 'An electrifying evening of gospel music at the annual youth camp rally. Come and be blessed!',
    category: 'Rally',
    ticketsAvailable: false,
    ticketUrl: null,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    featured: false,
  },
  {
    id: 3,
    title: 'Annual Thanksgiving Concert',
    date: '2026-11-15',
    time: '5:00 PM',
    venue: 'Harare City SDA Church, Harare',
    description: 'Our biggest event of the year. An evening of thanksgiving, praise and worship with special guests.',
    category: 'Concert',
    ticketsAvailable: true,
    ticketUrl: 'https://ticketora.com/sanctified-thanksgiving-2026',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    featured: true,
  },
  {
    id: 4,
    title: 'Community Outreach Program',
    date: '2026-06-14',
    time: '10:00 AM',
    venue: 'Mbare Community Hall, Harare',
    description: 'Free community gospel outreach. Bring your family and neighbours for a morning of music and ministry.',
    category: 'Outreach',
    ticketsAvailable: false,
    ticketUrl: null,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    featured: false,
  },
  {
    id: 5,
    title: 'Christmas Cantata',
    date: '2026-12-20',
    time: '6:30 PM',
    venue: 'Rainbow Towers Hotel, Harare',
    description: 'A grand Christmas celebration featuring original compositions, carols and special performances by Sanctified.',
    category: 'Concert',
    ticketsAvailable: true,
    ticketUrl: 'https://ticketora.com/sanctified-christmas-2026',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    featured: true,
  },
  {
    id: 6,
    title: 'Prayer & Worship Night',
    date: '2026-03-27',
    time: '7:00 PM',
    venue: 'Borrowdale SDA Church, Harare',
    description: 'An intimate evening of prayer and worship. Come as you are and experience the presence of God.',
    category: 'Worship Night',
    ticketsAvailable: false,
    ticketUrl: null,
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80',
    featured: false,
  },
];

const categories = ['All', 'Concert', 'Church Service', 'Outreach', 'Worship Night'];

const categoryColors = {
  Concert: 'rgba(201,168,76,0.15)',
  Rally: 'rgba(76,130,201,0.15)',
  Outreach: 'rgba(76,201,130,0.15)',
  'Worship Night': 'rgba(201,76,130,0.15)',
};

const categoryBorders = {
  Concert: 'rgba(201,168,76,0.5)',
  Rally: 'rgba(76,130,201,0.5)',
  Outreach: 'rgba(76,201,130,0.5)',
  'Worship Night': 'rgba(201,76,130,0.5)',
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    year: d.getFullYear(),
    full: d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
  };
}

function TicketLink({ url, style, children }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      style={style}
      onMouseOver={(e) => (e.currentTarget.style.background = 'var(--gold-light)')}
      onMouseOut={(e) => (e.currentTarget.style.background = 'var(--gold)')}
    >
      {children}
    </a>
  );
}

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
               ACAPELLA
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
            © 2026 SANCTIFIED ACAPELLA  · ALL RIGHTS RESERVED
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

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const featured = events.filter((e) => e.featured);
  const filtered = activeCategory === 'All' ? events : events.filter((e) => e.category === activeCategory);

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
            COME WORSHIP WITH US
          </span>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--text)', marginBottom: '1rem', lineHeight: 1.1 }}>
          Events & Concerts
        </h1>
        <div className="gold-line" style={{ margin: '0 auto 1.5rem', maxWidth: '150px' }} />
        <p style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
          Join us for live performances, worship nights and community outreach events across Zimbabwe
        </p>
      </section>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '4rem 2rem 0' }}>

        {/* FEATURED CONCERTS */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--gold)' }}>
              FEATURED CONCERTS
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {featured.map((event) => {
              const d = formatDate(event.date);
              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.35s', background: 'var(--card)' }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ position: 'relative', paddingBottom: '52%', overflow: 'hidden' }}>
                    <img
                      src={event.image}
                      alt={event.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                      onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,16,0.9) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(8,8,16,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(201,168,76,0.4)', padding: '0.6rem 1rem', textAlign: 'center', minWidth: '60px' }}>
                      <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>{d.day}</div>
                      <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', marginTop: '2px' }}>{d.month} {d.year}</div>
                    </div>
                    {event.ticketsAvailable && (
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--gold)', padding: '4px 12px', fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.15em', color: 'var(--deep)', fontWeight: 700 }}>
                        TICKETS AVAILABLE
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1.5rem', borderTop: '2px solid var(--gold)' }}>
                    <div style={{ display: 'inline-block', marginBottom: '0.6rem', padding: '2px 10px', background: categoryColors[event.category] || 'rgba(201,168,76,0.1)', border: `1px solid ${categoryBorders[event.category] || 'rgba(201,168,76,0.3)'}`, fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.18em', color: 'var(--gold)' }}>
                      {event.category}
                    </div>
                    <h3 style={{ color: 'var(--text)', fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{event.title}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '1rem' }}>
                      <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>🕐 {event.time}</span>
                      <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>📍 {event.venue}</span>
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                      {event.description}
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}
                        style={{ padding: '0.6rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.15em', transition: 'all 0.3s' }}
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
                      >
                        View Details
                      </button>
                      {event.ticketsAvailable && (
                        <TicketLink
                          url={event.ticketUrl}
                          style={{ padding: '0.6rem 1.5rem', background: 'var(--gold)', border: '1px solid var(--gold)', color: 'var(--deep)', textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.15em', fontWeight: 700, transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                        >
                          🎟 Get Tickets
                        </TicketLink>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="gold-line" style={{ marginBottom: '4rem' }} />

        {/* ALL EVENTS */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--gold)' }}>ALL EVENTS</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{ padding: '0.4rem 1.2rem', background: activeCategory === cat ? 'var(--gold)' : 'transparent', border: '1px solid', borderColor: activeCategory === cat ? 'var(--gold)' : 'var(--border)', color: activeCategory === cat ? 'var(--deep)' : 'var(--muted)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.15em', transition: 'all 0.3s' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[...filtered].sort((a, b) => new Date(a.date) - new Date(b.date)).map((event) => {
              const d = formatDate(event.date);
              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="event-row"
                  style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', background: 'var(--card)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer' }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)')}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div style={{ background: 'rgba(201,168,76,0.07)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 0.5rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '2px' }}>{d.weekday}</div>
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>{d.day}</div>
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.15em', color: 'var(--muted)', marginTop: '2px' }}>{d.month}</div>
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.55rem', color: 'var(--muted)', marginTop: '1px' }}>{d.year}</div>
                  </div>
                  <div style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <div style={{ padding: '2px 10px', background: categoryColors[event.category] || 'rgba(201,168,76,0.08)', border: `1px solid ${categoryBorders[event.category] || 'rgba(201,168,76,0.2)'}`, fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--gold)' }}>
                        {event.category}
                      </div>
                      {event.ticketsAvailable && (
                        <div style={{ padding: '2px 10px', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.4)', fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--gold)' }}>
                          🎟 TICKETS AVAILABLE
                        </div>
                      )}
                    </div>
                    <h3 style={{ color: 'var(--text)', fontSize: '1.05rem', marginBottom: '0.4rem' }}>{event.title}</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>🕐 {event.time}</span>
                      <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>📍 {event.venue}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', borderLeft: '1px solid var(--border)' }}>
                    {event.ticketsAvailable ? (
                      <TicketLink
                        url={event.ticketUrl}
                        style={{ padding: '0.55rem 1.2rem', background: 'var(--gold)', color: 'var(--deep)', textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.15em', fontWeight: 700, whiteSpace: 'nowrap', transition: 'all 0.3s' }}
                      >
                        Get Tickets
                      </TicketLink>
                    ) : (
                      <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--muted)', textAlign: 'center', padding: '0 0.5rem' }}>
                        Free Entry
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* EVENT DETAIL MODAL */}
      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(8,8,16,0.93)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: 'var(--card)', border: '1px solid rgba(201,168,76,0.3)', maxWidth: '680px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(201,168,76,0.1)', border: '1px solid var(--border)', color: 'var(--gold)', cursor: 'pointer', width: '36px', height: '36px', fontSize: '1rem', zIndex: 10 }}
            >
              ✕
            </button>

            <div style={{ position: 'relative', paddingBottom: '45%', overflow: 'hidden' }}>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(19,19,30,1) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(8,8,16,0.85)', border: '1px solid rgba(201,168,76,0.5)', padding: '0.75rem 1.25rem', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>
                    {formatDate(selectedEvent.date).day}
                  </div>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', marginTop: '3px' }}>
                    {formatDate(selectedEvent.date).month} {formatDate(selectedEvent.date).year}
                  </div>
                </div>
                <div>
                  <div style={{ display: 'inline-block', padding: '3px 12px', marginBottom: '6px', background: categoryColors[selectedEvent.category], border: `1px solid ${categoryBorders[selectedEvent.category]}`, fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.18em', color: 'var(--gold)' }}>
                    {selectedEvent.category}
                  </div>
                  <h2 style={{ color: 'var(--text)', fontSize: '1.6rem', lineHeight: 1.2 }}>{selectedEvent.title}</h2>
                </div>
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { icon: '📅', label: 'Date', value: formatDate(selectedEvent.date).full },
                  { icon: '🕐', label: 'Time', value: selectedEvent.time },
                  { icon: '📍', label: 'Venue', value: selectedEvent.venue },
                  { icon: '🎭', label: 'Category', value: selectedEvent.category },
                ].map((item) => (
                  <div key={item.label} style={{ padding: '1rem', background: 'var(--deep)', border: '1px solid var(--border)' }}>
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '5px' }}>
                      {item.icon} {item.label.toUpperCase()}
                    </div>
                    <div style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '20px', height: '1px', background: 'var(--gold)' }} />
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.3em', color: 'var(--gold)' }}>ABOUT THIS EVENT</span>
                </div>
                <p style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: '1rem', fontStyle: 'italic' }}>
                  {selectedEvent.description}
                </p>
              </div>

              {selectedEvent.ticketsAvailable ? (
                <div style={{ padding: '1.5rem', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.25)', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '4px' }}>
                        🎟 TICKETS AVAILABLE
                      </div>
                      <p style={{ color: 'var(--muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                        Secure your seat via TickeTora
                      </p>
                    </div>
                    <TicketLink
                      url={selectedEvent.ticketUrl}
                      style={{ padding: '0.85rem 2.5rem', background: 'var(--gold)', color: 'var(--deep)', textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: '0.72rem', letterSpacing: '0.2em', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}
                    >
                      🎟 Buy Tickets on TickeTora →
                    </TicketLink>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(76,201,130,0.05)', border: '1px solid rgba(76,201,130,0.2)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🙌</span>
                  <div>
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(76,201,130,0.8)', marginBottom: '3px' }}>
                      FREE ENTRY
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                      This event is free and open to everyone. Just come as you are!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .event-row { grid-template-columns: 80px 1fr !important; }
          .event-row > div:last-child { display: none !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}