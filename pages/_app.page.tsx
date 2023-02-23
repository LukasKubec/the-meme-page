import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  Container,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@/styles/globals.css";
import { darkTheme } from "@/lib";
import { MainHeader } from "@/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <MainHeader />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  );
}
