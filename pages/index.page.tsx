import { CircularProgress, Grid, useMediaQuery, useTheme } from "@mui/material";
import { GetStaticProps } from "next";
import { loadMemes, StaticImageWithAlt } from "@/programming memes";
import {
  useKeyListener,
  useMeme,
  useNavigationContext,
  useSwipe,
} from "@/lib";
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
    }
  });

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  const onClickOpenMeme = () => {
    window.open(meme?.src, "_blank");
  };

  return (
    <>
      <Grid item xs={12}>
        <RandomButton onClick={setRandomMeme} label="Random meme!" />
      </Grid>
      <Grid item xs={12}>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <MemeImage
            meme={meme}
            onClick={matchesSm ? onClickOpenMeme : undefined}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <BottomButtons meme={meme} />
      </Grid>
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
