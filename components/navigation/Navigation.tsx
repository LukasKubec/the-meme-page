import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  CloseOutlined,
  MenuTwoTone,
} from "@mui/icons-material";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container direction="row" alignItems="center">
          <Grid item md={12} xs={11}>
            <Typography variant="h1" component="h1">
              Memes!
            </Typography>
          </Grid>
          {matchesMd && (
            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                edge="end"
                color="secondary"
                aria-label="open drawer"
                onClick={() => setIsOpen(true)}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <MenuTwoTone />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Toolbar>

      <Drawer
        anchor="right"
        variant={matchesMd ? "persistent" : "permanent"}
        open={isOpen} //if open is true, drawer is shown
        onClose={() => (isOpen ? setIsOpen(false) : undefined)}
      >
        <Box>
          {matchesMd && (
            <>
              <IconButton sx={{ mb: 2 }} onClick={() => setIsOpen(false)}>
                <CloseOutlined />
              </IconButton>
              <Divider sx={{ mb: 2 }} />
            </>
          )}
          <Box>

          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export { Navigation };
