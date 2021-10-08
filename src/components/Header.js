import * as React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
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
    justifyContent: "flex-end",
    height: "100%",
  },
  search: {
    backgroundColor: "white",
    border: "2px solid",
    minWidth: "200px",
  },
};

export default function Header({ onChange, state, onNamedChange }) {
  return (
    <AppBar position="static" sx={styles.mainStyle}>
      <Toolbar sx={styles.toolbar}>
        <Typography variant="h5">Simple Weather</Typography>
        <Search
          sx={styles.search}
          cities={state.cities}
          onNamedChange={onNamedChange}
          onChange={onChange}
        />
      </Toolbar>
    </AppBar>
  );
}
