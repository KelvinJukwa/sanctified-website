import { useState } from 'react';

const initialEvents = [
  { id: 1, title: 'Easter Praise Concert', date: '2026-04-04', time: '6:00 PM', venue: 'Central SDA Church, Harare', description: 'Join us for a special Easter praise and worship evening.' },
  { id: 2, title: 'Youth Camp Performance', date: '2026-05-20', time: '7:30 PM', venue: 'Gweru SDA Camp', description: 'Performing at the annual youth camp rally.' },
];

export default function Events() {
  const [events, setEvents] = useState(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', time: '', venue: '', description: '' });

  const addEvent = () => {
    if (!form.title || !form.date) return;
    setEvents([...events, { id: Date.now(), ...form }]);
    setForm({ title: '', date: '', time: '', venue: '', description: '' });
    setShowForm(false);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const fields = [
    { key: 'title', label: 'Event Title', type: 'text' },
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'time', label: 'Time', type: 'text' },
    { key: 'venue', label: 'Venue', type: 'text' },
    { key: 'description', label: 'Description', type: 'text' },
  ];

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh', padding: '90px 2rem 4rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem',
            letterSpacing: '0.4em', color: 'var(--gold)', marginBottom: '1rem' }}>
            COME WORSHIP WITH US
          </p>
          <h1 style={{ fontSize: '3rem', color: 'var(--text)', marginBottom: '1rem' }}>Upcoming Events</h1>
          <div className="gold-line" style={{ margin: '0 auto', maxWidth: '150px' }} />
        </div>

        <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
          <button onClick={() => setShowForm(!showForm)} style={{
            padding: '0.8rem 2rem', background: 'var(--gold)', color: 'var(--deep)',
            border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif',
            fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 600
          }}>
            + Add Event
          </button>
        </div>

        {showForm && (
          <div style={{ background: 'var(--card)', border: '1px solid rgba(201,168,76,0.3)',
            padding: '2rem', marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '1rem', letterSpacing: '0.2em' }}>
              ADD NEW EVENT
            </h3>
            {fields.map(f => (
              <div key={f.key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: 'var(--muted)', fontSize: '0.75rem',
                  letterSpacing: '0.2em', marginBottom: '0.5rem', textTransform: 'uppercase',
                  fontFamily: 'Cinzel, serif' }}>{f.label}</label>
                <input type={f.type} value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem',
                    background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)',
                    color: 'var(--text)', fontFamily: 'Crimson Pro, serif', fontSize: '1rem',
                    outline: 'none', colorScheme: 'dark' }}
                />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button onClick={addEvent} style={{
                padding: '0.75rem 2rem', background: 'var(--gold)', color: 'var(--deep)',
                border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif',
                fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 600
              }}>Save Event</button>
              <button onClick={() => setShowForm(false)} style={{
                padding: '0.75rem 2rem', background: 'transparent',
                border: '1px solid rgba(201,168,76,0.3)', color: 'var(--muted)',
                cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.75rem'
              }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Events List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {events.sort((a, b) => new Date(a.date) - new Date(b.date)).map(event => (
            <div key={event.id} style={{
              display: 'grid', gridTemplateColumns: '140px 1fr',
              background: 'var(--card)', border: '1px solid rgba(201,168,76,0.15)',
              overflow: 'hidden'
            }}>
              {/* Date Block */}
              <div style={{ background: 'rgba(201,168,76,0.1)', padding: '2rem 1rem',
                textAlign: 'center', borderRight: '1px solid rgba(201,168,76,0.15)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold)',
                  lineHeight: 1, fontFamily: 'Cinzel, serif' }}>
                  {new Date(event.date).getDate()}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontFamily: 'Cinzel, serif', marginTop: '0.25rem' }}>
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
                  {new Date(event.date).getFullYear()}
                </div>
              </div>
              {/* Details */}
              <div style={{ padding: '1.5rem 2rem' }}>
                <h3 style={{ color: 'var(--text)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                  {event.title}
                </h3>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  {event.time && <span style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>🕐 {event.time}</span>}
                  {event.venue && <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>📍 {event.venue}</span>}
                </div>
                <p style={{ color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.6 }}>
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}