import apiClient from "@/services/api-client";
import { CanceledError, type AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

interface FetchingResponse<T>{
    count: number,
    next: string | null,
    results: T[]
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false)
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [isLoadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setData([]);
    
    apiClient
      .get<FetchingResponse<T>>(endpoint, {signal: controller.signal, ...requestConfig})
      .then((res) => {
        setData(res.data.results)
        setNextUrl(res.data.next);
        setLoading(false)
      })
      .catch((err) => {
        if(err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false)
      });

      return () => controller.abort()
  }, deps ? [...deps] : []);

  const loadMore = () => {
    if (!nextUrl) return;

    setLoadingMore(true);
    apiClient
      .get<FetchingResponse<T>>(nextUrl)
      .then((res) => {
        setData((prevData) => [...prevData, ...res.data.results]);
        setNextUrl(res.data.next);
        setLoadingMore(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoadingMore(false);
      });
  };

  return {data, error ,isLoading, loadMore, hasNextPage: !!nextUrl, isLoadingMore,}
}


export default useData