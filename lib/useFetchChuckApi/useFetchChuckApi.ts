"use client";
import { ChuckApiResponse } from "@/types";
import { fetcher } from "./fetchChuck";
import useSWR from "swr";

interface UseFetchChuckApi {
  fact?: string;
  error: boolean;
  loading: boolean;
  setRandomFact: () => void;
}

const api = "https://api.chucknorris.io/jokes/random";

export const useFetchChuckApi = (): UseFetchChuckApi => {
  const { data, error, isLoading, mutate } = useSWR<ChuckApiResponse>(api, fetcher);

  const setRandomFact = () => mutate(data);

  return {
    fact: data?.value,
    error: !!error,
    loading: isLoading,
    setRandomFact,
  };
};
