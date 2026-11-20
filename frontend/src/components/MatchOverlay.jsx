import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function MatchOverlay({ profile, onClose }) {
  const navigate = useNavigate()
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={s.overlay}>
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.05 }}
          style={s.card}
        >
          {/* Photos */}
          <div style={s.photos}>
            <div style={s.photoWrap}>
              <img src="https://i.pravatar.cc/300?img=1" style={s.photo} />
            </div>
            <motion.div
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              style={s.heartBadge}
            >
              <Heart size={22} fill="var(--rose)" color="var(--rose)" />
            </motion.div>
            <div style={s.photoWrap}>
              <img src={profile.photo} style={s.photo} />
            </div>
          </div>

          <h2 style={s.title}>It's a Match!</h2>
          <p style={s.sub}>You and <strong>{profile.name}</strong> liked each other</p>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => { onClose(); navigate('/matches') }}
            style={s.btnPrimary}
          >
            View Matches
          </motion.button>
          <button onClick={onClose} style={s.btnSecondary}>Keep Swiping</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const s = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 100,
    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  card: {
    background: 'var(--surface)', borderRadius: 24,
    padding: '36px 28px 28px',
    width: '100%', maxWidth: 360,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
  },
  photos: { display: 'flex', alignItems: 'center', gap: 0, marginBottom: 24, position: 'relative' },
  photoWrap: { width: 90, height: 90 },
  photo: { width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--surface)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' },
  heartBadge: {
    width: 40, height: 40, borderRadius: '50%',
    background: 'var(--surface)', boxShadow: '0 2px 12px rgba(212,80,106,0.3)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1, marginLeft: -8, marginRight: -8, flexShrink: 0,
  },
  title: { fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: 8 },
  sub: { fontSize: '0.9rem', color: 'var(--text-2)', marginBottom: 24, textAlign: 'center', lineHeight: 1.5 },
  btnPrimary: {
    width: '100%', padding: '14px', background: 'var(--rose)',
    color: '#fff', border: 'none', borderRadius: 12,
    fontSize: '0.95rem', fontWeight: 600, marginBottom: 10,
    boxShadow: '0 4px 16px rgba(212,80,106,0.35)',
  },
  btnSecondary: {
    width: '100%', padding: '13px', background: 'none',
    color: 'var(--text-3)', border: '1.5px solid var(--border)',
    borderRadius: 12, fontSize: '0.9rem', fontWeight: 500,
  },
}
