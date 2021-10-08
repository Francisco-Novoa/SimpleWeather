import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import FlatButton from "../components/animated/FlatButton";
import { kelvin2Celcius, to2Digits, to12HourClock } from "../utils";
import { getIconUrl } from "../services/getIcon";

const styles = {
  cardStyle: {
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #FF71CE",
    width: "30%",
    margin: "0.25rem",
    marginBotton: "0.5rem",
    textAlign: "center",
    padding: "0.25rem",
    backgroundColor: "#120a19",
  },
  container: {
    border: "1px solid #01cdfe",
    padding: "0.5rem",
    paddingTop: "0.25rem",
  },
};

const HourForecast = ({ singleForecast }) => {
  return (
    <Grid container item sx={styles.cardStyle}>
      <Grid item>
        <Typography variant="subtitle2">
          {to2Digits(kelvin2Celcius(singleForecast.main.temp))}°
        </Typography>
      </Grid>
      <Grid item> {singleForecast.main.humidity}%</Grid>
      <Grid>
        <img alt="" src={getIconUrl(singleForecast.weather[0].icon)} />
      </Grid>
      <Grid>{to12HourClock(singleForecast.dt)}</Grid>
    </Grid>
  );
};

const initialForecast = 0;
const lastForecast = 3;

const ForecastContainer = ({ selectedCity }) => {
  const [localState, setBounds] = useState({
    list: [],
    left: initialForecast,
    right: lastForecast,
  });

  useEffect(() => {
    setBounds(prevState => ({
      ...prevState,
      list: selectedCity?.forecast?.list?.slice(initialForecast, lastForecast),
    }));
  }, [selectedCity]);

  const onClickPrev = () =>
    setBounds(prevState => ({
      left: prevState.left - 1,
      right: prevState.right - 1,
      list: selectedCity?.forecast?.list?.slice(
        prevState.left - 1,
        prevState.right - 1
      ),
    }));

  const onClickNext = () =>
    setBounds(prevState => ({
      right: prevState.right + 1,
      left: prevState.left + 1,
      list: selectedCity?.forecast?.list?.slice(
        prevState.left + 1,
        prevState.right + 1
      ),
    }));

  return (
    <Grid container item sx={styles.container}>
      <Grid item xs={12}>
        <Typography variant="h5">Next Hours</Typography>
      </Grid>
      <Grid item container justifyContent="center">
        {localState.list?.map(elem => {
          return <HourForecast singleForecast={elem} key={elem.dt} />;
        })}
      </Grid>
      <Grid item container xs={12} justifyContent="space-between">
        <FlatButton
          onClick={onClickPrev}
          disabled={localState.left === initialForecast}
        >
          previous
        </FlatButton>
        <FlatButton
          onClick={onClickNext}
          disabled={localState.right === selectedCity?.forecast?.list?.length}
        >
          next
        </FlatButton>
      </Grid>
    </Grid>
  );
};

export default function HoursForecast({ state }) {
  return (
    <Grid container>
      <ForecastContainer selectedCity={state?.selectedCity} />
    </Grid>
  );
}
