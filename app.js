window.addEventListener('load', () => {
  let long;
  let lat;
  let tempDescription = document.querySelector('.temperature-description');
  let tempDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');
  let wind = document.getElementById('windspeed');
  let humid = document.getElementById('humidity');
  let clouds = document.getElementById('cloudCover');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // use a proxy to bypass CORS
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/e08c38d69f2d1b363c47e63d63f75437/${lat},${long}`;

      fetch(api)
        .then(response => {
          //convert to json
          return response.json()
          .then(data => {
            console.log(data);
            const {temperature, summary, icon, humidity, cloudCover, windSpeed} = data.currently;
            // set DOM elements from the api
            tempDegree.textContent = temperature;
            tempDescription.textContent = summary;
            wind.textContent = "Windspeed: " + windSpeed;
            humid.textContent = "Humidity: " + humidity;
            clouds.textContent = "Cloud Cover: " + cloudCover;
            locationTimezone.textContent = data.timezone;
              // formula for celsius
              let celsius = (temperature - 32) * (5/9);
            // set icon
            setIcons(icon, document.querySelector('.icon'));

            // change temperature to celsius/Fahrenheit
            temperatureSection.addEventListener('click', () => {
              if (temperatureSpan.textContent === "F") {
                temperatureSpan.textContent = "C";
                tempDegree.textContent = Math.floor(celsius);
              } else {
                temperatureSpan.textContent = "F";
                tempDegree.textContent = temperature;
              }
            });

          });
        });
    });
  }
  function setIcons(icon, iconID) {
     const skycons = new Skycons({color: "white"});
     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
     skycons.play();
     return skycons.set(iconID, Skycons[currentIcon]);
  }
});
