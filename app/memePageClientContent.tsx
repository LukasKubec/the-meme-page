"use client";
import { StaticImageWithAlt } from "../programming memes";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { BottomButtons, MemeImage } from "../components";
import {
  useKeyListener,
  useMeme,
  useNavigationContext,
  useSwipe,
} from "../lib";

const mapMemeToAlt = (meme: StaticImageWithAlt) => meme.alt;
const visitedMemePredicate = (meme: StaticImageWithAlt, visited: string[]) =>
  visited.includes(meme.alt);

interface Props {
  memes: StaticImageWithAlt[];
}

export const MemePageClientContent = (props: Props) => {
  const { meme, setRandomMeme, loading } = useMeme<StaticImageWithAlt, string>({
    data: props.memes,
    visitedMapper: mapMemeToAlt,
    visitedPredicate: visitedMemePredicate,
  });

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

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
  return (
    <>
      <Box order={matchesSm ? 1 : 2} component="main">
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <MemeImage meme={meme} onClick={setRandomMeme} />
        )}
      </Box>
      {meme && (
        <BottomButtons meme={meme} setRandomMeme={setRandomMeme} />
      )}
    </>
  );
};
