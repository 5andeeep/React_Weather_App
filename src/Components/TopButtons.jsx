import React from "react";

const TopButtons = ({ setQuery }) => {
  const cities = [
    {
      id: 1,
      title: "Berlin",
    },
    {
      id: 2,
      title: "Moscow",
    },
    {
      id: 3,
      title: "Sydney",
    },
    {
      id: 4,
      title: "Tokyo",
    },
    {
      id: 5,
      title: "Paris",
    },
  ];

  return (
    <div className=" flex items-center justify-between my-2 ">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
