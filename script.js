const button = document.querySelector('.search-btn');
const input = document.querySelector('.search-input');
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const background = document.querySelector('.background-image');
const timeElement = document.querySelector('.current-time');
const dateElement = document.querySelector('.current-date');

const apiKey = 'ad70950867164ab9276c53f6aafe2443';

// ⏰ Update Time + Date
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });

  timeElement.textContent = timeString;
  dateElement.textContent = dateString;
}
setInterval(updateTime, 1000);
updateTime();

// 🌦️ Weather Fetch Function
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
      if (data.cod === '404') {
        alert('❌ City not found. Please check spelling.');
        return;
      }

      // ✅ Update UI
      cityName.textContent = data.name;
      temperature.textContent = `${data.main.temp} °C`;
      description.textContent = data.weather[0].description;

      // 🌈 Background Change
      const weatherCondition = data.weather[0].description.toLowerCase();
      if (weatherCondition.includes('rain')) {
        background.style.backgroundImage = "url('rain.jpg')";
      } else if (weatherCondition.includes('clear')) {
        background.style.backgroundImage = "url('clear.jpg')";
      } else if (weatherCondition.includes('cloud')) {
        background.style.backgroundImage = "url('cloudy.jpg')";
      } else if (weatherCondition.includes('snow')) {
        background.style.backgroundImage = "url('snow.jpg')";
      } else if (weatherCondition.includes('smoke')) {
        background.style.backgroundImage = "url('smoke.jpg')";
      } else if (weatherCondition.includes('fog')) {
        background.style.backgroundImage = "url('fog.jpg')";
      } else if (weatherCondition.includes('thunder')) {
        background.style.backgroundImage = "url('thunder.jpg')";
      } else if (weatherCondition.includes('haze')) {
        background.style.backgroundImage = "url('haze.jpg')";
      } else {
        background.style.backgroundImage = "url('default.jpg')";
      }
    })
    .catch(err => {
      alert('⚠️ Error fetching weather data. Try again later.');
      console.log('Error fetching weather data:', err);
    });
}

// 🖱️ Search button click
button.addEventListener('click', getWeather);

// ⌨️ Trigger search when pressing "Enter"
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeather();
  }
});
