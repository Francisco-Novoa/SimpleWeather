import React, { useEffect, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import {
  Grid,
  Typography,
  Card,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";

import { kelvin2Celcius, to2Digits, to12HourClock } from "../../utils";
import { getIconUrl } from "../../services/getIcon";

const HourForecast = ({ singleForecast }) => {
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState(singleForecast);

  useEffect(() => {
    setLoading(true);
    setForecast(singleForecast);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [singleForecast]);

  return (
    <Card
      variant="outlined"
      sx={{
        padding: "8px",
        height: "100%",
      }}
    >
      {!loading ? (
        <Grid
          containter
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
          }}
        >
          <Grid item>
            <Typography sx={{ color: "#358eac" }} variant="subtitle2">
              humidity&nbsp;{forecast.main.humidity}%
            </Typography>
          </Grid>
          <Grid item container sx={{ justifyContent: "center" }}>
            <Grid item sx={{ color: "#fe5800" }}>
              <Typography variant="h4">
                {to2Digits(kelvin2Celcius(forecast.main.temp))}°C
              </Typography>
            </Grid>
            <Grid item sx={{ alignContent: "center" }}>
              <img alt="" src={getIconUrl(forecast.weather[0].icon)} />
            </Grid>
          </Grid>
          <Grid item sx={{ textAlign: "center", justifyContent: "center" }}>
            <Typography sx={{ color: "#878787" }}>
              {to12HourClock(forecast.dt)}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <CircularProgress
            variant="indeterminate"
            sx={{
              color: "#fe5800",
            }}
          />
        </Grid>
      )}
    </Card>
  );
};

const initialForecast = 0;
const lastForecast = 3;

const ForecastContainer = ({ selectedCity, loading }) => {
  const [localState, setBounds] = useState({
    list: [],
    left: initialForecast,
    right: lastForecast,
  });

  useEffect(() => {
    setBounds(prevState => ({
      ...prevState,
      list: selectedCity?.forecast?.list?.slice(initialForecast, lastForecast),
      left: initialForecast,
      right: lastForecast,
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
    <Grid
      sx={{
        height: "100%",
        width: "100%",
        padding: "16px",
        display: "grid",
        gap: 1,
        gridTemplateColumns: "repeat(11, 1fr)",
        gridTemplateRows: "repeat(8, 12.5%)",
      }}
    >
      <Grid sx={{ gridColumn: "1/-1", gridRow: "1" }}>
        <Typography sx={{ marginBottom: "16px" }} variant="h5">
          Next Hours
        </Typography>
        <Divider />
      </Grid>

      <Grid sx={{ gridColumn: "1", gridRow: "3/7" }}>
        <Button
          onClick={onClickPrev}
          disabled={localState.left === 0}
          variant="outlined"
          sx={{
            minWidth: "100%",
            minHeight: "100%",
            color: "#878787",
            borderColor: "#878787",
            "&:hover": { borderColor: "#878787" },
          }}
        >
          <BiLeftArrow />
        </Button>
      </Grid>

      {loading ? (
        localState.list?.map((elem, index) => {
          const one = "2/5";
          const two = "5/8";
          const three = "8/11";
          return (
            <Grid
              sx={{
                gridColumn: `${index === 0 ? one : index === 1 ? two : three}`,
                gridRow: "3/7",
              }}
            >
              <HourForecast
                index={index}
                singleForecast={elem}
                loading={loading}
                key={elem.dt}
              />
            </Grid>
          );
        })
      ) : (
        <CircularProgress color="secondary" />
      )}

      <Grid sx={{ gridColumn: "11", gridRow: "3/7" }}>
        <Button
          onClick={onClickNext}
          variant="outlined"
          disabled={
            localState.right ===
            selectedCity?.forecast?.list?.length - lastForecast
          }
          sx={{
            minWidth: "100%",
            minHeight: "100%",
            borderColor: "#878787",
            "&:hover": { borderColor: "#878787" },
          }}
          disableRipple
        >
          <BiRightArrow style={{ color: "#878787" }} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default function HoursForecast({ state, sx }) {
  return (
    <Card sx={sx}>
      <ForecastContainer
        selectedCity={state?.selectedCity}
        loading={state.loading}
      />
    </Card>
  );
}
