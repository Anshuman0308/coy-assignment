import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, ChevronRight } from 'lucide-react'

const DEMOS = [
  { name: 'Alex', photo: 'https://i.pravatar.cc/300?img=1', age: 25, city: 'New York' },
  { name: 'Emma', photo: 'https://i.pravatar.cc/300?img=5', age: 23, city: 'Boston' },
  { name: 'Sophia', photo: 'https://i.pravatar.cc/300?img=9', age: 26, city: 'Chicago' },
  { name: 'Olivia', photo: 'https://i.pravatar.cc/300?img=10', age: 24, city: 'LA' },
]

export default function Login({ onLogin }) {
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDemo, setShowDemo] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)
    onLogin({ name: name || email.split('@')[0], email })
  }

  return (
    <div style={s.root}>
      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroImgs}>
          {['img=5', 'img=9', 'img=10', 'img=11', 'img=12', 'img=13'].map((q, i) => (
            <motion.img
              key={q}
              src={`https://i.pravatar.cc/300?${q}`}
              style={{ ...s.heroImg, ...heroPos[i] }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
        <div style={s.heroText}>
          <h1 style={s.brand}>coy</h1>
          <p style={s.tagline}>Designed to be deleted.</p>
        </div>
      </div>

      {/* Form card */}
      <div style={s.formCard}>
        {/* Tabs */}
        <div style={s.tabs}>
          {['login', 'signup'].map(t => (
            <button key={t} onClick={() => { setTab(t); setError('') }}
              style={{ ...s.tab, ...(tab === t ? s.tabActive : {}) }}>
              {t === 'login' ? 'Sign in' : 'Create account'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!showDemo ? (
            <motion.div key="form" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
              <form onSubmit={submit} style={s.form}>
                <AnimatePresence>
                  {tab === 'signup' && (
                    <motion.div key="name" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <Field placeholder="Your name" value={name} onChange={e => setName(e.target.value)} type="text" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Field placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" />
                <Field placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                  type={showPass ? 'text' : 'password'}
                  suffix={<button type="button" onClick={() => setShowPass(p => !p)} style={s.eyeBtn}>{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>}
                />
                {error && <p style={s.error}>{error}</p>}
                <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }} style={s.submitBtn}>
                  {loading
                    ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} style={s.spinner} />
                    : tab === 'login' ? 'Sign in' : 'Create account'
                  }
                </motion.button>
              </form>

              <div style={s.divider}><div style={s.divLine} /><span style={s.divText}>or</span><div style={s.divLine} /></div>

              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowDemo(true)} style={s.demoTrigger}>
                <div style={s.demoAvatars}>
                  {DEMOS.map((d, i) => <img key={d.name} src={d.photo} style={{ ...s.demoAvatar, marginLeft: i > 0 ? -8 : 0, zIndex: 4 - i }} />)}
                </div>
                <span style={s.demoTriggerText}>Try as demo user</span>
                <ChevronRight size={16} color="var(--rose)" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="demo" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
              <p style={s.demoTitle}>Choose your profile</p>
              <div style={s.demoGrid}>
                {DEMOS.map((d, i) => (
                  <motion.button key={d.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}
                    onClick={() => onLogin({ name: d.name, email: `${d.name.toLowerCase()}@coy.app`, photo: d.photo })}
                    style={s.demoCard}>
                    <img src={d.photo} style={s.demoCardImg} />
                    <div style={s.demoCardInfo}>
                      <span style={s.demoCardName}>{d.name}</span>
                      <span style={s.demoCardSub}>{d.age} · {d.city}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
              <button onClick={() => setShowDemo(false)} style={s.backBtn}>← Back</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Field({ placeholder, value, onChange, type, suffix }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ ...s.field, borderColor: focused ? 'var(--rose)' : 'var(--border)', boxShadow: focused ? '0 0 0 3px var(--rose-light)' : 'none' }}>
      <input placeholder={placeholder} value={value} onChange={onChange} type={type}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={s.fieldInput} />
      {suffix}
    </div>
  )
}

const heroPos = [
  { top: 10, left: '5%', width: 90, height: 120 },
  { top: 0, left: '28%', width: 80, height: 110 },
  { top: 15, left: '50%', width: 95, height: 125 },
  { top: 5, right: '5%', width: 80, height: 105 },
  { bottom: 10, left: '12%', width: 85, height: 115 },
  { bottom: 5, right: '12%', width: 90, height: 120 },
]

const s = {
  root: { minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden' },
  hero: { flex: 1, position: 'relative', minHeight: 220, maxHeight: 300, overflow: 'hidden', background: '#f0ece6' },
  heroImgs: { position: 'absolute', inset: 0 },
  heroImg: { position: 'absolute', borderRadius: 14, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' },
  heroText: {
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(245,240,235,0.55)', backdropFilter: 'blur(2px)',
  },
  brand: { fontSize: '3.5rem', fontWeight: 800, color: 'var(--rose)', letterSpacing: '-0.04em', fontStyle: 'italic', lineHeight: 1 },
  tagline: { fontSize: '0.9rem', color: 'var(--text-2)', marginTop: 6, fontWeight: 500 },
  formCard: {
    background: 'var(--surface)', borderRadius: '24px 24px 0 0',
    padding: '28px 24px 40px', boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
    flexShrink: 0,
  },
  tabs: { display: 'flex', gap: 0, marginBottom: 20, borderBottom: '2px solid var(--border)' },
  tab: {
    flex: 1, padding: '10px 0', background: 'none', border: 'none',
    fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-3)',
    borderBottom: '2px solid transparent', marginBottom: -2, transition: 'all 0.2s',
  },
  tabActive: { color: 'var(--rose)', borderBottomColor: 'var(--rose)', fontWeight: 600 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  field: {
    display: 'flex', alignItems: 'center',
    border: '1.5px solid var(--border)', borderRadius: 12,
    padding: '13px 14px', background: 'var(--surface)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  fieldInput: { flex: 1, border: 'none', outline: 'none', fontSize: '0.92rem', color: 'var(--text)', background: 'transparent' },
  eyeBtn: { background: 'none', border: 'none', color: 'var(--text-3)', display: 'flex', padding: 0 },
  error: { fontSize: '0.78rem', color: 'var(--rose)', textAlign: 'center' },
  submitBtn: {
    marginTop: 4, width: '100%', padding: '14px',
    background: 'var(--rose)', color: '#fff', border: 'none',
    borderRadius: 12, fontSize: '0.95rem', fontWeight: 600,
    boxShadow: '0 4px 16px rgba(212,80,106,0.35)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  spinner: { width: 20, height: 20, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff' },
  divider: { display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0 14px' },
  divLine: { flex: 1, height: 1, background: 'var(--border)' },
  divText: { fontSize: '0.75rem', color: 'var(--text-3)' },
  demoTrigger: {
    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
    background: 'var(--surface2)', border: '1.5px solid var(--border)',
    borderRadius: 12, padding: '11px 14px', cursor: 'pointer',
  },
  demoAvatars: { display: 'flex' },
  demoAvatar: { width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--surface)' },
  demoTriggerText: { flex: 1, fontSize: '0.88rem', fontWeight: 500, color: 'var(--text)', textAlign: 'left' },
  demoTitle: { fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-3)', textAlign: 'center', marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' },
  demoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 },
  demoCard: {
    background: 'var(--surface2)', border: '1.5px solid var(--border)',
    borderRadius: 14, overflow: 'hidden', padding: 0, cursor: 'pointer',
    display: 'flex', flexDirection: 'column',
  },
  demoCardImg: { width: '100%', height: 100, objectFit: 'cover', display: 'block' },
  demoCardInfo: { padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'left' },
  demoCardName: { fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' },
  demoCardSub: { fontSize: '0.72rem', color: 'var(--text-3)' },
  backBtn: { width: '100%', background: 'none', border: 'none', color: 'var(--text-3)', fontSize: '0.82rem', padding: '6px 0', cursor: 'pointer' },
}
