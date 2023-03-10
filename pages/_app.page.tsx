import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@/styles/globals.css";
import { darkTheme } from "@/lib";
import {
  ContentGridContainer,
  Navigation,
  NavigationProvider,
  MenuDrawer,
  LoadingPage,
} from "@/components";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Memes - the best you can find</title>
      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NavigationProvider>
          <MenuDrawer />
          <ContentGridContainer>
            <Navigation />
            <LoadingPage>
              <Component {...pageProps} />
              <Analytics />
            </LoadingPage>
          </ContentGridContainer>
        </NavigationProvider>
      </ThemeProvider>
    </>
  );
}
