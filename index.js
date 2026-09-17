const citySelect = document.getElementById("city-select");
const getWeatherBtn = document.getElementById("get-weather-btn");

const weatherIcon = document.getElementById("weather-icon");
const mainTemperature = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const locationElement = document.getElementById("location");


async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );

    if (!response.ok) {
      throw new Error("Weather request failed");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}


async function showWeather(city) {
  const data = await getWeather(city);

  if (data === undefined) {
    alert("Something went wrong, please try again later");
    return;
  }

  weatherIcon.src = data.weather?.[0]?.icon || "";
  weatherIcon.alt = data.weather?.[0]?.description || "Weather icon";

  mainTemperature.textContent =
    data.main?.temp !== undefined ? data.main.temp : "N/A";

  feelsLike.textContent =
    data.main?.feels_like !== undefined ? data.main.feels_like : "N/A";

  humidity.textContent =
    data.main?.humidity !== undefined ? `${data.main.humidity}%` : "N/A";

  wind.textContent =
    data.wind?.speed !== undefined ? `${data.wind.speed} m/s` : "N/A";

  windGust.textContent =
    data.wind?.gust !== undefined ? `${data.wind.gust} m/s` : "N/A";

  weatherMain.textContent =
    data.weather?.[0]?.main !== undefined
      ? data.weather[0].main
      : "N/A";

  locationElement.textContent =
    data.name !== undefined ? data.name : "N/A";
}


getWeatherBtn.addEventListener("click", () => {
  const city = citySelect.value;

  if (city === "") {
    return;
  }

  showWeather(city);
});