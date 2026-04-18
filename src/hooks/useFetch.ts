import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
export function useFetch<T = unknown>(url: string, options: RequestInit) {
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const router = useRouter();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      if (response.status === 401) {
        router.push('/login');
        return;
      }
      if (response.ok) {
        setResponse(response);
        setData(json);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    let isMounted = true;
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);
  return {
    response,
    data,
    loading,
    error,
  };
}
