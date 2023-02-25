import {
  AppBar,
  Box,
  Drawer,
  Grid,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { MenuDivider } from "./MenuDivider";
import { CloseButton } from "./CloseButton";
import { OpenMenuButton } from "./OpenMenuButton";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Grid container direction="row" alignItems="center">
          <Grid item md={12} xs={11}>
            <Typography variant="h1" component="h1" align={matchesMd ? "left" : "center"}>
              Memes!
            </Typography>
          </Grid>
          {matchesMd && (
            <Grid item xs={1}>
              <OpenMenuButton setIsOpen={handleOpen} />
            </Grid>
          )}
        </Grid>
      </Toolbar>

      <Drawer
        anchor="right"
        variant={matchesMd ? "temporary" : "permanent"}
        open={isOpen}
        onClose={() => (isOpen ? handleClose() : undefined)}
      >
        <Box>
          {matchesMd && (
            <>
              <CloseButton onClick={handleClose} />
              <MenuDivider />
            </>
          )}
          <Box></Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export { Navigation };
