import { isChuckApiResponse } from "@/types";

export const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  const json = await res.json();
  if(!isChuckApiResponse(json)) {
    throw new Error('Not a ChuckApiResponse');
  }
  return json;
};
