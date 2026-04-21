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
import { useGetToken } from '@/src/hooks/useGetToken';
import { useQuery } from '@tanstack/react-query';
import { Span } from 'next/dist/trace';
import { useGetClientToken } from '@/src/hooks/useGetClientToken';

export default function Page() {
  const tokenClient = useGetClientToken();
  async function fetchRides(token: string): Promise<RideWithClient[] | undefined> {
   if(token && token!== undefined){
     const { response, json } = await getRides(token);
     if (!response.ok) throw new Error(json.messageError);

     return json;
    }
  }

  const ridesClient = useQuery({
    queryKey: ['rides-client'],
    queryFn: () => fetchRides(tokenClient as string),
    enabled: !!tokenClient
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
                <h1>Você tem {ridesClient.data?.length} corridas confirmada para hoje.</h1>
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
              <h1>Você não possui corridas para hoje.</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
