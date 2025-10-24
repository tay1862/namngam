import { useState, useEffect } from 'react';

interface UseFetchOptions {
  enabled?: boolean;
}

export function useFetch<T>(
  url: string | null,
  options: UseFetchOptions = {}
) {
  const { enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url || !enabled) {
      setLoading(false);
      return;
    }

    let mounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(url, {
          signal: abortController.signal,
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();

        if (mounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (mounted && err.name !== 'AbortError') {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
          setError(errorMessage);
          console.error('Fetch error:', errorMessage);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
      abortController.abort();
    };
  }, [url, enabled]);

  const refetch = () => {
    if (url && enabled) {
      setLoading(true);
      setError(null);
    }
  };

  return { data, loading, error, refetch };
}
