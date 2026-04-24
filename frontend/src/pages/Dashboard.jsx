import { useBugs } from '../hooks/useBugs'
import Navbar from '../components/Navbar'
import BugForm from '../components/BugForm'
import BugList from '../components/BugList'
import './Dashboard.css'

function Dashboard() {
  const { bugs, loading, error, stats, handleCreateBug, handleStatusUpdate, handleDelete } = useBugs()

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-stats">
          <div className="stat">
            <div className="stat-number">{stats.open}</div>
            <div className="stat-label">Open</div>
          </div>
          <div className="stat">
            <div className="stat-number">{stats.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat">
            <div className="stat-number">{stats.resolved}</div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>

        {error && user && <div className="error">{error}</div>}

        <div className="dashboard-content">
          <BugForm onSubmit={handleCreateBug} />
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
    </>
  )
}

export default Dashboard