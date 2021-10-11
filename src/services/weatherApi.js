import { get } from "./requests";

const baseUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "1f89da47fe4d0be6bbbf376af70bdb58";

export const forecast = async cityName =>
  await get(`${baseUrl}/forecast?q=${cityName}&appid=${apiKey}`);

export const currentWeather = async cityName =>
  await get(`${baseUrl}/weather?q=${cityName}&appid=${apiKey}`);
