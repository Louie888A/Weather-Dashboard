$(".search-button").on("click", function (event) {
  event.preventDefault();
  const cityName = $("#search-input").val().trim();
  const api = "ecab1f42b2ac43189b8225f344642d25";
  const queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    api;
  var todayCity = "";
  var todayIcon = "";
  var todayTemp = "";
  var todayWind = "";
  var TodayHumidity = "";

  fetch(queryURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      var todayCity = $("<h3>").text(data.city.name);
      var todayIcon = $("<img>");
      todayIcon.attr(
        "src",
        "https://openweathermap.org/img/wn/" +
          data.list[0].weather[0].icon +
          "@2x.png"
      );
      var todayTemp = $("<p>").text(
        "Temperature: " + (data.list[0].main.temp - 273.15) + "°C"
      );
      var todayWind = $("<p>").text("Wind: " + data.list[0].wind.speed + "KPH");
      var TodayHumidity = $("<p>").text(
        "Humidity: " + data.list[0].main.humidity + "%"
      );
      var todayWeather = $("<div>");
      todayWeather.append(
        todayCity,
        todayIcon,
        todayTemp,
        todayWind,
        TodayHumidity
      );
      $("#today").append(todayWeather);
    })
    .catch((error) => {
      console.log(error);
    });
});
