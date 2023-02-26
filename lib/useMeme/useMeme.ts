import { useEffect, useState } from "react";

interface UseMemeProps<T, V> {
  data: T[];
  visitedPredicate?: (item: T, visited: V[]) => boolean;
  visitedMapper?: (item: T) => V;
}

interface UseMeme<T> {
  meme?: T;
  setRandomMeme: () => void;
  loading: boolean;
}

const useMeme = <T, V>({
  data,
  visitedPredicate,
  visitedMapper,
}: UseMemeProps<T, V>): UseMeme<T> => {
  const [meme, setMeme] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [visited, setVisited] = useState<V[]>([]);

  const setRandomMeme = () => {
    setLoading(true);
    if (visitedPredicate && data.every((meme) => visitedPredicate(meme, visited))) {
      setVisited([]);
    }

    const randomMeme = data[Math.floor(Math.random() * data.length)];
    if (
      randomMeme === meme ||
      (visitedPredicate && visitedPredicate(randomMeme, visited))
    ) {
      setRandomMeme();
    } else {
      if (visitedMapper) {
        setVisited([...visited, visitedMapper(randomMeme)]);
      }
      setMeme(randomMeme);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!meme) {
      setRandomMeme();
    }
  }, [meme]);

  return { meme, setRandomMeme, loading };
};

export { useMeme };
