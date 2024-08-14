const apiKey = "2934727af86055d0c5a3785c983c9786"; // Get your API key from OpenWeatherMap

document.getElementById("search-button").addEventListener("click", () => {
  const location = document.getElementById("location-input").value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Display weather data in HTML elements
      document.getElementById(
        "city-country"
      ).textContent = `${data.name}, ${data.sys.country}`;

      const timeZone = data.timezone / 3600; // Convert seconds to hours

      const coordinates = `Lat: ${data.coord.lat}, Lon: ${data.coord.lon}`;
      document.getElementById("location-info").textContent = `Time Zone: UTC${
        timeZone > 0 ? `+${timeZone}` : timeZone
      } | ${coordinates}`;

      document.getElementById("temp-details").textContent = `${(
        data.main.temp - 273.15
      ).toFixed(2)}°C`;

      document.getElementById("weather-details").textContent =
        data.weather[0].description;

      // Set the weather icon
      const weatherIcon = document.getElementById("weather-icon");
      const iconCode = data.weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;

      // Inside the fetch callback, change the background image based on weather conditions
      const body = document.body;
      if (data.weather[0].main === "Clear") {
        body.style.backgroundImage = "url(Images/clear-sky.jpg)";
      } else if (data.weather[0].main === "Clouds") {
        body.style.backgroundImage = "url(Images/cloudy.jpg)";
      } else if (data.weather[0].main === "Mist") {
        body.style.backgroundImage = "url(Images/mist.jpeg)";
      } else if (data.weather[0].main === "Haze") {
        body.style.backgroundImage = "url(Images/Haze.jpeg)";
      } else if (data.weather[0].main === "Rain") {
        body.style.backgroundImage = "url(Images/Rain.jpeg)";
      } else if (data.weather[0].main === "Drizzle") {
        body.style.backgroundImage = "url(Images/drizzle.webp)";
      } else if (data.weather[0].main === "Thunderstorm") {
        body.style.backgroundImage = "url(Images/Thunderstrorm-Rain.jpg)";
      } else if (data.weather[0].main === "Smoke") {
        body.style.backgroundImage = "url(Images/smoke.jpeg)";
      } else {
        body.style.backgroundColor = "aquaBlue";
      }

      // Reset error message
      document.getElementById("error-message").textContent = "";
    })

    .catch((error) => {
      console.error(error);
      // Handle error here (e.g., display an error message to the user)
      document.getElementById("error-message").textContent =
        "Location not found or network issue.";
    });
});
