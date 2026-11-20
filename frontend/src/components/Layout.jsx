import { Outlet, NavLink } from 'react-router-dom'
import { Home, Compass, Heart } from 'lucide-react'

const tabs = [
  { to: '/home', icon: Home, label: 'Discover' },
  { to: '/search', icon: Compass, label: 'Explore' },
  { to: '/matches', icon: Heart, label: 'Matches' },
]

export default function Layout({ user, onLogout }) {
  return (
    <div style={s.root}>
      {/* Top bar */}
      <header style={s.header}>
        <span style={s.logo}>coy</span>
        <button onClick={onLogout} style={s.logoutBtn}>
          <img src={user?.photo || 'https://i.pravatar.cc/300?img=1'} alt="" style={s.avatar} />
        </button>
      </header>

      {/* Page content */}
      <main style={s.main}>
        <Outlet />
      </main>

      {/* Bottom tab bar */}
      <nav style={s.nav}>
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} style={{ textDecoration: 'none', flex: 1 }}>
            {({ isActive }) => (
              <div style={{ ...s.tab, color: isActive ? 'var(--rose)' : 'var(--text-3)' }}>
                <div style={{ ...s.tabIcon, background: isActive ? 'var(--rose-light)' : 'transparent' }}>
                  <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                </div>
                <span style={{ ...s.tabLabel, fontWeight: isActive ? 600 : 400 }}>{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

const s = {
  root: { display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)', overflow: 'hidden' },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0 20px', height: 56, background: 'var(--surface)',
    borderBottom: '1px solid var(--border)', flexShrink: 0, zIndex: 10,
  },
  logo: {
    fontSize: '1.6rem', fontWeight: 700, color: 'var(--rose)',
    letterSpacing: '-0.04em', fontStyle: 'italic', fontFamily: 'Georgia, serif',
  },
  logoutBtn: { background: 'none', border: 'none', padding: 0, cursor: 'pointer' },
  avatar: { width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--rose-light)' },
  main: { flex: 1, overflow: 'hidden', position: 'relative' },
  nav: {
    display: 'flex', height: 'var(--nav-h)',
    background: 'var(--surface)', borderTop: '1px solid var(--border)',
    flexShrink: 0, zIndex: 10,
  },
  tab: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '8px 0' },
  tabIcon: { width: 44, height: 36, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' },
  tabLabel: { fontSize: '0.68rem', letterSpacing: '0.01em' },
}
