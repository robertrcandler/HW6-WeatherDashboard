
$(document).ready(function () {
  //global variable
    //making a local storage array of cities to fill buttons
    var cities = ["Austin","Chicago","New York","Orlando","San Francisco","Seattle","Denver","Atlanta"];
    localStorage.setItem("cities", JSON.stringify(cities));
  
  function APIuse(cityname) {
    var todayURL = "https://api.openweathermap.org/data/2.5/weather?appid=e6abac337ca67955353882fbffaec4c2&q=" + cityname;
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?appid=e6abac337ca67955353882fbffaec4c2&q=" + cityname;
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=e6abac337ca67955353882fbffaec4c2&q=" + cityname;
    
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
    // event.preventDefault;
  }

  //create functional search button
 $(document).ready(function() {
    document.querySelector("#searchbtn").addEventListener("click", function(event) {
      //get text written in search bar
      var input2 = document.getElementById("searcharea").value;
      //add searched city to local storage
      cities.unshift(input2);
      localStorage.setItem("cities", JSON.stringify(cities));
      //run weather display function on searched city
      APIuse(input2);
      //update buttons to include recently searched city
      setcities();
      event.preventDefault();
    })
  });
  //retrieve data from local storage
  var retrieved = localStorage.getItem("cities");
  var cities2 = JSON.parse(retrieved);
  APIuse(cities[0]);
  //create clickable buttons to change the displayed city
  $(document).ready(function() {
    function setcities() {
    //append city names to buttons
    $('#city1').html(cities2[0]);
    $('#city2').html(cities2[1]);
    $('#city3').html(cities2[2]);
    $('#city4').html(cities2[3]);
    $('#city5').html(cities2[4]);
    $('#city6').html(cities2[5]);
    $('#city7').html(cities2[6]);
    $('#city8').html(cities2[7]);
    //make buttons functional to local storage
    $('#city1').click(function() {APIuse(cities2[0])});//city 1-8 are buttons on the side
    $('#city2').click(function() {APIuse(cities2[1])});
    $('#city3').click(function() {APIuse(cities2[2])});
    $('#city4').click(function() {APIuse(cities2[3])});
    $('#city5').click(function() {APIuse(cities2[4])});
    $('#city6').click(function() {APIuse(cities2[5])});
    $('#city7').click(function() {APIuse(cities2[6])});
    $('#city8').click(function() {APIuse(cities2[07])});
    }
    setcities();
  });
});

//all that is left to do is filter through if city exists or not, make error message, and not add to local storage

