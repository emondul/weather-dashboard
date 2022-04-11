// print/render the weather data to the page
// fetch geo data (lat, lon)
// my global variables 
var apikey = "241f26f1238284a5c714bee64572d133";
var apiurl = "https://api.openweathermap.org";
var cityHistory = [];

// some DOM element references
    // search bar with a button 
    // forecast
    // history
var historysearch = document.querySelector('#history')
var form = document.querySelector('#search-form');
var input = document.querySelector('#search-input');
var today = document.querySelector('#today');
var forecast = document.querySelector('#forecast');

// some kind of function that displays searches that the user does 

function showSearch() {
    historysearch.innerHTML =' ';
    for( var i = cityHistory.length-1; i >= 0; i--) {
        var btn = document.createElement('button');
        btn.setAttribute('type', 'button')
        btn.setAttribute('area-controls', 'forecast')
        btn.classList.add('citybtn', 'btncity')
        btn.setAttribute('search', cityHistory[i])
        btn.textContent = cityHistory[i]
        historysearch.append(btn)

    }
}

// another funtion to use local storage so that displayed cities show up 
    // setItem
function localHistory(search){
    // need to od a setItem 
    cityHistory.push(search)
    localStorage.setItem('search-history', JSON.stringify(cityHistory))
    showSearch()
}
// then another function to retrieve data from local storage 
    // getItem 
function getlocalStorage(){
    var data = localStorage.getItem('search-history')
    if(data){
        cityHistory = JSON.parse(data)
    }
    showSearch()
}

// a function to the fetch 
    // we'll need to dynamically create elements and have them filled 


// a function to show the forecast section when a city is searched 

function getItems(city, data) {

}

function fetchMyWeather(location) {
    var { lat} = location;
    var { lon } = location;
    var city = location.name;
    var queryURL = `${apiurl}/data/2.5/onecall?lat=${lat}&${lon}&units=imperial&exclude=minutely,hourly&appid=${apikey}`;

    fetch(queryURL)
    .then(function(res) {
        return res.json();
    }).then(function(data) {
        renderCities(city,data)
    }).catch(function(err) {
        console.error(err)
    });
}


function fetchMyCoords(search) {
    var queryUrl = `${apiurl}/geo/1.0/direct?q=${search}&limit=5&appid=${apikey}`;
    fetch(queryUrl)
    .then(function(res) {
        return res.json();
    }).then(function(data){
        if(!data[0]) {
            alert('Not found')
        } else {
           localHistory(search)
            fetchMyWeather()
        }
    }).catch(function(err) {
        console.error(err)
}) 
}