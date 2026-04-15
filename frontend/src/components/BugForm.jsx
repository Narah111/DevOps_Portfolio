import { useState } from 'react'
import './BugForm.css'

function BugForm({ apiUrl, onBugCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      setLoading(true)
      const response = await fetch(`${apiUrl}/bugs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority })
      })
      const newBug = await response.json()
      onBugCreated(newBug)
      setTitle('')
      setDescription('')
      setPriority('Medium')
      setError(null)
    } catch (err) {
      setError('Could not create bug.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bug-form">
      <h2>Report a Bug</h2>
      {error && <div className="form-error">{error}</div>}
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          placeholder="Short description of the bug..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          placeholder="Steps to reproduce, expected vs actual behavior..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
        />
      </div>
      <div className="form-group">
        <label>Priority</label>
        <div className="priority-buttons">
          {['Low', 'Medium', 'High'].map(p => (
            <button
              key={p}
              type="button"
              className={`priority-btn priority-${p.toLowerCase()} ${priority === p ? 'active' : ''}`}
              onClick={() => setPriority(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={loading || !title.trim()}
      >
        {loading ? 'Submitting...' : 'Submit Bug'}
      </button>
    </div>
  )
}

export default BugForm