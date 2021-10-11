//library imports
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

//self made imports
import Layout from "../components/Layout";
import {
  cashedSimpleForecast,
  cashedCurrentWeather,
} from "../services/cashedApi";
import HourForecast from "../components/forecasts/HourForecast";
import DaysForecast from "../components/forecasts/DaysForecast";
import CurrentWeather from "../components/forecasts/CurrentWeather";
import { localStorage } from "../services/storage";
import Preselected from "../components/Preselected";

//hard data imports
import cities from "../data/cities.json";
import preselectedCities from "../data/preselected-cities.json";

const defaultSelectedCity = 0;
const howManyCitiesSave = 4;
export default function Index() {
  const [state, setState] = useState({
    loading: true,
    cities: cities,
    preselectedCities,
    lastCities: localStorage.retrieve("lastCities") || [],
    selectedCity: preselectedCities[defaultSelectedCity],
    city: preselectedCities[defaultSelectedCity].name,
  });

  const onChange = update =>
    setState(prevState => ({ ...prevState, ...update }));

  const onSearch = update => {
    setState(prevState => {
      const city = update.target.textContent;
      if (city.length === 0) {
        return { ...prevState };
      }
      const newCity = { name: city };
      const isRepeated = elem => elem.name === newCity.name;
      if (
        prevState.lastCities.some(isRepeated) ||
        prevState.preselectedCities.some(isRepeated)
      ) {
        return { ...prevState, city };
      }
      const citiesList = [
        newCity,
        ...prevState.lastCities.slice(0, howManyCitiesSave),
      ];
      localStorage.save("lastCities", citiesList);
      return { ...prevState, city, lastCities: citiesList };
    });
  };

  useEffect(() => {
    async function fetchData() {
      if (state.city === "") {
        return setState(prevState => ({
          ...prevState,
          city: preselectedCities[defaultSelectedCity].name,
        }));
      }

      const selectedCity = {
        forecast: await cashedSimpleForecast(state.city),
        currentWeather: await cashedCurrentWeather(state.city),
      };

      setState(prevState => ({
        ...prevState,
        selectedCity,
      }));
    }
    fetchData();
  }, [state.city]);

  useEffect(() => console.log(state), [state]);

  return (
    <Layout
      state={state}
      setState={setState}
      onChange={onChange}
      onSearch={onSearch}
    >
      <Grid
        container
        item
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(13, 100px)",
        }}
      >
        <CurrentWeather
          state={state}
          sx={{ gridColumn: "1/8", gridRow: "1/4" }}
        />

        <Preselected
          onChange={onChange}
          state={state}
          sx={{ gridColumn: "8/12", gridRow: "1/4" }}
        />

        <HourForecast
          state={state}
          sx={{ gridColumn: "1/12", gridRow: "4/7" }}
        />

        <DaysForecast
          state={state}
          sx={{ gridColumn: "1/12", gridRow: "7/14" }}
        />
      </Grid>
    </Layout>
  );
}
