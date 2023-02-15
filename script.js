var apiKey = "e831cdc5c5f20d2851c8e59fc5802e1a";
var search = document.getElementById("search");
var searchButton = document.getElementById("search-btn");
var searchCity = document.getElementById("city");


searchButton.addEventListener("click", getInfo );

function getInfo() {
    var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q="+search.value+ "&limit=1&appid=" +apiKey;
    fetch(geoCode)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" +lat+ "&lon=" +lon+ "&appid=" +apiKey+ "&units=imperial";
        fetch(queryUrl) 
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
            console.log(data);
            searchCity.textContent = data.city.name;

            for(var i = 0; i<6; i++) {
                document.getElementById("temp-"+i+"").textContent = "Temp: " + Number(data.list[i].main.temp).toFixed(0) + "°";
            }
            for(var i = 0; i<6; i++) {
                document.getElementById("wind-"+i+"").textContent = "Wind: " + Number(data.list[i].wind.speed).toFixed(0) + "mph";
            }
            for(var i = 0; i<6; i++) {
                document.getElementById("hum-"+i+"").textContent = "Humidity: " + Number(data.list[i].main.humidity).toFixed(0) + "%";
            }
            for(var i = 0; i<6; i++) {
                document.getElementById("icon-"+i+"").src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            }
        })

    })
}

var weekDays = [
 moment().format("dddd"),
moment().add(1, "d").format("dddd"),
moment().add(2, "d").format("dddd"),
moment().add(3, "d").format("dddd"),
moment().add(4, "d").format("dddd"),
moment().add(5, "d").format("dddd"),
moment().add(6, "d").format("dddd"),
];
for(i=0; i<6; i++) {
    document.getElementById("day-"+i+"").textContent = weekDays[i]
}
