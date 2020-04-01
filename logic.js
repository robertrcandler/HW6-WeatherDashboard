$(document).ready(function () {
  $.getScript('./getweather.js', function()
  {
    //APIuse(cityname) is function to use api's
    //for some reason it hasn't been working because
    //there is an authentication error with the source
    //i made account and subscribed to the api's
    //cannot figure out the error, so cannot test the dependant code
    console.log(APIuse("Austin"));
    //make history and functional submit button
  });
});