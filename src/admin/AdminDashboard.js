import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import AdminGallery from './AdminGallery';
import AdminVideos from './AdminVideos';
import AdminEvents from './AdminEvents';
import AdminMembers from './AdminMembers';

const navItems = [
  { id: 'home', label: 'Dashboard', icon: '⊞' },
  { id: 'gallery', label: 'Gallery', icon: '🖼' },
  { id: 'videos', label: 'Videos', icon: '🎬' },
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'members', label: 'Members', icon: '👥' },
  { id: 'admins', label: 'Admins', icon: '🔑' },
];

function QuickLinks({ setActiveTab }) {
  const cards = [
    { tab: 'gallery', icon: '🖼', title: 'Gallery', desc: 'Upload photos & manage albums', color: 'rgba(201,168,76,0.12)', border: 'rgba(201,168,76,0.3)' },
    { tab: 'videos', icon: '🎬', title: 'Videos', desc: 'Add & manage YouTube videos', color: 'rgba(76,130,201,0.12)', border: 'rgba(76,130,201,0.3)' },
    { tab: 'events', icon: '📅', title: 'Events', desc: 'Add concerts & upcoming events', color: 'rgba(201,76,130,0.12)', border: 'rgba(201,76,130,0.3)' },
    { tab: 'members', icon: '👥', title: 'Members', desc: 'Manage team member profiles', color: 'rgba(76,201,130,0.12)', border: 'rgba(76,201,130,0.3)' },
  ];

  const [counts, setCounts] = useState({ gallery: 0, videos: 0, events: 0, members: 0, admins: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const [albums, videos, events, members] = await Promise.all([
        supabase.from('albums').select('id', { count: 'exact', head: true }),
        supabase.from('videos').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('members').select('id', { count: 'exact', head: true }),
      ]);

      // Get admin count from admin_users table
      const { count: adminCount } = await supabase
        .from('admin_users')
        .select('id', { count: 'exact', head: true });

      setCounts({
        gallery: albums.count || 0,
        videos: videos.count || 0,
        events: events.count || 0,
        members: members.count || 0,
        admins: adminCount || 0,
      });
    };
    fetchCounts();
  }, []);

  const allCards = [
    ...cards,
    { tab: 'admins', icon: '🔑', title: 'Admins', desc: 'Manage admin accounts', color: 'rgba(150,100,201,0.12)', border: 'rgba(150,100,201,0.3)' },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '2rem 2.5rem', marginBottom: '2rem', borderLeft: '4px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.35em', color: 'var(--gold)', marginBottom: '0.5rem' }}>WELCOME BACK</div>
          <h2 style={{ color: 'var(--text)', fontSize: '1.6rem', marginBottom: '0.4rem' }}>Sanctified Admin Portal</h2>
          <p style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '0.95rem' }}>Manage your website content from one place</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer"
          style={{ padding: '0.75rem 1.75rem', border: '1px solid var(--gold)', color: 'var(--gold)', textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.2em', transition: 'all 0.3s' }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--deep)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}>
          VIEW LIVE WEBSITE →
        </a>
      </div>

      {/* Stats Row — now includes admins */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
        {allCards.map((card) => (
          <div key={card.tab} onClick={() => setActiveTab(card.tab)}
            style={{ background: card.color, border: `1px solid ${card.border}`, padding: '1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{card.icon}</div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1, marginBottom: '4px' }}>
              {counts[card.tab]}
            </div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)' }}>
              {card.title.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.35em', color: 'var(--gold)' }}>QUICK ACCESS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {allCards.map((card) => (
            <div key={card.tab} onClick={() => setActiveTab(card.tab)}
              style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem', background: 'var(--card)', border: `1px solid var(--border)`, cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = card.border; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ width: '52px', height: '52px', background: card.color, border: `1px solid ${card.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                {card.icon}
              </div>
              <div>
                <h3 style={{ fontFamily: 'Cinzel, serif', color: 'var(--text)', fontSize: '0.9rem', marginBottom: '4px', letterSpacing: '0.1em' }}>{card.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.82rem', fontStyle: 'italic' }}>{card.desc}</p>
              </div>
              <span style={{ marginLeft: 'auto', color: 'var(--gold)', fontSize: '1.1rem' }}>→</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tip Box */}
      <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>💡</span>
        <div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '4px' }}>HOW IT WORKS</div>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7, fontStyle: 'italic' }}>
            Any content you add here — videos, events, gallery photos, or member profiles — is saved to the database and automatically appears on the live website within seconds. No need to redeploy!
          </p>
        </div>
      </div>
    </div>
  );
}

function AdminInvite() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [adminList, setAdminList] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);

  useEffect(() => { fetchAdminList(); }, []);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const fetchAdminList = async () => {
    setLoadingAdmins(true);
    const { data } = await supabase.from('admin_users').select('*').order('created_at', { ascending: false });
    if (data) setAdminList(data);
    setLoadingAdmins(false);
  };

  const inviteAdmin = async () => {
    if (!email || !password) { showMsg('Please enter email and password', 'error'); return; }
    if (password.length < 6) { showMsg('Password must be at least 6 characters', 'error'); return; }
    setLoading(true);

    // Create auth user
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      showMsg(signUpError.message, 'error');
      setLoading(false);
      return;
    }

    // Also save to admin_users table so we can list them
    await supabase.from('admin_users').insert([{ email, auth_id: data?.user?.id }]);

    showMsg(`✅ Admin account created for ${email}! They can now log in at /admin/login`);
    setEmail('');
    setPassword('');
    fetchAdminList();
    setLoading(false);
  };

  const removeAdmin = async (id, adminEmail) => {
    if (!window.confirm(`Remove ${adminEmail} as admin?`)) return;
    await supabase.from('admin_users').delete().eq('id', id);
    showMsg(`${adminEmail} removed from admin list`);
    fetchAdminList();
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--text)', fontSize: '1.3rem', marginBottom: '4px' }}>Admin Management</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>Manage who can access the admin portal</p>
      </div>

      {message.text && (
        <div style={{ padding: '0.85rem 1.25rem', background: message.type === 'error' ? 'rgba(220,80,80,0.1)' : 'rgba(76,201,130,0.1)', border: `1px solid ${message.type === 'error' ? 'rgba(220,80,80,0.4)' : 'rgba(76,201,130,0.4)'}`, color: message.type === 'error' ? 'rgba(220,80,80,0.9)' : 'rgba(76,201,130,0.9)', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.12em', marginBottom: '1.5rem' }}>
          {message.text}
        </div>
      )}

      {/* Current Admins List */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '20px', height: '1px', background: 'var(--gold)' }} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.35em', color: 'var(--gold)' }}>
            CURRENT ADMINS ({adminList.length})
          </span>
        </div>

        {loadingAdmins ? (
          <p style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '0.85rem' }}>Loading...</p>
        ) : adminList.length === 0 ? (
          <p style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '0.85rem' }}>No admins found. Add one below.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {adminList.map((admin) => (
              <div key={admin.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'var(--deep)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cinzel, serif', fontSize: '0.75rem', color: 'var(--gold)' }}>
                    {admin.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{admin.email}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.72rem', fontStyle: 'italic' }}>
                      Added {new Date(admin.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>
                <button onClick={() => removeAdmin(admin.id, admin.email)}
                  style={{ padding: '0.4rem 0.85rem', background: 'transparent', border: '1px solid rgba(220,80,80,0.3)', color: 'rgba(220,80,80,0.7)', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}>
                  REMOVE
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invite Form */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '2rem', marginBottom: '2rem', borderTop: '3px solid var(--gold)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ width: '20px', height: '1px', background: 'var(--gold)' }} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.35em', color: 'var(--gold)' }}>ADD NEW ADMIN</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.5rem' }}>EMAIL ADDRESS</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="newadmin@sanctified.co.zw"
              style={{ width: '100%', padding: '0.85rem 1rem', background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--text)', fontFamily: 'Crimson Pro, serif', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.5rem' }}>PASSWORD</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              style={{ width: '100%', padding: '0.85rem 1rem', background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--text)', fontFamily: 'Crimson Pro, serif', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
          </div>
        </div>

        <button onClick={inviteAdmin} disabled={loading}
          style={{ padding: '0.8rem 2rem', background: loading ? 'rgba(201,168,76,0.5)' : 'var(--gold)', color: 'var(--deep)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.2em', fontWeight: 700, transition: 'all 0.3s' }}
          onMouseOver={(e) => { if (!loading) e.currentTarget.style.background = 'var(--gold-light)'; }}
          onMouseOut={(e) => { if (!loading) e.currentTarget.style.background = loading ? 'rgba(201,168,76,0.5)' : 'var(--gold)'; }}>
          {loading ? 'CREATING...' : '+ ADD ADMIN'}
        </button>

        <p style={{ color: 'var(--muted)', fontSize: '0.8rem', fontStyle: 'italic', marginTop: '1rem' }}>
          💡 After creating, share the email and password with the new admin.
        </p>
      </div>

      {/* Login URL Box */}
      <div style={{ padding: '1.5rem', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: '0.75rem' }}>🔑 ADMIN LOGIN URL — Share This Link</div>
        <div style={{ background: 'var(--deep)', border: '1px solid var(--border)', padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text)', wordBreak: 'break-all' }}>
          {window.location.origin}/admin/login
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <QuickLinks setActiveTab={setActiveTab} />;
      case 'gallery': return <AdminGallery />;
      case 'videos': return <AdminVideos />;
      case 'events': return <AdminEvents />;
      case 'members': return <AdminMembers />;
      case 'admins': return <AdminInvite />;
      default: return <QuickLinks setActiveTab={setActiveTab} />;
    }
  };

  const currentNav = navItems.find(n => n.id === activeTab);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deep)', display: 'flex' }}>

      {/* SIDEBAR */}
      <div style={{ width: sidebarOpen ? '240px' : '70px', flexShrink: 0, background: 'var(--dark)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', transition: 'width 0.3s ease', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '70px' }}>
          {sidebarOpen && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img src="/logo.png" alt="S" style={{ height: '34px', width: '34px', objectFit: 'contain', filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(5deg)', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '0.15em', fontWeight: 700, lineHeight: 1 }}>SANCTIFIED</div>
                <div style={{ fontSize: '0.52rem', letterSpacing: '0.25em', color: 'var(--muted)', marginTop: '2px' }}>ADMIN PORTAL</div>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.7rem', padding: '5px 7px', flexShrink: 0 }}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav style={{ flex: 1, padding: '0.75rem 0', overflowY: 'auto' }}>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.85rem', padding: sidebarOpen ? '0.85rem 1.25rem' : '0.85rem', background: activeTab === item.id ? 'rgba(201,168,76,0.12)' : 'transparent', border: 'none', borderLeft: activeTab === item.id ? '3px solid var(--gold)' : '3px solid transparent', color: activeTab === item.id ? 'var(--gold)' : 'var(--muted)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', fontFamily: 'Cinzel, serif', fontSize: '0.68rem', letterSpacing: '0.15em', whiteSpace: 'nowrap', justifyContent: sidebarOpen ? 'flex-start' : 'center' }}
              onMouseOver={(e) => { if (activeTab !== item.id) e.currentTarget.style.color = 'var(--text)'; }}
              onMouseOut={(e) => { if (activeTab !== item.id) e.currentTarget.style.color = 'var(--muted)'; }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
          {sidebarOpen && user && (
            <div style={{ marginBottom: '0.75rem', padding: '0.75rem', background: 'var(--card)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--muted)', fontFamily: 'Cinzel, serif', marginBottom: '3px' }}>LOGGED IN AS</div>
              <div style={{ color: 'var(--text)', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
            </div>
          )}
          <button onClick={handleLogout}
            style={{ width: '100%', padding: '0.7rem', background: 'rgba(220,80,80,0.08)', border: '1px solid rgba(220,80,80,0.25)', color: 'rgba(220,80,80,0.8)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(220,80,80,0.18)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(220,80,80,0.08)')}>
            {sidebarOpen ? '⏻ SIGN OUT' : '⏻'}
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, marginLeft: sidebarOpen ? '240px' : '70px', transition: 'margin-left 0.3s ease', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem' }}>{currentNav?.icon}</span>
            <div>
              <h1 style={{ color: 'var(--text)', fontSize: '1rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.12em' }}>{currentNav?.label}</h1>
              <p style={{ color: 'var(--muted)', fontSize: '0.75rem', fontStyle: 'italic' }}>
                {activeTab === 'home' ? 'Overview & quick access' : `Manage ${currentNav?.label.toLowerCase()} content`}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {navItems.filter(n => n.id !== 'home').map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                style={{ padding: '0.4rem 0.85rem', background: activeTab === item.id ? 'rgba(201,168,76,0.15)' : 'transparent', border: `1px solid ${activeTab === item.id ? 'rgba(201,168,76,0.4)' : 'var(--border)'}`, color: activeTab === item.id ? 'var(--gold)' : 'var(--muted)', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.12em', transition: 'all 0.2s' }}
                onMouseOver={(e) => { if (activeTab !== item.id) e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; }}
                onMouseOut={(e) => { if (activeTab !== item.id) e.currentTarget.style.borderColor = 'var(--border)'; }}>
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}