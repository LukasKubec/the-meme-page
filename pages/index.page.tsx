import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import { GetServerSideProps } from "next";
import { loadMemes, StaticImageWithAlt } from "@/programming memes";
import { useMeme, useSwipe } from "@/lib";
import { ContentGridContainer, BottomButtons, MemeImage } from "@/components";
import { useEffect } from "react";

interface HomeProps {
  memes: StaticImageWithAlt[];
}

export default function Home({ memes }: HomeProps) {
  const { meme, setRandomMeme } = useMeme<StaticImageWithAlt>({
    data: memes,
  });

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
      <ContentGridContainer>
        <Grid item xs={12}>
          <Button variant="contained" size="large" onClick={setRandomMeme}>
            Random meme!
          </Button>
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
      </ContentGridContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const memes = loadMemes();
  return {
    props: {
      memes,
    },
  };
};
