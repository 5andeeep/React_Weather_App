import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

const AppInputs = ({ setQuery, units, setUnits, setSelectedUnit }) => {
  const [city, setCity] = useState("");

  // function to handle input search bar..
  const handleSearchClick = () => {
    if (city) {
      setQuery({ q: city });
    }
  };

  // function to handle current location weather button
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({ lat, lon });
      });
    }
  };

  // function to handle the units changes like celcius/ferenheights
  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    setSelectedUnit(e.currentTarget.name);
    if (units !== selectedUnit) {
      setUnits(selectedUnit);
    }
  };

  return (
    <div className="flex justify-center my-5 gap-1">
      <div className="flex w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="search for city..."
          className="text-xl font-light p-1 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-150"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-150"
          onClick={handleLocationClick}
        />
      </div>
      <div className="flex w-2/12 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          &deg;C
        </button>
        <p className="text-white mx-2 text-xl">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          &deg;F
        </button>
      </div>
    </div>
  );
};

export default AppInputs;
