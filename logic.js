var city1 = document.getElementById(city1);
var city2 = document.getElementById(city2);
var city3 = document.getElementById(city3);
var city4 = document.getElementById(city4);
var city5 = document.getElementById(city5);
var city6 = document.getElementById(city6);
var city7 = document.getElementById(city7);
var city8 = document.getElementById(city8);
var city0 = "Austin";

var day0 = document.getElementById(day0);
var day1 = document.getElementById(day1);
var day2 = document.getElementById(day2);
var day3 = document.getElementById(day3);
var day4 = document.getElementById(day4);
var day5 = document.getElementById(day5);
// This is our API key used in class
var APIKey = "166a433c57516f51dfab1f7edaed8413";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=" + city0 + ",Burundi&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    
    // Convert the temp to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;

    // add temp content to html
    $(".temp").text("Temperature (K) " + response.main.temp);
    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + tempF);
  });