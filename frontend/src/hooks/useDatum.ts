import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useDatum = <T>(endpoint: string, deps?: any[]) => {
  const [datum, setDatum] = useState<T>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    
    apiClient
      .get<T>(endpoint, {signal: controller.signal})
      .then((res) => {
        setDatum(res.data)
        setLoading(false)
      })
      .catch((err) => {
        if(err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false)
      });

      return () => controller.abort()
  }, deps ? [...deps] : []);

  return {datum, error ,isLoading}
}

export default useDatum