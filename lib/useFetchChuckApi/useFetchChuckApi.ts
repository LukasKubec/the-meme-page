"use client";
import { ChuckApiResponse } from "@/types";
import { fetcher } from "./fetchChuck";
import useSWR from "swr";
import DOMPurify from "dompurify";

interface UseFetchChuckApi {
  fact?: string;
  error: boolean;
  loading: boolean;
  setRandomFact: () => void;
}

const api = "https://api.chucknorris.io/jokes/random";

export const useFetchChuckApi = (): UseFetchChuckApi => {
  const { data, error, isLoading, mutate } = useSWR<ChuckApiResponse>(api, {
    fetcher,
  });

  const setRandomFact = () => mutate(data);
  const sanitized =
    typeof window !== "undefined" ? DOMPurify.sanitize(data?.value || "") : "";

  return {
    fact: sanitized,
    error: !!error,
    loading: isLoading,
    setRandomFact,
  };
};
