
$(document).ready(function () {
  function APIuse(cityname) {
    var todayURL = "https://api.openweathermap.org/data/2.5/weather?appid=e6abac337ca67955353882fbffaec4c2&q=" + cityname;
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?appid=e6abac337ca67955353882fbffaec4c2&q=" + cityname;
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=e6abac337ca67955353882fbffaec4c2&q=" + cityname;
    console.log(forecastURL);
    
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
          
          //append the variables of today
          $("#Title").html("<h2>" + cityname + " (1/11/1111) " + icon0 + "</h2>");
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
      console.log(response);
      var icon1 =  "<img src='https://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + "@2x.png' >";
      var temp1 = (Math.round((((response.list[1].main.temp-273.15)*1.8+32) + Number.EPSILON) * 10) / 10) + " F";
      var humid1 = response.list[1].main.humidity + "%";
      var icon2 =  "<img src='https://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png' >";
      var temp2 = (Math.round((((response.list[2].main.temp-273.15)*1.8+32) + Number.EPSILON) * 10) / 10) + " F";
      var humid2 = response.list[2].main.humidity + "%";
      var icon3 =  "<img src='https://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + "@2x.png' >";
      var temp3 = (Math.round((((response.list[3].main.temp-273.15)*1.8+32) + Number.EPSILON) * 10) / 10) + " F";
      var humid3 = response.list[3].main.humidity + "%";
      var icon4 =  "<img src='https://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png' >";
      var temp4 = (Math.round((((response.list[4].main.temp-273.15)*1.8+32) + Number.EPSILON) * 10) / 10) + " F";
      var humid4 = response.list[4].main.humidity + "%";
      var icon5 =  "<img src='https://openweathermap.org/img/wn/" + response.list[5].weather[0].icon + "@2x.png' >";
      var temp5 = (Math.round((((response.list[5].main.temp-273.15)*1.8+32) + Number.EPSILON) * 10) / 10) + " F";
      var humid5 = response.list[5].main.humidity + "%";

      //append variables for rest of week
      for (var i=1; i<6; i++) {
        //make variables
        // var daydate = '(' + (today.getMonth() + 1) + '/' + (today.getDate()+1+i) + '/' + today.getFullYear() + ')';
        var icon =  "<p><img src='https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png'></p>"
        var temp = "<p>Temperature: " + (Math.round((((response.list[i].main.temp-273.15)*1.8+32) + Number.EPSILON) * 10) / 10) + " F</p>";
        var humid = "<p>Humidiy: " + response.list[i].main.humidity + "%</p>";
        // //append variables
        var idate = "#" + JSON.stringify(i) + "date";
        var iicon = "#" + JSON.stringify(i) + "icon";
        var itemp = "#" + JSON.stringify(i) + "temp";
        var ihumid = "#" + JSON.stringify(i) + "humid";

        // $(jdate).html("<strong>" + daydate + "</strong>");
        $(iicon).html(icon);
        $(itemp).html(temp);
        $(ihumid).html(humid);
    }

    });
  }
  APIuse("Austin");


});

