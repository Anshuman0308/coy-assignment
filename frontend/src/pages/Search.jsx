import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search as SearchIcon, MapPin } from 'lucide-react'

export default function Search() {
  const [profiles, setProfiles] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => { fetch('/api/feed').then(r => r.json()).then(setProfiles) }, [])

  const filtered = profiles.filter(p =>
    [p.name, p.city, p.interests].some(f => f.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div style={s.root}>
      {/* Search bar */}
      <div style={s.searchBar}>
        <SearchIcon size={16} color="var(--text-3)" />
        <input
          style={s.input}
          placeholder="Search by name, city or interest..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <p style={s.count}>{filtered.length} people nearby</p>

      <div style={s.grid}>
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.025 }}
            style={s.card}
          >
            <div style={s.imgWrap}>
              <img src={p.photo} alt={p.name} style={s.img} />
              <div style={s.imgGrad} />
              <div style={s.cardOverlay}>
                <span style={s.cardName}>{p.name}, {p.age}</span>
                <div style={s.cardCity}>
                  <MapPin size={10} color="rgba(255,255,255,0.8)" />
                  <span>{p.city}</span>
                </div>
              </div>
            </div>
            <div style={s.cardBody}>
              <div style={s.cardTags}>
                {p.interests.split(',').slice(0, 2).map(t => (
                  <span key={t} style={s.tag}>{t.trim()}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const s = {
  root: { height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden' },
  searchBar: {
    display: 'flex', alignItems: 'center', gap: 10,
    margin: '14px 16px 0',
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 14, padding: '11px 14px', flexShrink: 0,
    boxShadow: 'var(--shadow)',
  },
  input: { flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '0.9rem', color: 'var(--text)' },
  count: { padding: '10px 16px 6px', fontSize: '0.75rem', color: 'var(--text-3)', fontWeight: 500, flexShrink: 0 },
  grid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: 12, padding: '0 16px 16px',
    overflowY: 'auto', flex: 1,
  },
  card: { background: 'var(--surface)', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow)' },
  imgWrap: { position: 'relative', height: 180 },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  imgGrad: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' },
  cardOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 12px' },
  cardName: { display: 'block', fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: 2 },
  cardCity: { display: 'flex', alignItems: 'center', gap: 3, color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem' },
  cardBody: { padding: '10px 12px 12px' },
  cardTags: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  tag: { background: 'var(--rose-light)', color: 'var(--rose-dark)', borderRadius: 20, padding: '3px 10px', fontSize: '0.7rem', fontWeight: 500 },
}
