import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react'

export default function Login({ onLogin }) {
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    onLogin({ name: name || email.split('@')[0], email })
  }

  return (
    <div style={styles.root}>
      {/* Background orbs */}
      <div style={{ ...styles.orb, ...styles.orb1 }} />
      <div style={{ ...styles.orb, ...styles.orb2 }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={styles.card}
      >
        {/* Top gold line */}
        <div style={styles.topLine} />

        {/* Logo */}
        <div style={styles.logoWrap}>
          <motion.div
            animate={{ boxShadow: ['0 0 20px rgba(201,168,76,0.3)', '0 0 40px rgba(201,168,76,0.6)', '0 0 20px rgba(201,168,76,0.3)'] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            style={styles.logo}
          >
            <span style={styles.logoText}>C</span>
          </motion.div>
          <h1 style={styles.brand}>Coy</h1>
          <p style={styles.tagline}>Where connections begin</p>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {['login', 'signup'].map(t => (
            <button key={t} onClick={() => { setTab(t); setError('') }} style={{
              ...styles.tab,
              ...(tab === t ? styles.tabActive : {})
            }}>
              {t === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
          <motion.div
            layout
            style={{
              ...styles.tabIndicator,
              left: tab === 'login' ? 4 : '50%',
            }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <AnimatePresence mode="wait">
            {tab === 'signup' && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <InputField
                  icon={<Sparkles size={15} />}
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <InputField
            icon={<Mail size={15} />}
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />

          <InputField
            icon={<Lock size={15} />}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={showPass ? 'text' : 'password'}
            suffix={
              <button type="button" onClick={() => setShowPass(p => !p)} style={styles.eyeBtn}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
          />

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.error}>
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={styles.submitBtn}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                style={styles.btnSpinner}
              />
            ) : (
              tab === 'login' ? 'Sign In' : 'Create Account'
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Demo login */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onLogin({ name: 'Alex', email: 'alex@coy.app' })}
          style={styles.demoBtn}
        >
          ✨ Continue as Demo User
        </motion.button>

        <p style={styles.footer}>
          By continuing you agree to our{' '}
          <span style={{ color: 'var(--gold)', cursor: 'pointer' }}>Terms</span> &{' '}
          <span style={{ color: 'var(--gold)', cursor: 'pointer' }}>Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  )
}

function InputField({ icon, placeholder, value, onChange, type, suffix }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{
      ...styles.inputWrap,
      borderColor: focused ? 'rgba(201,168,76,0.6)' : 'var(--border)',
      boxShadow: focused ? '0 0 0 3px rgba(201,168,76,0.08)' : 'none',
    }}>
      <span style={styles.inputIcon}>{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={styles.input}
      />
      {suffix}
    </div>
  )
}

const styles = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--navy)',
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
  },
  orb1: {
    width: 400, height: 400,
    background: 'rgba(201,168,76,0.07)',
    top: '-10%', right: '-10%',
  },
  orb2: {
    width: 300, height: 300,
    background: 'rgba(201,168,76,0.05)',
    bottom: '-5%', left: '-5%',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    background: 'var(--navy-mid)',
    border: '1px solid var(--border)',
    borderRadius: 28,
    padding: '40px 36px 32px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
  },
  topLine: {
    position: 'absolute',
    top: 0, left: '15%', right: '15%',
    height: 2,
    background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
  },
  logoWrap: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    width: 60, height: 60, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '2rem', fontWeight: 700, color: '#fff', lineHeight: 1,
  },
  brand: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '2.2rem', fontWeight: 600,
    color: 'var(--cream)', letterSpacing: '0.1em', lineHeight: 1,
  },
  tagline: {
    color: 'var(--text-muted)', fontSize: '0.78rem',
    letterSpacing: '0.12em', marginTop: 4, textTransform: 'uppercase',
  },
  tabs: {
    display: 'flex', position: 'relative',
    background: 'rgba(255,255,255,0.04)',
    borderRadius: 12, padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1, padding: '10px 0',
    background: 'transparent', border: 'none',
    color: 'var(--text-muted)', fontSize: '0.85rem',
    fontWeight: 500, borderRadius: 9,
    position: 'relative', zIndex: 1,
    transition: 'color 0.2s', cursor: 'pointer',
    fontFamily: 'Montserrat, sans-serif',
  },
  tabActive: { color: 'var(--cream)' },
  tabIndicator: {
    position: 'absolute', top: 4, bottom: 4,
    width: 'calc(50% - 4px)',
    background: 'var(--navy-light)',
    borderRadius: 9,
    border: '1px solid var(--border)',
    transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)',
  },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  inputWrap: {
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    borderRadius: 14, padding: '13px 16px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  inputIcon: { color: 'var(--text-muted)', display: 'flex', flexShrink: 0 },
  input: {
    flex: 1, background: 'transparent', border: 'none', outline: 'none',
    color: 'var(--cream)', fontSize: '0.88rem',
    fontFamily: 'Montserrat, sans-serif',
  },
  eyeBtn: {
    background: 'none', border: 'none',
    color: 'var(--text-muted)', cursor: 'pointer',
    display: 'flex', padding: 0,
  },
  error: {
    color: '#e05c6e', fontSize: '0.78rem',
    textAlign: 'center', marginTop: -4,
  },
  submitBtn: {
    marginTop: 4,
    background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
    color: '#fff', border: 'none', borderRadius: 14,
    padding: '14px', fontSize: '0.92rem', fontWeight: 600,
    letterSpacing: '0.06em', cursor: 'pointer',
    boxShadow: '0 4px 24px rgba(201,168,76,0.3)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'Montserrat, sans-serif',
  },
  btnSpinner: {
    width: 20, height: 20, borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
  },
  divider: {
    display: 'flex', alignItems: 'center', gap: 12,
    margin: '20px 0 16px',
  },
  dividerLine: { flex: 1, height: 1, background: 'var(--border)' },
  dividerText: { color: 'var(--text-muted)', fontSize: '0.75rem' },
  demoBtn: {
    width: '100%', padding: '13px',
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 14, color: 'var(--cream)',
    fontSize: '0.88rem', fontWeight: 500,
    cursor: 'pointer', letterSpacing: '0.03em',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'border-color 0.2s',
  },
  footer: {
    textAlign: 'center', color: 'var(--text-muted)',
    fontSize: '0.72rem', marginTop: 16, lineHeight: 1.6,
  },
}
