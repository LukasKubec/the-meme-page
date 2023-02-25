import { isChuckApiResponse } from "@/types";

export const fetchChuck = async () => {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const json = await response.json();

    if (!isChuckApiResponse(json)) {
      throw new Error("Chuck API response is invalid");
    }

    return json;
  } catch (error) {
    throw error;
  }
};
