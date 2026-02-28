const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const resultBox = document.getElementById("result");
const cityButtons = document.querySelectorAll(".city-btn");

// Fetch Weather from wttr.in
function getWeather(city) {
  resultBox.innerHTML = "<p class='loading'>Loading...</p>";

  fetch(`https://wttr.in/${city}?format=j1`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.current_condition) {
        throw new Error("City not found");
      }

      localStorage.setItem("lastCity", city);

      const weather = data.current_condition[0];

      resultBox.innerHTML = `
                <h2>${city}, Pakistan</h2>
                <p><strong>🌡 Temperature:</strong> ${weather.temp_C}°C</p>
                <p><strong>🌥 Description:</strong> ${weather.weatherDesc[0].value}</p>
                <p><strong>💧 Humidity:</strong> ${weather.humidity}%</p>
            `;
    })
    .catch(() => {
      resultBox.innerHTML = "<p class='error'>City not found</p>";
    });
}

// Search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

// Enter key support
cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Quick city buttons
cityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const city = button.textContent;
    cityInput.value = city;
    getWeather(city);
  });
});

// Load last searched city
window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    cityInput.value = lastCity;
    getWeather(lastCity);
  }
});
