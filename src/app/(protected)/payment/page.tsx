'use client'
import { Title } from '@/src/components/title';
import { Button } from '@/src/components/button';
import { Plus, CalendarCheck, CircleDollarSign } from 'lucide-react';
import { Payment } from '@/src/types/payment';
import { CardPayment } from '@/src/components/cards';
import { formatToCurrency } from '@/src/utils/functionsFormat';
import { useFetch } from '@/src/hooks/useFetch';
import { HttpRequestBuilder } from '@/src/utils/httpRequestBuilder';
import { redirect, useRouter } from 'next/navigation';

const httpReqBuilder = new HttpRequestBuilder();

interface GetTotal{
  total: number
}
export default function Page() {
  const accessToken = localStorage.getItem('access_token')
  const router = useRouter()
  if(!accessToken || accessToken === null) router.push('/login')
  const todayReq = httpReqBuilder.adminRequests.buildAdminGet('payment/get-today-revenue', accessToken);
  const monthReq = httpReqBuilder.adminRequests.buildAdminGet('payment/get-month-revenue', accessToken);

  const todayRevenue = useFetch<GetTotal>(todayReq.url, todayReq.options)
  const monthRevenue = useFetch<GetTotal>(monthReq.url, monthReq.options);
  if(todayRevenue.response && todayRevenue.response.status === 401){
    router.push('/login')
  }

  return (
    <main className="flex flex-col gap-8 p-4 relative min-h-screen">
      <span className="flex items-center gap-4">
        <Title>Central de pagamentos</Title>
      </span>

      <Button type="button" className="self-end z-50 rounded-full! fixed! bottom-25 right-5">
        <Plus />
      </Button>

      <div className="flex relative flex-col gap-8 animate-appear">
        <section className="flex relative flex-col gap-4">
          <span className="relative flex flex-col  justify-between gap-x-2 bg-linear-to-b from-amber-300 to-amber-600  p-4 h-40 rounded-xl  shadow-md shadow-black/50 text-amber-950">
            <CircleDollarSign size={50} className="absolute right-2 top-2 opacity-50" />
            <p className="text-xs font-semibold uppercase">faturamento de hoje</p>
            <h2 className="text-5xl font-extrabold italic text-[#111]">{formatToCurrency(todayRevenue.data ? todayRevenue.data.total : 0)}</h2>
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
        <section className="flex flex-col gap-2">
          <h2 className="text-base uppercase font-bold italic text-[#eee]">Últimos Pagamentos</h2>
          <p className='self-start' >ultimos 30 dias</p>
          <ul className="flex flex-col gap-4">
            <li>
              <CardPayment payment={payment} />
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

const payment: Payment = {
  client_id: 1,
  id: 1,
  payment_date: new Date(),
  created_at: new Date(),
  value: 100,
  ride_id: 1,
  payment_method: 'pix',
  number_ride: '#RX4578'
};