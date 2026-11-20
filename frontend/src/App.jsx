import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import Matches from './pages/Matches'
import Login from './pages/Login'

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('coy_user')
    return saved ? JSON.parse(saved) : null
  })

  function handleLogin(userData) {
    localStorage.setItem('coy_user', JSON.stringify(userData))
    setUser(userData)
  }

  function handleLogout() {
    localStorage.removeItem('coy_user')
    setUser(null)
  }

  if (!user) return <Login onLogin={handleLogin} />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="matches" element={<Matches />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
