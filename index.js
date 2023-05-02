'use strict';

const apiKey = 'bbe7ba86534df7df0325862940e5a125';

const weatherDataEl = document.querySelector('#weather-data');
const cityInputEl = document.querySelector('#city-input');
const weatherBtnEl = document.querySelector('#weather-btn');
const icons = document.querySelector('.icon');
const temperatures = document.querySelector('.temperature');
const descriptions = document.querySelector('.description');
const details = document.querySelector('.details');

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

    // console.log(Math.trunc(data.main.temp));
    let temperature = Math.round(data.main.temp);
    let description = data.weather[0].description;
    let icon = data.weather[0].icon;

    const detail = [
      `Fells like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity} %`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    icons.innerHTML = `<img
    src="http://openweathermap.org/img/wn/${icon}.png"
    alt="weather icon"
  />`;

    temperatures.textContent = `${temperature}°C`;

    descriptions.textContent = `${description}`;
    descriptions.style.color = 'black';

    details.innerHTML = detail.map((det) => `<div>${det}</div>`).join('');
  } catch (error) {
    icons.innerHTML = '';

    temperatures.textContent = '';

    descriptions.textContent = 'An error has occured! Try again later...';
    descriptions.style.color = 'red';
    details.innerHTML = '';
  }
}
