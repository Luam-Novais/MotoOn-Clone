'use client'
import { Spinner } from '@/src/components/spinner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HttpRequestBuilder } from '../../utils/httpRequestBuilder';
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
       router.push('/login');
       return;
     }
     setIsCheck(false);
   } catch (error) {
    router.push('/login');
    return;
   }
  }
  async function registerSW() {
    if (!('serviceWorker' in navigator)) {
      console.log('SW não suportado');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');

      console.log('SW registrado', registration);
    } catch (error) {
      console.error('Erro ao registrar SW', error);
    }
  }
  useEffect(() => {
    const tokenLocal = localStorage.getItem('access_token');
    if (!tokenLocal) {
      router.push('login');
      return;
    }
    fetchMe(tokenLocal);
  }, []);
  useEffect(()=>{
    registerSW()
    useNotificationStore.getState().setPermission(Notification.permission)
  }, [])
  if (isCheck) return <Spinner />;
  return (
    <main>
      {children}
    </main>
  )
}
