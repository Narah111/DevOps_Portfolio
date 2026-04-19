import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register as registerApi, confirmEmail, login as loginApi } from '../api/authApi'
import { useAuth } from '../hooks/useAuth'
import './AuthPage.css'

function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [step, setStep] = useState('register') // 'register' | 'confirm'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [code, setCode] = useState('')
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

    try {
      await registerApi(email, password)
      setStep('confirm')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async () => {
    if (!code) return
    setLoading(true)
    setError(null)

    try {
      await confirmEmail(email, code)
      // Auto login after confirmation
      const data = await loginApi(email, password)
      login({ email: data.email })
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (step === 'confirm') {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-logo">Bug<span>Tracker</span></span>
            <h2>Verify your email</h2>
            <p>We sent a code to <strong>{email}</strong></p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <div className="auth-form">
            <div className="form-group">
              <label>Verification code</label>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={e => setCode(e.target.value)}
              />
            </div>
            <button
              className="auth-btn"
              onClick={handleConfirm}
              disabled={loading || !code}
            >
              {loading ? 'Verifying...' : 'Verify email'}
            </button>
          </div>

          <p className="auth-footer">
            Wrong email? <Link to="/register" onClick={() => setStep('register')}>Go back</Link>
          </p>
        </div>
      </div>
    )
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