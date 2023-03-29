import {
  useKeyListener,
  useFetchChuckApi,
  useNavigationContext,
  useSwipe,
} from "@/lib";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { RandomButton } from "@/components";
import Link from "next/link";

const Chuck = () => {
  useNavigationContext("Chuck Facts!");

  const { error, fact, loading, setRandomFact } = useFetchChuckApi();

  useKeyListener({
    keyMap: {
      ArrowRight: setRandomFact,
    }
  });
  useSwipe({
    onSwipeRight: setRandomFact,
    onSwipeLeft: setRandomFact,
  });

  if (error) {
    return (
      <Grid item xs={12}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Chuck Norris API never fails, it's your visit that's wrong.
        </Alert>
      </Grid>
    );
  }

  return (
    <>
      <Grid item xs={12}>
        <RandomButton onClick={setRandomFact} label="Random Chuck fact!" />
      </Grid>

      <Grid item xs={12}>
        <Typography
          paddingTop={5}
          paddingLeft={1}
          paddingRight={1}
          textAlign="center"
        >
          {loading ? <CircularProgress color="secondary" /> : fact}
        </Typography>

        <Typography textAlign="center" paddingTop={5}>
          <Link href="https://api.chucknorris.io/" target="_blank">
            Powered by Chuck Norris Api.
          </Link>
        </Typography>
      </Grid>
    </>
  );
};

export default Chuck;
