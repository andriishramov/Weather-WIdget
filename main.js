const apiKey = "67c5775a4b4ed72bd8cd95239a59aca9";
const forecastWeather = `https://api.openweathermap.org/data/2.5/forecast?q={CITY_NAME}&appid=${apiKey}`;

let cityWeather = document.querySelector(".weather-item");
let cityWeatherCloud = document.querySelector(".weather-cloud")
let cloudIcon = document.querySelector(".cloud");
let cityName = document.querySelector(".city");
let weatherDate = document.querySelector('.weather-five-day');

window.addEventListener('load', (event) => {
        const url = forecastWeather.replace("{CITY_NAME}", 'Warsaw');
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                cityName.innerHTML = data.city.name;
                cityWeather.innerHTML = Math.round(data.list[0].main.temp - 273.15) + '&#176';
                cityWeatherCloud.innerHTML = data.list[0].weather[0]['description'];
                cloudIcon.innerHTML = '<img src="https://openweathermap.org/img/wn/' + data.list[0].weather[0]['icon'] + '@2x.png">';
            })
            .catch(error => console.log(error));
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let forecastHtml = "";

            // Loop through the forecast data and create HTML for each day
            for (let i = 0; i < data.list.length; i += 8) {
                const day = data.list[i];
                const date = new Date(day.dt * 1000);
                const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
                const description = day.weather[0].description;
                const temp = Math.round(day.main.temp - 273.15); // Convert temperature to Celsius

                forecastHtml += `
            <div class="weather-day">
              <div class="weather-date">${date.toLocaleDateString()}</div>
              <div class="weather-icon"><img src="${iconUrl}" alt="${description}" /></div>
              <div class="weather-description">${description}</div>
              <div class="weather-temp">${temp}°C</div>
            </div>
          `;
            }
            // Add the HTML to the widget
            weatherDate.innerHTML = forecastHtml;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });

})

const form = document.querySelector("#city-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const cityInput = document.querySelector("#city-input");
    const city = cityInput.value;

    if (city.length > 0) {
        const url = forecastWeather.replace("{CITY_NAME}", encodeURIComponent(city));
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                cityName.innerHTML = data.city.name;
                cityWeather.innerHTML = Math.round(data.list[0].main.temp - 273.15) + '&#176';
                cityWeatherCloud.innerHTML = data.list[0].weather[0]['description'];
                cloudIcon.innerHTML = '<img src="https://openweathermap.org/img/wn/' + data.list[0].weather[0]['icon'] + '@2x.png">';
            })
            .catch(error => console.log(error));
    }

})

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const cityInput = document.querySelector("#city-input");
    const city = cityInput.value;

    if (city.length > 0) {
        const url = forecastWeather.replace("{CITY_NAME}", encodeURIComponent(city));

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let forecastHtml = "";

                // Loop through the forecast data and create HTML for each day
                for (let i = 0; i < data.list.length; i += 8) {
                    const day = data.list[i];
                    const date = new Date(day.dt * 1000);
                    const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
                    const description = day.weather[0].description;
                    const temp = Math.round(day.main.temp - 273.15); // Convert temperature to Celsius

                    forecastHtml += `
            <div class="weather-day">
              <div class="weather-date">${date.toLocaleDateString()}</div>
              <div class="weather-icon"><img src="${iconUrl}" alt="${description}" /></div>
              <div class="weather-description">${description}</div>
              <div class="weather-temp">${temp}°C</div>
            </div>
          `;
                }
                // Add the HTML to the widget
                weatherDate.innerHTML = forecastHtml;
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });

        cityInput.value = "";
    }
});

