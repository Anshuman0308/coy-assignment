import { Outlet, NavLink } from 'react-router-dom'
import { Home, Search, Heart, LogOut } from 'lucide-react'

const navItems = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/matches', icon: Heart, label: 'Matches' },
]

export default function Layout({ user, onLogout }) {
  return (
    <div style={styles.root}>
      <main style={styles.main}>
        <Outlet />
      </main>

      <nav style={styles.nav}>
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

        <div style={styles.bottomSection}>
          <div style={styles.avatar}>
            <img src="https://i.pravatar.cc/300?img=1" alt={user?.name} style={styles.avatarImg} />
            <div style={styles.avatarRing} />
          </div>
          <span style={styles.userName}>{user?.name?.split(' ')[0]}</span>
          <button onClick={onLogout} style={styles.logoutBtn} title="Sign out">
            <LogOut size={15} />
          </button>
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
  bottomSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
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
  userName: {
    color: 'var(--text-muted)',
    fontSize: '0.6rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    maxWidth: 72,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 8,
    color: 'var(--text-muted)',
    padding: '6px 8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s, border-color 0.2s',
  },
}
