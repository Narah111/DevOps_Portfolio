import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './AuthPage.css'

function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) return
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    setError(null)

    // Temporary mock register – will be replaced with Cognito later
    setTimeout(() => {
      login(email)
      navigate('/dashboard')
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
          <h2>Create an account</h2>
          <p>Start tracking bugs for free</p>
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
              placeholder="At least 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm password</label>
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="auth-btn"
            onClick={handleRegister}
            disabled={loading || !email || !password || !confirmPassword}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </div>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage