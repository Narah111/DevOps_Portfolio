// Returns the CSS variable color for a given priority
export const getPriorityColor = (priority) => {
  const colors = {
    High: 'var(--high)',
    Medium: 'var(--medium)',
    Low: 'var(--low)'
  }
  return colors[priority] || 'var(--text-secondary)'
}

// Returns the CSS variable color for a given status
export const getStatusColor = (status) => {
  const colors = {
    'Open': 'var(--open)',
    'In Progress': 'var(--in-progress)',
    'Resolved': 'var(--resolved)'
  }
  return colors[status] || 'var(--text-secondary)'
}

// Formats an ISO date string to a readable format
export const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}