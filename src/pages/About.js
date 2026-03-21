import { useState } from 'react';

const members = [
  {
    name: 'Akatendeka T Muvhuti',
    nickname: 'AKA Classic Man',
    role: 'Tenor &',
    image: '/aka.png',
    background: 'Marondera was the place of birth and grew up in Mutare then at the age of 10, Akatendeka started to be interested in acapella music, singing lead tenor in church and school groups. After singing in various groups and choirs he finally learned to sing and direct all parts of a mixed group.',
    values: 'Composure, kindness, goal-oriented, strict, ambitious,  optimistic, caring and amicable',
    interests: 'Song and part rearrangement, farming, graphics, painting and all social activities ',
    funFact: 'Belting out tunes in the shower and splendid creation of negative harmonies',
  },
  {
    name: 'Rumbidzai Happiness Mafuta',
    nickname: 'Shorty',
    role: 'Soprano & Director',
    image: '/rumbi.jpeg',
    background: 'Rumbi discovered her gift for harmony at age 10 when she accidentally sang a perfect third above her mother in church. She has been chasing harmony ever since.',
    values: 'Excellence, grace, and sisterhood. She believes every voice matters in the choir of life.',
    interests: 'Baking, piano, fashion design, and nature walks.',
    funFact: 'Rumbi can harmonise to almost any song within seconds of hearing it — the group calls it her "superpower".',
  },
  {
    name: 'Kudakwashe T Magodo',
    nickname: '#BONES',
    role: 'Bass & Programmes Director',
    image: '/kuda.png',
    background: 'Kuda started singing at a tender age. His family has a culture of music which exposed him to different Christian genres that led to his creativity. He also focuses on music techniques and blending and harmony. #Songwriter in the making.',
    values: 'Gratitude, Humility, Respect, Creativity, and Loyalty, Positivity and Excellence to name a few',
    interests: 'Composing original hymns, technology, nature, Intellectual Pursuits, Religious Interests, and Entrepreneurship',
    funFact: 'There is a huge dichotomy between Kuda\'s talking voice and his singing voice.',
  },
  {
    name: 'Tanaka Victor Mangisi',
    nickname: 'Bass B',
    role: 'Bass',
    image: '/Tanaka.png',
    background: 'Tanaka taught himself bass guitar at 16 using YouTube tutorials. Within two years he was playing professionally at church events across Harare.',
    values: 'Consistency, loyalty, and showing up — even when no one is watching.',
    interests: 'Football, fishing, electronics repair, and gospel reggae music.',
    funFact: 'Tanaka still uses the same bass guitar he bought secondhand for $15 at age 16.',
  },
  {
    name: 'Tinokarira Muzamhindo',
    nickname: 'Wasu',
    role: 'Alto ',
    image: '/tino.jpeg',
    background: 'Tino was Born and raised in Mutare (Wasu) and she has Passion about entrepreneurship',
    values: 'God first, Personal growth, Chasing ambition, Authenticity, Simplicity – because simplicity is the essence of beauty ',
    interests: 'Knitting, Cooking and baking.',
    funFact: 'Joined Sanctified after listening to a touching song "Hupenyu" at CUTASA services.',
  },
  {
    name: 'Clive Thereal Mupfupi',
    nickname: 'TheReal',
    role: 'Tenor & Communications and Media Director',
    image: '/clive.png',
    background: 'Clive’s musical journey began at a tender age, where he first gained recognition as a powerful bass singer, most notably for the song "Jesu Ngarumbidzwe." However, after enduring persistent tonsil infections, his vocal range underwent a permanent shift. This transformation led him from deep bass notes to the alto and tenor parts he masters today. Despite these physical challenges, he remains a cornerstone of Sanctified Music, serving as a lead tenor and overseeing the group\'s public image and outreach. ',
    values: 'Adaptability, Perseverance, Musical Excellence, Faith-Driven Leadership, and Artistic Integrity.',
    interests: 'Acapella Arrangement, Media Ministry, Vocal Health, Youth Mentorship, and Cinematic Storytelling',
    funFact: 'Clive has a unique ability to "mid-lock" his voice while singing; however, due to his vocal history, he has a defined limit and cannot push his range beyond that specific locking point.',
  },
  {
    name: 'Runyararo Valene Busu',
    nickname: 'Chips',
    role: 'Soprano ',
    image: '/runya.jpeg',
    background: 'Runya grew up in Bulawayo and moved to Harare to study nursing. She joined Sanctified through a mutual friend and quickly became one of the group\'s brightest voices.',
    values: 'Joy, service, and spreading positivity wherever she goes.',
    interests: 'Nursing, poetry, dancing, and collecting African art.',
    funFact: 'Runya once performed at a concert just 3 hours after finishing a 12-hour hospital shift.',
  },
  {
    name: 'Bredon',
    nickname: 'Elder',
    role: 'Tenor ',
    image: '/brendon.jpeg',
    background: 'Brendon discovered his tenor voice during a school play at age 14. His drama teacher encouraged him to join the church choir and the rest is history.',
    values: 'Courage, perseverance, and using every talent for God\'s glory.',
    interests: 'Theatre, hiking, photography, and learning new languages.',
    funFact: 'Brendon speaks 4 languages and can sing in all of them — including a full gospel song in Swahili.',
  },
  {
    name: 'Fadzai Mutsawashe Dube',
    nickname: 'Sis Fadzie',
    role: 'Soprano',
    image: '/fadzi.jpeg',
    background: 'Fadzi studied music education at Bindura University and brings a teaching perspective to the group, always helping others improve their musical knowledge.',
    values: 'Knowledge, patience, and the belief that everyone can learn music.',
    interests: 'Teaching music to children, gardening, cycling, and Sabbath afternoon nature walks.',
    funFact: 'Fadzi runs a free music class for underprivileged children every Saturday morning.',
  },
  {
    name: 'Joina Atipaishe Munyavi',
    nickname: '#Mainini',
    role: 'Alto',
    image: '/joina.jpeg',
    background: 'Atipaishe Joina was born  in Buhera, Murambinda in 2004. She was raised  and thus  grew up in Mutare Manicaland , making her 100% WASU. Atipaishe is currently based in Harare as a third year attached Uni student, as of 2026.',
    values: '•Yaweh at the core of it all, and remains the central focus, Altruistic and magnanimous, Resolute in everything',
    interests: 'Long distance travelling, Music and singing, Inquisitive in a lot especialy food and culinary work',
    funFact: 'Joina has a love and hate relationship with avocados, and has always been like that since her childhood according to her father She is a huge fan of sleep ASMR and chicken burgers . Some wonder why she would love chicken burgers but absolutely hate beef burgers, interesting!!',
  },
  {
    name: 'Sibongile Nyampila', 
    nickname: '#MHAMHA',
    role: 'Vocalist',
    image: '/sibo.jpeg',
    background: 'Sibo brings movement and life to the stage. She trained in contemporary dance for 6 years before joining Sanctified and now choreographs all the group\'s stage performances.',
    values: 'Expression, freedom in worship, and the power of the body as an instrument of praise.',
    interests: 'Dance, fashion, motivational speaking, and community outreach.',
    funFact: 'Sibo choreographed the group\'s most popular performance in just one afternoon.',
  },
    {
    name: 'Tanyaradzwa Gwarada',
    nickname: 'Tete veOrder',
    role: 'Vocalist',
    image: '/tanya.jpeg', 
    background: 'Tanya brings movement and life to the stage. She trained in contemporary dance for 6 years before joining Sanctified and now choreographs all the group\'s stage performances.',
    values: 'Expression, freedom in worship, and the power of the body as an instrument of praise.',
    interests: 'Dance, fashion, motivational speaking, and community outreach.',
    funFact: 'Tanya choreographed the group\'s most popular performance in just one afternoon.',
  },
];

