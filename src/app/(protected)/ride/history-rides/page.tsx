'use client';
import { Title } from '@/src/components/title';
import { ArrowLeft, ListFilter } from 'lucide-react';
import Link from 'next/link';
import { ButtonFilter } from '@/src/components/button';
import { useRides } from '@/src/hooks/useRides';
import { RideCard } from '@/src/components/card.rides';
import { useState } from 'react';
import { Spinner } from '@/src/components/spinner';

export default function Page() {
  const [filter, setFilter] = useState<string>('all-rides');
  const rides = useRides('all-rides');
  return (
    <section className="grid gap-4 p-4 mb-40">
      <span className="flex gap-2 items-center">
        <Link href={'/ride'}>
          <ArrowLeft />
        </Link>
        <Title>Histórico de corridas</Title>
      </span>
      <div className="grid gap-4">
        <span className="grid gap-2">
          <h2 className="text-base uppercase font-bold text-[#eee]">Últimos Corridas</h2>
          <p className="flex items-center text-sm gap-2">
            <ListFilter size={12} /> Filtro por data
          </p>
        </span>
        <form action="" className="flex justify-between overflow-x-scroll overflow-y-hidden gap-4 bg-container py-2 px-4 rounded-xl shadow-md shadow-black/50">
          <ButtonFilter type="button" className={'bg-amber-500/20 text-amber-500'}>
            Hoje
          </ButtonFilter>
          <ButtonFilter type="button" className={'bg-zinc-950'}>
            mês atual
          </ButtonFilter>
          <ButtonFilter type="button" className={'bg-zinc-950'}>
            últimos 3 meses
          </ButtonFilter>
        </form>
        <div className="bg-container p-4 rounded-xl">
          {rides.isLoading ? (
            <Spinner />
          ) : (
            <ul className="grid gap-4">
              {rides.data?.map((r) => {
                return <RideCard ride={r} key={r.id} />;
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
