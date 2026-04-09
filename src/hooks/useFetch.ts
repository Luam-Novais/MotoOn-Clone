import { NextResponse } from 'next/server';
import { useState, useEffect } from 'react';
export function useFetch(url: string, options: RequestInit) {
  const [response, setResponse] = useState<Promise<NextResponse> | null>(null);
  const [data, setData] = useState<any>(null);

  async function fetchData() {
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setResponse(response);
        setData(json);
      }
    } catch (error : any) {
        throw new Error(error.message)
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return {
    response,
    data,
  };
}
