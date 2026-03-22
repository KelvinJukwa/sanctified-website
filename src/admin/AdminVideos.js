import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const categories = ['General', 'Live Performance', 'Worship', 'Concert', 'Studio'];

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [form, setForm] = useState({ title: '', url: '', description: '', category: 'General' });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => { fetchVideos(); }, []);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const fetchVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
    if (!error) setVideos(data);
    setLoading(false);
  };

  const getEmbedUrl = (url) => {
    if (url.includes('embed')) return url;
    if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/');
    if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'youtube.com/embed/');
    return url;
  };

  const getThumbnail = (url) => {
    const embedUrl = getEmbedUrl(url);
    const videoId = embedUrl.split('/embed/')[1]?.split('?')[0];
    return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
  };

  const openAdd = () => {
    setEditingVideo(null);
    setForm({ title: '', url: '', description: '', category: 'General' });
    setShowForm(true);
  };

  const openEdit = (video) => {
    setEditingVideo(video);
    setForm({ title: video.title, url: video.url, description: video.description || '', category: video.category || 'General' });
    setShowForm(true);
  };

  const saveVideo = async () => {
    if (!form.title || !form.url) { showMsg('Title and URL are required', 'error'); return; }
    const embedUrl = getEmbedUrl(form.url);
    const data = { ...form, url: embedUrl };

    if (editingVideo) {
      const { error } = await supabase.from('videos').update(data).eq('id', editingVideo.id);
      if (error) { showMsg('Error updating video', 'error'); return; }
      showMsg('Video updated!');
    } else {
      const { error } = await supabase.from('videos').insert([data]);
      if (error) { showMsg('Error adding video', 'error'); return; }
      showMsg('Video added!');
    }
    setShowForm(false);
    fetchVideos();
  };

  const deleteVideo = async (id) => {
    if (!window.confirm('Delete this video?')) return;
    await supabase.from('videos').delete().eq('id', id);
    showMsg('Video deleted');
    fetchVideos();
  };

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--text)', fontFamily: 'Crimson Pro, serif', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.4rem' };

  return (
    <div>
      {message.text && (
        <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 1000, padding: '0.85rem 1.5rem', background: message.type === 'error' ? 'rgba(220,80,80,0.15)' : 'rgba(76,201,130,0.15)', border: `1px solid ${message.type === 'error' ? 'rgba(220,80,80,0.4)' : 'rgba(76,201,130,0.4)'}`, color: message.type === 'error' ? 'rgba(220,80,80,0.9)' : 'rgba(76,201,130,0.9)', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
          {message.text}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ color: 'var(--text)', fontSize: '1.3rem', marginBottom: '4px' }}>Videos</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>{videos.length} video(s) total</p>
        </div>
        <button onClick={openAdd} style={{ padding: '0.75rem 1.75rem', background: 'var(--gold)', color: 'var(--deep)', border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 700 }}>
          + ADD VIDEO
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: 'var(--card)', border: '1px solid rgba(201,168,76,0.3)', padding: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--gold)', fontFamily: 'Cinzel, serif', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
            {editingVideo ? 'EDIT VIDEO' : 'ADD NEW VIDEO'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Video Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Amazing Grace" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ ...inputStyle, cursor: 'pointer', colorScheme: 'dark' }}>
                {categories.map(c => <option key={c} value={c} style={{ background: 'var(--deep)' }}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>YouTube URL</label>
            <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." style={inputStyle} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Description</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description of the video" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={saveVideo} style={{ padding: '0.7rem 1.75rem', background: 'var(--gold)', color: 'var(--deep)', border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.15em', fontWeight: 700 }}>
              {editingVideo ? 'UPDATE VIDEO' : 'SAVE VIDEO'}
            </button>
            <button onClick={() => setShowForm(false)} style={{ padding: '0.7rem 1.75rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.15em' }}>CANCEL</button>
          </div>
        </div>
      )}

      {/* Videos List */}
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '3rem', fontStyle: 'italic' }}>Loading videos...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {videos.map((video) => (
            <div key={video.id} style={{ display: 'grid', gridTemplateColumns: '160px 1fr auto', gap: '1.25rem', background: 'var(--card)', border: '1px solid var(--border)', overflow: 'hidden', alignItems: 'center', transition: 'border-color 0.3s' }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}>
              {/* Thumbnail */}
              <div style={{ position: 'relative', paddingBottom: '56.25%', background: 'var(--deep)' }}>
                {getThumbnail(video.url) && (
                  <img src={getThumbnail(video.url)} alt={video.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              {/* Info */}
              <div style={{ padding: '1rem 0' }}>
                <div style={{ display: 'inline-block', padding: '2px 8px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                  {video.category}
                </div>
                <h3 style={{ color: 'var(--text)', fontSize: '1rem', marginBottom: '0.3rem' }}>{video.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>{video.description}</p>
              </div>
              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', borderLeft: '1px solid var(--border)' }}>
                <button onClick={() => openEdit(video)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>✎ EDIT</button>
                <button onClick={() => deleteVideo(video.id)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid rgba(220,80,80,0.3)', color: 'rgba(220,80,80,0.7)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.12em' }}>🗑 DELETE</button>
              </div>
            </div>
          ))}
          {videos.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)', fontStyle: 'italic', border: '1px dashed var(--border)' }}>
              No videos yet. Click "Add Video" to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}