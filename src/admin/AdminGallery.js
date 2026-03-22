import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminGallery() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [albumForm, setAlbumForm] = useState({ event: '', date: '', venue: '' });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => { fetchAlbums(); }, []);
  useEffect(() => { if (selectedAlbum) fetchPhotos(selectedAlbum.id); }, [selectedAlbum]);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const fetchAlbums = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('albums').select('*').order('created_at', { ascending: false });
    if (!error) setAlbums(data);
    setLoading(false);
  };

  const fetchPhotos = async (albumId) => {
    const { data, error } = await supabase.from('photos').select('*').eq('album_id', albumId).order('created_at', { ascending: true });
    if (!error) setPhotos(data);
  };

  const createAlbum = async () => {
    if (!albumForm.event || !albumForm.date || !albumForm.venue) { showMessage('Please fill all fields', 'error'); return; }
    const { error } = await supabase.from('albums').insert([albumForm]);
    if (error) { showMessage('Error creating album', 'error'); return; }
    showMessage('Album created successfully!');
    setAlbumForm({ event: '', date: '', venue: '' });
    setShowAlbumForm(false);
    fetchAlbums();
  };

  const deleteAlbum = async (id) => {
    if (!window.confirm('Delete this album and all its photos?')) return;
    await supabase.from('albums').delete().eq('id', id);
    showMessage('Album deleted');
    if (selectedAlbum?.id === id) setSelectedAlbum(null);
    fetchAlbums();
  };

  const uploadPhoto = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length || !selectedAlbum) return;
    setUploading(true);

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `gallery/${selectedAlbum.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('sanctified-media').upload(filePath, file);
      if (uploadError) { showMessage(`Error uploading ${file.name}`, 'error'); continue; }

      const { data: { publicUrl } } = supabase.storage.from('sanctified-media').getPublicUrl(filePath);

      await supabase.from('photos').insert([{ album_id: selectedAlbum.id, url: publicUrl, caption: file.name.replace(/\.[^/.]+$/, '') }]);

      // Set as cover if first photo
      if (!selectedAlbum.cover_url) {
        await supabase.from('albums').update({ cover_url: publicUrl }).eq('id', selectedAlbum.id);
        setSelectedAlbum({ ...selectedAlbum, cover_url: publicUrl });
      }
    }

    showMessage(`${files.length} photo(s) uploaded!`);
    setUploading(false);
    fetchPhotos(selectedAlbum.id);
    fetchAlbums();
    e.target.value = '';
  };

  const updateCaption = async (photoId, caption) => {
    await supabase.from('photos').update({ caption }).eq('id', photoId);
    setPhotos(photos.map(p => p.id === photoId ? { ...p, caption } : p));
  };

  const setCover = async (photoUrl) => {
    await supabase.from('albums').update({ cover_url: photoUrl }).eq('id', selectedAlbum.id);
    setSelectedAlbum({ ...selectedAlbum, cover_url: photoUrl });
    showMessage('Cover photo updated!');
    fetchAlbums();
  };

  const deletePhoto = async (photo) => {
    if (!window.confirm('Delete this photo?')) return;
    const path = photo.url.split('/sanctified-media/')[1];
    await supabase.storage.from('sanctified-media').remove([path]);
    await supabase.from('photos').delete().eq('id', photo.id);
    showMessage('Photo deleted');
    fetchPhotos(selectedAlbum.id);
  };

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--text)', fontFamily: 'Crimson Pro, serif', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.4rem' };

  return (
    <div>
      {/* Message Toast */}
      {message.text && (
        <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 1000, padding: '0.85rem 1.5rem', background: message.type === 'error' ? 'rgba(220,80,80,0.15)' : 'rgba(76,201,130,0.15)', border: `1px solid ${message.type === 'error' ? 'rgba(220,80,80,0.4)' : 'rgba(76,201,130,0.4)'}`, color: message.type === 'error' ? 'rgba(220,80,80,0.9)' : 'rgba(76,201,130,0.9)', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
          {message.text}
        </div>
      )}

      {!selectedAlbum ? (
        <>
          {/* Albums Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ color: 'var(--text)', fontSize: '1.3rem', marginBottom: '4px' }}>Photo Albums</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>{albums.length} album(s) total</p>
            </div>
            <button onClick={() => setShowAlbumForm(!showAlbumForm)} style={{ padding: '0.75rem 1.75rem', background: 'var(--gold)', color: 'var(--deep)', border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 700 }}>
              + NEW ALBUM
            </button>
          </div>

          {/* New Album Form */}
          {showAlbumForm && (
            <div style={{ background: 'var(--card)', border: '1px solid rgba(201,168,76,0.3)', padding: '1.75rem', marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--gold)', fontFamily: 'Cinzel, serif', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>CREATE NEW ALBUM</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                {[['event', 'Event Name', 'text'], ['date', 'Date', 'text'], ['venue', 'Venue', 'text']].map(([field, label, type]) => (
                  <div key={field}>
                    <label style={labelStyle}>{label}</label>
                    <input type={type} value={albumForm[field]} onChange={(e) => setAlbumForm({ ...albumForm, [field]: e.target.value })} style={inputStyle} placeholder={label} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={createAlbum} style={{ padding: '0.7rem 1.75rem', background: 'var(--gold)', color: 'var(--deep)', border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.15em', fontWeight: 700 }}>CREATE ALBUM</button>
                <button onClick={() => setShowAlbumForm(false)} style={{ padding: '0.7rem 1.75rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.15em' }}>CANCEL</button>
              </div>
            </div>
          )}

          {/* Albums Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '3rem', fontStyle: 'italic' }}>Loading albums...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {albums.map((album) => (
                <div key={album.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'border-color 0.3s' }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)')}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  {/* Cover */}
                  <div style={{ position: 'relative', paddingBottom: '55%', background: 'var(--deep)', overflow: 'hidden' }}>
                    {album.cover_url ? (
                      <img src={album.cover_url} alt={album.event} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontStyle: 'italic', fontSize: '0.85rem' }}>No cover photo</div>
                    )}
                  </div>
                  {/* Info */}
                  <div style={{ padding: '1.25rem', borderTop: '2px solid var(--gold)' }}>
                    <h3 style={{ color: 'var(--text)', fontSize: '1rem', marginBottom: '0.4rem' }}>{album.event}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: '0.25rem' }}>📅 {album.date}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>📍 {album.venue}</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => setSelectedAlbum(album)} style={{ flex: 1, padding: '0.6rem', background: 'var(--gold)', color: 'var(--deep)', border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.12em', fontWeight: 700 }}>
                        MANAGE PHOTOS
                      </button>
                      <button onClick={() => deleteAlbum(album.id)} style={{ padding: '0.6rem 0.85rem', background: 'transparent', border: '1px solid rgba(220,80,80,0.3)', color: 'rgba(220,80,80,0.7)', cursor: 'pointer', fontSize: '0.85rem' }}>🗑</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Photos Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button onClick={() => setSelectedAlbum(null)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', padding: '0.5rem 1rem', fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.15em' }}>
                ← BACK
              </button>
              <div>
                <h2 style={{ color: 'var(--text)', fontSize: '1.2rem', marginBottom: '2px' }}>{selectedAlbum.event}</h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.82rem', fontStyle: 'italic' }}>{photos.length} photos · {selectedAlbum.venue}</p>
              </div>
            </div>
            <label style={{ padding: '0.75rem 1.75rem', background: uploading ? 'rgba(201,168,76,0.5)' : 'var(--gold)', color: 'var(--deep)', cursor: uploading ? 'not-allowed' : 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 700 }}>
              {uploading ? 'UPLOADING...' : '+ UPLOAD PHOTOS'}
              <input type="file" multiple accept="image/*" onChange={uploadPhoto} style={{ display: 'none' }} disabled={uploading} />
            </label>
          </div>

          {/* Photos Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {photos.map((photo) => (
              <div key={photo.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <div style={{ position: 'relative', paddingBottom: '75%', overflow: 'hidden' }}>
                  <img src={photo.url} alt={photo.caption} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  {selectedAlbum.cover_url === photo.url && (
                    <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: 'var(--gold)', padding: '2px 8px', fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--deep)', fontWeight: 700 }}>COVER</div>
                  )}
                </div>
                <div style={{ padding: '0.75rem' }}>
                  <input
                    value={photo.caption || ''}
                    onChange={(e) => setPhotos(photos.map(p => p.id === photo.id ? { ...p, caption: e.target.value } : p))}
                    onBlur={(e) => updateCaption(photo.id, e.target.value)}
                    placeholder="Add caption..."
                    style={{ width: '100%', padding: '0.4rem 0.6rem', background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.15)', color: 'var(--text)', fontSize: '0.82rem', outline: 'none', boxSizing: 'border-box', marginBottom: '0.5rem' }}
                  />
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button onClick={() => setCover(photo.url)} style={{ flex: 1, padding: '0.4rem', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.6rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}>
                      SET COVER
                    </button>
                    <button onClick={() => deletePhoto(photo)} style={{ padding: '0.4rem 0.6rem', background: 'transparent', border: '1px solid rgba(220,80,80,0.3)', color: 'rgba(220,80,80,0.7)', cursor: 'pointer', fontSize: '0.8rem' }}>🗑</button>
                  </div>
                </div>
              </div>
            ))}
            {photos.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--muted)', fontStyle: 'italic', border: '1px dashed var(--border)' }}>
                No photos yet. Click "Upload Photos" to add some.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}