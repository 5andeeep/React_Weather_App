import React from "react";

const ForecastWeather = ({ title, items }) => {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex items-center justify-between text-white">
        {items?.map((item, key) => (
          <div className="flex flex-col items-center justify-center" key={key}>
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt="icon"
              className="w-12 my-1"
            />
            <p className="font-medium">{`${item.temp.toFixed()}`}&deg;</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastWeather;
