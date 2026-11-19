import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function MatchOverlay({ profile, onClose }) {
  const navigate = useNavigate()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={styles.overlay}
      >
        {/* Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
              x: Math.cos((i / 12) * Math.PI * 2) * (80 + Math.random() * 80),
              y: Math.sin((i / 12) * Math.PI * 2) * (80 + Math.random() * 80),
            }}
            transition={{ duration: 1.2, delay: i * 0.05 }}
            style={{ ...styles.particle, background: i % 2 === 0 ? 'var(--gold)' : '#fff' }}
          />
        ))}

        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          style={styles.card}
        >
          {/* Gold line */}
          <div style={styles.goldLine} />

          <p style={styles.eyebrow}>It's a Match</p>
          <h2 style={styles.title}>You & {profile.name}</h2>
          <p style={styles.sub}>liked each other</p>

          {/* Avatars */}
          <div style={styles.avatars}>
            <div style={styles.avatarWrap}>
              <img src="https://i.pravatar.cc/300?img=1" alt="You" style={styles.avatar} />
              <div style={styles.avatarRing} />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={styles.heartBadge}
            >
              💘
            </motion.div>
            <div style={styles.avatarWrap}>
              <img src={profile.photo} alt={profile.name} style={styles.avatar} />
              <div style={styles.avatarRing} />
            </div>
          </div>

          <div style={styles.btnGroup}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { onClose(); navigate('/matches') }}
              style={styles.btnPrimary}
            >
              View Matches
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              style={styles.btnSecondary}
            >
              Keep Swiping
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(8,14,22,0.92)',
    backdropFilter: 'blur(12px)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: '50%',
    top: '50%',
    left: '50%',
  },
  card: {
    background: 'var(--navy-mid)',
    border: '1px solid var(--border)',
    borderRadius: 28,
    padding: '40px 36px',
    width: '90%',
    maxWidth: 380,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  goldLine: {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: 2,
    background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
  },
  eyebrow: {
    color: 'var(--gold)',
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '2.2rem',
    fontWeight: 600,
    color: 'var(--cream)',
    textAlign: 'center',
    lineHeight: 1.1,
  },
  sub: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    marginBottom: 8,
  },
  avatars: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    margin: '20px 0',
    position: 'relative',
  },
  avatarWrap: {
    position: 'relative',
    width: 90,
    height: 90,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid var(--gold)',
  },
  avatarRing: {
    position: 'absolute',
    inset: -5,
    borderRadius: '50%',
    border: '1px solid rgba(201,168,76,0.3)',
    pointerEvents: 'none',
  },
  heartBadge: {
    fontSize: '2rem',
    zIndex: 1,
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    marginTop: 8,
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
    color: '#fff',
    border: 'none',
    borderRadius: 14,
    padding: '14px',
    fontSize: '0.9rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
  },
  btnSecondary: {
    background: 'transparent',
    color: 'var(--text-muted)',
    border: '1px solid var(--border)',
    borderRadius: 14,
    padding: '14px',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
}
