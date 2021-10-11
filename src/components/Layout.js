import React from "react";
import { Grid } from "@mui/material";
import { Helmet } from "react-helmet";

import Header from "./Header";
import Body from "./Body";

const styles = {
  mainStyle: {
    backgroundColor: "background.light",
    display: "grid",
    gap: 2,
    gridTemplateColumns: "repeat(12, 1fr)",
    gridTemplateRows: "repeat(3, 100px)",
  },
};

export default function Layout({
  children,
  state,
  setState,
  onChange,
  onSearch,
}) {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>Simple Weather App</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Grid id="layout" container direction="column" sx={styles.mainStyle}>
        <Header
          id="header"
          sx={{ gridColumn: "1/-1", gridRow: "1" }}
          state={state}
          onChange={onChange}
          onSearch={onSearch}
        />
        <Body sx={{ gridColumn: "3/10", gridRow: "2/max-content" }}>
          {children}
        </Body>
      </Grid>
    </React.Fragment>
  );
}
