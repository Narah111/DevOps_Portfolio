// ⚠️ Replace with your API Gateway URL after running terraform apply
const API_URL = 'https://uwyh40guu6.execute-api.eu-north-1.amazonaws.com/prod'

export const getAllBugs = async () => {
  const response = await fetch(`${API_URL}/bugs`, {
    credentials: 'include'
  })
  if (!response.ok) throw new Error('Failed to fetch bugs')
  return response.json()
}

export const createBug = async (bugData) => {
  const response = await fetch(`${API_URL}/bugs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(bugData)
  })
  if (!response.ok) throw new Error('Failed to create bug')
  return response.json()
}

export const updateBugStatus = async (bugId, status) => {
  const response = await fetch(`${API_URL}/bugs/${bugId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ status })
  })
  if (!response.ok) throw new Error('Failed to update bug')
  return response.json()
}

export const deleteBug = async (bugId) => {
  const response = await fetch(`${API_URL}/bugs/${bugId}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  if (!response.ok) throw new Error('Failed to delete bug')
  return response.json()
}