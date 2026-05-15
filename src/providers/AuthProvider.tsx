'use client'
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
     } as RequestInit);
     if (!response.ok) {
       router.replace('/login');
       return;
     }
     setIsCheck(false);
   } catch (error) {
    router.replace('/login');
    return;
   }
  }
  useEffect(() => {
    const tokenLocal = localStorage.getItem('access_token');
    if (!tokenLocal) {
      router.replace('login');
      return;
    }
    fetchMe(tokenLocal);
  }, []);
  useEffect(()=>{
    useNotificationStore.getState().setPermission(Notification.permission)
  }, [])
  if (isCheck) return <Spinner />;
  return (
    <main>
      {children}
    </main>
  )
}
