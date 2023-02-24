import { useEffect, useState } from "react";

interface UseMemeProps<T> {
  data: T[];
}

interface UseMeme<T> {
  meme?: T;
  setRandomMeme: () => void;
}

const useMeme = <T>({ data }: UseMemeProps<T>): UseMeme<T> => {
  const [meme, setMeme] = useState<T | undefined>(undefined);

  const setRandomMeme = () => {
    const randomMeme = data[Math.floor(Math.random() * data.length)];
    if (randomMeme === meme) {
      setRandomMeme();
    } else {
      setMeme(randomMeme);
    }
  };

  useEffect(() => {
    if(!meme) {
      setRandomMeme();
    }
  }, [meme]);


  return { meme, setRandomMeme };
};

export { useMeme };
