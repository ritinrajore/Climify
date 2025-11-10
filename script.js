const button = document.querySelector('.search-btn');
const input = document.querySelector('.search-input');
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const background = document.querySelector('.background-image');
const timeElement = document.querySelector('.current-time');
const dateElement = document.querySelector('.current-date');

const apiKey = 'ad70950867164ab9276c53f6aafe2443';

/* 🕒 Update Time and Date */
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });

  timeElement.textContent = timeString;
  dateElement.textContent = `| ${dateString}`;
}

setInterval(updateTime, 1000);
updateTime();

/* 🎨 Smooth Background Change */
function changeBackground(imagePath) {
  background.style.opacity = 0;
  setTimeout(() => {
    background.style.backgroundImage = `url('${imagePath}')`;
    background.style.opacity = 1;
  }, 400);
}

/* 🌦 Fetch Weather Function */
function getWeather() {
  const city = input.value.trim();
  if (city === '') {
    alert('⚠️ Please enter a city name!');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === '404' || data.cod === 404) {
        alert('❌ City not found. Please check spelling.');
        return;
      }

      cityName.textContent = data.name;
      temperature.textContent = `${data.main.temp} °C`;
      description.textContent = data.weather[0].description;

      const weatherCondition = data.weather[0].description.toLowerCase();

      if (weatherCondition.includes('rain')) {
        changeBackground('images/rain.jpg');
      } else if (weatherCondition.includes('clear')) {
        changeBackground('images/clear.jpg');
      } else if (weatherCondition.includes('cloud')) {
        changeBackground('images/cloudy.jpg');
      } else if (weatherCondition.includes('snow')) {
        changeBackground('images/snow.jpg');
      } else if (weatherCondition.includes('smoke')) {
        changeBackground('images/smoke.jpg');
      } else if (weatherCondition.includes('fog')) {
        changeBackground('images/fog.jpg');
      } else if (weatherCondition.includes('thunder')) {
        changeBackground('images/thunder.jpg');
      } else if (weatherCondition.includes('haze')) {
        changeBackground('images/haze.webp');
      } else {
        changeBackground('images/default.jpg');
      }
    })
    .catch(err => {
      alert('⚠️ Error fetching weather data. Please try again later.');
      console.error('Error fetching weather data:', err);
    });
}

/* 🖱 Button Click */
button.addEventListener('click', getWeather);

/* ⌨ Press Enter */
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    getWeather();
  }
});
