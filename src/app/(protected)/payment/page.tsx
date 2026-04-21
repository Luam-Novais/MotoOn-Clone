'use client';
import { Title } from '@/src/components/title';
import { Button, ButtonFilter } from '@/src/components/button';
import { Plus, CalendarCheck, CircleDollarSign, Filter, ListFilter } from 'lucide-react';
import { Payment } from '@/src/types/payment';
import { CardPayment } from '@/src/components/cards';
import { formatToCurrency } from '@/src/utils/functionsFormat';
import { usePayments, useRevenue } from '@/src/hooks/useFetch';
import { useGetToken } from '@/src/hooks/useGetToken';
import { useState } from 'react';
import { Spinner } from '@/src/components/spinner';
import Link from 'next/link';
import { DeletePaymentModal } from '@/src/components/modals';
import { useModal } from '@/src/stores/useModalStore';

export default function Page() {
  const accessToken = useGetToken();
  const [filterPayments, setFilterPayments] = useState<string>('today-payments');
  const [modal, setModal] = useState<{ type: 'edit' | 'delete'; data: Payment } | null>(null);
  const todayRevenue = useRevenue(accessToken as string, 'today-revenue');
  const monthRevenue = useRevenue(accessToken as string, 'month-revenue');
  const payments = usePayments(accessToken as string, filterPayments);

  return (
    <main className="flex flex-col gap-8 p-4 relative min-h-screen">
      {modal?.type === 'delete' && <DeletePaymentModal token={accessToken as string} data={modal.data} onClose={() => setModal(null)} />}
      <span className="flex items-center gap-4">
        <Title>Central de pagamentos</Title>
      </span>

      <Link href={'/payment/create'} className="p-4 shadow-xl justify-center items-center flex gap-4 text-[1.125rem] font-semibold bg-linear-to-b text-amber-950 from-amber-300 to-amber-600  self-end z-40 rounded-full! fixed! bottom-25 right-5">
        <Plus />
      </Link>

      <div className="flex relative flex-col gap-8 animate-appear mb-40">
        <section className="flex relative flex-col gap-4">
          <span className="relative flex flex-col  justify-between gap-x-2 bg-linear-to-b from-amber-300 to-amber-600  p-4 h-40 rounded-xl  shadow-md shadow-black/50 text-amber-950">
            <CircleDollarSign size={50} className="absolute right-2 top-2 opacity-50" />
            <p className="text-xs font-semibold uppercase">faturamento de hoje</p>
            {todayRevenue.isLoading ? <Spinner /> : <h2 className="text-6xl font-bold italic text-[#111]">{formatToCurrency(todayRevenue.data ? todayRevenue.data.total : 0)}</h2>}
          </span>

          <span className="shadow-md shadow-black/50 rounded-xl">
            <span
              className="relative flex flex-col justify-between gap-x-2 bg-container p-4 h-28 rounded-xl  
        drop-shadow-black shadow-inner! shadow-[#333]!"
            >
              <CalendarCheck size={50} className="absolute right-2 top-2 opacity-15" />
              <p className="text-xs text-[#ccc] font-semibold uppercase">ultimos 30 dias</p>
              <h2 className="flex gap-2 text-4xl font-extrabold italic ">
                {formatToCurrency(monthRevenue.data ? monthRevenue.data.total : 0)}
                <span className="text-[#ccc] self-end text-xs uppercase ">agregado</span>
              </h2>
            </span>
          </span>
        </section>
        <section className="flex flex-col gap-6">
          <span>
            <h2 className="text-base uppercase font-bold italic text-[#eee]">Últimos Pagamentos</h2>
            <p className="flex items-center gap-2">
              <ListFilter size={12} /> Filtro por data
            </p>
          </span>
          <div className="flex justify-between  overflow-x-scroll gap-4">
            <ButtonFilter onClick={() => setFilterPayments('today-payments')} type="button">
              Dia atual
            </ButtonFilter>
            <ButtonFilter onClick={() => setFilterPayments('current-month-payments')} type="button">
              Ultimos 30 dias
            </ButtonFilter>
            <ButtonFilter onClick={() => setFilterPayments('last-three-months')} type="button">
              Ultimos 3 meses
            </ButtonFilter>
          </div>
          <ul className="flex flex-col gap-8">
            {payments.isLoading && <Spinner />}
            {payments.data?.length === 0 && <span>Você ainda não possui pagamentos para esta data.</span>}
            {payments.data?.map((p) => {
              return (
                <li key={p.id}>
                  <CardPayment payment={p} onEdit={() => setModal({ type: 'edit', data: p })} onDelete={() => setModal({ type: 'delete', data: p })} />
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}
