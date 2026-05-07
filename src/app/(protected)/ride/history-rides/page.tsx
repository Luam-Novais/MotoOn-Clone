'use client';
import { Title } from '@/src/components/title';
import { ArrowLeft, ListFilter } from 'lucide-react';
import Link from 'next/link';
import { ButtonFilter } from '@/src/components/button';
import { useRides } from '@/src/hooks/useRides';
import { RideCard } from '@/src/components/card.rides';
import { useState } from 'react';
import { Spinner } from '@/src/components/spinner';
import { FILTERS_RIDES } from '@/src/data/filters';

export default function Page() {
  const [filter, setFilter] = useState<string>('all-rides');
  const rides = useRides(filter);

  return (
    <section className="grid gap-8 p-4 mb-40">
      <span className="flex gap-2 items-center">
        <Link href={'/ride'}>
          <ArrowLeft />
        </Link>
        <Title>Histórico de corridas</Title>
      </span>
      <div className="grid gap-6">
        <header className="flex items-center justify-between">
          <div className="grid gap-1">
            <h2 className="text-lg font-bold text-zinc-100 uppercase tracking-wide">Últimas corridas</h2>

            <p className="flex items-center gap-2 text-sm text-zinc-400">
              <ListFilter size={14} />
              Filtre suas corridas rapidamente
            </p>
          </div>
        </header>

        <div
          className="
          flex gap-3 overflow-x-auto
          rounded-2xl border border-zinc-800
          bg-zinc-900/60 backdrop-blur-sm
          p-3 shadow-lg shadow-black/20
        "
        >
          {FILTERS_RIDES.map((item) => {
            const isActive = filter === item.value;
            const Icon = item.icon;

            return (
              <ButtonFilter key={item.value} type="button" onClick={() => setFilter(item.value)} active={isActive}>
                <Icon size={16} />
                {item.label}
              </ButtonFilter>
            );
          })}
        </div>
        <div className="bg-container p-4 rounded-xl">
          <ul className="grid gap-4">
            {rides.isLoading && <Spinner />}
            {rides.data?.map((r) => {
              return <RideCard ride={r} key={r.id} />;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
