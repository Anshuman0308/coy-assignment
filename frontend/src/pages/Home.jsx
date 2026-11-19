import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { X, Heart, Star, ChevronUp } from 'lucide-react'
import MatchOverlay from '../components/MatchOverlay'

export default function Home() {
  const [profiles, setProfiles] = useState([])
  const [gone, setGone] = useState(new Set())
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/feed')
      .then(r => r.json())
      .then(data => { setProfiles(data); setLoading(false) })
  }, [])

  const remaining = profiles.filter(p => !gone.has(p.id))

  async function handleSwipe(profile, dir) {
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
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Discover</h1>
          <p style={styles.subtitle}>Find your perfect match</p>
        </div>
        <div style={styles.headerBadge}>
          <Star size={14} fill="var(--gold)" color="var(--gold)" />
          <span style={styles.badgeText}>Premium</span>
        </div>
      </div>

      {/* Card Stack */}
      <div style={styles.stackWrap}>
        {remaining.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={styles.stack}>
            {remaining.slice(0, 3).reverse().map((profile, i) => {
              const isTop = i === remaining.slice(0, 3).length - 1
              return (
                <SwipeCard
                  key={profile.id}
                  profile={profile}
                  isTop={isTop}
                  stackIndex={remaining.slice(0, 3).length - 1 - i}
                  onSwipe={handleSwipe}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {remaining.length > 0 && (
        <div style={styles.actions}>
          <ActionBtn color="#e05c6e" bg="rgba(224,92,110,0.1)" onClick={() => handleSwipe(remaining[0], 'left')}>
            <X size={26} strokeWidth={2.5} />
          </ActionBtn>
          <ActionBtn color="var(--gold)" bg="rgba(201,168,76,0.1)" onClick={() => handleSwipe(remaining[0], 'up')} large>
            <ChevronUp size={30} strokeWidth={2.5} />
          </ActionBtn>
          <ActionBtn color="#5cb85c" bg="rgba(92,184,92,0.1)" onClick={() => handleSwipe(remaining[0], 'right')}>
            <Heart size={24} strokeWidth={2} fill="none" />
          </ActionBtn>
        </div>
      )}

      {match && <MatchOverlay profile={match} onClose={() => setMatch(null)} />}
    </div>
  )
}

function SwipeCard({ profile, isTop, stackIndex, onSwipe }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-18, 18])
  const likeOpacity = useTransform(x, [20, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1])
  const superOpacity = useTransform(y, [-20, -100], [0, 1])

  const scale = 1 - stackIndex * 0.04
  const translateY = stackIndex * 14

  function onDragEnd(_, info) {
    const { offset, velocity } = info
    if (offset.y < -100 || velocity.y < -500) { onSwipe(profile, 'up'); return }
    if (offset.x > 100 || velocity.x > 500) { onSwipe(profile, 'right'); return }
    if (offset.x < -100 || velocity.x < -500) { onSwipe(profile, 'left'); return }
    animate(x, 0, { type: 'spring', stiffness: 300 })
    animate(y, 0, { type: 'spring', stiffness: 300 })
  }

  return (
    <motion.div
      style={{
        ...styles.card,
        x: isTop ? x : 0,
        y: isTop ? y : 0,
        rotate: isTop ? rotate : 0,
        scale,
        translateY,
        zIndex: 10 - stackIndex,
        cursor: isTop ? 'grab' : 'default',
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? onDragEnd : undefined}
      whileTap={isTop ? { cursor: 'grabbing' } : {}}
    >
      <img src={profile.photo} alt={profile.name} style={styles.cardImg} draggable={false} />

      {/* Gradient overlay */}
      <div style={styles.cardGradient} />

      {/* Stamps */}
      {isTop && (
        <>
          <motion.div style={{ ...styles.stamp, ...styles.stampLike, opacity: likeOpacity }}>LIKE</motion.div>
          <motion.div style={{ ...styles.stamp, ...styles.stampNope, opacity: nopeOpacity }}>NOPE</motion.div>
          <motion.div style={{ ...styles.stamp, ...styles.stampSuper, opacity: superOpacity }}>SUPER</motion.div>
        </>
      )}

      {/* Card info */}
      <div style={styles.cardInfo}>
        <div style={styles.cardNameRow}>
          <h2 style={styles.cardName}>{profile.name}, {profile.age}</h2>
          <div style={styles.onlineDot} />
        </div>
        <p style={styles.cardCity}>📍 {profile.city}</p>
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

function ActionBtn({ children, color, bg, onClick, large }) {
  const size = large ? 68 : 56
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        width: size, height: size,
        borderRadius: '50%',
        background: bg,
        border: `1.5px solid ${color}`,
        color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 20px ${color}33`,
      }}
    >
      {children}
    </motion.button>
  )
}

function EmptyState() {
  return (
    <div style={styles.empty}>
      <div style={styles.emptyIcon}>✨</div>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: 'var(--gold)', marginBottom: 8 }}>
        All caught up
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>You've seen everyone for now.<br />Check your matches!</p>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div style={{ ...styles.root, alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
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
    padding: '28px 32px 24px',
    background: 'var(--navy)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    flexShrink: 0,
  },
  title: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '2.4rem',
    fontWeight: 600,
    color: 'var(--cream)',
    lineHeight: 1,
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '0.82rem',
    marginTop: 4,
    letterSpacing: '0.05em',
  },
  headerBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(201,168,76,0.1)',
    border: '1px solid var(--border)',
    borderRadius: 20,
    padding: '6px 14px',
  },
  badgeText: {
    color: 'var(--gold)',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
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
    maxWidth: 400,
    height: 520,
  },
  card: {
    position: 'absolute',
    inset: 0,
    borderRadius: 24,
    overflow: 'hidden',
    background: 'var(--card-bg)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1)',
    transformOrigin: 'bottom center',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '65%',
    background: 'linear-gradient(to top, rgba(10,18,28,0.98) 0%, rgba(10,18,28,0.7) 50%, transparent 100%)',
  },
  stamp: {
    position: 'absolute',
    top: 40,
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.8rem',
    fontWeight: 800,
    borderWidth: 4,
    borderStyle: 'solid',
    borderRadius: 8,
    padding: '4px 16px',
    letterSpacing: '0.1em',
    pointerEvents: 'none',
  },
  stampLike: {
    left: 24,
    color: '#5cb85c',
    borderColor: '#5cb85c',
    transform: 'rotate(-15deg)',
    textShadow: '0 0 20px rgba(92,184,92,0.5)',
  },
  stampNope: {
    right: 24,
    color: '#e05c6e',
    borderColor: '#e05c6e',
    transform: 'rotate(15deg)',
    textShadow: '0 0 20px rgba(224,92,110,0.5)',
  },
  stampSuper: {
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'var(--gold)',
    borderColor: 'var(--gold)',
    textShadow: '0 0 20px rgba(201,168,76,0.6)',
    whiteSpace: 'nowrap',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '20px 24px 24px',
  },
  cardNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  cardName: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '1.9rem',
    fontWeight: 600,
    color: '#fff',
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: '#5cb85c',
    boxShadow: '0 0 8px #5cb85c',
    flexShrink: 0,
  },
  cardCity: {
    color: 'var(--cream-dark)',
    fontSize: '0.82rem',
    marginBottom: 6,
    opacity: 0.8,
  },
  cardBio: {
    color: 'var(--cream)',
    fontSize: '0.85rem',
    lineHeight: 1.5,
    marginBottom: 12,
    opacity: 0.9,
  },
  tags: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    background: 'rgba(201,168,76,0.15)',
    border: '1px solid rgba(201,168,76,0.3)',
    color: 'var(--gold-light)',
    borderRadius: 20,
    padding: '4px 12px',
    fontSize: '0.72rem',
    fontWeight: 500,
    letterSpacing: '0.04em',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    paddingTop: 20,
    flexShrink: 0,
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: 8,
  },
}
