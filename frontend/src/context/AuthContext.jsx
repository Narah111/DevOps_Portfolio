import { createContext, useState, useEffect } from 'react'
import { getMe, logout as logoutApi } from '../api/authApi'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Load cached user data from sessionStorage
    // This is NOT the JWT token - just basic user info (email, name)
    // The actual auth is still handled by httpOnly cookies
    const cached = sessionStorage.getItem('user_info')
    return cached ? JSON.parse(cached) : null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Always verify with server that cookie is still valid
    getMe()
      .then(data => {
        setUser(data)
        sessionStorage.setItem('user_info', JSON.stringify(data))
      })
      .catch(() => {
        setUser(null)
        sessionStorage.removeItem('user_info')
      })
      .finally(() => setLoading(false))
  }, [])

  const login = (userData) => {
    setUser(userData)
    sessionStorage.setItem('user_info', JSON.stringify(userData))
  }

  const logout = async () => {
    await logoutApi()
    setUser(null)
    sessionStorage.removeItem('user_info')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}