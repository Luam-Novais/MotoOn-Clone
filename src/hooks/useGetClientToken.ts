import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export function useGetClientToken() {
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (typeof window !== 'undefined') {
        setToken(localStorage.getItem('client_token'));
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return token;
}
