import { useQuery } from '@tanstack/react-query';
import { HttpRequestBuilder } from '@/src/utils/httpRequestBuilder';
import { useRouter } from 'next/navigation';
import { useGetToken } from '@/src/hooks/useGetToken';
import { Payment } from '../types/payment';

const { adminRequests } = new HttpRequestBuilder();
interface GetTotal {
  total: number;
}

async function getRevenue(token: string, filter: string):Promise<GetTotal> {
  const { url, options } = adminRequests.buildAdminGet(`payment/get-revenue?filter=${filter}`, token);
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
}
export function useRevenue(token: string, filter: string) {
  const dataFetched = useQuery({
    queryFn: () => getRevenue(token, filter),
    queryKey: ['payment', filter],
    enabled: !!token,
  });
  return dataFetched;
}

async function getPayments(token: string, filter: string): Promise<Payment[]> {
  const { url, options } = adminRequests.buildAdminGet(`payment/get?filter=${filter}`, token);
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
}
export function usePayments(token: string, filter: string) {
  const dataFetched = useQuery({
    queryFn: () => getPayments(token, filter),
    queryKey: ['payment', filter],
    enabled: !!token,
  });
  return dataFetched;
}
