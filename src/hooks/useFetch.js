import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook for GET requests.
 * Returns: { data, loading, error, refetch }
 */
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNow = useCallback(async () => {
    try {
      setError("");
      setLoading(true);

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchNow();
  }, [fetchNow]);

  return { data, loading, error, refetch: fetchNow };
}