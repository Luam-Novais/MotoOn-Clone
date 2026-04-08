import { ArrowLeft } from 'lucide-react';
import { Title } from '@/src/components/title';
import Link from 'next/link';
import { CardClientViewRide, CardMotoboy } from '@/src/components/cards';

export default function Page() {
  return (
    <section className="p-4 flex flex-col gap-8">
      <span className="flex gap-2 items-center">
        <Link href={'/ride'}>
          <ArrowLeft size={30} />
        </Link>
        <Title>Suas Corridas</Title>
      </span>
      <section className="flex flex-col gap-8">
        <CardMotoboy />
        <div className='flex flex-col gap-4'>

          <h1>Você tem 1 corrida confirmada para hoje.</h1>
          <CardClientViewRide ride={ride} />
        </div>
      </section>
    </section>
  );
}

const ride = {
  id: 2,
  client_id: 1,
  origin: 'bulhoes',
  destination: 'santo_antonio_bulhoes',
  date_ride: new Date('2026-03-06T00:00:00.000Z'),
  start_ride: 300,
  end_ride: 330,
  status: 'CONFIRMADA',
  value: 17,
  address: 'Rua da quadra',
  points_used: null,
  created_at: new Date('2026-03-06T00:00:00.000Z'),
  client: {
    id: 1,
    name: 'Yan',
    phone: '24998763577',
    points_week: 0,
  },
};
