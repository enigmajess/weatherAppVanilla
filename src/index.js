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

function displayProjectedForcast() {
  let forecastElement = document.querySelector("#projected-forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = `<div  class ="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="42"
           />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

  displayProjectedForcast();
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

function showWeatherC(event) {
  event.preventDefault();
  let cityTemp = document.querySelector("#cityTemp");
  cityTemp.innerHTML = "19";
}

function showWeatherF(event) {
  event.preventDefault();
  let cityTemp = document.querySelector("#cityTemp");
  cityTemp.innerHTML = "64";
}

let newTempC = document.querySelector("#cityTempC");
newTempC.addEventListener("click", showWeatherC);

let newTempF = document.querySelector("#cityTempF");
newTempF.addEventListener("click", showWeatherF);

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

  displayProjectedForcast();
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
