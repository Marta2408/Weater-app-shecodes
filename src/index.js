let now = new Date();

let currently = document.querySelector("h2");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currently.innerHTML = `${day} <br>
${hours}:${minutes}`;

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#image-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "c5b3b561f5a18c2550f5446d253a6d12";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c5b3b561f5a18c2550f5446d253a6d12";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let Form = document.querySelector("#search-form");
Form.addEventListener("submit", handleSubmit);

// Chaleng 3

function invertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#image-temperature");
  temperatureElement.innerHTML = 20;
}

let celsiumLink = document.querySelector("#celsius-link");
celsiumLink.addEventListener("click", invertToCelsius);

function invertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#image-temperature");
  temperatureElement.innerHTML = 60;
}
let linkToFahrenheit = document.querySelector("#fahrenheit-link");
linkToFahrenheit.addEventListener("click", invertToFahrenheit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
