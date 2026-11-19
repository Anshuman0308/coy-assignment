import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search as SearchIcon, MapPin } from 'lucide-react'

export default function Search() {
  const [profiles, setProfiles] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch('/api/feed').then(r => r.json()).then(setProfiles)
  }, [])

  const filtered = profiles.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.city.toLowerCase().includes(query.toLowerCase()) ||
    p.interests.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <h1 style={styles.title}>Explore</h1>
        <p style={styles.subtitle}>Browse all profiles</p>
      </div>

      {/* Search bar */}
      <div style={styles.searchWrap}>
        <SearchIcon size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
        <input
          style={styles.input}
          placeholder="Search by name, city or interest..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Count */}
      <p style={styles.count}>{filtered.length} profiles</p>

      {/* Grid */}
      <div style={styles.grid}>
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            style={styles.card}
          >
            <div style={styles.imgWrap}>
              <img src={p.photo} alt={p.name} style={styles.img} />
              <div style={styles.imgOverlay} />
            </div>
            <div style={styles.info}>
              <div style={styles.nameRow}>
                <span style={styles.name}>{p.name}</span>
                <span style={styles.age}>{p.age}</span>
              </div>
              <div style={styles.cityRow}>
                <MapPin size={11} color="var(--gold)" />
                <span style={styles.city}>{p.city}</span>
              </div>
              <div style={styles.tags}>
                {p.interests.split(',').slice(0, 2).map(t => (
                  <span key={t} style={styles.tag}>{t.trim()}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
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
  header: { marginBottom: 20, flexShrink: 0 },
  title: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '2.4rem',
    fontWeight: 600,
    color: 'var(--cream)',
    lineHeight: 1,
  },
  subtitle: { color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 4, letterSpacing: '0.05em' },
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'var(--navy-mid)',
    border: '1px solid var(--border)',
    borderRadius: 14,
    padding: '12px 16px',
    marginBottom: 16,
    flexShrink: 0,
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--cream)',
    fontSize: '0.88rem',
    fontFamily: 'Montserrat, sans-serif',
  },
  count: {
    color: 'var(--text-muted)',
    fontSize: '0.75rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 16,
    flexShrink: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: 14,
    overflowY: 'auto',
    paddingBottom: 24,
  },
  card: {
    background: 'var(--card-bg)',
    borderRadius: 16,
    overflow: 'hidden',
    border: '1px solid var(--border)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  imgWrap: { position: 'relative', height: 160 },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  imgOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '40%',
    background: 'linear-gradient(to top, rgba(10,18,28,0.9), transparent)',
  },
  info: { padding: '10px 12px 12px' },
  nameRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 },
  name: { fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--cream)' },
  age: { color: 'var(--text-muted)', fontSize: '0.78rem' },
  cityRow: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 },
  city: { color: 'var(--text-muted)', fontSize: '0.72rem' },
  tags: { display: 'flex', gap: 5, flexWrap: 'wrap' },
  tag: {
    background: 'rgba(201,168,76,0.1)',
    border: '1px solid rgba(201,168,76,0.2)',
    color: 'var(--gold-light)',
    borderRadius: 20,
    padding: '2px 8px',
    fontSize: '0.65rem',
    fontWeight: 500,
  },
}
