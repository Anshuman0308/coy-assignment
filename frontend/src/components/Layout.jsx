import { Outlet, NavLink } from 'react-router-dom'
import { Home, Search, Heart } from 'lucide-react'

const navItems = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/matches', icon: Heart, label: 'Matches' },
]

export default function Layout() {
  return (
    <div style={styles.root}>
      {/* Main content */}
      <main style={styles.main}>
        <Outlet />
      </main>

      {/* Right vertical navbar */}
      <nav style={styles.nav}>
        {/* Logo */}
        <div style={styles.logo}>
          <span style={styles.logoText}>C</span>
        </div>

        <div style={styles.navLinks}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              ...styles.navItem,
              ...(isActive ? styles.navItemActive : {})
            })}>
              {({ isActive }) => (
                <>
                  <div style={{ ...styles.iconWrap, ...(isActive ? styles.iconWrapActive : {}) }}>
                    <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                  </div>
                  <span style={styles.navLabel}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Avatar */}
        <div style={styles.avatar}>
          <img src="https://i.pravatar.cc/300?img=1" alt="You" style={styles.avatarImg} />
          <div style={styles.avatarRing} />
        </div>
      </nav>
    </div>
  )
}

const styles = {
  root: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    background: 'var(--navy)',
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  nav: {
    width: 88,
    background: 'var(--navy-mid)',
    borderLeft: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 0',
    flexShrink: 0,
    zIndex: 10,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 20px rgba(201,168,76,0.4)',
  },
  logoText: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1,
  },
  navLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '12px 0',
    width: 72,
    borderRadius: 12,
    color: 'var(--text-muted)',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  navItemActive: {
    color: 'var(--gold)',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  iconWrapActive: {
    background: 'rgba(201,168,76,0.12)',
    boxShadow: '0 0 12px rgba(201,168,76,0.2)',
  },
  navLabel: {
    fontSize: '0.62rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  avatar: {
    position: 'relative',
    width: 48,
    height: 48,
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid var(--gold)',
  },
  avatarRing: {
    position: 'absolute',
    inset: -3,
    borderRadius: '50%',
    border: '1px solid rgba(201,168,76,0.4)',
    pointerEvents: 'none',
  },
}
