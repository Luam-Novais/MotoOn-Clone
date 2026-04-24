'use client';
import { Title } from '@/src/components/title';
import { Button, ButtonFilter } from '@/src/components/button';
import { Plus, CalendarCheck, CircleDollarSign, ListFilter, BanknoteX } from 'lucide-react';
import { Payment } from '@/src/types/payment';
import { CardPayment } from '@/src/components/cards.payment';
import { HighlightCard } from '@/src/components/cards';
import { formatToCurrency } from '@/src/utils/functionsFormat';
import { usePayments, useRevenue } from '@/src/hooks/useFetch';
import { useGetToken } from '@/src/hooks/useGetToken';
import { useEffect, useState } from 'react';
import { Spinner } from '@/src/components/spinner';
import Link from 'next/link';
import { DeletePaymentModal } from '@/src/components/modals';
import { useModal } from '@/src/stores/useModalStore';
import { InputRadio } from '@/src/components/input';
import { useForm } from 'react-hook-form';

interface GetHistoryPayment {
  history_payments: string;
}
export default function Page() {
  const accessToken = useGetToken();
  const { register, watch } = useForm<GetHistoryPayment>();
  const [filterPayments, setFilterPayments] = useState<string | null>('today-payments');

  const [modal, setModal] = useState<{ type: 'edit' | 'delete'; data: Payment } | null>(null);
  const todayRevenue = useRevenue(accessToken as string, 'today-revenue');
  const monthRevenue = useRevenue(accessToken as string, 'month-revenue');
  const payments = usePayments(accessToken as string, filterPayments ?? 'today-payments');

  useEffect(() => {
    setFilterPayments(watch('history_payments'));
    return () => {
      setFilterPayments(null);
    };
  }, [watch('history_payments')]);
  return (
    <section className="flex flex-col gap-8 p-4 relative min-h-screen">
      {modal?.type === 'delete' && <DeletePaymentModal token={accessToken as string} data={modal.data} onClose={() => setModal(null)} />}
      <span className="flex items-center gap-4">
        <Title>Central de pagamentos</Title>
      </span>

      <Link href={'/payment/create'} className="p-4 shadow-xl justify-center items-center flex gap-4 text-[1.125rem] font-semibold bg-linear-to-b text-amber-950 from-amber-300 to-amber-600  self-end z-40 rounded-full! fixed! bottom-25 right-5">
        <Plus />
      </Link>

      <div className="flex relative flex-col gap-8 animate-appear mb-40">
        <section className="flex relative flex-col gap-4">
          <HighlightCard icon={CircleDollarSign}>
            <p className="text-amber-950 text-xs font-semibold uppercase">faturamento de hoje</p>
            {todayRevenue.isLoading ? <Spinner /> : <h2 className="text-6xl font-bold italic text-[#111]">{formatToCurrency(todayRevenue.data ? todayRevenue.data.total : 0)}</h2>}
          </HighlightCard>
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
          <form action="" className="flex justify-between  overflow-x-scroll overflow-y-hidden gap-4">
            <InputRadio label={'hoje'} register={register('history_payments')} value="today-payments" />
            <InputRadio label={'mês atual'} register={register('history_payments')} value="current-month-payments" />
            <InputRadio label={'ultimos 3 meses'} register={register('history_payments')} value="last-three-months" />
          </form>
          <div className="p-4 flex flex-col gap-5 bg-container rounded-md shadow-md shadow-black/50 ">
            {payments.data?.length === 0 && (
              <span className="flex flex-col gap-2 justify-between">
                Você ainda não tem registro de pagamentos para essa data.
                <BanknoteX size={80} className="opacity-20 self-center " />
              </span>
            )}
            <ul className="flex flex-col gap-8">
              {payments.isLoading && <Spinner />}
              {payments.data?.map((p, i) => {
                return <CardPayment key={p.id} payment={p} index={i} onDelete={() => setModal({ type: 'delete', data: p })} />;
              })}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}
