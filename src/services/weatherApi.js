import { get } from "./requests";

const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
const apiKey = "1f89da47fe4d0be6bbbf376af70bdb58";

export const forecast = async (cityName, days) =>
  await get(`${baseUrl}?q=${cityName}&appid=${apiKey}`);
