import { useEffect, useState } from "react";

interface UseMemeProps<T> {
  data: T[];
}

interface UseMeme<T> {
  meme?: T;
  setRandomMeme: () => void;
  loading: boolean;
}

const useMeme = <T>({ data }: UseMemeProps<T>): UseMeme<T> => {
  const [meme, setMeme] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const setRandomMeme = () => {
    setLoading(true);
    const randomMeme = data[Math.floor(Math.random() * data.length)];
    if (randomMeme === meme) {
      setRandomMeme();
    } else {
      setMeme(randomMeme);
    }
    setLoading(false);
  };

  useEffect(() => {
    if(!meme) {
      setRandomMeme();
    }
  }, [meme]);


  return { meme, setRandomMeme, loading };
};

export { useMeme };
