'use strict';
const [x, ,] = navigator.language.split('-');

const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const close = document.querySelector('.close');
const overlay = document.querySelector('.overlay');
const weatherInfo = document.querySelector('.weather-info');
const btn = document.querySelector('.btn');
const searchCity = document.querySelector('.search-city');
const img = document.querySelector('.img');
const icon = document.querySelector('.icon');

function popUp(a, b, c) {
  weatherInfo.style.visibility = a;
  weatherInfo.style.opacity = b;
  weatherInfo.style.transform = c;
  overlay.style.visibility = a;
  overlay.style.opacity = b;
}
icon.addEventListener('click', () => {
  searchCity.value = '';
});

btn.addEventListener('click', async e => {
  e.preventDefault();

  const response = await fetch('http://localhost:3000/', {
    method: 'POST',
    body: JSON.stringify({ cityName: searchCity.value, navLang: x }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  if (data.message) return alert(data.message);

  const {
    name,
    weather: [{ description: descriptionData, icon: iconData }],
    main: { temp: tempData, feels_like: feelsLikeData },
  } = data;

  img.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${iconData}@2x.png`
  );
  description.textContent = `${descriptionData}`;
  temp.textContent = `${Math.round(tempData)}C°`;
  popUp('visible', 1, 'translate(-50%,-50%) scale(1)');
});

close.addEventListener('click', () => {
  popUp('hidden', '0', 'translate(-50%, -50%) scale(0)');
});

overlay.addEventListener('click', () => {
  popUp('hidden', '0', 'translate(-50%, -50%) scale(0)');
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    popUp('hidden', '0', 'translate(-50%, -50%) scale(0)');
  }
});
