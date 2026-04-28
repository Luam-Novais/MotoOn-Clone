'use client';
import { CompactPendingViewCard, PendingRideCard } from '@/src/components/card.rides';
import { UpdatePendingRideModal } from '@/src/components/modals';
import { Title } from '@/src/components/title';
import { useGetToken } from '@/src/hooks/useGetToken';
import { useRides } from '@/src/hooks/useRides';
import { RideWithClient } from '@/src/types/ride';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const token = useGetToken();
  const pendingRides = useRides('pending-rides');
  const [modal, setModal] = useState<{ type: 'update' | 'delete'; token: string; data: RideWithClient } | null>(null);
  const totalPendingRides = pendingRides.data?.length;
  const estimatedValue = pendingRides.data?.reduce((acc: number, r) => acc + r.value, 0);

  function handleCloseModal() {
    setModal(null);
  }
  return (
    <section className="p-4 grid gap-8 bg-dark mb-40 relative">
      {modal?.type === 'update' && <UpdatePendingRideModal token={token!} data={modal.data} onClose={handleCloseModal} />}
      <div className="flex gap-4 items-start">
        <Link href={'/ride'}>
          <ArrowLeft />
        </Link>
        <span>
          <Title>Corridas Pendentes</Title>
          <p>Gerencie suas solicitações de corrida.</p>
        </span>
      </div>

      <section className="grid gap-8">
        <div>
          <CompactPendingViewCard totalPending={totalPendingRides} estimatedValue={estimatedValue} />
        </div>
        <div className=" grid gap-4">
          <h1 className="uppercase text-xl font-bold text-zinc-200">pendentes</h1>
          <ul className="grid gap-8">
            {pendingRides.data?.map((r) => {
              return <PendingRideCard ride={r} key={r.id} onClick={() => setModal({ type: 'update', token: token!, data: r })} />;
            })}
          </ul>
        </div>
      </section>
    </section>
  );
}
