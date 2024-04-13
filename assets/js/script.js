const form = document.getElementById("search-form");
const input = document.querySelector(".form-input");
const title = document.getElementById("city");
const currentDate = dayjs().format("MM/DD/YYYY");

// Display weather for Adelaide by default
const init = () => {
  title.textContent = "Adelaide" + " - " + currentDate;
  getWeatherData("Adelaide");
};

// Collect city location from user
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = input.value.trim();
  getWeatherData(city);
});

// Fetch weather data from API
const getWeatherData = async (city) => {
  const apiKey = "4a1cc10d5b1e470064b3abd2776f656a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);

    if (response.status === 200) {
      const data = await response.json();
      console.log("Fetch Successful");
      displayWeather(data);
    } else {
      throw new Error("Fetch Failed");
    }
  } catch (error) {
    console.error("Fetch Failed", error.message);
    throw error;
  }
};

// Display weather for chosen city
const displayWeather = (city) => {
  const tempData = city.main.temp;
  const windData = city.wind.speed;
  const humidityData = city.main.humidity;
  const iconCode = city.weather[0].icon;

  title.textContent = `${city.name} - ${currentDate}`;
  const weatherIcon = document.createElement("img");
  weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
  weatherIcon.alt = "Weather Icon";
  weatherIcon.classList.add("weather-icon");
  title.appendChild(weatherIcon);

  temperature.textContent = `Temp: ${tempData}°C`;
  wind.textContent = `Wind: ${windData} km/h`;
  humidity.textContent = `Humidity: ${humidityData}%`;
};

init();
