const API_URL = import.meta.env.VITE_API_URL

export const register = async (email, password, name, family_name) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password, name, family_name })
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Registration failed')
  return data
}

export const confirmEmail = async (email, code) => {
  const response = await fetch(`${API_URL}/auth/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, code })
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Confirmation failed')
  return data
}

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Login failed')
  return data
}

export const logout = async () => {
  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
}

export const getMe = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: 'include'
  })
  if (!response.ok) return null
  return response.json()
}