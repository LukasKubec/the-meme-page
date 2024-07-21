import {
  useFetchChuckApi,
  useKeyListener,
  useNavigationContext,
  useSwipe,
} from "@/lib";
import { Alert, AlertTitle, CircularProgress, Typography } from "@mui/material";
import { RandomButton } from "@/components";
import Link from "next/link";

const Chuck = () => {
  useNavigationContext("Chuck Facts!");

  const { error, fact, loading, setRandomFact } = useFetchChuckApi();

  useKeyListener({
    keyMap: {
      ArrowRight: setRandomFact,
    },
  });
  useSwipe({
    onSwipeRight: setRandomFact,
    onSwipeLeft: setRandomFact,
  });

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Chuck Norris API never fails, it's your visit that's wrong.
      </Alert>
    );
  }

  return (
    <>
      <Typography textAlign="center">
        {loading ? <CircularProgress color="secondary" /> : fact}
      </Typography>
      <RandomButton onClick={setRandomFact} label="Random Chuck fact!" />
      <Typography textAlign="center" paddingTop={5}>
        <Link href="https://api.chucknorris.io/" target="_blank">
          Powered by Chuck Norris Api.
        </Link>
      </Typography>
    </>
  );
};

export default Chuck;
