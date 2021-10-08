import React from "react";
import { Grid } from "@mui/material";
import FlatButton from "../components/animated/FlatButton";

const styles = {
  Active: {
    color: "#FF71CE",
    borderColor: "#FF71CE",
    fontSize: "13px",
    padding: "0.3rem",
  },
  Inactive: {
    color: "#4a2966",
    borderColor: "#4a2966",
    fontSize: "13px",
    padding: "0.3rem",
  },
  container: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom: "0.45rem",
  },
};

const City = ({ singularCity, city, onChange }) => {
  const isActive = singularCity.name === city;
  const onClick = () =>
    onChange({
      selectedCity: singularCity,
      city: singularCity.name,
    });
  return (
    <Grid item>
      <FlatButton
        sx={isActive ? styles.Active : styles.Inactive}
        onClick={onClick}
      >
        {singularCity.name}
      </FlatButton>
    </Grid>
  );
};

export default function Preselected({
  onChange,
  state: { preselectedCities, city },
}) {
  return (
    <Grid container item sx={styles.container}>
      {preselectedCities.map(singularCity => (
        <City
          singularCity={singularCity}
          onChange={onChange}
          key={singularCity.name}
          city={city}
        />
      ))}
    </Grid>
  );
}
