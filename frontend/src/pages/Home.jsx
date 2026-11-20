import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from 'framer-motion'
import { X, Heart, Zap, MapPin, ChevronDown } from 'lucide-react'
import MatchOverlay from '../components/MatchOverlay'

export default function Home() {
  const [profiles, setProfiles] = useState([])
  const [gone, setGone] = useState(new Set())
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/feed').then(r => r.json()).then(d => { setProfiles(d); setLoading(false) })
  }, [])

  const remaining = profiles.filter(p => !gone.has(p.id))

  async function handleSwipe(profile, dir) {
    setGone(prev => new Set([...prev, profile.id]))
    const liked = dir === 'right' || dir === 'up'
    const res = await fetch('/api/swipe', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ swipedId: profile.id, liked })
    })
    const data = await res.json()
    if (data.match) setMatch(profile)
  }

  if (loading) return <Loader />

  return (
    <div style={s.root}>
      <AnimatePresence mode="wait">
        {remaining.length === 0 ? (
          <EmptyState key="empty" />
        ) : (
          <ProfileCard
            key={remaining[0].id}
            profile={remaining[0]}
            onSwipe={handleSwipe}
          />
        )}
      </AnimatePresence>
      {match && <MatchOverlay profile={match} onClose={() => setMatch(null)} />}
    </div>
  )
}

function ProfileCard({ profile, onSwipe }) {
  const controls = useAnimation()
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-250, 250], [-14, 14])
  const likeOp = useTransform(x, [30, 110], [0, 1])
  const nopeOp = useTransform(x, [-30, -110], [0, 1])
  const scrollRef = useRef(null)

  const tags = profile.interests.split(',').map(t => t.trim())

  async function flyOut(dir) {
    const t = { right: { x: 900, rotate: 20 }, left: { x: -900, rotate: -20 }, up: { y: -900, rotate: 0 } }
    await controls.start({ ...t[dir], opacity: 0, transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] } })
    onSwipe(profile, dir)
  }

  function onDragEnd(_, { offset, velocity }) {
    if (offset.y < -110 || velocity.y < -500) { flyOut('up'); return }
    if (offset.x > 110 || velocity.x > 500) { flyOut('right'); return }
    if (offset.x < -110 || velocity.x < -500) { flyOut('left'); return }
    controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 500, damping: 35 } })
  }

  return (
    <motion.div
      animate={controls}
      style={{ ...s.cardWrap, x, rotate }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={onDragEnd}
      initial={{ opacity: 0, scale: 0.96 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      {/* Scrollable card body */}
      <div ref={scrollRef} style={s.card}>

        {/* Hero photo */}
        <div style={s.heroWrap}>
          <img src={profile.photo} alt={profile.name} style={s.heroImg} draggable={false} />
          {/* Like / Nope stamps */}
          <motion.div style={{ ...s.stamp, ...s.stampLike, opacity: likeOp }}>LIKE</motion.div>
          <motion.div style={{ ...s.stamp, ...s.stampNope, opacity: nopeOp }}>NOPE</motion.div>
          {/* Name overlay */}
          <div style={s.heroOverlay}>
            <div style={s.heroName}>
              <span style={s.name}>{profile.name}</span>
              <span style={s.age}>{profile.age}</span>
            </div>
            <div style={s.heroCity}>
              <MapPin size={13} color="#fff" />
              <span>{profile.city}</span>
            </div>
          </div>
          <div style={s.scrollHint}>
            <ChevronDown size={18} color="rgba(255,255,255,0.7)" />
          </div>
        </div>

        {/* Bio section */}
        <Section label="About me">
          <p style={s.bioText}>{profile.bio}</p>
        </Section>

        {/* Interests */}
        <Section label="Interests">
          <div style={s.tags}>
            {tags.map(t => (
              <span key={t} style={s.tag}>{t}</span>
            ))}
          </div>
        </Section>

        {/* Basics */}
        <Section label="Basics">
          <div style={s.basics}>
            <Pill icon="📍" text={profile.city} />
            <Pill icon="🎂" text={`${profile.age} years old`} />
          </div>
        </Section>

        {/* Bottom padding for action bar */}
        <div style={{ height: 100 }} />
      </div>

      {/* Fixed action bar */}
      <div style={s.actionBar}>
        <ActionBtn color="#e05c6e" bg="#fce8ed" onClick={() => flyOut('left')}>
          <X size={26} strokeWidth={2.5} color="#e05c6e" />
        </ActionBtn>
        <ActionBtn color="#d4506a" bg="#d4506a" primary onClick={() => flyOut('right')}>
          <Heart size={26} strokeWidth={2} color="#fff" fill="#fff" />
        </ActionBtn>
        <ActionBtn color="#f59e0b" bg="#fef3c7" onClick={() => flyOut('up')}>
          <Zap size={24} strokeWidth={2} color="#f59e0b" fill="#f59e0b" />
        </ActionBtn>
      </div>
    </motion.div>
  )
}

function Section({ label, children }) {
  return (
    <div style={s.section}>
      <span style={s.sectionLabel}>{label}</span>
      {children}
    </div>
  )
}

function Pill({ icon, text }) {
  return (
    <div style={s.pill}>
      <span>{icon}</span>
      <span style={s.pillText}>{text}</span>
    </div>
  )
}

function ActionBtn({ children, color, bg, onClick, primary }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      style={{
        width: primary ? 68 : 56, height: primary ? 68 : 56,
        borderRadius: '50%', background: bg, border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: primary ? '0 6px 24px rgba(212,80,106,0.4)' : '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      {children}
    </motion.button>
  )
}

function EmptyState() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.empty}>
      <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🎉</div>
      <h2 style={s.emptyTitle}>You're all caught up!</h2>
      <p style={s.emptySub}>Check back later for new profiles,<br />or see who you've matched with.</p>
    </motion.div>
  )
}

