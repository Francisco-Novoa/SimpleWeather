import React, { useEffect, useState } from "react";
import { WiStrongWind } from "react-icons/wi";
import {
  Grid,
  Typography,
  CircularProgress,
  Card,
  Divider,
} from "@mui/material";

import {
  weekdayMonthDay,
  kelvin2Celcius,
  to2Digits,
  meterPerS2KmPerHour,
} from "../../utils";
import { getIconUrl } from "../../services/getIcon";

const styles = {
  align: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
};

const DayForecast = ({ singleForecast, index }) => {
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
    <Card
      elevation={0}
      variant="outlined"
      sx={{
        gridColumn: index <= 2 ? "span 4" : "span 6",
        gridRow: "span 2",
        height: "100%",
        width: "100%",
        padding: "20px",
      }}
    >
      {!loading ? (
        <Grid
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6,1fr)",
            gridTemplateRows: "repeat(5, 20%)",

            boxSizing: "border-box",
            height: "100%",
            width: "100%",
          }}
        >
          <Grid sx={{ gridColumn: "1/2", gridRow: "1/4" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                alt={singleForecast.weather[0].description}
                src={getIconUrl(singleForecast.weather[0].icon)}
              />
            </Grid>
          </Grid>
          <Grid sx={{ gridColumn: "2/5", gridRow: "1/4" }}>
            <Grid sx={{ ...styles.align, justifyContent: "center" }}>
              <Typography variant="h6">
                {weekdayMonthDay(singleForecast.dt)}
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ gridColumn: "1/2", gridRow: "4/-1" }}>
            <Grid sx={{ ...styles.align, justifyContent: "center" }}>
              <Typography sx={{ color: "#878787", textAlign: "center" }}>
                {singleForecast.weather[0].description}
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ gridColumn: "2/5", gridRow: "4/6" }}>
            <Grid sx={{ ...styles.align, justifyContent: "center" }}>
              <Typography
                sx={{
                  color: "#878787",
                }}
                variant="subtitle1"
              >
                Max:&nbsp;
              </Typography>
              <Typography variant="subtitle1">
                {to2Digits(kelvin2Celcius(singleForecast.main.temp_max))}°C
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ gridColumn: "5/-1", gridRow: "4/6" }}>
            <Grid
              sx={{
                ...styles.align,
                justifyContent: "center",
                paddingLeft: "5px",
              }}
            >
              <Typography
                sx={{
                  color: "#878787",
                }}
                variant="subtitle1"
              >
                Min:&nbsp;
              </Typography>
              <Typography variant="subtitle1">
                {to2Digits(kelvin2Celcius(singleForecast.main.temp_min))}°C
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ gridColumn: "5/-1", gridRow: "1" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                sx={{
                  color: "#5fb2ce",
                }}
              >
                <WiStrongWind size={30} />
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ gridColumn: "5/-1", gridRow: "2/4" }}>
            <Grid
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ color: "#5fb2ce" }} variant="subtitle1">
                {to2Digits(meterPerS2KmPerHour(singleForecast.wind.speed))}
                &nbsp;
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#5fb2ce",
                }}
              >
                km/hr
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
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

//this numers are the indexes that are each 24 hours in the future in the forecast
const relevantPositionsInArray = [7, 15, 23, 31, 39];

const ForecastContainer = ({ selectedCity }) => {
  const forecastList = selectedCity?.forecast?.list;
  const relevantForecasts =
    forecastList?.length &&
    relevantPositionsInArray.map(index => forecastList[index]);
  return (
    <Grid
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
        gridTemplateRows: "repeat(12,1fr)",
        padding: "16px",
      }}
      justifyContent="center"
    >
      <Grid sx={{ gridColumn: "1/-1", gridRow: "1/3" }}>
        <Typography sx={{ marginBottom: "16px" }} variant="h5">
          Next Five Days
        </Typography>
        <Divider />
      </Grid>
      <Grid
        sx={{
          gridColumn: "1/24",
          gridRow: "3/12",
          width: "100%",
        }}
      >
        <Grid
          sx={{
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(12,1fr)",
            gridTemplateRows: "repeat(4,1fr)",
            gap: 1,
            justifyContent: "center",
          }}
        >
          {relevantForecasts?.map((elem, index) => {
            return (
              <DayForecast singleForecast={elem} key={elem.dt} index={index} />
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default function DaysForecast({ state, sx }) {
  return (
    <Card sx={sx}>
      <ForecastContainer
        selectedCity={state?.selectedCity}
        loading={state.loading}
      />
    </Card>
  );
}
