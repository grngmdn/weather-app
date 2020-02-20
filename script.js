//#####################################################################//
// Runs when the site loads
// Finds and displays the weather of the current location of the user
//####################################################################//

window.addEventListener('load', function load() {
  let long;
  let lat;

  navigator.geolocation
    ? navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      let key = 'edfa2e396219722fae7a632e302a8958';
      let measurement = 'metric';

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=${measurement}`
      )
        .then(r => r.json())
        .then(info => {
          let fahrenheit = Math.round((info.main.temp * 9) / 5 + 32);
          let celsius = Math.round(info.main.temp);
          let weatherNew = document.querySelector('#weather');
          // let icon = info.weather[0].main.toUpperCase();

          // adds city name from the api
          document.getElementById('location').innerHTML =
            info.name + ', ' + info.sys.country;
          // adds temperature from the api
          document.getElementById('weather').innerHTML = celsius + '°C';
          // adds weather description from the api
          document.getElementById('weather-description').innerHTML =
            info.weather[0].description;
          // adds wind speed from the api
          document.getElementById('wind').innerHTML =
            'Wind speeds at ' + info.wind.speed + ' m/s';
          // adds humidity level from the api
          document.getElementById('humidity').innerHTML =
            'Humidity levels at ' + info.main.humidity + '%';

          // converts celsius to fahrenheit
          weatherNew.addEventListener('click', function change() {
            if (
              document.getElementById('weather').innerHTML ===
              celsius + '°C'
            ) {
              document.getElementById('weather').innerHTML =
                fahrenheit + '°F';
            } else {
              document.getElementById('weather').innerHTML = celsius + '°C';
            }
          });

          //set icons for the canvas animation
          // setIcons(icon, document.querySelector('.iconId'));
        })
        .catch(err => console.log(err));
    })
    : null;

  // function to set icons
  // function setIcons(icon, iconId) {
  //   let skycons = new Skycons({ "color": "white" });
  //   // console.log(icon);
  //   skycons.play();
  //   return skycons.set(iconId, Skycons[icon]);
  // }
});

//##############################################################################//
// Runs when the search button is clicked
// First runs the input validation check "validation()".
// Then runs the "findWeather()" which finds the weather for the searched city.
//##############################################################################//

// validation for text input to check if a value is entered
function validation() {
  let test = document.getElementById('inputValue').value;
  test === '' ?
    alert('Please enter the name of a city first') :
    findWeather();
}

// finds the weather for the searched city
function findWeather() {

  let key = 'edfa2e396219722fae7a632e302a8958';
  let cityName = document.getElementById('inputValue').value;
  let cityLocation = document.getElementById('inputValue').value;
  let measurement = 'metric';

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${cityLocation}&appid=${key}&units=${measurement}`
  )
    .then(r => r.json())
    .then(info => {
      let fahrenheit = Math.round((info.main.temp * 9) / 5 + 32);
      let celsius = Math.round(info.main.temp);
      let weatherNew = document.querySelector('#weather');
      let icon = info.weather[0].main.toUpperCase();

      // adds city name from the api
      document.getElementById('location').innerHTML =
        info.name + ', ' + info.sys.country;
      // adds temperature from the api
      document.getElementById('weather').innerHTML = celsius + '°C';
      // adds weather description from the api
      document.getElementById('weather-description').innerHTML =
        info.weather[0].description;
      // adds wind speed from the api
      document.getElementById('wind').innerHTML =
        'Wind speeds at ' + info.wind.speed + ' m/s';
      // adds humidity level from the api
      document.getElementById('humidity').innerHTML =
        'Humidity levels at ' + info.main.humidity + '%';

      // converts celsius to fahrenheit
      weatherNew.addEventListener('click', () => {
        document.getElementById('weather').innerHTML === celsius + '°C'
          ? (document.getElementById('weather').innerHTML = fahrenheit + '°F')
          : (document.getElementById('weather').innerHTML = celsius + '°C');
      });

      // set icons for the canvas animation

      setIcons(icon, document.querySelector('.iconId'));
    })
    .catch(err => console.log(err));

  // function to set icons with the data from api
  function setIcons(icon, iconId) {
    let skycons = new Skycons({ "color": "white" });
    let convertIcon = {
      CLEAR: 'CLEAR_DAY',
      CLOUDS: 'CLOUDY',
      ATMOSPHERE: 'FOG',
      MIST: 'FOG',
      SNOW: 'SNOW',
      RAIN: 'RAIN',
      DRIZZLE: 'RAIN',
      THUNDERSTORM: 'RAIN'
    }

    icon = icon.replace(/CLEAR|CLOUDS|ATMOSPHERE|SNOW|RAIN|DRIZZLE|THUNDERSTORM|MIST/gi, function (matched) {
      return convertIcon[matched];
    });

    console.log(icon);

    skycons.play();
    return skycons.set(iconId, Skycons[icon]);
  }
};

// CLEAR_DAY, CLEAR_NIGHT, PARTLY_CLOUDY_DAY, PARTLY_CLOUDY_NIGHT, CLOUDY, RAIN, SLEET, SNOW, WIND, FOG
// THUNDERSTORM, DRIZZLE, RAIN, SNOW, ATMOSPHERE, CLEAR, CLOUDS