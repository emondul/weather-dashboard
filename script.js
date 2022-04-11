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