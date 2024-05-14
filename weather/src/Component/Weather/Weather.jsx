import React, { useState } from 'react';

import './Weather.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=886d9b2ee5f14be3b13113006241405&q=${city}`);
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      alert('Failed to fetch weather data');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  return (
    <div className="App">
      
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch} >Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <p>Temperature: {weatherData.current.temp_c} °C</p>
          </div>
          <div className="weather-card">
            <p>Humidity: {weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p>Condition: {weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
