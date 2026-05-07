import { ListFilter, CalendarDays, Clock3, CalendarRange } from 'lucide-react';

type FilterType = 'all-rides' | 'today-rides' | 'current-month' | 'last-three-months';

export const FILTERS_RIDES = [
  {
    label: 'Todas',
    value: 'all-rides',
    icon: ListFilter,
  },
  {
    label: 'Hoje',
    value: 'today-rides',
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

