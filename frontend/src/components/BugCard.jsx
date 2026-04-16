import { useState } from 'react'
import { getPriorityColor, getStatusColor, formatDate } from '../utils/helpers'
import './BugCard.css'

const STATUS_OPTIONS = ['Open', 'In Progress', 'Resolved']

function BugCard({ bug, onStatusUpdate, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`bug-card ${bug.status === 'Resolved' ? 'resolved' : ''}`}>
      <div className="bug-card-header">
        <div className="bug-card-badges">
          <span
            className="badge priority-badge"
            style={{ borderColor: getPriorityColor(bug.priority), color: getPriorityColor(bug.priority) }}
          >
            {bug.priority}
          </span>
          <span
            className="badge status-badge"
            style={{ borderColor: getStatusColor(bug.status), color: getStatusColor(bug.status) }}
          >
            {bug.status}
          </span>
        </div>
        <button
          className="delete-btn"
          onClick={() => onDelete(bug.id)}
          title="Delete bug"
        >
          ✕
        </button>
      </div>

      <h3
        className="bug-title"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        {bug.title}
      </h3>

      {isExpanded && bug.description && (
        <p className="bug-description">{bug.description}</p>
      )}

      <div className="bug-card-footer">
        <span className="bug-date">{formatDate(bug.createdAt)}</span>
        <select
          className="status-select"
          value={bug.status}
          onChange={e => onStatusUpdate(bug.id, e.target.value)}
        >
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default BugCard