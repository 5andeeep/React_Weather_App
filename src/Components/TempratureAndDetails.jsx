import React from "react";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime } from "../Services/WeatherService";

const TempratureAndDetails = ({ weather, selectedUnit }) => {
  const {
    details,
    feels_like,
    humidity,
    icon,
    speed,
    sunrise,
    sunset,
    temp_max,
    temp_min,
    temp,
    timezone,
  } = weather;

  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p className="text-cyan-300">{details}</p>
      </div>
      <div className="flex items-center justify-between text-white py-3">
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather"
          className="w-20"
        />
        <p className="text-5xl">
          {`${temp.toFixed()}`}&deg;{selectedUnit == "metric" ? "c" : "f"}
        </p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Feels Like:
            <span className="font-medium ml-1">
              {`${feels_like.toFixed()}`}&deg;
            </span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSunset />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilArrowUp />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">
            {`${Math.ceil(temp_max)}`}&deg;
          </span>
        </p>
        <p className="font-light">|</p>
        <UilArrowDown />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">
            {`${Math.floor(temp_min)}`}&deg;
          </span>
        </p>
      </div>
    </div>
  );
};

export default TempratureAndDetails;
