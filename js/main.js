function getCoordinates(cb) {
  navigator.geolocation.getCurrentPosition((position) => {
    cb(position.coords);
  }, showErrorMassage());
}

function requestWeather (coords, cb){
  var weather = new XMLHttpRequest();
  var coordinates = 'lat=' + coords.latitude + '&lon=' + coords.longitude;
  var apiKey = '&APPID=9b9c8ea6f09f058eee3a5aa4aedcf289';
  var url = 'https://api.openweathermap.org/data/2.5/weather?';
  var units = '&units=metric';
  
  weather.onreadystatechange = function() {
    if (weather.readyState != 4) return;
   
    var response = JSON.parse(weather.response);
    cb(response);    
  }
  
  weather.open("GET", url + coordinates + apiKey + units, true);
  weather.send();  
}

function showWeather(response){
  var location = response.name;
  var iconId = response.weather[0].icon;
  var temp = response.main.temp + ' °C';
  var wind = response.wind.speed + ' m/s';
  var pressure = response.main.pressure + ' Cp';

  document.querySelector('#noGeolocation').hidden = true;
  document.querySelector('#icon').setAttribute('src', 'http://openweathermap.org/img/w/' + iconId + '.png');
  document.querySelector('#location').innerHTML = location;
  document.querySelector('#temp').innerHTML = temp;
  document.querySelector('#wind').innerHTML = wind;
  document.querySelector('#pressure').innerHTML = pressure;
}

function showErrorMassage (){
  document.querySelector('#noGeolocation').hidden = false;
}

getCoordinates((coords) => {
  requestWeather((coords), (weather) => {
    showWeather(weather);
  });
});