import { Spinner } from '@/src/components/spinner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HttpRequestBuilder } from '../../utils/httpRequestBuilder';

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
       },
     } as RequestInit);
     if (!response.ok) {
       router.push('/login');
       return;
     }
     setIsCheck(false);
   } catch (error) {
    alert('Ocorreu um erro em nosso servidor.')
    router.push('/login');
    return;
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

  if (isCheck) return <Spinner />;
  return <main>{children}</main>;
}
