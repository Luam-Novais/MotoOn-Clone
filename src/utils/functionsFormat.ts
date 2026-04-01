export function minutesToHoursFormated(minutes: number){
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60
      const formatedHour = `${String(hour).padStart(2, '0')}:${String(minute).padEnd(2, '0')}h`;
    return formatedHour
}
export function formatToCurrency(value: number){
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}