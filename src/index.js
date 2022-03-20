let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];

let displayDate = document.querySelector("#displayDate");
displayDate.innerHTML = `${day} ${month} ${date}, ${year}`;

let h4 = document.querySelector("h4");
h4.innerHTML = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}

function displayProjectedForcast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#projected-forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = `<div  class ="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
           />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let key = `4f8353f322c9f415161732592106f878`;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=imperial`;
  console.log(coordinates);

  axios.get(apiURL).then(displayProjectedForcast);
}

function cityTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#cityTemp");
  cityTemp.innerHTML = temperature;

  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML =
    "wind: " + Math.round(response.data.wind.speed) + " mph";

  getForecast(response.data.coord);
}

function citySearch(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#searchBar");
  let searchValue = searchBar.value;

  let searchCity = document.querySelector("#searchCity");
  searchCity.innerHTML = searchValue.toUpperCase();

  let key = "4f8353f322c9f415161732592106f878";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${key}&units=imperial`;

  axios.get(url).then(cityTemp);
}

let form = document.querySelector("#cityInput");
form.addEventListener("submit", citySearch);

function currentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#cityTemp");
  cityTemp.innerHTML = temperature;

  let searchCity = document.querySelector("#searchCity");
  searchCity.innerHTML = response.data.name.toUpperCase();

  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML =
    "wind: " + Math.round(response.data.wind.speed) + " mph";

  getForecast(response.data.coord);
}

function coorPosition(position) {
  let key = "4f8353f322c9f415161732592106f878";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=imperial`;

  axios.get(url).then(currentTemp);
}

navigator.geolocation.getCurrentPosition(coorPosition);

function onClick(event) {
  navigator.geolocation.getCurrentPosition(coorPosition);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", onClick);
