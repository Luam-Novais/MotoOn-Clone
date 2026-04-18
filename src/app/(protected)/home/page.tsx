'use client';
import { Title } from '@/src/components/title';
import { ContainerCard, CardRidesToday } from '@/src/components/cards';
import { Spinner, SpinnerWithButton } from '@/src/components/spinner';
import { useState } from 'react';
import { useRides } from '@/src/hooks/useRides';
import { useGetToken } from '@/src/hooks/useGetToken';
import { finishRideService } from '@/src/service/ride.services';
import { FinishRideModal } from '@/src/components/modals';

export default function Page() {
  const token = useGetToken();
  const todayRides = useRides('today-rides');
  const pendingRides = useRides('pending-rides');
  const [modalState, setModalState] = useState<boolean>(false);
  const [id_ride, setId_ride] = useState<number | null>(null);
  const totalPendingRides = pendingRides.data?.length ?? 0;

  function HandleOpenModal(id:number) {
    setId_ride(id)
    setModalState(true);
  }
  function HandleCloseModal() {
    setModalState(false);
  }

  return (
    <section className=" p-4 flex flex-col gap-4 mb-28">
      {modalState && <FinishRideModal token={token as string} modalState={modalState} setModalState={HandleCloseModal} id_ride={id_ride as number}/>}
      <Title>Olá Arthur.</Title>
      <div className="grid grid-cols-2 gap-4">
        <ContainerCard style={'min-h-30 grid'}>
          <p className="text-sm">Total de corridas hoje.</p>
          <p className="text-4xl font-semibold italic text-amber-500 self-end p-2">{todayRides.isLoading ? <SpinnerWithButton /> : todayRides.data?.length}</p>
        </ContainerCard>
        <ContainerCard style={'min-h-30 grid relative'}>
          {totalPendingRides > 0 && (
            <span className="absolute -top-1 -right-1 flex size-3">
              <span className="absolute inline-flex h-full  w-full  animate-ping rounded-full bg-amber-500 opacity-100"></span>
              <span className="inline-flex size-3 rounded-full bg-amber-500"></span>
            </span>
          )}
          <p className="text-sm"> Corridas aguardando sua confimação.</p>
          <p className="text-4xl font-semibold italic text-amber-500 self-end p-2">{pendingRides.isLoading ? <SpinnerWithButton /> : pendingRides.data?.length}</p>
        </ContainerCard>
      </div>
      <div className="mt-8">
        <div className="p-4 flex flex-col gap-5 bg-container rounded-md shadow-md shadow-black/50 ">
          <h3 className="text-2xl">Corridas confirmadas para hoje.</h3>
          {todayRides.data?.length === 0 && <span>Você ainda não tem corridas para hoje.</span>}
          <ul className="flex flex-col gap-8">
            {todayRides.data?.slice(0, 3).map((ride, index) => {
              return <CardRidesToday ride={ride} key={ride.id} index={index} onClick={() => HandleOpenModal(ride.id)} />;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
