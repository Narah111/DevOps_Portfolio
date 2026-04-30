// helper function to get color based on priority
export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high': return '#ff4d4f';
    case 'medium': return '#faad14';
    case 'low': return '#52c41a';
    default: return '#d9d9d9';
  }
};

// helper function to get color based on status
export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'open': return '#1890ff';
    case 'in progress': return '#fa8c16';
    case 'resolved': return '#52c41a';
    default: return '#8c8c8c';
  }
};

// helper function to format dates
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};