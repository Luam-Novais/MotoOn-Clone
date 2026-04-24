'use client';
import { CardRide } from '@/src/components/cards';
import { useRides } from '@/src/hooks/useRides';
import { ButtonFilter } from '@/src/components/button';
import { History, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const today = new Date().toLocaleDateString();
  const todayRides = useRides('today-rides');
  const allRides = useRides('all-rides');

  return (
    <section className="p-4 grid gap-4">
      <div className="grid gap-4">
        <Link href={'/ride/pending-rides'} className="relative flex  justify-between gap-x-2 bg-linear-to-b from-amber-300 to-amber-600  p-4 h-40 rounded-xl  shadow-md shadow-black/50">
          <div className="text-amber-950 self-end">
            <h1 className="uppercase text-xl font-bold italic">Corridas aguardando sua confirmação</h1>
            <p className="text-sm">Confirme ou cancele suas solicitações de corrida.</p>
          </div>
          <Clock className="top-5 right-5" size={120} color="#4A2C00" />
        </Link>
      </div>
      <div className="grid gap-4">
        <h2 className="flex items-center gap-1.5 text-xl uppercase font-bold">
          historico de corridas <History />
        </h2>
        <div className="flex justify-between  overflow-x-scroll gap-4">
          <ButtonFilter type="button">7 dias</ButtonFilter>
          <ButtonFilter type="button">30 dias</ButtonFilter>
          <ButtonFilter type="button">todas</ButtonFilter>
        </div>
        <ul className="grid gap-4">
          {allRides.data?.map((r, i) => {
            return <CardRide ride={r} index={i} key={r.id} />;
          })}
        </ul>
      </div>
    </section>
  );
}
