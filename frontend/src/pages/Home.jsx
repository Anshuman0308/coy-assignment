import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from 'framer-motion'
import { X, Heart, Zap, MapPin, Star } from 'lucide-react'
import MatchOverlay from '../components/MatchOverlay'

export default function Home() {
  const [profiles, setProfiles] = useState([])
  const [gone, setGone] = useState(new Set())
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastDir, setLastDir] = useState(null)

  useEffect(() => {
    fetch('/api/feed')
      .then(r => r.json())
      .then(data => { setProfiles(data); setLoading(false) })
  }, [])

  const remaining = profiles.filter(p => !gone.has(p.id))

  async function handleSwipe(profile, dir) {
    setLastDir(dir)
    setGone(prev => new Set([...prev, profile.id]))
    const liked = dir === 'right' || dir === 'up'
    const res = await fetch('/api/swipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ swipedId: profile.id, liked })
    })
    const data = await res.json()
    if (data.match) setMatch(profile)
  }

  if (loading) return <LoadingScreen />

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Discover</h1>
          <p style={styles.subtitle}>Find your perfect match</p>
        </div>
        <div style={styles.headerBadge}>
          <Star size={13} fill="var(--gold)" color="var(--gold)" />
          <span style={styles.badgeText}>Premium</span>
        </div>
      </div>

      <div style={styles.stackWrap}>
        <AnimatePresence>
          {remaining.length === 0 ? (
            <EmptyState key="empty" />
          ) : (
            <div style={styles.stack}>
              {remaining.slice(0, 3).reverse().map((profile, i) => {
                const isTop = i === remaining.slice(0, 3).length - 1
                const stackIndex = remaining.slice(0, 3).length - 1 - i
                return (
                  <SwipeCard
                    key={profile.id}
                    profile={profile}
                    isTop={isTop}
                    stackIndex={stackIndex}
                    onSwipe={handleSwipe}
                  />
                )
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      {remaining.length > 0 && (
        <div style={styles.actions}>
          <ActionBtn
            color="#e05c6e"
            bg="rgba(224,92,110,0.08)"
            label="Pass"
            onClick={() => handleSwipe(remaining[0], 'left')}
          >
            <X size={24} strokeWidth={2.5} />
          </ActionBtn>

          <ActionBtn
            color="var(--gold)"
            bg="rgba(201,168,76,0.08)"
            label="Super"
            large
            onClick={() => handleSwipe(remaining[0], 'up')}
          >
            <Zap size={26} strokeWidth={2} fill="var(--gold)" />
          </ActionBtn>

          <ActionBtn
            color="#4ade80"
            bg="rgba(74,222,128,0.08)"
            label="Like"
            onClick={() => handleSwipe(remaining[0], 'right')}
          >
            <Heart size={22} strokeWidth={2} />
          </ActionBtn>
        </div>
      )}

      {match && <MatchOverlay profile={match} onClose={() => setMatch(null)} />}
    </div>
  )
}

function SwipeCard({ profile, isTop, stackIndex, onSwipe }) {
  const controls = useAnimation()
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotate = useTransform(x, [-250, 250], [-20, 20])
  const likeOpacity = useTransform(x, [30, 120], [0, 1])
  const nopeOpacity = useTransform(x, [-30, -120], [0, 1])
  const superOpacity = useTransform(y, [-30, -120], [0, 1])
  const cardScale = useTransform(x, [-300, 0, 300], [0.95, 1, 0.95])

  const scale = 1 - stackIndex * 0.045
  const translateY = stackIndex * 16
  const brightness = 1 - stackIndex * 0.12

  async function flyOut(dir) {
    const targets = {
      right: { x: 800, y: -80, rotate: 25, opacity: 0 },
      left:  { x: -800, y: -80, rotate: -25, opacity: 0 },
      up:    { x: 0, y: -900, rotate: 0, opacity: 0 },
    }
    await controls.start({ ...targets[dir], transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } })
    onSwipe(profile, dir)
  }

  async function onDragEnd(_, info) {
    const { offset, velocity } = info
    if (offset.y < -120 || velocity.y < -600) { flyOut('up'); return }
    if (offset.x > 120 || velocity.x > 600)  { flyOut('right'); return }
    if (offset.x < -120 || velocity.x < -600) { flyOut('left'); return }
    controls.start({ x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 400, damping: 28 } })
  }

  return (
    <motion.div
      animate={controls}
      style={{
        ...styles.card,
        x: isTop ? x : 0,
        y: isTop ? y : 0,
        rotate: isTop ? rotate : 0,
        scale: isTop ? cardScale : scale,
        translateY: isTop ? 0 : translateY,
        zIndex: 10 - stackIndex,
        filter: `brightness(${brightness})`,
        cursor: isTop ? 'grab' : 'default',
        pointerEvents: isTop ? 'auto' : 'none',
      }}
      drag={isTop ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.12}
      onDragEnd={isTop ? onDragEnd : undefined}
      whileTap={isTop ? { cursor: 'grabbing' } : {}}
    >
      <img src={profile.photo} alt={profile.name} style={styles.cardImg} draggable={false} />
      <div style={styles.cardGradient} />

      {isTop && (
        <>
          <motion.div style={{ ...styles.stamp, ...styles.stampLike, opacity: likeOpacity }}>
            LIKE ♥
          </motion.div>
          <motion.div style={{ ...styles.stamp, ...styles.stampNope, opacity: nopeOpacity }}>
            NOPE ✕
          </motion.div>
          <motion.div style={{ ...styles.stamp, ...styles.stampSuper, opacity: superOpacity }}>
            ⚡ SUPER
          </motion.div>
        </>
      )}

      <div style={styles.cardInfo}>
        <div style={styles.cardNameRow}>
          <h2 style={styles.cardName}>{profile.name}</h2>
          <span style={styles.cardAge}>{profile.age}</span>
          <div style={styles.onlineDot} />
        </div>
        <div style={styles.cardCityRow}>
          <MapPin size={12} color="var(--gold)" />
          <span style={styles.cardCity}>{profile.city}</span>
        </div>
        <p style={styles.cardBio}>{profile.bio}</p>
        <div style={styles.tags}>
          {profile.interests.split(',').slice(0, 3).map(t => (
            <span key={t} style={styles.tag}>{t.trim()}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ActionBtn({ children, color, bg, label, onClick, large }) {
  const size = large ? 70 : 58
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.12, boxShadow: `0 8px 30px ${color}55` }}
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        style={{
          width: size, height: size,
          borderRadius: '50%',
          background: bg,
          border: `1.5px solid ${color}66`,
          color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 16px ${color}22`,
          backdropFilter: 'blur(8px)',
        }}
      >
        {children}
      </motion.button>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={styles.empty}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        style={{ fontSize: '4rem', marginBottom: 12 }}
      >✨</motion.div>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: 'var(--gold)', marginBottom: 8 }}>
        All caught up
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textAlign: 'center', lineHeight: 1.7 }}>
        You've seen everyone for now.<br />Check your matches!
      </p>
    </motion.div>
  )
}

function LoadingScreen() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid var(--border)', borderTopColor: 'var(--gold)' }}
      />
    </div>
  )
}

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 28px 20px',
    background: 'var(--navy)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    flexShrink: 0,
  },
  title: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '2.4rem',
    fontWeight: 600,
    color: 'var(--cream)',
    lineHeight: 1,
  },
  subtitle: { color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4, letterSpacing: '0.05em' },
  headerBadge: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: 'rgba(201,168,76,0.08)',
    border: '1px solid var(--border)',
    borderRadius: 20, padding: '6px 14px',
  },
  badgeText: { color: 'var(--gold)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' },
  stackWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 0,
  },
  stack: {
    position: 'relative',
    width: '100%',
    maxWidth: 390,
    height: 510,
  },
  card: {
    position: 'absolute',
    inset: 0,
    borderRadius: 28,
    overflow: 'hidden',
    background: 'var(--card-bg)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.08)',
    transformOrigin: 'bottom center',
    willChange: 'transform',
  },
  cardImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  cardGradient: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%',
    background: 'linear-gradient(to top, rgba(8,14,22,1) 0%, rgba(8,14,22,0.75) 45%, transparent 100%)',
  },
  stamp: {
    position: 'absolute',
    top: 36,
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.6rem',
    fontWeight: 900,
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: '5px 18px',
    letterSpacing: '0.08em',
    pointerEvents: 'none',
    backdropFilter: 'blur(4px)',
  },
  stampLike: {
    left: 20,
    color: '#4ade80',
    borderColor: '#4ade80',
    background: 'rgba(74,222,128,0.1)',
    transform: 'rotate(-12deg)',
    textShadow: '0 0 20px rgba(74,222,128,0.6)',
  },
  stampNope: {
    right: 20,
    color: '#e05c6e',
    borderColor: '#e05c6e',
    background: 'rgba(224,92,110,0.1)',
    transform: 'rotate(12deg)',
    textShadow: '0 0 20px rgba(224,92,110,0.6)',
  },
  stampSuper: {
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'var(--gold)',
    borderColor: 'var(--gold)',
    background: 'rgba(201,168,76,0.1)',
    textShadow: '0 0 20px rgba(201,168,76,0.7)',
    whiteSpace: 'nowrap',
  },
  cardInfo: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: '18px 22px 22px',
  },
  cardNameRow: { display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 },
  cardName: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '2rem', fontWeight: 600, color: '#fff',
  },
  cardAge: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '1.4rem', color: 'rgba(255,255,255,0.7)',
  },
  onlineDot: {
    width: 9, height: 9, borderRadius: '50%',
    background: '#4ade80', boxShadow: '0 0 8px #4ade80', marginLeft: 2,
  },
  cardCityRow: { display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 },
  cardCity: { color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' },
  cardBio: { color: 'rgba(255,255,255,0.85)', fontSize: '0.83rem', lineHeight: 1.55, marginBottom: 12 },
  tags: { display: 'flex', gap: 7, flexWrap: 'wrap' },
  tag: {
    background: 'rgba(201,168,76,0.12)',
    border: '1px solid rgba(201,168,76,0.28)',
    color: 'var(--gold-light)',
    borderRadius: 20, padding: '3px 11px',
    fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.03em',
  },
  actions: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    gap: 28, paddingTop: 16, flexShrink: 0,
  },
  empty: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 8, textAlign: 'center',
  },
}
