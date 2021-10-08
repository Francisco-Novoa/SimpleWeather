import React from "react";
import { Grid, Typography } from "@mui/material";

import { weekdayMonthDay, kelvin2Celcius, to2Digits } from "../utils";
import { getIconUrl } from "../services/getIcon";

const styles = {
  cardStyle: {
    margin: "0.35rem",
    height: "4.8rem",
    border: "1px solid #FF71CE",
    padding: "0.25rem",
    alignItems: "center",
    backgroundColor: "#120a19",
  },
  container: {
    marginTop: "0.45rem",
    border: "1px solid #01cdfe",
    padding: "0.5rem",
  },
};

const DayForecast = ({ singleForecast }) => {
  return (
    <Grid sx={styles.cardStyle} container item>
      <Grid
        item
        container
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={getIconUrl(singleForecast.weather[0].icon)} />
      </Grid>
      <Grid container xs={6} item flexDirection="column">
        <Grid item textAlign="center">
          <Typography variant="h6">
            {weekdayMonthDay(singleForecast.dt)}
          </Typography>
        </Grid>
        <Grid item textAlign="center" color="#FF71CE">
          {singleForecast.weather[0].description}
        </Grid>
      </Grid>
      <Grid xs={3} item textAlign="center">
        {to2Digits(kelvin2Celcius(singleForecast.main.temp))}°
      </Grid>
    </Grid>
  );
};

//this numers are the indexes that are each 24 hours in the future in the forecast
const relevantPositionsInArray = [7, 15, 23, 31, 39];

const ForecastContainer = ({ selectedCity }) => {
  const forecastList = selectedCity?.forecast?.list;
  const relevantForecasts =
    forecastList?.length &&
    relevantPositionsInArray.map(index => forecastList[index]);
  return (
    <Grid sx={styles.container} container item justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h5">Next Five Days</Typography>
      </Grid>
      <Grid
        item
        container
        flexDirection="column"
        xs={10}
        justifyContent="space-evenly"
      >
        {relevantForecasts?.map(elem => {
          return <DayForecast singleForecast={elem} key={elem.dt} />;
        })}
      </Grid>
    </Grid>
  );
};

export default function DaysForecast({ state }) {
  return (
    <Grid container>
      <ForecastContainer selectedCity={state?.selectedCity} />
    </Grid>
  );
}
