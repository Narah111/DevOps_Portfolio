import { useContext } from 'react'
import { BugContext } from '../context/BugContext'
import { createBug, updateBugStatus, deleteBug } from '../api/bugsApi'

export function useBugs() {
  const { bugs, loading, error, setError, addBug, updateBug, removeBug } = useContext(BugContext)

  const handleCreateBug = async (bugData) => {
    try {
      const newBug = await createBug(bugData)
      addBug(newBug)
      return true
    } catch (err) {
      setError('Could not create bug.')
      return false
    }
  }

  const handleStatusUpdate = async (bugId, newStatus) => {
    try {
      const updatedBug = await updateBugStatus(bugId, newStatus)
      updateBug(updatedBug)
    } catch (err) {
      setError('Could not update bug status.')
    }
  }

  const handleDelete = async (bugId) => {
    try {
      await deleteBug(bugId)
      removeBug(bugId)
    } catch (err) {
      setError('Could not delete bug.')
    }
  }

  const stats = {
    open: bugs.filter(b => b.status === 'Open').length,
    inProgress: bugs.filter(b => b.status === 'In Progress').length,
    resolved: bugs.filter(b => b.status === 'Resolved').length
  }

  return {
    bugs,
    loading,
    error,
    stats,
    handleCreateBug,
    handleStatusUpdate,
    handleDelete
  }
}