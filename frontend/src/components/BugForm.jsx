/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import './BugForm.css'

function BugForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    // Vi lägger till e.preventDefault() ifall du använder en <form>-tagg senare
    if (e) e.preventDefault();
    
    if (!title.trim()) return
    setLoading(true)
    
    try {
      const success = await onSubmit({ title, description, priority })
      if (success) {
        setTitle('')
        setDescription('')
        setPriority('Medium')
      }
    } catch (error) {
      console.error("Kunde inte skicka buggen:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bug-form">
      <h2>Report a Bug</h2>
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          placeholder="Short description..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>Description</label>
        <textarea
          placeholder="Steps to reproduce..."
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
              className={`priority-btn ${priority === p ? 'active' : ''}`}
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