import { ChuckApiResponse } from "@/types";
import { fetcher } from "./fetchChuck";
import useSWR from "swr";

interface UseFetchChuckApi {
  fact?: string;
  error: boolean;
  loading: boolean;
  setRandomFact: () => void;
}

export const useFetchChuckApi = (): UseFetchChuckApi => {
  const { data, error, isLoading, mutate } = useSWR<ChuckApiResponse>("https://api.chucknorris.io/jokes/random", fetcher);

  const setRandomFact = () => mutate(data);

  return {
    fact: data?.value,
    error: !!error,
    loading: isLoading,
    setRandomFact,
  };
};
