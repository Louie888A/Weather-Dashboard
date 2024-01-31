const currentDate = dayjs();
const currentDay = currentDate.format("D/MM/YYYY");
const searchInput = $("#search-input");
const searchBtn = $("#search-button");
const today = $("#today");
const forecast = $("#forecast");
const KelToCel = 273.15;
let cityName;
let cityBtn;

const api = "ecab1f42b2ac43189b8225f344642d25";
let queryURL;

function citySearch() {
  cityName = searchInput.val().trim();
  if (cityName === "") {
    alert("Please enter a city name");
    return;
  }
}

searchBtn.on("click", function (event) {
  event.preventDefault();

  queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api}`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const todayCity = $("<h3>").text(`${data.city.name} (${currentDay})`);
      const todayIcon = $("<img>").attr(
        "src",
        `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
      );
      const todayTemp = $("<p>").text(
        `Temperature: ${(data.list[0].main.temp - KelToCel).toFixed(0)}°C`
      );
      const todayWind = $("<p>").text(`Wind: ${data.list[0].wind.speed}KPH`);
      const todayHumidity = $("<p>").text(
        `Humidity: ${data.list[0].main.humidity}%`
      );
      const todayWeather = $("<div>").append(
        todayCity,
        todayIcon,
        todayTemp,
        todayWind,
        todayHumidity
      );
      todayWeather.append(todayWeather);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});
