import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Card } from "@mui/material";

const baseButton = { fontWeight: "bold" };

const styles = {
  Active: {
    ...baseButton,
    color: "#ff7300",
    fontSize: "16px",
  },
  Inactive: {
    ...baseButton,
    color: "#878787",
    fontSize: "13px",
  },
  container: {
    display: "grid",
    padding: "16px",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(10, 1fr)",
    gap: 1,
    justifyContent: "flex-start",
  },
};

const City = ({ singularCity, city, onChange }) => {
  const isActive = singularCity.name === city;
  const onClick = () =>
    !isActive &&
    onChange({
      selectedCity: singularCity,
      city: singularCity.name,
    });
  return (
    <Grid item sx={{ gridColumn: "span 3" }}>
      <Button variant="text" onClick={onClick} sx={{ width: "100%" }}>
        <Typography sx={isActive ? styles.Active : styles.Inactive}>
          {singularCity.name?.toUpperCase()}
        </Typography>
      </Button>
    </Grid>
  );
};

export default function Preselected({
  onChange,
  state: { preselectedCities, city, lastCities },
  sx,
}) {
  const [cities, setCities] = useState([...preselectedCities, ...lastCities]);
  useEffect(() => {
    setCities([...preselectedCities, ...lastCities]);
  }, [lastCities]);

  return (
    <Card sx={sx}>
      <Grid container item sx={styles.container}>
        <Grid id="gut" sx={{ gridColumn: "1", gridRow: "1 / -1" }}></Grid>
        <Grid
          container
          id="gut"
          sx={{ gridColumn: "2/5", gridRow: "1", justifyContent: "center" }}
        >
          <Typography variant="subtitle2">Recently viewed cities</Typography>
        </Grid>
        {cities.map(singularCity => (
          <City
            singularCity={singularCity}
            onChange={onChange}
            key={singularCity.name}
            city={city}
          />
        ))}
      </Grid>
    </Card>
  );
}
