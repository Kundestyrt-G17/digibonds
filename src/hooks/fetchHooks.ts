import { useEffect, useState } from 'react';

//https://medium.com/better-programming/learn-to-create-your-own-usefetch-react-hook-9cc31b038e53

const BASE_URL = 'https://localhost:5001/api';

export function useGetFetch<T>(
  url: string
): [T | undefined, () => void, string, boolean] {
  return useFetch(url, 'GET');
}

export function usePostFetch<T>(
  url: string
): [T | undefined, (body: T) => void, string, boolean] {
  return useFetch(url, 'POST');
}

export function usePutFetch<T>(
  url: string
): [T | undefined, (body: T) => void, string, boolean] {
  return useFetch(url, 'PUT');
}

export function useGetOnMountFetch<T>(
  url: string
): [T | undefined, () => void, string, boolean] {
  return useFetch(url, 'GET', true);
}

export function useFetch<T>(
  url: string,
  method: string,
  onMount?: boolean
): [T | undefined, (body?: T) => void, string, boolean] {
  const [response, setResponse] = useState<T>();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  const abortController = new AbortController();
  const signal = abortController.signal;

  const doFetch = async (body?: T) => {
    setFetching(true);
    try {
      const res = await fetch(BASE_URL + url, {
        method: method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!signal.aborted) {
        setResponse(json);
      }
      return res;
    } catch (e) {
      if (!signal.aborted) {
        setError(e);
      }
    } finally {
      if (!signal.aborted) {
        setFetching(false);
      }
    }
  };

  useEffect(() => {
    if (onMount) {
      doFetch();
    }
  }, [url]);

  return [response, doFetch, error, fetching];
}
