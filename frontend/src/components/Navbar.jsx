import { useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar({ userEmail }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Will be replaced with real Cognito logout later
    navigate('/')
  }

  return (
    <nav className="navbar">
      <span className="navbar-logo">Bug<span>Tracker</span></span>
      <div className="navbar-right">
        <span className="navbar-email">{userEmail}</span>
        <button className="navbar-logout" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </nav>
  )
}

export default Navbar