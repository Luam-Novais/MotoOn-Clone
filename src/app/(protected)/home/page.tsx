import { Title } from '@/src/components/title';
import { CardRidesToday, ContainerCard } from '@/src/components/cards';
import { RideWithClient } from '@/src/types/ride';
export default function Page() {
  return (
    <section className="p-4 flex flex-col gap-4">
      <Title>Olá Arthur.</Title>
      <div className="grid grid-cols-2 gap-4">
        <ContainerCard style={'min-h-30 grid'}>
          <p className="text-sm">Total de corridas hoje.</p>
          <p className="text-2xl text-amber-500 self-end p-2">3</p>
        </ContainerCard>
        <ContainerCard style={'min-h-30 grid'}>
          <p className="text-sm"> Corridas aguardando sua confimação.</p>
          <p className="text-2xl text-amber-500 self-end p-2">0</p>
        </ContainerCard>
      </div>
      <div>
      <CardRidesToday rides={rides} >

      </CardRidesToday>
      </div>
    </section>
  );
}

const rides = [
  {
    id: 2,
    client_id: 1,
    origin: 'bulhoes',
    destination: 'quatis centro',
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
  },
  {
    id: 2,
    client_id: 1,
    origin: 'freitas/proximidades',
    destination: 'quatis centro',
    date_ride: new Date('2026-03-06T00:00:00.000Z'),
    start_ride: 480,
    end_ride: 510,
    status: 'CONFIRMADA',
    value: 30.5,
    address: 'Rua do 10e40',
    points_used: null,
    created_at: new Date('2026-03-06T00:00:00.000Z'),
    client: {
      id: 1,
      name: 'luam',
      phone: '24998763577',
      points_week: 0,
    },
  },
];