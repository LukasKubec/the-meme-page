import { useEffect, useState } from "react";
import { ChuckApiResponse } from "@/types";
import { fetchChuck } from "./fetchChuck";

interface UseFetchChuckApiParams {
  initialFact?: ChuckApiResponse;
  initialApiError?: boolean;
}

interface UseFetchChuckApi {
  fact?: string;
  error: boolean;
  loading: boolean;
  setRandomFact: () => void;
}

export const useFetchChuckApi = ({
  initialFact,
  initialApiError,
}: UseFetchChuckApiParams): UseFetchChuckApi => {
  const [fact, setFact] = useState<string | undefined>(
    initialFact?.value || undefined
  );
  const [error, setError] = useState<boolean>(!!initialApiError);
  const [loading, setLoading] = useState<boolean>(false);

  const setRandomFact = () => setFact(undefined);

  useEffect(() => {
    if (!fact && !error) {
      (async () => {
        try {
          setLoading(true);
          const response = await fetchChuck();
          setFact(response.value);
        } catch (error) {
          console.error(error);
          setError(true);
          setFact(undefined);
        } finally {
          setLoading(false);
        }
      })();
    }
    return () => setLoading(false);
  }, [fact, error]);

  return { fact, error, loading, setRandomFact };
};
