import { ListFilter, CalendarDays, Clock3, CalendarRange } from 'lucide-react';
export const FILTERS = [
  {
    label: 'Todas',
    value: 'all',
    icon: ListFilter,
  },
  {
    label: 'Hoje',
    value: 'today',
    icon: Clock3,
  },
  {
    label: 'Mês atual',
    value: 'current-month',
    icon: CalendarDays,
  },
  {
    label: '3 meses',
    value: 'last-three-months',
    icon: CalendarRange,
  },
] as const;
