$(document).ready(function () {
    //THIS DOCUMENT WAS MADE TO ACCESS API AND REPLACE DIVS IN HTML
    //function to convert kelvin to farenheit
    function fahrenheit(k) {
        var rawtempF = (k-273.15)*1.8+32;
        var tempF = Math.round((rawtempF + Number.EPSILON) * 10) / 10;
        return tempF
    }

    //function to use API
    function APIuse(cityname) {
        var todayAPIURL = "https://api.openweathermap.org/data/2.5/weather?q=";
        var forecastAPIURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
        var uvAPIURL = "http://api.openweathermap.org/data/2.5/uvi?";
        var APIKey = "e6abac337ca67955353882fbffaec4c2";
        var todayURL = todayAPIURL + cityname + "&appid" + APIKey;
        var forecastURL = forecastAPIURL + cityname + "&appid" + APIKey;
        //added in this later as possible fix
        //FIX 1
        // var requestT;
        // requestT = new XMLHttpRequest();
        // requestT.open('GET', todayURL, true);
        // requestT.onload = function {
        //     var Tdata = JSON.parse(this.response);
        //     console.log(Tdata);
        //     console.log(cityname);
        // }
        // requestT.send();
        
        // var requestF;
        // requestF = new XMLHttpRequest();
        // requestF.open('GET', todayURL, true);
        // requestF.onload = function {
        //     var Fdata = JSON.parse(this.response);
        //     console.log(Fdata);
        //     console.log(cityname);
        // }
        // requestF.send();

        //FIX 2
        // xhttp.open("GET", todayURL, true);
        // xhttp.send();
        // xhttp.open("GET", "forecastURL", true);
        // xhttp.send();
    }

var today = new Date();
// data of today
$.ajax({
  url: todayURL,
  method: "GET"
}).then(function(response) {
    //make data variables
    var city = response.name;
    var country = response.sys.country;
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var uvURL = uvAPIURL + "appid=" + APIKey + "&lat=" + lat + "&lon" + lon;
    xhttp.open("GET", uvURL, true);
    xhttp.send();
    
    //day 0 variables
    var day0date = '(' + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + ')';
    var day0icon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
    var day0temp = fahrenheit(response.main.temp);
    var day0humid = response.main.humidity;
    var day0wind = response.wind.speed;
    
    //append variables
    $("#Title").html("<h2>" + city + " " + day0date + " " + day0icon + "</h2>");
    $("#day0temp").html("<p>Temperature: " + day0temp + "F</p>");
    $("#day0hunid").html("<p>Hunidity: " + day0humid + "%</p>");
    $("#day0wind").html("<p>Wind Speed: " + day0wind + " MPH</p>");
});

//UV data
$.ajax({
    url: uvURL,
    method: "GET"
}).then(function(response) {
    //uvIndex
    var uvIndex = response.value;
    //append variable
    $("#uvindex").html("<p>UV Index: " + uvIndex + "</p>");
});

//5 day forecast data
$.ajax({
    url: forecastURL,
    method: "GET"
}).then(function(response) {
    var forecastarray = response.list;
    //save variables
    for (var i=0; i<forecastarray.length; i++) {
        //make variables
        var daydate = '(' + (today.getMonth() + 1) + '/' + (today.getDate()+1+i) + '/' + today.getFullYear() + ')';
        var dayicon = "https://openweathermap.org/img/wn/" + forecastarray[i].weather[0].icon + "@2x.png";
        var daytemp = fahrenheit(forecastarray[i].main.temp);
        var dayhumid = forecastarray[i].main.humidity;
        //append variables
        var j=i+1;
        var jdate = "#" + JSON.stringify(j) + "date";
        var jicon = "#" + JSON.stringify(j) + "icon";
        var jtemp = "#" + JSON.stringify(j) + "temp";
        var jhumid = "#" + JSON.stringify(j) + "humid";

        $(jdate).html("<strong>" + daydate + "</strong>");
        $(jicon).html("<br>"+dayicon + "<br>");
        $(jtemp).html("<p>Temperature: " + daytemp + "F</p>");
        $(jhumid).html("<p>Hunidity: " + dayhumid + "%</p>");
    }
});




});