function Loader() {
  return (
    <div style={{ ...s.root, alignItems: 'center', justifyContent: 'center' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid var(--border)', borderTopColor: 'var(--rose)' }} />
    </div>
  )
}

const s = {
  root: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', overflow: 'hidden', position: 'relative' },
  cardWrap: {
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column',
    cursor: 'grab',
    willChange: 'transform',
  },
  card: {
    flex: 1, overflowY: 'auto', background: 'var(--surface)',
    WebkitOverflowScrolling: 'touch',
  },
  heroWrap: { position: 'relative', height: '62vh', flexShrink: 0 },
  heroImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none', userSelect: 'none' },
  heroOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: '60px 20px 20px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
  },
  heroName: { display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 },
  name: { fontSize: '2rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' },
  age: { fontSize: '1.4rem', fontWeight: 400, color: 'rgba(255,255,255,0.85)' },
  heroCity: { display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem' },
  scrollHint: {
    position: 'absolute', bottom: 12, right: 16,
    background: 'rgba(255,255,255,0.2)', borderRadius: '50%',
    width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
    backdropFilter: 'blur(4px)',
  },
  stamp: {
    position: 'absolute', top: 32,
    fontSize: '1.5rem', fontWeight: 800,
    border: '3px solid', borderRadius: 8,
    padding: '4px 14px', letterSpacing: '0.08em',
    pointerEvents: 'none',
  },
  stampLike: { left: 20, color: '#3d9970', borderColor: '#3d9970', transform: 'rotate(-12deg)', background: 'rgba(61,153,112,0.1)' },
  stampNope: { right: 20, color: '#e05c6e', borderColor: '#e05c6e', transform: 'rotate(12deg)', background: 'rgba(224,92,110,0.1)' },
  section: {
    padding: '20px 20px 0',
    borderBottom: '1px solid var(--border)',
    paddingBottom: 20,
  },
  sectionLabel: { display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 },
  bioText: { fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.65 },
  tags: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  tag: {
    background: 'var(--rose-light)', color: 'var(--rose-dark)',
    borderRadius: 20, padding: '6px 14px',
    fontSize: '0.82rem', fontWeight: 500,
  },
  basics: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  pill: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: 'var(--surface2)', borderRadius: 20,
    padding: '7px 14px', border: '1px solid var(--border)',
  },
  pillText: { fontSize: '0.82rem', color: 'var(--text-2)', fontWeight: 500 },
  actionBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 90, background: 'var(--surface)',
    borderTop: '1px solid var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 24, flexShrink: 0,
    boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
  },
  empty: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', padding: 40,
  },
  emptyTitle: { fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', marginBottom: 10 },
  emptySub: { fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.6 },
}
