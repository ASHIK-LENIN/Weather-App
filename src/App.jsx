import React, { useState } from 'react';
import axios from 'axios';
import backgroundVideo from './assets/final.mp4';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('');

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=67764106ff8d596ed09750cc8d93c7f3`
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
      setLocation('');
    }
  };

  const fahrenheitToCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  return (
    <>
      <div className="Navbar">
        <input
          type="search"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter a City & Press Enter"
          className="searchbar"
        />
      </div>

      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{fahrenheitToCelsius(data.main.temp).toFixed()}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <>
                  <p className="bold">
                    {fahrenheitToCelsius(data.main.feels_like).toFixed()}°C
                  </p>
                  <p>Feels like</p>
                </>
              ) : null}
            </div>
            <div className="humidity">
              {data.main ? (
                <>
                  <p className="bold">{data.main.humidity}%</p>
                  <p>Humidity</p>
                </>
              ) : null}
            </div>
            <div className="wind">
              {data.wind ? (
                <>
                  <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                  <p>Wind Speed</p>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
