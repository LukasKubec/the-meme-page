import { Grid, Typography } from "@mui/material";
import { ContentGridContainer } from "../contentGridContainer";

const MainHeader = (): JSX.Element => {
  return (
    <ContentGridContainer>
      <Grid item xs={12}>
        <Typography variant="h1">Memes!</Typography>
      </Grid>
    </ContentGridContainer>
  );
};

export { MainHeader };
