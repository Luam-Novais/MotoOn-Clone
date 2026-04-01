import { Title } from '@/src/components/title';
import { ContainerCard, CardRidesToday } from '@/src/components/cards';
import { RideWithClient } from '@/src/types/ride';
export default function Page() {
  const totalCorridasPendentes = 1;
  return (
    <section className="p-4 flex flex-col gap-4">
      <Title>Olá Arthur.</Title>
      <div className="grid grid-cols-2 gap-4">
        <ContainerCard style={'min-h-30 grid'}>
          <p className="text-sm">Total de corridas hoje.</p>
          <p className="text-4xl font-semibold italic text-amber-500 self-end p-2">3</p>
        </ContainerCard>
        <ContainerCard style={'min-h-30 grid relative'}>
          {totalCorridasPendentes > 0 && (
            <span className="absolute -top-1 -right-1 flex size-3">
              <span className="absolute inline-flex h-full  w-full  animate-ping rounded-full bg-amber-500 opacity-100"></span>
              <span className="inline-flex size-3 rounded-full bg-amber-500"></span>
            </span>
          )}
          <p className="text-sm"> Corridas aguardando sua confimação.</p>
          <p className="text-4xl font-semibold italic text-amber-500 self-end p-2">{totalCorridasPendentes}</p>
        </ContainerCard>
      </div>
      <div className="mt-8">
        <div className="p-4 flex flex-col gap-5 bg-container rounded-md shadow-md shadow-black/50 ">
          <h3 className="text-2xl">Corridas confirmadas para hoje.</h3>
          <ul className="flex flex-col gap-8">
            {rides.map((ride) => {
              return <CardRidesToday ride={ride} key={ride.id} />;
            })}
          </ul>
        </div>
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
    id: 3,
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
  {
    id: 4,
    client_id: 1,
    origin: 'freitas/proximidades',
    destination: 'freitas/proximidades',
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