export default function About() {
  const [selected, setSelected] = useState(null);

  const values = [
    { icon: '✦', title: 'Faith', desc: 'Rooted in the Seventh-day Adventist faith, every song we sing glorifies God.' },
    { icon: '♪', title: 'Excellence', desc: 'We pour our best into every performance as an offering to the Lord.' },
    { icon: '❤', title: 'Community', desc: 'We believe music brings people together and strengthens the body of Christ.' },
    { icon: '☀', title: 'Outreach', desc: 'We use music as a tool to spread the Gospel and win souls for the kingdom.' },
  ];

  return (
    <div style={{ paddingTop: '75px', minHeight: '100vh' }}>

      {/* ═══ HERO ═══ */}
      <section style={{
        padding: '6rem 2rem 5rem',
        background: `radial-gradient(ellipse at top, rgba(201,168,76,0.12) 0%, transparent 65%), var(--dark)`,
        textAlign: 'center',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.5em', color: 'var(--gold)' }}>
            OUR STORY
          </span>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--text)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          About Sanctified
        </h1>
        <div className="gold-line" style={{ margin: '0 auto 2rem', maxWidth: '200px' }} />
        <p style={{
          maxWidth: '650px', margin: '0 auto', color: 'var(--muted)',
          fontStyle: 'italic', fontSize: '1.15rem', lineHeight: 2
        }}>
         Born at Ruya Adventist High School — united by one purpose: to glorify Christ through the divine gift of song.
        </p>
      </section>

      {/* ═══ OUR STORY ═══ */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="story-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--gold)' }}>HOW WE BEGAN</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--text)', marginBottom: '1.5rem', lineHeight: 1.3 }}>
              A Group Called<br /><em style={{ color: 'var(--gold)' }}>By God</em>
            </h2>
            <div className="gold-line-left" style={{ marginBottom: '2rem', maxWidth: '80px' }} />
            <p style={{ color: 'var(--muted)', lineHeight: 2.1, fontSize: '1.05rem', marginBottom: '1.2rem', fontStyle: 'italic' }}>
              Sanctified Acapella is a vibrant and spiritually grounded gospel singing group that was given life at 
              Ruya Adventist High School in 2018. Born out of a passion for harmonious worship and musical excellence, 
              the group began as a platform for nurturing young talent and spreading the gospel through a cappella music.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 2, fontSize: '1rem' }}>
              Now based at Chinhoyi University of Technology, Sanctified Acapella operates as a dynamic mixed group, 
              bringing together diverse voices united by faith and purpose. 
              The transition to a university setting has expanded its influence, 
              allowing it to minister to wider audiences while continuing to shape disciplined, 
              spiritually committed musicians.
            </p>
             <p style={{ color: 'var(--muted)', lineHeight: 2, fontSize: '1rem' }}>
              Sanctified Acapella has grown into a powerful musical movement. Over the years, 
              it has successfully groomed and produced outstanding musicians who have gone on to 
              sing with top-tier gospel ensembles such as The Vine, a testament to the group’s 
              strong musical foundation and commitment to excellence.
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              padding: '3rem 2.5rem', border: '1px solid var(--border)',
              background: 'var(--card)', position: 'relative', textAlign: 'center'
            }}>
              <div style={{ fontSize: '4rem', color: 'var(--gold)', opacity: 0.2, fontFamily: 'Cinzel, serif', lineHeight: 1 }}>"</div>
              <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--text)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                Sing to the Lord a new song; sing to the Lord, all the earth.
              </p>
              <div className="gold-line" style={{ margin: '0 auto 1rem', maxWidth: '100px' }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.35em', color: 'var(--gold)' }}>PSALM 96:1</span>
            </div>
            <div style={{
              position: 'absolute', bottom: '-1.5rem', right: '-1.5rem',
              background: 'rgba(201,168,76,0.1)', border: '1px solid var(--border)',
              padding: '1.25rem 1.75rem', zIndex: 2, textAlign: 'center'
            }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', color: 'var(--gold)', fontWeight: 700, lineHeight: 1 }}>2018</div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--muted)', marginTop: '4px' }}>FOUNDED</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.04), transparent)',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--gold)' }}>WHAT WE STAND FOR</span>
              <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text)' }}>Our Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {values.map(v => (
              <div key={v.title} style={{
                padding: '2.5rem 1.5rem', textAlign: 'center',
                background: 'var(--card)', border: '1px solid var(--border)',
                transition: 'border-color 0.3s, transform 0.3s'
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontSize: '0.9rem', letterSpacing: '0.2em', color: 'var(--text)', marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.8, fontStyle: 'italic' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MEET THE MEMBERS ═══ */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: 'var(--gold)' }}>THE TEAM</span>
              <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text)', marginBottom: '0.75rem' }}>Meet The Members</h2>
            <p style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '1rem', marginBottom: '3rem' }}>
              Click on any member to learn more about them
            </p>
          </div>

          {/* Members Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {members.map((member, i) => (
              <div
                key={member.name}
                onClick={() => setSelected(member)}
                style={{
                  cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  background: 'var(--card)', border: '1px solid var(--border)',
                  transition: 'all 0.35s ease',
                  aspectRatio: '3/4'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.querySelector('.member-overlay').style.opacity = '1';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.querySelector('.member-overlay').style.opacity = '0';
                }}
              >
                {/* Member Photo */}
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center top',
                    display: 'block', transition: 'transform 0.5s ease'
                  }}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />

                {/* Fallback if no image */}
                <div style={{
                  display: 'none', width: '100%', height: '100%',
                  alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(135deg, rgba(201,168,76,${0.05 + i * 0.02}), var(--card2))`,
                  position: 'absolute', inset: 0,
                  fontFamily: 'Cinzel, serif', fontSize: '4rem',
                  color: 'rgba(201,168,76,0.3)'
                }}>
                  {member.name.charAt(0)}
                </div>

                {/* Always visible bottom info */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(8,8,16,0.97) 0%, rgba(8,8,16,0.7) 60%, transparent 100%)',
                  padding: '2rem 1.25rem 1.25rem'
                }}>
                  <div style={{
                    fontFamily: 'Cinzel, serif', fontSize: '0.6rem',
                    letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: '4px'
                  }}>
                    "{member.nickname}"
                  </div>
                  <h3 style={{ color: 'var(--text)', fontSize: '1rem', marginBottom: '2px' }}>
                    {member.name}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.78rem', fontStyle: 'italic', letterSpacing: '0.05em' }}>
                    {member.role}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="member-overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(201,168,76,0.08)',
                  border: '2px solid rgba(201,168,76,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.3s ease'
                }}>
                  <div style={{
                    background: 'rgba(8,8,16,0.85)', padding: '0.6rem 1.5rem',
                    fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
                    letterSpacing: '0.25em', color: 'var(--gold)',
                    border: '1px solid rgba(201,168,76,0.4)'
                  }}>
                    VIEW BIO
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIO MODAL ═══ */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(8,8,16,0.92)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem', overflowY: 'auto'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--card)', border: '1px solid rgba(201,168,76,0.3)',
              maxWidth: '750px', width: '100%', position: 'relative',
              maxHeight: '90vh', overflowY: 'auto'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'sticky', top: '1rem', float: 'right',
                marginRight: '1rem', marginTop: '1rem',
                background: 'rgba(201,168,76,0.1)', border: '1px solid var(--border)',
                color: 'var(--gold)', cursor: 'pointer',
                width: '36px', height: '36px', fontSize: '1.1rem',
                fontFamily: 'Cinzel, serif', zIndex: 10
              }}
            >
              ✕
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr' }} className="modal-grid">

              {/* Left: Photo */}
              <div style={{ position: 'relative', minHeight: '300px' }}>
                <img
                  src={selected.image}
                  alt={selected.name}
                  style={{
                    width: '100%', height: '100%', minHeight: '300px',
                    objectFit: 'cover', objectPosition: 'center top', display: 'block'
                  }}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{
                  display: 'none', width: '100%', height: '300px',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.1), var(--dark))',
                  fontFamily: 'Cinzel, serif', fontSize: '5rem',
                  color: 'rgba(201,168,76,0.3)'
                }}>
                  {selected.name.charAt(0)}
                </div>
                {/* Gold overlay at bottom of photo */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, var(--card), transparent)',
                  height: '80px'
                }} />
              </div>

              {/* Right: Bio Content */}
              <div style={{ padding: '2rem 2rem 2rem 1.5rem' }}>

                {/* Name & Role */}
                <div style={{ marginBottom: '1.5rem', paddingRight: '2.5rem' }}>
                  <div style={{
                    fontFamily: 'Cinzel, serif', fontSize: '0.62rem',
                    letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: '6px'
                  }}>
                    "{selected.nickname}"
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--text)', marginBottom: '4px', lineHeight: 1.2 }}>
                    {selected.name}
                  </h2>
                  <p style={{ color: 'var(--gold)', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
                    {selected.role}
                  </p>
                </div>

                <div className="gold-line-left" style={{ marginBottom: '1.5rem', maxWidth: '60px' }} />

                {/* Bio Sections */}
                {[
                  { label: '📖 Background', content: selected.background },
                  { label: '✦ Personal Values', content: selected.values },
                  { label: '♪ Interests', content: selected.interests },
                  { label: '😄 Fun Fact', content: selected.funFact },
                ].map(section => (
                  <div key={section.label} style={{ marginBottom: '1.25rem' }}>
                    <div style={{
                      fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
                      letterSpacing: '0.2em', color: 'var(--gold)',
                      marginBottom: '6px', textTransform: 'uppercase'
                    }}>
                      {section.label}
                    </div>
                    <p style={{
                      color: 'var(--muted)', fontSize: '0.95rem',
                      lineHeight: 1.85, fontStyle: 'italic',
                      paddingLeft: '0.75rem',
                      borderLeft: '2px solid rgba(201,168,76,0.2)'
                    }}>
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: 'var(--dark)', borderTop: '1px solid var(--border)', padding: '3rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', marginBottom: '2rem', gap: '2rem' }}>
            <div className="gold-line" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: 'var(--gold)', letterSpacing: '0.25em', fontWeight: 700 }}>SANCTIFIED</div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--muted)', marginTop: '4px' }}>ACAPELLA</div>
            </div>
            <div className="gold-line" />
          </div>
          <div className="gold-line" style={{ marginBottom: '1.5rem' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)' }}>
              © 2026 SANCTIFIED ACAPELLA · ALL RIGHTS RESERVED
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>
              Designed & maintained by{' '}
              <a href="https://huyafricatechnologies.co.zw/" target="_blank" rel="noopener noreferrer" style={{
                color: 'var(--gold)', textDecoration: 'none',
                fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.1em'
              }}>
                HUYAFRICA TECHNOLOGIES
              </a>
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .modal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
