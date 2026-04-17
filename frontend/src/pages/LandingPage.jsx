import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing">
        <nav className="landing-nav">
        <span className="landing-logo">Bug<span>Tracker</span></span>
        <div className="landing-nav-links">
            <button onClick={() => navigate('/about')} className="btn-ghost">About</button>
            <button onClick={() => navigate('/login')} className="btn-ghost">Sign in</button>
            <button onClick={() => navigate('/register')} className="btn-primary">Get started</button>
        </div>
        </nav>

      <main className="landing-hero">
        <div className="hero-badge">Built on AWS · Serverless · IaC</div>
        <h1>Track bugs.<br /><span>Ship faster.</span></h1>
        <p className="hero-subtitle">
          A lightweight bug tracker built with React, AWS Lambda, API Gateway,
          DynamoDB and Cognito. Fully serverless, fully yours.
        </p>
        <div className="hero-buttons">
          <button onClick={() => navigate('/register')} className="btn-primary btn-large">
            Get started for free
          </button>
          <button onClick={() => navigate('/login')} className="btn-ghost btn-large">
            Sign in
          </button>
        </div>
      </main>

      <section className="landing-features">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Serverless</h3>
          <p>Powered by AWS Lambda and API Gateway. No servers to manage, scales automatically.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure</h3>
          <p>Authentication via AWS Cognito. Your bugs are private and only visible to you.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>CI/CD</h3>
          <p>Deployed automatically via GitHub Actions every time code is pushed to main.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏗️</div>
          <h3>Infrastructure as Code</h3>
          <p>All AWS resources are defined and managed with OpenTofu. Reproducible and versioned.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <p>Built with React · AWS Lambda · DynamoDB · Cognito · OpenTofu</p>
      </footer>
    </div>
  )
}

export default LandingPage