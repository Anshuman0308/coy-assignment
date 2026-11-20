import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, MessageCircle } from 'lucide-react'

export default function Matches() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/matches').then(r => r.json()).then(d => { setMatches(d); setLoading(false) })
  }, [])

  return (
    <div style={s.root}>
      <div style={s.header}>
        <h1 style={s.title}>Matches</h1>
        {matches.length > 0 && <span style={s.badge}>{matches.length}</span>}
      </div>

      {loading ? (
        <div style={s.center}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid var(--border)', borderTopColor: 'var(--rose)' }} />
        </div>
      ) : matches.length === 0 ? (
        <Empty />
      ) : (
        <div style={s.list}>
          {matches.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={s.card}
            >
              <div style={s.photoWrap}>
                <img src={m.photo} alt={m.name} style={s.photo} />
                <div style={s.onlineDot} />
              </div>
              <div style={s.info}>
                <div style={s.nameRow}>
                  <span style={s.name}>{m.name}, {m.age}</span>
                </div>
                <div style={s.cityRow}>
                  <MapPin size={12} color="var(--text-3)" />
                  <span style={s.city}>{m.city}</span>
                </div>
                <p style={s.bio}>{m.bio}</p>
                <div style={s.tags}>
                  {m.interests.split(',').slice(0, 2).map(t => (
                    <span key={t} style={s.tag}>{t.trim()}</span>
                  ))}
                </div>
              </div>
              <button style={s.msgBtn}>
                <MessageCircle size={20} color="var(--rose)" strokeWidth={1.8} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

function Empty() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ fontSize: '3rem', marginBottom: 16 }}>💘</motion.div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>No matches yet</h2>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.6 }}>Keep swiping to find<br />your perfect match</p>
    </div>
  )
}

const s = {
  root: { height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden' },
  header: { display: 'flex', alignItems: 'center', gap: 10, padding: '18px 20px 10px', flexShrink: 0 },
  title: { fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' },
  badge: {
    background: 'var(--rose)', color: '#fff',
    borderRadius: 20, padding: '2px 10px',
    fontSize: '0.78rem', fontWeight: 700,
  },
  center: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  list: { flex: 1, overflowY: 'auto', padding: '4px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 },
  card: {
    display: 'flex', alignItems: 'center', gap: 14,
    background: 'var(--surface)', borderRadius: 'var(--radius)',
    padding: '14px 16px', boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
  },
  photoWrap: { position: 'relative', flexShrink: 0 },
  photo: { width: 62, height: 62, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--rose-light)' },
  onlineDot: {
    position: 'absolute', bottom: 2, right: 2,
    width: 12, height: 12, borderRadius: '50%',
    background: 'var(--green)', border: '2px solid var(--surface)',
  },
  info: { flex: 1, minWidth: 0 },
  nameRow: { marginBottom: 2 },
  name: { fontSize: '1rem', fontWeight: 700, color: 'var(--text)' },
  cityRow: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 },
  city: { fontSize: '0.75rem', color: 'var(--text-3)' },
  bio: { fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: 7, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  tags: { display: 'flex', gap: 6 },
  tag: { background: 'var(--rose-light)', color: 'var(--rose-dark)', borderRadius: 20, padding: '2px 10px', fontSize: '0.68rem', fontWeight: 500 },
  msgBtn: { background: 'var(--rose-light)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
}
