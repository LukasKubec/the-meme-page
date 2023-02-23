import { useEffect, useState } from "react";

interface UseMemeProps<T> {
  data: T[];
}

interface UseMeme<T> {
  meme?: T;
  setRandomMeme: () => void;
  setPreviousMeme: () => void;
}

const useMeme = <T>({ data }: UseMemeProps<T>): UseMeme<T> => {
  const [meme, setMeme] = useState<T | undefined>(undefined);
  const visitedMemesStack: T[] = [];

  const setRandomMeme = () => {
    const randomMeme = data[Math.floor(Math.random() * data.length)];
    if (randomMeme === meme) {
      setRandomMeme();
      visitedMemesStack.push(randomMeme);
    } else {
      setMeme(randomMeme);
    }
  };

  const setPreviousMeme = () => {
    if(visitedMemesStack.length > 0) {
      const previousMeme = visitedMemesStack.pop();
      if(previousMeme) {
        setMeme(previousMeme);
      }
    }
  }

  useEffect(() => {
    if(!meme) {
      setRandomMeme();
    }
  }, [meme]);


  return { meme, setRandomMeme, setPreviousMeme };
};

export { useMeme };
