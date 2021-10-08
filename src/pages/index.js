import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import Layout from "../components/Layout";
import { cashedSimpleForecast } from "../services/cashedApi";
import HourForecast from "../components/HourForecast";
import DaysForecast from "../components/DaysForecast";
import Preselected from "../components/Preselected";

import cities from "../data/cities.json";
import preselectedCities from "../data/preselected-cities.json";

const styles = {
  mainStyle: {
    margin: "10px",
  },
  container: {
    height: "400px",
    justifyContent: "center",
    alignItems: "center",
  },
};

const defaultSelectedCity = 0;

export default function Index() {
  const [state, setState] = useState({
    cities: cities,
    preselectedCities,
    selectedCity: preselectedCities[defaultSelectedCity],
    city: preselectedCities[defaultSelectedCity].name,
  });

  const onChange = update =>
    setState(prevState => ({ ...prevState, ...update }));

  const onNamedChange = inputName => update => {
    onChange({ [inputName]: update.target.textContent });
  };

  useEffect(() => {
    async function fetchData() {
      if (state.city === "") {
        return setState(prevState => ({
          ...prevState,
          city: preselectedCities[defaultSelectedCity].name,
        }));
      }

      const selectedCity = { forecast: await cashedSimpleForecast(state.city) };

      setState(prevState => ({
        ...prevState,
        selectedCity,
      }));
    }
    fetchData();
  }, [state.city]);

  return (
    <Layout
      state={state}
      setState={setState}
      onChange={onChange}
      onNamedChange={onNamedChange}
    >
      <Grid sx={styles.mainStyle}>
        <Preselected state={state} onChange={onChange} />
        <HourForecast state={state} />
        <DaysForecast state={state} />
      </Grid>
    </Layout>
  );
}
