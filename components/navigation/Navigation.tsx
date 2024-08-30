"use client";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigationContext } from "@/lib";
import { MenuDrawer } from "./MenuDrawer";

const Navigation = () => {
  const { header } = useNavigationContext();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigationVariant = matchesMd ? "temporary" : "permanent";

  return (
    <Box display="flex" flexDirection="row" order={0} component="header">
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
      <MenuDrawer variant={navigationVariant} />
    </Box>
  );
};

export { Navigation };
