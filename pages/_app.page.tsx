import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@/styles/globals.css";
import { darkTheme } from "@/lib";
import { Navigation, NavigationProvider, LoadingPage } from "@/components";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Memes - the best you can find</title>
      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NavigationProvider>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            alignContent="center"
            justifyContent="space-between"
            gap={3}
          >
            <Navigation />
            <LoadingPage>
              <Component {...pageProps} />
              <Analytics />
            </LoadingPage>
          </Box>
        </NavigationProvider>
      </ThemeProvider>
    </>
  );
}
