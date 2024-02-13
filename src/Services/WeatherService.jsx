// url =`https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=${apiKey}`;
// onecall_url = `https://api.openweathermap.org/data/2.5/onecall?lat=35.6895&lon=139.6917&exclude=current,minutely,hourly,alerts&appid=api_key`

import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_APIKEY;
const BASE_URL = `https://api.openweathermap.org/data/2.5`;

// function to call base url with different APIs like (weather api, onecall api)
const fetchWeatherData = async (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  //   console.log(url);

  return fetch(url).then((res) => res.json());
};

// searchParams = weather, opencall
const getFormattedWeatherData = async (searchParams) => {
  // 1. for current date weather information
  const formattedCurrentWeather = await fetchWeatherData(
    "weather",
    searchParams
  )
    .then((data) => formatCurrentWeather(data))
    .catch((err) => console.log("Error in formattedCurrentWeather: ", err));

  // console.log(formattedCurrentWeather);
  const { lat, lon } = formattedCurrentWeather; // this is an object of weather data
  // 2. for daily,hourly weather information...
  const formattedForecastWeather = await fetchWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  })
    .then((data) => formatForecastWeather(data))
    .catch((err) => console.log("Error in formattedForecastWeather: ", err));

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

// function to get formatted weather data of the city (weather api data)..
const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    wind: { speed },
    sys: { country, sunrise, sunset },
    weather,
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    speed,
    country,
    sunrise,
    sunset,
    details,
    icon,
  };
};

// function to format the data for daily, hourly weather (opecall api data)
const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(Number(d.dt), timezone, "cccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((h) => {
    return {
      title: formatToLocalTime(Number(h.dt), timezone, "hh:mm a"),
      temp: h.temp,
      icon: h.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

// function: using luxon to format date and time which we are recieving from data..
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export default getFormattedWeatherData;

export { formatToLocalTime };
