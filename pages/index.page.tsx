import {
  Box,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GetStaticProps } from "next";
import { loadMemes, StaticImageWithAlt } from "@/programming memes";
import { useKeyListener, useMeme, useNavigationContext, useSwipe } from "@/lib";
import { BottomButtons, MemeImage, RandomButton } from "@/components";

interface HomeProps {
  memes: StaticImageWithAlt[];
}

const mapMemeToAlt = (meme: StaticImageWithAlt) => meme.alt;
const visitedMemePredicate = (meme: StaticImageWithAlt, visited: string[]) =>
  visited.includes(meme.alt);

export default function Home({ memes }: HomeProps) {
  const { meme, setRandomMeme, loading } = useMeme<StaticImageWithAlt, string>({
    data: memes,
    visitedMapper: mapMemeToAlt,
    visitedPredicate: visitedMemePredicate,
  });

  useNavigationContext("Memes!");
  useSwipe({
    onSwipeRight: setRandomMeme,
    onSwipeLeft: setRandomMeme,
  });
  useKeyListener({
    keyMap: {
      ArrowRight: setRandomMeme,
    },
  });

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box order={matchesSm ? 1 : 2}>
        {loading ? (
          <CircularProgress
            color="secondary"
          />
        ) : (
          <MemeImage meme={meme} onClick={setRandomMeme} />
        )}
      </Box>
      {meme && <BottomButtons meme={meme} setRandomMeme={setRandomMeme} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const memes = loadMemes();
  return {
    props: {
      memes,
    },
  };
};
