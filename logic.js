// $(document).ready(function () {
//   $.getScript('./getweather.js', function()
//   {
//     //APIuse(cityname) is function to use api's
//     //for some reason it hasn't been working because
//     //there is an authentication error with the source
//     //i made account and subscribed to the api's
//     //cannot figure out the error, so cannot test the dependant code
//     console.log(APIuse("Austin"));
//     //make history and functional submit button
//   });
// });

$(document).ready(function () {
  function APIuse(cityname) {
    var todayAPIURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    var forecastAPIURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
    var uvAPIURL = "http://api.openweathermap.org/data/2.5/uvi?q=";
    var APIKey = "&appid=e6abac337ca67955353882fbffaec4c2";
    var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + APIKey;
    var forecastURL = forecastAPIURL + cityname + APIKey;
    var uvURL = uvAPIURL + cityname + APIKey;
  
    $.ajax({
      url: todayURL,
      method: "GET"
    }).then(function(response) {
        //make data variables
        var city = response.name;
        var country = response.sys.country;
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        uvURL = uvURL + "&lat=" + lat + "&lon=" + lon;
        console.log(city);
        console.log(country);
        console.log(uvURL);

        //search uv api
        $.ajax({
          url: uvURL,
          method: "GET"
        }).then(function(response) {
          var value = response.value;
          console.log(value);
        });
    });

    $.ajax({
      url: forecastURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var day0temp = response.list[0].main.temp;
      console.log(day0temp);
    });
  }
  APIuse("Austin");


});


// {
//   "coord":{"lon":-97.74,"lat":30.27},
//   "weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],
//   "base":"stations",
//   "main":{"temp":289.78,"feels_like":284.06,"temp_min":287.59,"temp_max":292.04,"pressure":1021,"humidity":42},
//   "visibility":16093,
//   "wind":{"speed":6.2,"deg":19},
//   "clouds":{"all":1},
//   "dt":1586900683,
//   "sys":{"type":1,"id":3344,"country":"US","sunrise":1586865846,"sunset":1586912257},
//   "timezone":-18000,
//   "id":4671654,
//   "name":"Austin",
//   "cod":200
// }