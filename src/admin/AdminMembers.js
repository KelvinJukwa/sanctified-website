import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const emptyForm = { name: '', nickname: '', role: '', image_url: '', background: '', values: '', interests: '', fun_fact: '', sort_order: 0 };

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => { fetchMembers(); }, []);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('members').select('*').order('sort_order', { ascending: true });
    if (!error) setMembers(data);
    setLoading(false);
  };

  const openAdd = () => { setEditingMember(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (member) => { setEditingMember(member); setForm({ ...emptyForm, ...member }); setShowForm(true); };

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from('sanctified-media').upload(`members/${fileName}`, file);
    if (error) { showMsg('Error uploading photo', 'error'); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from('sanctified-media').getPublicUrl(`members/${fileName}`);
    setForm({ ...form, image_url: publicUrl });
    setUploading(false);
    showMsg('Photo uploaded!');
  };

  const saveMember = async () => {
    if (!form.name) { showMsg('Name is required', 'error'); return; }
    if (editingMember) {
      const { error } = await supabase.from('members').update(form).eq('id', editingMember.id);
      if (error) { showMsg('Error updating member', 'error'); return; }
      showMsg('Member updated!');
    } else {
      const { error } = await supabase.from('members').insert([form]);
      if (error) { showMsg('Error adding member', 'error'); return; }
      showMsg('Member added!');
    }
    setShowForm(false);
    fetchMembers();
  };

  const deleteMember = async (id) => {
    if (!window.confirm('Delete this member?')) return;
    await supabase.from('members').delete().eq('id', id);
    showMsg('Member deleted');
    fetchMembers();
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
          <h2 style={{ color: 'var(--text)', fontSize: '1.3rem', marginBottom: '4px' }}>Team Members</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>{members.length} member(s) total</p>
        </div>
        <button onClick={openAdd} style={{ padding: '0.75rem 1.75rem', background: 'var(--gold)', color: 'var(--deep)', border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 700 }}>
          + ADD MEMBER
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: 'var(--card)', border: '1px solid rgba(201,168,76,0.3)', padding: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--gold)', fontFamily: 'Cinzel, serif', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
            {editingMember ? 'EDIT MEMBER' : 'ADD NEW MEMBER'}
          </h3>

          {/* Photo Upload */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--deep)', border: '1px solid var(--border)', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {form.image_url ? (
                <img src={form.image_url} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: 'var(--muted)', fontSize: '1.5rem' }}>👤</span>
              )}
            </div>
            <label style={{ padding: '0.65rem 1.25rem', background: uploading ? 'rgba(201,168,76,0.3)' : 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.15em' }}>
              {uploading ? 'UPLOADING...' : '📷 UPLOAD PHOTO'}
              <input type="file" accept="image/*" onChange={uploadPhoto} style={{ display: 'none' }} disabled={uploading} />
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tendai Moyo" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Nickname</label>
              <input value={form.nickname} onChange={(e) => setForm({ ...form, nickname: e.target.value })} placeholder="T-Voice" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Role</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Lead Vocalist" style={inputStyle} />
            </div>
          </div>

          {[
            ['background', 'Background / Story', 4],
            ['values', 'Personal Values', 3],
            ['interests', 'Interests & Hobbies', 3],
            ['fun_fact', 'Fun Fact', 2],
          ].map(([field, label, rows]) => (
            <div key={field} style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>{label}</label>
              <textarea value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} rows={rows} placeholder={`${label}...`} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          ))}

          <div style={{ marginBottom: '1.5rem', maxWidth: '150px' }}>
            <label style={labelStyle}>Display Order</label>
            <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} style={inputStyle} min="0" />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={saveMember} style={{ padding: '0.7rem 1.75rem', background: 'var(--gold)', color: 'var(--deep)', border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.15em', fontWeight: 700 }}>
              {editingMember ? 'UPDATE MEMBER' : 'SAVE MEMBER'}
            </button>
            <button onClick={() => setShowForm(false)} style={{ padding: '0.7rem 1.75rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.15em' }}>CANCEL</button>
          </div>
        </div>
      )}

      {/* Members Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '3rem', fontStyle: 'italic' }}>Loading members...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {members.map((member) => (
            <div key={member.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'border-color 0.3s' }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--deep)', border: '1px solid var(--border)', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {member.image_url ? (
                    <img src={member.image_url} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem', color: 'var(--gold)' }}>{member.name?.charAt(0)}</span>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: 'var(--text)', fontSize: '1rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.name}</div>
                  {member.nickname && <div style={{ color: 'var(--gold)', fontSize: '0.72rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}>"{member.nickname}"</div>}
                  {member.role && <div style={{ color: 'var(--muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>{member.role}</div>}
                </div>
              </div>
              <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => openEdit(member)} style={{ flex: 1, padding: '0.55rem', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.12em' }}>✎ EDIT</button>
                <button onClick={() => deleteMember(member.id)} style={{ padding: '0.55rem 0.85rem', background: 'transparent', border: '1px solid rgba(220,80,80,0.3)', color: 'rgba(220,80,80,0.7)', cursor: 'pointer', fontSize: '0.85rem' }}>🗑</button>
              </div>
            </div>
          ))}
          {members.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--muted)', fontStyle: 'italic', border: '1px dashed var(--border)' }}>
              No members yet. Click "Add Member" to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}