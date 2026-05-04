'use client';
import { Title } from '@/src/components/title';
import { ContainerCard, HighlightCard } from '@/src/components/cards';
import { CardRidesToday } from '@/src/components/card.rides';
import { Spinner, SpinnerWithButton } from '@/src/components/spinner';
import { useState } from 'react';
import { useRides } from '@/src/hooks/useRides';
import { useGetToken } from '@/src/hooks/useGetToken';
import { finishRideService } from '@/src/service/ride.services';
import { FinishRideModal } from '@/src/components/modals';
import { AlertCircle, CalendarOff, ChevronsRight, Gauge } from 'lucide-react';
import Link from 'next/link';
import { RideWithClient } from '@/src/types/ride';

export default function Page() {
  const token = useGetToken();
  const todayRides = useRides('today-rides');
  const pendingRides = useRides('pending-rides');
  const [modalState, setModalState] = useState<boolean>(false);
  const [id_ride, setId_ride] = useState<number | null>(null);
  const totalPendingRides = pendingRides.data?.length ?? 0;

  function HandleOpenModal(id: number) {
    setId_ride(id);
    setModalState(true);
  }
  function HandleCloseModal() {
    setModalState(false);
  }

  return (
    <section className="p-4 grid gap-4 mb-40">
      <section className="grid gap-4">
        {modalState && <FinishRideModal token={token as string} modalState={modalState} setModalState={HandleCloseModal} id_ride={id_ride as number} />}
        <Title>Olá Arthur.</Title>
        <HighlightCard icon={AlertCircle}>
          {totalPendingRides > 0 && (
            <span className="absolute -top-1 -right-1 flex size-3">
              <span className="absolute inline-flex h-full  w-full  animate-ping rounded-full bg-amber-500 opacity-100"></span>
              <span className="inline-flex size-3 rounded-full bg-amber-500"></span>
            </span>
          )}
          <span className="grid gap-2">
            <h2 className="text-2xl uppercase font-bold text-[#111]"> Corridas aguardando sua confimação.</h2>
            <span className="text-black italic text-6xl font-bold">{pendingRides.isLoading ? <Spinner /> : pendingRides.data?.length}</span>
          </span>
          <Link
            href={'/ride/pending-rides'}
            className="flex w-fit gap-2 items-center p-4 bg-dark shadow-md 
        shadow-amber-950 uppercase text-amber-500 rounded-xl font-bold italic self-end"
          >
            Ver pendentes
            <ChevronsRight />
          </Link>
        </HighlightCard>
        <ContainerCard className={'relative grid'}>
          <p className="text-xl uppercase font-bold text-[#eee] z-30">Total de corridas hoje.</p>
          <span className="text-5xl font-bold  text-amber-500 self-end p-2">{todayRides.isLoading ? <SpinnerWithButton /> : todayRides.data?.length}</span>
        </ContainerCard>
      </section>
      <section className="mt-8 grid gap-4">
        <h3 className="text-2xl font-semibold">Corridas confirmadas para hoje.</h3>
        <div className="p-4 flex flex-col gap-5 bg-container rounded-md shadow-md shadow-black/50 ">
          {todayRides.data?.length === 0 && (
            <span className="flex flex-col gap-2 justify-between">
              Você ainda não tem corridas confirmadas para hoje.
              <CalendarOff size={80} className="opacity-20 self-center " />
            </span>
          )}
          <ul className="flex flex-col gap-8">
            {todayRides.data?.slice(0, 3).map((ride, index) => {
              return <CardRidesToday ride={ride} key={ride.id} index={index} onClick={() => HandleOpenModal(ride.id)} />;
            })}
          </ul>
        </div>
      </section>
    </section>
  );
}
