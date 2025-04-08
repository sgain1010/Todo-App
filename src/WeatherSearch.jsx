import React, { useState } from "react";
import "./WeatherSearch.css"; // optional for custom styles

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "b4b62b773c8da391c3bd9ea1bf651d12"; // keep this safe in env vars later

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Error fetching weather data.");
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-search">
        <input
          type="text"
          className="weather-input"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && getWeather()}
        />
        <button className="search-btn" onClick={getWeather}>
          🔍
        </button>
      </div>

      <div className="weather-display">
        {error && <p style={{ color: "red" }}>❌ {error}</p>}
        {weather && (
          <div className="weather-info">
            <h3>📍 {weather.name}, {weather.sys.country}</h3>
            <p>🌡️ Temp: {weather.main.temp}°C</p>
            <p>☁️ Weather: {weather.weather[0].main}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬️ Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherSearch;
