import * as React from "react";
import { Paper, Grid, Typography } from "@mui/material";
import Search from "./Search";
const styles = {
  header: {
    height: "100%",
  },
  container: {
    bgcolor: "#fe5800",
  },
  toolbar: {
    height: "100%",
    justifyContent: "space-between",
  },
  search: {
    minWidth: "235px",
    backgroundColor: "#fff",
  },
};

export default function Header({ onChange, state, onSearch, sx }) {
  return (
    <Paper sx={{ ...sx, ...styles.container }} elevation={0} component="header">
      <Grid container sx={styles.header} fluid>
        <Grid item xs={2}></Grid>
        <Grid item container fluid xs={6} sx={styles.toolbar}>
          <Grid
            sx={{
              marginLeft: "0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontFamily: "Roboto Slab", fontWeight: "500" }}
              variant="h5"
            >
              SIMPLE WEATHER APPLICATION
            </Typography>
          </Grid>
          <Grid
            sx={{
              marginRight: "-65px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search
              sx={styles.search}
              cities={state.cities}
              onSearch={onSearch}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
