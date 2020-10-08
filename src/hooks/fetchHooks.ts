import { useCallback, useEffect, useState } from 'react';

//https://medium.com/better-programming/learn-to-create-your-own-usefetch-react-hook-9cc31b038e53

const BASE_URL = 'https://localhost:5001/api';

//Fetches when called. Takes no body
export function useGetFetch<T>(
  url: string
): [T | undefined, () => void, string, boolean] {
  return useFetch(url, 'GET');
}

//Posts with a body. Returns the response.
export function usePostFetch<T>(
  url: string
): [T | undefined, (body: T) => void, string, boolean] {
  return useFetch(url, 'POST');
}

//Put with a body.
export function usePutFetch<T>(
  url: string
): [ (body: T) => void, string, boolean] {
  const [, doFetch, error, fetching] =  useFetch(url, 'PUT');
  return [doFetch, error, fetching];
}

//Use id in url to delete correct element.
export function useDeleteFetch<T>(
  url: string
):  [() => void, string, boolean] {
  const [, doFetch, error, fetching] =  useFetch(url, 'DELETE');
  return [doFetch, error, fetching];}

//Use hook to get onMount. onMount is set to true.
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



  const doFetch = useCallback(async (body?: T) =>  {
    const abortController = new AbortController();
    const signal = abortController.signal;
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
        if(res.status !== 200){
          setError(res.statusText);
        }
      } catch (e) {
        if (!signal.aborted) {
          setError(e);
        }
      } finally {
        if (!signal.aborted) {
          setFetching(false);
        }
      }
  }, [url, method])

  useEffect(() => {
    if(onMount){
      doFetch();
    }
  }, [doFetch, onMount]);

  return [response, doFetch, error, fetching];
}





