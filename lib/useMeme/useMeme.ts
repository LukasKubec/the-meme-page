import {useEffect, useRef, useState} from "react";

type VisitedPredicate<T, V> = (item: T, visited: V[]) => boolean;
type VisitedMapper<T, V> = (item: T) => V;

interface UseMemeProps<T, V> {
  data: T[];
  visitedPredicate?: VisitedPredicate<T, V>;
  visitedMapper?: VisitedMapper<T, V>;
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
  const isMounted = useRef(true);

  const setRandomMeme = async () => {
    if (
        visitedPredicate &&
        data.every((meme) => visitedPredicate(meme, visited))
    ) {
      setVisited([]);
    }

    const randomMeme = data[Math.floor(Math.random() * data.length)];
    if (
        randomMeme === meme ||
        (visitedPredicate && visitedPredicate(randomMeme, visited))
    ) {
      setLoading(true);
      await setRandomMeme();
      setLoading(false);
    } else {
      if (visitedMapper) {
        setVisited([...visited, visitedMapper(randomMeme)]);
      }
      if (isMounted.current) {
        setMeme(randomMeme);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    if (!meme) {
      void setRandomMeme();
    }
    return () => {
      isMounted.current = false;
    };
  }, [meme]);

  return { meme, setRandomMeme, loading };
};

export { useMeme };
