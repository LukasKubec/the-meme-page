import { ReactNode } from "react";
import { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { darkTheme } from "../lib";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Navigation, NavigationProvider } from "../components";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Memes - the best you can find",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <body>
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
                {children}
                <Analytics />
              </Box>
            </NavigationProvider>
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
