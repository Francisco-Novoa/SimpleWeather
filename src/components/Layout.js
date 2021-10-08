import React, { useState } from "react";
import { Grid } from "@mui/material";

import Header from "./Header";
import Body from "./Body";

const styles = {
  mainStyle: {},
};

export default function ({
  children,
  state,
  setState,
  onChange,
  onNamedChange,
}) {
  return (
    <React.Fragment>
      <Grid container direction="column" sx={styles.mainStyle}>
        <Header
          state={state}
          setState={setState}
          onChange={onChange}
          onNamedChange={onNamedChange}
        />
        <Body state={state} setState={setState}>
          {children}
        </Body>
      </Grid>
    </React.Fragment>
  );
}
