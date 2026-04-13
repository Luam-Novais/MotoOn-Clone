'use client';
import { ArrowLeft } from 'lucide-react';
import { Title } from '@/src/components/title';
import Link from 'next/link';
import { CardClientViewRide, CardMotoboy } from '@/src/components/cards';
import { Button } from '@/src/components/button';
import Image from 'next/image';
import { getRides } from '@/src/service/client.services';
import { useState, useEffect } from 'react';
import { RideWithClient } from '@/src/types/ride';
import { Spinner } from '@/src/components/spinner';

export default function Page() {
  const [rides, setRides] = useState<RideWithClient[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorToken, setErrorToken] = useState<string | null>(null);

  async function fetchRides(token: string) {
    try {
      setLoading(true);
      setError(null);
      const { response, json } = await getRides(token);
      if (!response.ok) throw new Error(json.messageError);
      setRides(json);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('client_token');
    if (!token) setErrorToken('Nenhuma corrida foi encontrada.');
    fetchRides(token as string);
  }, []);

  if (loading) return <Spinner />;
  if (errorToken)
    return (
      <span className="p-4 flex gap-2 items-center">
        <Link href={'/ride'}>
          <ArrowLeft size={30} />
        </Link>
        <Title>{errorToken}</Title>
      </span>
    );
  return (
    <section className="p-4 relative flex h-screen flex-col gap-8 animate-appear">
      <span className="flex gap-2 items-center">
        <Link href={'/ride'}>
          <ArrowLeft size={30} />
        </Link>
        <Title>Suas Corridas</Title>
      </span>
      <section className="flex flex-col gap-8">
        <CardMotoboy />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col gap-4">
          {loading && <div className="animate-skeleton-loading bg-container rounded-xl shadow-md shadow-black/50 flex flex-col gap-2 h-40"></div>}
          {rides && rides.length > 0 && (
            <>
              <h1>Você tem {rides.length} corridas confirmada para hoje.</h1>
              <ul className="flex flex-col gap-4">
                {rides.map((r, i) => {
                  return (
                    <li key={r.id}>
                      <CardClientViewRide ride={r} index={i} />
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </section>
      <Button type="button" className="self-end rounded-full! abolute bottom-2 right-2">
        <Image src={'/whatsapp.svg'} width={20} height={20} alt="logo do whatsapp" />
      </Button>
    </section>
  );
}

// const rides = [
//   {
//     id: 2,
//     client_id: 1,
//     origin: 'freitas/proximidades',
//     destination: 'centro/proximidades',
//     date_ride: new Date('2026-03-06T00:00:00.000Z'),
//     start_ride: 300,
//     end_ride: 330,
//     status: 'CONFIRMADA',
//     value: 17,
//     address: 'Rua da quadra',
//     points_used: null,
//     created_at: new Date('2026-03-06T00:00:00.000Z'),
//     client: {
//       id: 1,
//       name: 'Yan',
//       phone: '24998763577',
//       points_week: 0,
//     },
//   },
//   {
//     id: 3,
//     client_id: 1,
//     origin: 'centro/proximidades',
//     destination: 'santo_antonio_bulhoes',
//     date_ride: new Date('2026-03-06T00:00:00.000Z'),
//     start_ride: 300,
//     end_ride: 330,
//     status: "PENDENTE",
//     value: 17,
//     address: 'Rua da quadra',
//     points_used: null,
//     created_at: new Date('2026-03-06T00:00:00.000Z'),
//     client: {
//       id: 1,
//       name: 'Yan',
//       phone: '24998763577',
//       points_week: 0,
//     },
//   },
// ];
