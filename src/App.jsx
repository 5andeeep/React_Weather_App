import "./App.css";
import TopButtons from "./Components/TopButtons";
import AppInputs from "./Components/AppInputs";
import TimeAndLocation from "./Components/TimeAndLocation";
import TempratureAndDetails from "./Components/TempratureAndDetails";
import ForecastWeather from "./Components/ForecastWeather";
import getFormattedWeatherData from "./Services/WeatherService";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState({ q: "New Delhi" }); // query to add in API
  const [units, setUnits] = useState("metric"); // this is for unit of weather (celcius or feranheights)
  const [weather, setWeather] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState("metric");

  useEffect(() => {
    fetchWeather();
  }, [query, units]);

  // function to fetch weather data..
  const fetchWeather = async () => {
    try {
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
    } catch (error) {
      console.log("Error in fetchWeather/App.js", error);
    }
  };

  // function to change app themes based on weather..
  const weatherTheme = () => {
    if (!weather) {
      return "from-cyan-700 to-blue-700";
    }
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) {
      return "from-cyan-500 via-sky-600 to-blue-500";
    }
    return "from-yellow-600 via-amber-700 to-orange-600";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md pt-2 pb-4 mt-1 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${weatherTheme()}`}
    >
      <TopButtons setQuery={setQuery} />
      <AppInputs
        setQuery={setQuery}
        setUnits={setUnits}
        units={units}
        setSelectedUnit={setSelectedUnit}
      />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TempratureAndDetails weather={weather} selectedUnit={selectedUnit} />

          <ForecastWeather title="hourly Weather" items={weather.hourly} />
          <ForecastWeather title="Daily Weather" items={weather.daily} />
        </div>
      )}
    </div>
  );
}

export default App;
