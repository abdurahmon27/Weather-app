import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSun,
  FaCloud,
  FaCloudShowersHeavy,
  FaSnowflake,
  FaCloudSun,
} from "react-icons/fa";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = "5ffdc66d9eb63ec59f26ed5d004069ba";
  const city = "Yangikishlak";

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        setWeather(response.data.list[0]);
        setForecast(response.data.list.slice(1, 4));
        setError(null);
      } catch (err) {
        setWeather(null);
        setForecast([]);
        setError("Shahar nomi topilmadi.");
      }
    };

    getWeather();
  }, [apiKey, city]);

  const getWeatherIcon = (rangeId) => {
    if (rangeId >= 200 && rangeId < 300) {
      return <FaCloudShowersHeavy />;
    } else if (rangeId >= 300 && rangeId <= 500) {
      return <FaCloud />;
    } else if (rangeId >= 600 && rangeId <= 700) {
      return <FaSnowflake />;
    } else if (rangeId >= 801 && rangeId <= 804) {
      return <FaCloudSun />;
    } else {
      return <FaSun />;
    }
  };

  const currentDate = new Date();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (

    <div className="w-full h-screen flex justify-center flex-col items-center max-lg:py-5">
      <div className="p-8 rounded-md border border-gray-300 shadow-md w-[350px] h-auto flex flex-col justify-center backdrop-blur-md backdrop-filter text-white max-lg:w-[300px]">
        <h1 className="text-3xl font-semibold mb-4 font-1">Today's weather</h1>
        {weather && (
          <div>
            <h2 className="text-xl font-bold font-1">{city}</h2>
            <p className="text-gray-300 italic mt-5 font-1">
              {weather.weather[0].description}
            </p>
            <div className="flex mt-5 mx-auto">
              <span className="text-3xl text-gray-300 mx-5">
                {getWeatherIcon(weather.weather[0].id)}
              </span>
              <p className="text-3xl font-bold">
                {Math.round(weather.main.temp)}°C
              </p>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      <div className="mt-5 w-[850px] h-[250px] rounded-md border border-gray-300 shadow-md flex flex-row justify-center backdrop-blur-md backdrop-filter text-white max-lg:w-[300px] max-lg:h-full max-lg:flex-col max-lg:gap-y-3">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="m-2 w-[200px] h-[200px] mx-auto z-10 border border-gray-300 shadow-md flex flex-col justify-center backdrop-blur-md backdrop-filter rounded-lg my-5"
          >
            <span className="text-2xl m-auto font-1">
              {weekdays[(currentDate.getDay() + index + 1) % 7]}
            </span>
            <span className="m-auto text-gray-300 italic text-3xl">
              {getWeatherIcon(day.weather[0].id)}
            </span>
            <span className="text-sm m-auto text-gray-300 italic font-1">
              {day.weather[0].description}
            </span>
            <span className="text-sm m-auto font-1">
              {Math.round(day.main.temp)}°C
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
