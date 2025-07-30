const input = document.querySelector("input");
const button = document.querySelector("button");

const cityName = document.querySelector(".weather-card h3");
const temp = document.getElementById("temp");
const feels = document.getElementById("feels");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");
const icon = document.getElementById("icon");

const API_KEY = "92596d3bb3e563c9c822080fc27bf473"; 

button.addEventListener("click", () => {
  const city = input.value.trim();
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      cityName.textContent = data.name;
      temp.textContent = `Temperature: ${data.main.temp} °C`;
      feels.textContent = `Feels Like: ${data.main.feels_like} °C`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      condition.textContent = `Condition: ${data.weather[0].description}`;

      // ✅ Show weather icon
      const iconCode = data.weather[0].icon;
      icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      icon.style.display = "block";
    })
    .catch(() => {
      alert("Error fetching weather data!");
    });
});
