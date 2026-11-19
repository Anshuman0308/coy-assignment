import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, MapPin, Sparkles } from 'lucide-react'

export default function Matches() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/matches')
      .then(r => r.json())
      .then(data => { setMatches(data); setLoading(false) })
  }, [])

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Matches</h1>
          <p style={styles.subtitle}>Your mutual connections</p>
        </div>
        {matches.length > 0 && (
          <div style={styles.badge}>
            <Heart size={13} fill="var(--gold)" color="var(--gold)" />
            <span style={styles.badgeText}>{matches.length}</span>
          </div>
        )}
      </div>

      {loading ? (
        <div style={styles.center}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            style={styles.spinner}
          />
        </div>
      ) : matches.length === 0 ? (
        <EmptyMatches />
      ) : (
        <div style={styles.list}>
          {matches.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              style={styles.card}
            >
              {/* Gold top accent */}
              <div style={styles.cardAccent} />

              <div style={styles.avatarWrap}>
                <img src={m.photo} alt={m.name} style={styles.avatar} />
                <div style={styles.avatarRing} />
                <div style={styles.heartBadge}>💘</div>
              </div>

              <div style={styles.info}>
                <div style={styles.nameRow}>
                  <h3 style={styles.name}>{m.name}</h3>
                  <span style={styles.age}>{m.age}</span>
                </div>
                <div style={styles.cityRow}>
                  <MapPin size={12} color="var(--gold)" />
                  <span style={styles.city}>{m.city}</span>
                </div>
                <p style={styles.bio}>{m.bio}</p>
                <div style={styles.tags}>
                  {m.interests.split(',').slice(0, 3).map(t => (
                    <span key={t} style={styles.tag}>{t.trim()}</span>
                  ))}
                </div>
              </div>

              <div style={styles.matchedLabel}>
                <Sparkles size={11} color="var(--gold)" />
                <span>Matched</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

function EmptyMatches() {
  return (
    <div style={styles.center}>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ fontSize: '3.5rem', marginBottom: 16 }}
      >
        💘
      </motion.div>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'var(--gold)', marginBottom: 8 }}>
        No matches yet
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textAlign: 'center', lineHeight: 1.6 }}>
        Keep swiping to find<br />your perfect match
      </p>
    </div>
  )
}

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '28px 32px 0',
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
  subtitle: { color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 4, letterSpacing: '0.05em' },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(201,168,76,0.1)',
    border: '1px solid var(--border)',
    borderRadius: 20,
    padding: '6px 14px',
  },
  badgeText: { color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 700 },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    overflowY: 'auto',
    paddingBottom: 24,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: 'var(--navy-mid)',
    border: '1px solid var(--border)',
    borderRadius: 20,
    padding: '16px 20px',
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
  },
  cardAccent: {
    position: 'absolute',
    top: 0, left: '15%', right: '15%',
    height: 1,
    background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
  },
  avatarWrap: {
    position: 'relative',
    width: 64,
    height: 64,
    flexShrink: 0,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid var(--gold)',
  },
  avatarRing: {
    position: 'absolute',
    inset: -4,
    borderRadius: '50%',
    border: '1px solid rgba(201,168,76,0.25)',
    pointerEvents: 'none',
  },
  heartBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    fontSize: '1rem',
    background: 'var(--navy-mid)',
    borderRadius: '50%',
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border)',
  },
  info: { flex: 1, minWidth: 0 },
  nameRow: { display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 },
  name: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'var(--cream)',
  },
  age: { color: 'var(--text-muted)', fontSize: '0.8rem' },
  cityRow: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 },
  city: { color: 'var(--text-muted)', fontSize: '0.75rem' },
  bio: {
    color: 'var(--cream)',
    fontSize: '0.8rem',
    opacity: 0.7,
    marginBottom: 8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tags: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  tag: {
    background: 'rgba(201,168,76,0.1)',
    border: '1px solid rgba(201,168,76,0.2)',
    color: 'var(--gold-light)',
    borderRadius: 20,
    padding: '2px 10px',
    fontSize: '0.68rem',
    fontWeight: 500,
  },
  matchedLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    color: 'var(--gold)',
    fontSize: '0.62rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    flexShrink: 0,
  },
  center: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: '3px solid var(--border)',
    borderTopColor: 'var(--gold)',
  },
}
