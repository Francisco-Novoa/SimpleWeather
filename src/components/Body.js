import React from "react";

import { Grid } from "@mui/material";

const styles = {
  mainStyle: {
    backgroundColor: "background.black",
    border: 0,
    height: "90vh",
    width: "100%",
    color: "primary.light",
    padding: "0.3vh 0 0.5vh",
  },
};

export default function Body({ children }) {
  return (
    <Grid container sx={styles.mainStyle}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        {children}
      </Grid>
      <Grid item xs={1}></Grid>{" "}
    </Grid>
  );
}
