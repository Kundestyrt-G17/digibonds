import { useCallback, useEffect, useState } from 'react';

//https://medium.com/better-programming/learn-to-create-your-own-usefetch-react-hook-9cc31b038e53

const BASE_URL = 'http://localhost:5000/api';

//Fetches when called. Takes no body
export function useGetFetch<T>(
  url: string
): [T | undefined, () => any, string, boolean] {
  return useFetch(url, 'GET');
}

//Posts with a body. Returns the response. T is the type that is sent in and G is the type that will be returned
export function doPostFetch<T, G>(url: string, body: T): Promise<G> {
  return fetch(BASE_URL + url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<G>;
    })
    .then((data) => data)
    .catch((error: Error) => {
      throw error;
    });
}

//Put with a body.
export function usePutFetch<T>(
  url: string
): [(body: T) => any, string, boolean] {
  const [, doFetch, error, fetching] = useFetch(url, 'PUT');
  return [doFetch, error, fetching];
}

//Use id in url to delete correct element.
export function useDeleteFetch<T>(url: string): [() => any, string, boolean] {
  const [, doFetch, error, fetching] = useFetch(url, 'DELETE');
  return [doFetch, error, fetching];
}

//Use hook to get onMount. onMount is set to true.
export function useGetOnMountFetch<T>(
  url: string
): [T | undefined, () => any, string, boolean] {
  return useFetch(url, 'GET', true);
}

export function useFetch<T>(
  url: string,
  method: string,
  onMount?: boolean
): [T | undefined, (body?: T) => any, string, boolean] {
  const [response, setResponse] = useState<T>();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  const doFetch = useCallback(
    async (body?: T) => {
      setFetching(true);
      setError('');
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
        setResponse(json);
        if (res.status !== 200) {
          setError(res.statusText);
        }
        return json;
      } catch (e) {
        setError(e);
      } finally {
        setFetching(false);
      }
    },
    [url, method]
  );

  useEffect(() => {
    if (onMount) {
      doFetch();
    }
  }, [doFetch, onMount]);

  return [response, doFetch, error, fetching];
}
