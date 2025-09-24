// utils/hooks.ts
import { useState, useEffect, useCallback } from "react";
import { Call } from "./config";

// Result type returned by the hook
type UseFetchResult<T> = {
  data: T;
  status: number | undefined;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

type MethodTypes = "GET" | "POST" | "PUT" | "DELETE";

// Simple in-memory cache shared across all hook usages
const fetchCache = new Map<string, any>();

export function useFetch<T>(
  url: string,
  method: MethodTypes = "GET",
  sendData: Record<string, any> | null = null,
  useCache: boolean = true // option to enable/disable cache
): UseFetchResult<T> {
  const [data, setData] = useState<T>({} as T);
  const [status, setStatus] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Cache key is based on method + url + data
  const cacheKey = `${method}:${url}:${sendData ? JSON.stringify(sendData) : ""}`;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1) Try to return data from cache if enabled
      if (useCache && fetchCache.has(cacheKey)) {
        setData(fetchCache.get(cacheKey));
        setLoading(false);
        return;
      }

      // 2) Build full URL
      let fullUrl = Call.urlTo(url);
      let fetchOptions: RequestInit = {
        method,
        credentials: "include",
        cache: "no-store", // skip browser HTTP cache
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Add query params for GET requests
      if (method === "GET" && sendData && Object.keys(sendData).length > 0) {
        const queryParams = new URLSearchParams(sendData as Record<string, string>).toString();
        fullUrl += (fullUrl.includes("?") ? "&" : "?") + queryParams;
      }
      // Add body for POST, PUT, DELETE requests
      else if (["POST", "PUT", "DELETE"].includes(method) && sendData) {
        fetchOptions.body = JSON.stringify(sendData);
      }

      // 3) Make the request
      const res = await fetch(fullUrl, fetchOptions);
      
      setStatus(res.status)

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText} ${text ? "- " + text : ""}`);
      }



      const json = (await res.json()) as T;

      // 4) Save result into cache
      if (useCache) {
        fetchCache.set(cacheKey, json);
      }

      setData(json);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [url, method, sendData, useCache]);

  // Fetch data when hook is mounted or dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData, status };
}
