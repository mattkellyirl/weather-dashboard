const form = document.getElementById("search-form");
const input = document.querySelector(".form-input");
const title = document.getElementById("city");
const currentDate = dayjs().format("DD/MM/YYYY");

// Display weather for Adelaide by default
const init = () => {
  title.textContent = "Adelaide" + " - " + currentDate;
  fetchDailyWeatherForecast("Adelaide");
  fetchFiveDayForecast("Adelaide");
};

// Collect city location from user
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = input.value.trim();
  fetchDailyWeatherForecast(city);
  fetchFiveDayForecast(city);
});

// Fetch weather data from API for today
const fetchDailyWeatherForecast = async (city) => {
  const apiKey = "4a1cc10d5b1e470064b3abd2776f656a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);

    if (response.status === 200) {
      const data = await response.json();
      console.log("Fetch Successful - Daily Forecast");
      dailyWeather(data);
    } else {
      throw new Error("Fetch Failed - Daily Forecast");
    }
  } catch (error) {
    console.error("Fetch Failed", error.message);
    throw error;
  }
};

// Fetch weather data from API for 5 day forecast
const fetchFiveDayForecast = async (city) => {
  const apiKey = "4a1cc10d5b1e470064b3abd2776f656a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);

    if (response.status === 200) {
      const data = await response.json();
      fiveDayWeather(data);
      console.log("Fetch Successful - Five Day Forecast");
    } else {
      throw new Error("Fetch Failed - Five Day Forecast");
    }
  } catch (error) {
    console.error("Fetch Failed", error.message);
    throw error;
  }
};

// Display weather for chosen city
const dailyWeather = (city) => {
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

// Display weather for 5 day forecast
const fiveDayWeather = (cityData) => {
  const forecastList = cityData.list;
  const dailyForecasts = [];

  for (let i = 0; i < forecastList.length; i += 8) {
    const forecast = forecastList[i];
    const date = forecast.dt_txt.split(" ")[0];
    const weather = {
      date: dayjs(date).format("DD/MM/YYYY"),
      temp: forecast.main.temp,
      wind: forecast.wind.speed,
      humidity: forecast.main.humidity,
      icon: forecast.weather[0].icon,
    };

    dailyForecasts.push(weather);
  }

  dailyForecasts.forEach((forecast, index) => {
    const dayContainer = document.querySelector(`.day-${index + 1}`);

    const dayTitle = dayContainer.querySelector(".day-title");
    dayTitle.textContent = forecast.date;

    const weatherIcon = document.createElement("img");
    weatherIcon.src = `http://openweathermap.org/img/wn/${forecast.icon}.png`;
    weatherIcon.alt = "Weather Icon";
    weatherIcon.classList.add("weather-icon");
    dayTitle.appendChild(weatherIcon);

    const dayTemp = dayContainer.querySelector(".day-temp");
    dayTemp.textContent = `Temp: ${forecast.temp}°C`;

    const dayWind = dayContainer.querySelector(".day-wind");
    dayWind.textContent = `Wind: ${forecast.wind} km/h`;

    const dayHumidity = dayContainer.querySelector(".day-humidity");
    dayHumidity.textContent = `Humidity: ${forecast.humidity}%`;
  });
};

init();
