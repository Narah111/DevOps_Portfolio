import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const isLandingPage = location.pathname === '/'

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
    navigate('/')
  }

  const handleNavigate = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  const displayName =
    user?.name && user?.family_name
      ? `${user.name} ${user.family_name}`
      : user?.email

  return (
    <nav className="navbar">
      <span
        className="navbar-logo"
        onClick={() => handleNavigate('/')}
        style={{ cursor: 'pointer' }}
      >
        Bug<span>Tracker</span>
      </span>

      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <div className={`navbar-right ${menuOpen ? 'active' : ''}`}>
        
        {/* ALLTID */}
        <button
          className="navbar-about"
          onClick={() => handleNavigate('/about')}
        >
          About
        </button>

        {/* 🔥 LANDING PAGE (inte inloggad UI) */}
        {isLandingPage && !user && (
          <>
            <button
              className="navbar-about"
              onClick={() => handleNavigate('/login')}
            >
              Sign in
            </button>

            <button
              className="navbar-logout"
              onClick={() => handleNavigate('/register')}
            >
              Get started
            </button>
          </>
        )}

        {/* 🔥 INLOGGAD */}
        {user && (
          <>
            <span className="navbar-email">{displayName}</span>

            <button
              className="navbar-logout"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar