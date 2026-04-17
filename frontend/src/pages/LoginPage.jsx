import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './AuthPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async () => {
    if (!email || !password) return
    setLoading(true)
    setError(null)

    // Temporary mock login – will be replaced with Cognito later
    setTimeout(() => {
      if (password.length >= 8) {
        login(email)
        navigate('/dashboard')
      } else {
        setError('Invalid email or password.')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="auth-back" onClick={() => navigate('/')}>
          ← Back
        </button>
        <div className="auth-header">
          <span className="auth-logo">Bug<span>Tracker</span></span>
          <h2>Welcome back</h2>
          <p>Sign in to your account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            className="auth-btn"
            onClick={handleLogin}
            disabled={loading || !email || !password}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Get started</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage