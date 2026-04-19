import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const displayName = user?.name && user?.family_name
    ? `${user.name} ${user.family_name}`
    : user?.email

  return (
    <nav className="navbar">
      <span className="navbar-logo">Bug<span>Tracker</span></span>
      <div className="navbar-right">
        <button className="navbar-about" onClick={() => navigate('/about')}>
          About
        </button>
        <span className="navbar-email">{displayName}</span>
        <button className="navbar-logout" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </nav>
  )
}

export default Navbar