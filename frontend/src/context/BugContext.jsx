import { createContext, useState, useEffect } from 'react'
import { getAllBugs } from '../api/bugsApi'

export const BugContext = createContext()

export function BugProvider({ children }) {
  const [bugs, setBugs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBugs()
  }, [])

  const fetchBugs = async () => {
    try {
      setLoading(true)
      const data = await getAllBugs()
      setBugs(data)
      setError(null)
    } catch (err) {
      setError('Could not connect to API. Is it deployed?')
    } finally {
      setLoading(false)
    }
  }

  const addBug = (newBug) => {
    setBugs(prev => [newBug, ...prev])
  }

  const updateBug = (updatedBug) => {
    setBugs(prev => prev.map(bug =>
      bug.id === updatedBug.id ? updatedBug : bug
    ))
  }

  const removeBug = (bugId) => {
    setBugs(prev => prev.filter(bug => bug.id !== bugId))
  }

  return (
    <BugContext.Provider value={{
      bugs,
      loading,
      error,
      setError,
      addBug,
      updateBug,
      removeBug
    }}>
      {children}
    </BugContext.Provider>
  )
}