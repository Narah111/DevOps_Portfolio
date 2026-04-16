import BugCard from './BugCard'
import './BugList.css'

function BugList({ bugs, onStatusUpdate, onDelete }) {
  if (bugs.length === 0) {
    return (
      <div className="bug-list-empty">
        <p>🎉 No bugs reported yet!</p>
        <span>Use the form to report your first bug.</span>
      </div>
    )
  }

  const open = bugs.filter(b => b.status === 'Open')
  const inProgress = bugs.filter(b => b.status === 'In Progress')
  const resolved = bugs.filter(b => b.status === 'Resolved')

  return (
    <div className="bug-list">
      {open.length > 0 && (
        <section className="bug-group">
          <h3 className="group-title open">Open ({open.length})</h3>
          {open.map(bug => (
            <BugCard
              key={bug.id}
              bug={bug}
              onStatusUpdate={onStatusUpdate}
              onDelete={onDelete}
            />
          ))}
        </section>
      )}

      {inProgress.length > 0 && (
        <section className="bug-group">
          <h3 className="group-title in-progress">In Progress ({inProgress.length})</h3>
          {inProgress.map(bug => (
            <BugCard
              key={bug.id}
              bug={bug}
              onStatusUpdate={onStatusUpdate}
              onDelete={onDelete}
            />
          ))}
        </section>
      )}

      {resolved.length > 0 && (
        <section className="bug-group">
          <h3 className="group-title resolved">Resolved ({resolved.length})</h3>
          {resolved.map(bug => (
            <BugCard
              key={bug.id}
              bug={bug}
              onStatusUpdate={onStatusUpdate}
              onDelete={onDelete}
            />
          ))}
        </section>
      )}
    </div>
  )
}

export default BugList