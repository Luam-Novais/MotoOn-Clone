import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { HttpRequestBuilder } from '../utils/httpRequestBuilder';
import { useRouter } from 'next/navigation';
import { RideWithClient } from '../types/ride';
import { useGetToken } from './useGetToken';

const httpReqBuilder = new HttpRequestBuilder();
export function useRides(filter: string) {
  const token = useGetToken()
  async function getRides(): Promise<RideWithClient[]> {
    const { url, options } = httpReqBuilder.buildGet(`ride/get-rides?filter=${filter}`);
    const authOpts = {
      ...options,
      headers: {
        authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    };
    const response = await fetch(url, authOpts);
    if (!response.ok) throw new Error('Erro na requisição.');

    return await response.json();
  }
  const ridesToday = useQuery({
    queryKey: ['rides', filter],
    queryFn: getRides,
    enabled: !!token,
  });
  return ridesToday;
}
