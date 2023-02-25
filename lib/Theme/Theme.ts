import { createTheme, responsiveFontSizes } from "@mui/material";

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#913175",
      },
      secondary: {
        main: "#CD5888",
      },
    },
  })
);
