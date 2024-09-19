export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', options);
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, 
  };
  return date.toLocaleTimeString('pt-BR', options);
}

export function formatDateWithWeekday(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('pt-BR', options);

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

