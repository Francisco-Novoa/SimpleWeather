import { localStorage } from "./storage";
import { forecast, currentWeather } from "./weatherApi";

//after how many minutes it will try to call the api
//default is 3 hours
const forecastDuration = 180;

const cashedForecast = (duration, keyword, callback) => async cityName => {
  const cashed = localStorage.retrieve(`${cityName}-${keyword}`);
  if (cashed) {
    if (new Date(cashed.expiresIn) > new Date(Date.now())) {
      return cashed;
    }
  }
  const forecast = await callback(cityName);
  localStorage.datedSave(duration)(`${cityName}-${keyword}`, {
    ...forecast,
  });
  return forecast;
};

export const cashedSimpleForecast = cashedForecast(
  forecastDuration,
  "simple",
  forecast
);

export const cashedCurrentWeather = cashedForecast(
  forecastDuration,
  "current",
  currentWeather
);
