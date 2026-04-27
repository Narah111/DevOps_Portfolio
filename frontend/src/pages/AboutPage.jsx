import { useNavigate } from 'react-router-dom'
import './AboutPage.css'

function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="about">
      <nav className="about-nav">
        <span className="about-logo">Bug<span>Tracker</span></span>
        <div className="about-nav-links">
          <button onClick={() => navigate(-1)} className="btn-ghost">← Back</button>
          <button onClick={() => navigate('/login')} className="btn-primary">Sign in</button>
        </div>
      </nav>

      <main className="about-content">

        {/* Security Note */}
        <div className="security-note">
        <div className="security-note-icon">🔒</div>
        <div className="security-note-text">
            <strong>Security Note</strong>
            <p>
            This repository is designed with a <span className="highlight">Zero Trust</span> approach.
            No secrets or credentials are stored in the codebase. All sensitive data is managed via
            <span className="highlight"> AWS OIDC roles</span> and
            <span className="highlight"> GitHub Actions Secrets</span> to demonstrate
            industry standard security practices.
            </p>
        </div>
        </div>

        {/* Hero */}
        <section className="about-hero">
          <div className="about-hero-text">
            <h1>About this project</h1>
            <p>
              A fully serverless bug tracker built to demonstrate real world DevOps
              skills — infrastructure as code (IaC), CI/CD pipelines, cloud-native architecture,
              and modern frontend development.
            </p>
          </div>
        </section>

        {/* Architecture */}
        <section className="about-section">
          <h2>Architecture</h2>
          <div className="architecture-diagram">
            <div className="arch-layer">
              <div className="arch-box frontend">
                <span className="arch-icon">⚛️</span>
                <strong>React</strong>
                <span>Frontend</span>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-box cdn">
                <span className="arch-icon">🌍</span>
                <strong>CloudFront</strong>
                <span>CDN</span>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-box storage">
                <span className="arch-icon">🪣</span>
                <strong>S3</strong>
                <span>Static Hosting</span>
              </div>
            </div>
            <div className="arch-divider">↓ API calls</div>
            <div className="arch-layer">
              <div className="arch-box auth">
                <span className="arch-icon">🔒</span>
                <strong>Cognito</strong>
                <span>Auth</span>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-box gateway">
                <span className="arch-icon">🚪</span>
                <strong>API Gateway</strong>
                <span>REST API</span>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-box lambda">
                <span className="arch-icon">λ</span>
                <strong>Lambda</strong>
                <span>Python</span>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-box database">
                <span className="arch-icon">🗄️</span>
                <strong>DynamoDB</strong>
                <span>Database</span>
              </div>
            </div>
            <div className="arch-divider">↓ Deployed by</div>
            <div className="arch-layer">
              <div className="arch-box cicd">
                <span className="arch-icon">⚙️</span>
                <strong>GitHub Actions</strong>
                <span>CI/CD</span>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-box iac">
                <span className="arch-icon">🏗️</span>
                <strong>OpenTofu</strong>
                <span>IaC</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="about-section">
          <h2>Tech stack</h2>
          <div className="tech-grid">
            <div className="tech-category">
              <h3>Frontend</h3>
              <ul>
                <li>React + Vite</li>
                <li>React Router</li>
                <li>Context API</li>
                <li>Custom Hooks</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Backend</h3>
              <ul>
                <li>AWS Lambda (Python)</li>
                <li>API Gateway (REST)</li>
                <li>DynamoDB</li>
                <li>AWS Cognito</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Infrastructure</h3>
              <ul>
                <li>OpenTofu/tf (IaC)</li>
                <li>S3 + CloudFront</li>
                <li>IAM + OIDC</li>
                <li>GitHub Actions</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>DevOps</h3>
              <ul>
                <li>CI/CD pipeline</li>
                <li>Auto-deploy on merge</li>
                <li>Least privilege IAM</li>
                <li>CloudWatch Logs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* About me */}
        <section className="about-section">
          <h2>About me</h2>
          <div className="about-me">
            <div className="about-me-text">
              <h3>Nasir Rahmanzada</h3>
              <p className="about-me-title">DevOps Engineer · AWS · IaC · CI/CD</p>
              <p>
                I'm a DevOps engineer currently completing my Higher Vocational Education
                Diploma at JENSEN yrkeshögskola (expected 2026). I have hands-on experience
                building production systems from AI chatbots and Kubernetes orchestration
                to automated testing pipelines and cloud infrastructure.
              </p>
              <p>
                I built this project to demonstrate end-to-end DevOps skills: provisioning
                cloud infrastructure with IaC, building a serverless backend, developing a
                modern frontend, and automating deployments with CI/CD all from scratch.
              </p>
              <div className="about-me-links">
                <a
                  href="https://github.com/Narah111"
                  target="_blank"
                  rel="noreferrer"
                  className="about-link github"
                >
                  <span>⌥</span> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/nasirrah/"
                  target="_blank"
                  rel="noreferrer"
                  className="about-link linkedin"
                >
                  <span>in</span> LinkedIn
                </a>
              </div>
            </div>
            <div className="about-me-skills">
              <h4>Key skills</h4>
              <div className="skills-list">
                {[
                  'AWS', 'OpenTofu / Terraform', 'Docker', 'Kubernetes',
                  'Python', 'CI/CD', 'GitHub Actions', 'GitLab CI/CD',
                  'Linux', 'PostgreSQL', 'DynamoDB', 'Ansible'
                ].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Source code */}
        <section className="about-section about-cta">
          <h2>View the source code</h2>
          <p>The full project — infrastructure, backend and frontend — is open source.</p>
          <a
            href="https://github.com/Narah111"
            target="_blank"
            rel="noreferrer"
            className="btn-primary btn-large"
          >
            View on GitHub →
          </a>
        </section>

      </main>

      <footer className="about-footer">
        <p>Built by Nasir Rahmanzada | React · AWS Lambda · DynamoDB · Cognito · OpenTofu</p>
      </footer>
    </div>
  )
}

export default AboutPage