export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', options);
}
