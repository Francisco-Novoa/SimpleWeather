import React, { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress } from "@mui/material";

import FlatButton from "../components/animated/FlatButton";
import { kelvin2Celcius, to2Digits, to12HourClock } from "../utils";
import { getIconUrl } from "../services/getIcon";

const styles = {
  cardStyle: {
    height: "15vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #FF71CE",
    width: "30%",
    margin: "0.25rem",
    marginRight: "8px",
    textAlign: "center",
    padding: "0.25rem",
    backgroundColor: "#120a19",
  },
  container: {
    height: "28vh",
    border: "1px solid #01cdfe",
    justifyContent: "center",
    padding: "20px",
    paddingTop: "15px",
  },
  buttonBox: {
    marginTop: "8px",
    justifyContent: "space-between",
  },
};

const HourForecast = ({ singleForecast }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [singleForecast]);
  return (
    <Grid container item sx={styles.cardStyle}>
      {!loading ? (
        <>
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
        </>
      ) : (
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      )}
    </Grid>
  );
};

const initialForecast = 0;
const lastForecast = 3;

const ForecastContainer = ({ selectedCity, loading }) => {
  const [localState, setBounds] = useState({
    loading,
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
        <Typography variant="h5" sx={{ paddingBottom: "5px" }}>
          Next Hours
        </Typography>
      </Grid>
      <Grid item container xs={11} justifyContent="center">
        {loading ? (
          localState.list?.map(elem => {
            return (
              <HourForecast
                singleForecast={elem}
                loading={loading}
                key={elem.dt}
              />
            );
          })
        ) : (
          <CircularProgress color="secondary" />
        )}
      </Grid>

      <Grid item container sx={styles.buttonBox} xs={12}>
        <FlatButton
          onClick={onClickPrev}
          sx={{ borderColor: "#05ffa1", color: "#05ffa1" }}
          whileHover={{
            scale: 1.1,
            color: "#05ffa1",
            borderColor: "#05ffa1",
            transition: { duration: 0.1 },
          }}
          disabled={localState.left === initialForecast}
        >
          previous
        </FlatButton>
        <FlatButton
          onClick={onClickNext}
          sx={{ borderColor: "#05ffa1", color: "#05ffa1" }}
          whileHover={{
            scale: 1.1,
            color: "#05ffa1",
            borderColor: "#05ffa1",
            transition: { duration: 0.1 },
          }}
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
      <ForecastContainer
        selectedCity={state?.selectedCity}
        loading={state.loading}
      />
    </Grid>
  );
}
