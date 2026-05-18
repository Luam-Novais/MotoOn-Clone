'use client';
import { Spinner } from '@/src/components/spinner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HttpRequestBuilder } from '../utils/httpRequestBuilder';
import { useNotificationStore } from '@/src/store/useNotificationStore';

const httpReqBuilder = new HttpRequestBuilder();

export default function AuthLayout({ children, className }: { children: React.ReactNode; className: string }) {
  const [isCheck, setIsCheck] = useState<boolean>(true);
  const router = useRouter();

  async function fetchMe(token: string) {
    try {
      const { url } = httpReqBuilder.buildGet('auth/me');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (!response.ok) {
        localStorage.removeItem('access_token');
        router.replace('/login');
        return;
      }

      setIsCheck(false);
    } catch (error) {
      console.error(error);
      setIsCheck(false);
    }
  }
  useEffect(() => {
    const tokenLocal = localStorage.getItem('access_token');
    if (!tokenLocal) {
      router.replace('/login');
      console.log('caiu aq');
      return;
    }
    fetchMe(tokenLocal);
  }, []);
  if (isCheck) return <Spinner />;
  return <main>{children}</main>;
}
