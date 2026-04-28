'use client';
import { Title } from '@/src/components/title';
import { Plus, CalendarCheck, CircleDollarSign, ListFilter, BanknoteX } from 'lucide-react';
import { Payment } from '@/src/types/payment';
import { PaymentCard } from '@/src/components/cards.payment';
import { HighlightCard } from '@/src/components/cards';
import { formatToCurrency } from '@/src/utils/functionsFormat';
import { usePayments, useRevenue } from '@/src/hooks/useFetch';
import { useGetToken } from '@/src/hooks/useGetToken';
import { useEffect, useState } from 'react';
import { Spinner } from '@/src/components/spinner';
import Link from 'next/link';
import { DeletePaymentModal } from '@/src/components/modals';
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
            <p className="text-amber-950 uppercase text-xl  font-semibold">faturamento de hoje</p>
            {todayRevenue.isLoading ? <Spinner /> : <h2 className="text-6xl font-bold italic text-[#111]">{formatToCurrency(todayRevenue.data ? todayRevenue.data.total : 0)}</h2>}
          </HighlightCard>
          <div className="shadow-xl shadow-black/50 rounded-xl p-4 bg-container grid gap-4">
            <span className="w-fit bg-amber-500/30 p-2 flex items-center justify-center rounded-md shadow shadow-black/30">
              <CalendarCheck size={35} color="#f59e0b" />
            </span>
            <div>
              <h3 className="uppercase text-base text-[#FFE3B4bb]">Últimos 30 dias</h3>
              <h2 className="flex gap-2 text-4xl font-bold">
                {formatToCurrency(monthRevenue.data ? monthRevenue.data.total : 0)}
                <span className="text-[#ccc] self-end text-xs">agregado</span>
              </h2>
            </div>
          </div>
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
                return <PaymentCard key={p.id} payment={p} index={i} onDelete={() => setModal({ type: 'delete', data: p })} />;
              })}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}
