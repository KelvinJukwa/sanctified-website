import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const categories = ['Concert', 'Rally', 'Outreach', 'Worship Night', 'General'];
const emptyForm = { title: '', date: '', time: '', venue: '', description: '', category: 'Concert', tickets_available: false, ticket_url: '', image_url: '', featured: false };

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => { fetchEvents(); }, []);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
    if (!error) setEvents(data);
    setLoading(false);
  };

  const openAdd = () => {
    setEditingEvent(null);
    setForm(emptyForm);
    setImagePreview(null);
    setShowForm(true);
  };

  const openEdit = (event) => {
    setEditingEvent(event);
    setForm({ ...emptyForm, ...event });
    setImagePreview(event.image_url || null);
    setShowForm(true);
  };

  const uploadEventImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);

    try {
      const fileExt = file.name.split('.').pop().toLowerCase();
      const fileName = `event-${Date.now()}.${fileExt}`;
      const filePath = `events/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('sanctified-media')
        .upload(filePath, file, { upsert: false });

      if (uploadError) { showMsg('Image upload failed: ' + uploadError.message, 'error'); setUploadingImage(false); return; }

      const { data: urlData } = supabase.storage.from('sanctified-media').getPublicUrl(filePath);
      const publicUrl = urlData?.publicUrl;

      if (publicUrl) {
        setForm(prev => ({ ...prev, image_url: publicUrl }));
        setImagePreview(publicUrl);
        showMsg('Image uploaded!');
      }
    } catch (err) {
      showMsg('Error: ' + err.message, 'error');
    }

    setUploadingImage(false);
    e.target.value = '';
  };

  const saveEvent = async () => {
    if (!form.title || !form.date || !form.venue) { showMsg('Title, date and venue are required', 'error'); return; }
    if (editingEvent) {
      const { error } = await supabase.from('events').update(form).eq('id', editingEvent.id);
      if (error) { showMsg('Error updating event: ' + error.message, 'error'); return; }
      showMsg('Event updated!');
    } else {
      const { error } = await supabase.from('events').insert([form]);
      if (error) { showMsg('Error adding event: ' + error.message, 'error'); return; }
      showMsg('Event added!');
    }
    setShowForm(false);
    setImagePreview(null);
    fetchEvents();
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    await supabase.from('events').delete().eq('id', id);
    showMsg('Event deleted');
    fetchEvents();
  };

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--text)', fontFamily: 'Crimson Pro, serif', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.4rem' };

  return (
    <div>
      {message.text && (
        <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 1000, padding: '0.85rem 1.5rem', background: message.type === 'error' ? 'rgba(220,80,80,0.15)' : 'rgba(76,201,130,0.15)', border: `1px solid ${message.type === 'error' ? 'rgba(220,80,80,0.4)' : 'rgba(76,201,130,0.4)'}`, color: message.type === 'error' ? 'rgba(220,80,80,0.9)' : 'rgba(76,201,130,0.9)', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.15em', maxWidth: '400px' }}>
          {message.text}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ color: 'var(--text)', fontSize: '1.3rem', marginBottom: '4px' }}>Events</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>{events.length} event(s) total</p>
        </div>
        <button onClick={openAdd} style={{ padding: '0.75rem 1.75rem', background: 'var(--gold)', color: 'var(--deep)', border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 700 }}>
          + ADD EVENT
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: 'var(--card)', border: '1px solid rgba(201,168,76,0.3)', padding: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--gold)', fontFamily: 'Cinzel, serif', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
            {editingEvent ? 'EDIT EVENT' : 'ADD NEW EVENT'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Event Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Easter Praise Concert" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Date *</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={{ ...inputStyle, colorScheme: 'dark' }} />
            </div>
            <div>
              <label style={labelStyle}>Time</label>
              <input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="6:00 PM" style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Venue *</label>
              <input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="Central SDA Church, Harare" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ ...inputStyle, cursor: 'pointer', colorScheme: 'dark' }}>
                {categories.map(c => <option key={c} value={c} style={{ background: 'var(--deep)' }}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Event description..." style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          {/* Event Image — Upload from device OR paste URL */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Event Image</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'start' }}>

              {/* Upload from device */}
              <div>
                <label style={{ display: 'block', fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: '0.4rem' }}>
                  UPLOAD FROM DEVICE
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: uploadingImage ? 'rgba(201,168,76,0.3)' : 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)', cursor: uploadingImage ? 'not-allowed' : 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.15em', transition: 'all 0.3s' }}>
                  {uploadingImage ? '⏳ UPLOADING...' : '📷 CHOOSE IMAGE'}
                  <input type="file" accept="image/*" onChange={uploadEventImage} style={{ display: 'none' }} disabled={uploadingImage} />
                </label>
              </div>

              {/* Or paste URL */}
              <div>
                <label style={{ display: 'block', fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: '0.4rem' }}>
                  OR PASTE IMAGE URL
                </label>
                <input
                  value={form.image_url}
                  onChange={(e) => { setForm({ ...form, image_url: e.target.value }); setImagePreview(e.target.value); }}
                  placeholder="https://..."
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div style={{ marginTop: '1rem', position: 'relative', display: 'inline-block' }}>
                <img src={imagePreview} alt="preview"
                  style={{ height: '120px', width: '200px', objectFit: 'cover', border: '1px solid rgba(201,168,76,0.3)' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <button onClick={() => { setImagePreview(null); setForm({ ...form, image_url: '' }); }}
                  style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(220,80,80,0.8)', border: 'none', color: '#fff', cursor: 'pointer', width: '20px', height: '20px', fontSize: '0.7rem', borderRadius: '50%' }}>
                  ✕
                </button>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Ticket URL (TickeTora)</label>
            <input value={form.ticket_url} onChange={(e) => setForm({ ...form, ticket_url: e.target.value })} placeholder="https://ticketora.com/..." style={inputStyle} disabled={!form.tickets_available} />
          </div>

          {/* Toggles */}
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
            {[['tickets_available', '🎟 Tickets Available'], ['featured', '⭐ Featured Event']].map(([field, label]) => (
              <label key={field} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.9rem' }}>
                <input type="checkbox" checked={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--gold)', cursor: 'pointer' }} />
                {label}
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={saveEvent} style={{ padding: '0.7rem 1.75rem', background: 'var(--gold)', color: 'var(--deep)', border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.15em', fontWeight: 700 }}>
              {editingEvent ? 'UPDATE EVENT' : 'SAVE EVENT'}
            </button>
            <button onClick={() => { setShowForm(false); setImagePreview(null); }} style={{ padding: '0.7rem 1.75rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.15em' }}>CANCEL</button>
          </div>
        </div>
      )}

      {/* Events List */}
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '3rem', fontStyle: 'italic' }}>Loading events...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {events.map((event) => (
            <div key={event.id} style={{ display: 'grid', gridTemplateColumns: '90px 1fr auto', background: 'var(--card)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'border-color 0.3s' }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}>
              {/* Date */}
              <div style={{ background: 'rgba(201,168,76,0.07)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem 0.5rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>
                  {event.date ? new Date(event.date).getDate() : '—'}
                </div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--muted)', marginTop: '2px' }}>
                  {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase() : ''}
                </div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.52rem', color: 'var(--muted)', marginTop: '1px' }}>
                  {event.date ? new Date(event.date).getFullYear() : ''}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {event.image_url && (
                  <img src={event.image_url} alt={event.title} style={{ width: '60px', height: '60px', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border)' }} />
                )}
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ padding: '1px 8px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--gold)' }}>{event.category}</span>
                    {event.featured && <span style={{ padding: '1px 8px', background: 'rgba(255,200,0,0.1)', border: '1px solid rgba(255,200,0,0.3)', fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(255,200,0,0.8)' }}>⭐ FEATURED</span>}
                    {event.tickets_available && <span style={{ padding: '1px 8px', background: 'rgba(76,201,130,0.1)', border: '1px solid rgba(76,201,130,0.3)', fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(76,201,130,0.8)' }}>🎟 TICKETS</span>}
                  </div>
                  <h3 style={{ color: 'var(--text)', fontSize: '1rem', marginBottom: '0.3rem' }}>{event.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {event.time && <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>🕐 {event.time}</span>}
                    {event.venue && <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>📍 {event.venue}</span>}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', borderLeft: '1px solid var(--border)', justifyContent: 'center' }}>
                <button onClick={() => openEdit(event)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>✎ EDIT</button>
                <button onClick={() => deleteEvent(event.id)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid rgba(220,80,80,0.3)', color: 'rgba(220,80,80,0.7)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.12em' }}>🗑 DELETE</button>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)', fontStyle: 'italic', border: '1px dashed var(--border)' }}>
              No events yet. Click "Add Event" to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}