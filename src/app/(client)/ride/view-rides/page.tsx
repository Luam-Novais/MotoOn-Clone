'use client';
import { ArrowLeft } from 'lucide-react';
import { Title } from '@/src/components/title';
import Link from 'next/link';
import { CardClientViewRide } from '@/src/components/card.rides';
import { CardMotoboy } from '@/src/components/cards';
import { Button } from '@/src/components/button';
import Image from 'next/image';
import { Spinner } from '@/src/components/spinner';
import { useQuery } from '@tanstack/react-query';
import { useGetClientToken } from '@/src/hooks/useGetClientToken';
import { getClientRidesService } from '@/src/service/ride.services';

export default function Page() {
  const tokenClient = useGetClientToken();

  const ridesClient = useQuery({
    queryKey: ['rides-client'],
    queryFn: () => getClientRidesService(tokenClient as string),
    enabled: !!tokenClient,
  });
  return (
    <section className="relative">
      <Button type="button" className="self-end z-50 rounded-full! fixed bottom-2 right-2">
        <Image src={'/whatsapp.svg'} width={20} height={20} alt="logo do whatsapp" />
      </Button>
      <div className="p-4  flex h-screen flex-col gap-8 animate-appear">
        <span className="flex gap-2 items-center">
          <Link href={'/'}>
            <ArrowLeft size={30} />
          </Link>
          <Title>Suas Corridas</Title>
        </span>
        <div className="flex flex-col gap-8">
          <CardMotoboy />
          <div className="flex flex-col gap-4">
            {ridesClient.isLoading ? <Spinner /> : ''}
            {ridesClient.isError && <span>Ocorreu um erro ao buscar as suas corridas.</span>}
            {ridesClient.data && ridesClient.data?.length > 0 ? (
              <>
                <h1>Você tem {ridesClient.data?.length} corridas agendadas.</h1>
                <ul className="flex flex-col gap-4">
                  {ridesClient.data?.map((r, i) => {
                    return (
                      <li key={r.id}>
                        <CardClientViewRide ride={r} index={i} />
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <h1>Você não possui corridas agendadas.</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
