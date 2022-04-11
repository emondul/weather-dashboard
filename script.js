// my global variables 
// apikey = "241f26f1238284a5c714bee64572d133";

var search = $('#search');
var cityName = $('#cityName');
var todaysWeather = $('#todaysWeather');
var forecast = $('#forecast');
var forecastTitle = $('#forecastTitle');
var searchHistory = $('#searchHistory');


search.on('click', function(){
    todaysWeather.html('');
    forecast.html('');
    forecastTitle.html('');
    geoData(cityName.val())
    previousSearchButtons();
})

searchHistory.on('click',function(event){
    todaysWeather.html('');
    forecast.html('');
    forecastTitle.html('');
    var previousSearch = event.target.innerText;
    geoData(previousSearch);
})

function geoData (city) {

    var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=241f26f1238284a5c714bee64572d133";

    fetch(url) 
        .then(function(response){
            return response.json();
        })
        .then(function(data) {

            console.log(data);

            fetchOneCall(data[0].lat, data[0].lon, city);
        })

}
function fetchOneCall (lat, lon, city) {

    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=241f26f1238284a5c714bee64572d133";
    
    fetch(url) 
        .then(function(response){
            return response.json();
        })
        .then(function(data) {

            console.log(data);

            renderCurrentWeather(data, city);
            renderFiveDayForecast(data);
        })

}
function renderCurrentWeather (data, city) {

    todaysWeather.removeClass("invisible");

    todaysWeather.append(`
        <h2>${city} (${moment().format('L')}) <img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" alt="${data.current.weather[0].description}"></h2>
        <p>Temp: ${data.current.temp}°F</p>
        <p>Wind: ${data.current.wind_speed} MPH</p>
        <p>Humidity: ${data.current.humidity} %</p>
    `);

    if (data.current.uvi < 3) {
        todaysWeather.append(`
            <p>UV Index: ${data.current.uvi} 🟩</p>
        `);
    } else if (data.current.uvi < 6 && data.current.uvi > 2) {
        todaysWeather.append(`
            <p>UV Index: ${data.current.uvi} 🟨</p>
        `);
    } else if (data.current.uvi < 8 && data.current.uvi > 5) {
        todaysWeather.append(`
            <p>UV Index: ${data.current.uvi} 🟧</p>
        `);
    } else if (data.current.uvi < 11 && data.current.uvi > 7){
        todaysWeather.append(`
            <p>UV Index: ${data.current.humidity} 🟥</p>
        `);
    } else {
        todaysWeather.append(`
            <p>UV Index: ${data.current.humidity} 🟪</p>
        `);
    }
}