import { ListFilter, CalendarDays, Clock3, CalendarRange } from 'lucide-react';

type FilterType = 'all' | 'today' | 'current-month' | 'last-three-months';

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
