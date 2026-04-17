import { useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar({ userEmail }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <nav className="navbar">
      <span className="navbar-logo">Bug<span>Tracker</span></span>
      <div className="navbar-right">
        <button className="navbar-about" onClick={() => navigate('/about')}>
          About
        </button>
        <span className="navbar-email">{userEmail}</span>
        <button className="navbar-logout" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </nav>
  )
}

export default Navbar