import { useState, useEffect } from 'react'
import BugForm from './components/BugForm'
import BugList from '.src/components/BugList'
import './App.css'

// ⚠️ Replace this with your own API Gateway URL after running terraform apply
const API_URL = 'https://your-api-url.execute-api.eu-north-1.amazonaws.com/prod'

function App() {
  const [bugs, setBugs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBugs()
  }, [])

  const fetchBugs = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/bugs`)
      const data = await response.json()
      setBugs(data)
      setError(null)
    } catch (err) {
      setError('Could not connect to API. Is it deployed?')
    } finally {
      setLoading(false)
    }
  }

  const handleBugCreated = (newBug) => {
    setBugs(prev => [newBug, ...prev])
  }

  const handleStatusUpdate = async (bugId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/bugs/${bugId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      const updatedBug = await response.json()
      setBugs(prev => prev.map(bug => bug.id === bugId ? updatedBug : bug))
    } catch (err) {
      setError('Could not update bug status.')
    }
  }

  const handleDelete = async (bugId) => {
    try {
      await fetch(`${API_URL}/bugs/${bugId}`, { method: 'DELETE' })
      setBugs(prev => prev.filter(bug => bug.id !== bugId))
    } catch (err) {
      setError('Could not delete bug.')
    }
  }

  const openCount = bugs.filter(b => b.status === 'Open').length
  const inProgressCount = bugs.filter(b => b.status === 'In Progress').length
  const resolvedCount = bugs.filter(b => b.status === 'Resolved').length

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bug<span>Tracker</span></h1>
        <div className="stats">
          <div className="stat">
            <div className="stat-number">{openCount}</div>
            <div className="stat-label">Open</div>
          </div>
          <div className="stat">
            <div className="stat-number">{inProgressCount}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat">
            <div className="stat-number">{resolvedCount}</div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="main-content">
        <BugForm apiUrl={API_URL} onBugCreated={handleBugCreated} />
        {loading
          ? <div className="loading">Loading bugs...</div>
          : <BugList
              bugs={bugs}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
            />
        }
      </div>
    </div>
  )
}

export default App