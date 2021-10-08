import * as React from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import Search from "./Search";
const styles = {
  mainStyle: {
    backgroundColor: "background.light",
    border: 0,
    borderBottom: "4px ridge",
    borderColor: "details",
    height: "10vh",
    color: "primary.light",
    padding: "2vh 2vw ",
  },
  toolbar: {
    justifyContent: "space-between",
    height: "100%",
  },
  search: {
    backgroundColor: "white",
    borderRadius: "10px",
    border: "2px solid",
    minWidth: "200px",
    marginBottom: "16px",
  },
};

export default function Header({ onChange, state, onNamedChange }) {
  return (
    <AppBar position="static" sx={styles.mainStyle}>
      <Toolbar sx={styles.toolbar}>
        <Grid container justifyContent="center">
          <Grid
            xs={11}
            item
            container
            sx={{
              justifyContent: "space-between",
              padding: "0 34px 0 ",
            }}
          >
            <Grid item>
              <Typography variant="h4">Simple Weather</Typography>
            </Grid>
            <Grid item>
              <Search
                sx={styles.search}
                cities={state.cities}
                onNamedChange={onNamedChange}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
