import React, { ReactNode } from "react";
import { Grid } from "@mui/material";

type ContentGridContainerProps = {
  children: ReactNode;
};

const ContentGridContainer: React.FC<ContentGridContainerProps> = ({
  children,
}) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      {children}
    </Grid>
  );
};

export { ContentGridContainer };
