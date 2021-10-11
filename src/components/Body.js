import React from "react";

import { Grid } from "@mui/material";

const styles = {
  mainStyle: {
    backgroundColor: "background.light",
    color: "primary.light",
  },
};

export default function Body({ children, sx }) {
  return (
    <Grid container component="main" sx={{ ...sx, ...styles.mainStyle }}>
      {children}
    </Grid>
  );
}
