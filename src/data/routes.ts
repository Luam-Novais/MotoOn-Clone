export const allowedRoutes: Record<string, Record<string, number>> = {
  'freitas/proximidades': {
    bairros_proximos: 6,
    'centro/proximidades': 10,
    quatis_centro: 17,
    santo_antonio_bulhoes: 12,
    vila_marina: 14,
    'tecnopolo/pq_mariana': 17,
    vila_remedios: 10,
    quatis_vila: 20,
    nissan: 25,
  },
  bairros_proximos: {
    'freitas/proximidades': 6,
    'centro/proximidades': 6,
  },
  'centro/proximidades': {
    'freitas/proximidades': 10,
    bairros_proximos: 6,
    quatis_centro: 17,
    santo_antonio_bulhoes: 17,
    vila_marina: 20,
    'tecnopolo/pq_mariana': 15,
    'posto_ola(PR)': 18,
    vila_remedios: 15,
    quatis_vila: 20,
    'floriano(praca)': 10,
    'floriano(posto)': 12,
    nissan: 25,
  },
  quatis_centro: {
    'freitas/proximidades': 17,
    'centro/proximidades': 17,
  },
  santo_antonio_bulhoes: {
    'freitas/proximidades': 12,
    'centro/proximidades': 17,
  },
  vila_marina: {
    'freitas/proximidades': 14,
    'centro/proximidades': 20,
  },
  'tecnopolo/pq_mariana': {
    'freitas/proximidades': 17,
    'centro/proximidades': 15,
  },
  vila_remedios: {
    'freitas/proximidades': 10,
    'centro/proximidades': 15,
  },
  quatis_vila: {
    'freitas/proximidades': 20,
    'centro/proximidades': 20,
  },
  nissan: {
    'freitas/proximidades': 25,
    'centro/proximidades': 25,
  },
  'posto_ola(PR)': {
    'centro/proximidades': 18,
  },
  'floriano(praca)': {
    'centro/proximidades': 10,
  },
  'floriano(posto)': {
    'centro/proximidades': 12,
  },
};
