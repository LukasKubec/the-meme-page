"use client";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { OpenMenuButton } from "./OpenMenuButton";
import { useNavigationContext } from "@/lib";
import { MenuDrawer } from "./MenuDrawer";

const Navigation = () => {
  const { header, openNavigation } = useNavigationContext();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box display="flex" flexDirection="row" order={0}>
      <Typography
        variant="h1"
        component="h1"
        align="center"
        sx={{
          display: "flex",
        }}
      >
        {header}
      </Typography>
      {matchesMd && <OpenMenuButton setIsOpen={openNavigation} />}
      <MenuDrawer />
    </Box>
  );
};

export { Navigation };
