import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export function useGetToken() {
  const [token, setToken] = useState<string | null>();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('access_token'));
    }
  }, []);

  return token;
}
