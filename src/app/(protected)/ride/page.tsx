'use client';
import { useRides } from '@/src/hooks/useRides';
import { History, ChevronsRight} from 'lucide-react';
import Link from 'next/link';
import { Spinner } from '@/src/components/spinner';
import { PendingViewRidesCard, CardViewPendingRidesEmpty } from '@/src/components/card.rides';

export default function Page() {
  const pendingRides = useRides('pending-rides');
  const totalPendingRides = pendingRides.data?.length ?? 0;
  const estimatedValue = pendingRides.data?.reduce((acc: number, r) => acc + r.value, 0);
  return (
    <section className="animate-appear px-4 py-8 grid gap-8 mb-40">
      {pendingRides.isLoading ?? <Spinner />}
      {pendingRides.data?.length === 0 ? <CardViewPendingRidesEmpty /> : <PendingViewRidesCard totalPending={totalPendingRides} estimatedValue={estimatedValue} />}

      <div className="border border-black relative bg-container flex flex-col gap-8 p-4 shadow-xl shadow-black/50 rounded-xl">
        <History size={120} className="absolute top-0.5 right-0.5 opacity-10" />
        <div className="grid gap-4">
          <span className="w-fit bg-amber-500/30 p-2 flex items-center justify-center rounded-md shadow shadow-black/30">
            <History size={35} color="#f59e0b" />
          </span>
          <h2 className="uppercase text-2xl font-bold italic">Histórico</h2>
          <span>
            <h3 className="uppercase text-xl font-semibold text-[#FFE3B4bb]">Histórico de corridas</h3>
            <p className="capitalize text-sm text-[#ccc]">visualize suas corridas passadas.</p>
          </span>
        </div>
        <Link href={'/ride/history-rides'} className="flex self-end font-semibold gap-2 bg-dark w-fit p-4 text-amber-500 rounded-xl shadow-md shadow-black/40 ">
          VER HISTÓRICO <ChevronsRight />
        </Link>
      </div>
    </section>
  );
}
