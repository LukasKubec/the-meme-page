import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import { GetStaticProps } from "next";
import { loadMemes, StaticImageWithAlt } from "@/programming memes";
import { useMeme, useNavigationContext, useSwipe } from "@/lib";
import { BottomButtons, MemeImage } from "@/components";
import { useEffect } from "react";
import {
  KeyboardAltOutlined,
  KeyboardArrowRightOutlined,
  SwipeOutlined,
} from "@mui/icons-material";

interface HomeProps {
  memes: StaticImageWithAlt[];
}

export default function Home({ memes }: HomeProps) {
  const { meme, setRandomMeme } = useMeme<StaticImageWithAlt>({
    data: memes,
  });

  useNavigationContext("Memes!");
  useSwipe({
    onSwipeRight: setRandomMeme,
    onSwipeLeft: setRandomMeme,
  });

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  const setRandomListener = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      setRandomMeme();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", setRandomListener);
  }, []);

  const onClickOpenMeme = () => {
    window.open(meme?.src, "_blank");
  };

  return (
    <>
      <Grid item xs={12}>
        <RandomButton onClick={setRandomMeme} label="Random meme!" />
      </Grid>
      <Grid item xs={12}>
        <MemeImage
          meme={meme}
          onClick={matchesSm ? onClickOpenMeme : undefined}
        />
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
