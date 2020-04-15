
$(document).ready(function () {
  function APIuse(cityname) {
    var todayURL = "https://api.openweathermap.org/data/2.5/weather?appid=e6abac337ca67955353882fbffaec4c2&q=" + cityname;
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?appid=e6abac337ca67955353882fbffaec4c2&q=" + cityname;
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=e6abac337ca67955353882fbffaec4c2&q=" + cityname;
    
    //variables for today
    $.ajax({
      url: todayURL,
      method: "GET"
    }).then(function(response) {
        //make today's weather data variables
        var icon0 =  "<img src='https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>";
        var tempF0 = "<p>Temperature: " + (Math.round((((response.main.temp-273.15)*1.8+32) + Number.EPSILON) * 10) / 10) + " F</p>";
        var humid0 = "<p>Humidiy: " + response.main.humidity + "%</p>";
        var wind0 = "<p>Wind Speed: " + response.wind.speed + " MPH</p>";

        //setup UV index API
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        uvURL = uvURL + "&lat=" + lat + "&lon=" + lon;
        //search uv api
        $.ajax({
          url: uvURL,
          method: "GET"
        }).then(function(response) {
          var UVindex = "<p>UV Index: " + response.value + "</p>";
          //get today's date
          var d = new Date();
          var month = d.getMonth() + 1;
          var day = d.getDate();
          var year = d.getFullYear();
          var date0 = "(" + month + "/" + day + "/" + year + ")";
          //append the variables of today
          $("#Title").html("<h2>" + cityname + " " + date0 + " " + icon0 + "</h2>");
          $("#day0temp").html(tempF0);
          $("#day0hunid").html(humid0);
          $("#day0wind").html(wind0);
          $("#uvindex").html(UVindex);
        });
    });

    //variables for the rest of the week
    $.ajax({
      url: forecastURL,
      method: "GET"
    }).then(function(response) {
      //recreate variables for the time display
      var d = new Date();
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      //append variables for rest of week
      for (var i=1; i<6; i++) {
        //make variables
        var day = d.getDate() + i;
        var date = "(" + month + "/" + day + "/" + year + ")";
        var icon =  "<p><img src='https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png'></p>"
        var temp = "<p>Temperature: " + (Math.round((((response.list[i].main.temp-273.15)*1.8+32) + Number.EPSILON) * 10) / 10) + " F</p>";
        var humid = "<p>Humidiy: " + response.list[i].main.humidity + "%</p>";
        //make html variable names
        var idate = "#" + JSON.stringify(i) + "date";
        var iicon = "#" + JSON.stringify(i) + "icon";
        var itemp = "#" + JSON.stringify(i) + "temp";
        var ihumid = "#" + JSON.stringify(i) + "humid";
        //append variables
        // $(jdate).html("<strong>" + daydate + "</strong>");
        $(idate).html(date);
        $(iicon).html(icon);
        $(itemp).html(temp);
        $(ihumid).html(humid);
    }

    });
  }
  APIuse("Austin");
  //create functional search button
  $(document).ready(function() {
    $('#searchbtn').click(function() {
      var input = $("#searcharea").val();
        APIuse(input);
    });
  });
  //create clickable buttons to change the displayed city
  $(document).ready(function() {
    $('#city1').click(function() {APIuse("Austin")});
    $('#city2').click(function() {APIuse("Chicago")});
    $('#city3').click(function() {APIuse("New York")});
    $('#city4').click(function() {APIuse("Orlando")});
    $('#city5').click(function() {APIuse("San Francisco")});
    $('#city6').click(function() {APIuse("Seattle")});
    $('#city7').click(function() {APIuse("Denver")});
    $('#city8').click(function() {APIuse("Atlanta")});
  });
});

