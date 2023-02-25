import {
  AppBar,
  Grid,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { OpenMenuButton } from "./OpenMenuButton";
import { useNavigationContext } from "@/lib";

const NavigationAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  boxShadow: "none",
  marginTop: theme.spacing(1),
}));

const Navigation = () => {
  const { header, openNavigation } = useNavigationContext();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <NavigationAppBar position="static" color="transparent">
      <Toolbar>
        <Grid
          container
          direction={matchesMd ? "row-reverse" : "row"}
          alignItems="center"
        >
          {matchesMd && (
            <Grid item xs={1}>
              <OpenMenuButton setIsOpen={openNavigation} />
            </Grid>
          )}
          <Grid item md={12} xs={11}>
            <Typography
              variant="h1"
              component="h1"
              align={matchesMd ? "left" : "center"}
              sx={{
                marginLeft: matchesMd ? 1 : 0,
              }}
            >
              {header}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </NavigationAppBar>
  );
};

export { Navigation };
