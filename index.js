const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const API_KEY = 'your_openweathermap_api_key'; // Replace with your OpenWeatherMap API key

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Weather API! Use /weather?city=CityName to get weather data.');
});

// Get weather data for a city
app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
    };

    res.json(weatherData);
  } catch (error) {
    if (error.response) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Start server
app.listen(port, () => {
  console.log(`Weather API is running at http://localhost:${port}`);
});
