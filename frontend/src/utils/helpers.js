// Hjälpfunktion för att välja färg baserat på prioritet
export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high': return '#ff4d4f';   // Röd
    case 'medium': return '#faad14'; // Gul/Orange
    case 'low': return '#52c41a';    // Grön
    default: return '#d9d9d9';      // Grå
  }
};

// Hjälpfunktion för att välja färg baserat på status
export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'open': return '#1890ff';        // Blå
    case 'in progress': return '#fa8c16'; // Orange
    case 'resolved': return '#52c41a';    // Grön
    default: return '#8c8c8c';           // Grå
  }
};

// Hjälpfunktion för att snygga till datum
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};