import React, { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress, Card } from "@mui/material";

import { kelvin2Celcius, toNoDigits, to12HourClock } from "../../utils";
import { getIconUrl } from "../../services/getIcon";

const styles = {
  container: { justifyContent: "center", height: "100%", padding: "24px" },
  toTheRight: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  toTheCenter: {
    justifyContent: "center",
  },
};

const CurrentWeatherContainer = ({ selectedCity, sx }) => {
  const [currentWeather, setCurrentWeather] = useState(
    selectedCity?.currentWeather
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (selectedCity.currentWeather) {
      setTimeout(() => {
        setCurrentWeather(selectedCity.currentWeather);
        setLoading(false);
      }, 500);
    }
  }, [selectedCity]);

  return (
    <Card sx={sx}>
      <Grid container sx={styles.container}>
        <>
          {!loading ? (
            <Grid
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(8, 12.5%)",
                gridTemplateRows: "repeat(8, 12.5%)",
              }}
            >
              <Grid
                sx={{
                  flexDirection: "column",
                  gridColumn: "1/7",
                  gridRow: "1",
                }}
              >
                <Grid container fluid>
                  <Grid item container>
                    <Typography variant="subtitle1">
                      {`THE WEATHER AT\u00A0`}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bolder" }}
                    >
                      {` ${currentWeather?.name.toUpperCase()},`}
                    </Typography>
                    <Typography variant="subtitle1" sx={styles.cardStyle}>
                      {`\u00A0${currentWeather?.sys?.country}.`}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="caption" sx={{ color: "#878787" }}>
                      {to12HourClock(currentWeather?.dt)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container sx={{ gridColumn: "3/5", gridRow: "3/4" }}>
                <Grid
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(8, 12.5%)",
                    gridTemplateRows: "repeat(8, 12.5%)",
                  }}
                >
                  <Grid sx={{ gridColumn: "1", gridRow: "3" }}>
                    <img
                      height="80px"
                      width="80px"
                      src={getIconUrl(currentWeather?.weather[0]?.icon)}
                      alt={currentWeather?.weather[0]?.main}
                    />
                  </Grid>

                  <Grid
                    sx={{
                      gridColumn: "5/6",
                      gridRow: "2/4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h1">
                      {toNoDigits(kelvin2Celcius(currentWeather?.main?.temp))}
                    </Typography>
                    <Typography variant="h3">°C</Typography>
                  </Grid>

                  <Grid sx={{ gridColumn: "4", gridRow: "5" }}>
                    <Typography variant="subtitle2">
                      Feels&nbsp;like&nbsp;
                      {toNoDigits(
                        kelvin2Celcius(currentWeather?.main?.feels_like)
                      )}
                      °C
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container sx={{ gridColumn: "1/4", gridRow: "8" }}>
                <Grid item container fluid sx={styles.toTheLeft}>
                  <Typography variant="subtitle2">
                    {currentWeather?.weather[0]?.description}
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
        </>
      </Grid>
    </Card>
  );
};

export default function CurrentWeather({
  state: { selectedCity, loading },
  sx,
}) {
  return (
    <CurrentWeatherContainer
      selectedCity={selectedCity}
      loading={loading}
      sx={sx}
    />
  );
}
