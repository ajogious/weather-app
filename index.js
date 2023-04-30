'use strict';

const apiKey = 'bbe7ba86534df7df0325862940e5a125';

const weatherDataEl = document.querySelector('#weather-data');
const cityInputEl = document.querySelector('#city-input');
const weatherBtnEl = document.querySelector('#weather-btn');

weatherBtnEl.addEventListener('click', (event) => {
  const cityInputElVal = cityInputEl.value;

  getWeatherData(cityInputElVal);

  cityInputEl.value = '';
  event.preventDefault();
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&APPID=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Network response was not okay');
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const details = [
      `Fells like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity} %`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    weatherDataEl.querySelector('.icon').innerHTML = `<img
    src="http://openweathermap.org/img/wn/${icon}.png"
    alt="weather icon"
  />`;

    weatherDataEl.querySelector(
      '.temperature'
    ).textContent = `${temperature}°C`;

    weatherDataEl.querySelector('.description').textContent = `${description}`;
    weatherDataEl.querySelector('.description').style.color = 'black';

    weatherDataEl.querySelector('.details').innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join('');
  } catch (error) {
    weatherDataEl.querySelector('.icon').innerHTML = '';

    weatherDataEl.querySelector('.temperature').textContent = '';

    weatherDataEl.querySelector('.description').textContent =
      'An error has occured! Try again later...';
    weatherDataEl.querySelector('.description').style.color = 'red';
    weatherDataEl.querySelector('.details').innerHTML = '';
  }
}
