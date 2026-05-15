export function minutesToHoursFormated(minutes: number) {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const formatedHour = `${String(hour).padStart(2, '0')}:${String(minute).padEnd(2, '0')}h`;
  return formatedHour;
}
export function formatToCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
export function normalizeTextLabel(value: string): string {
  return value.replaceAll('_', ' ');
}
export function formatDate(date: string) {
  const cleanDate = date.split('T')[0];
  const [year, month, day] = cleanDate.split('-').map(Number);
  return new Date(year, month - 1, day, 0, 0, 0).toLocaleDateString();
}

export function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);

  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
