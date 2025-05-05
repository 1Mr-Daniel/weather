const API_KEY = "e0852b668837eea84ab49ed3f8d73f97";

// Get weather data
async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const [weatherRes, forecastRes] = await Promise.all([
            fetch(currentWeatherURL),
            fetch(forecastURL)
        ]);

        if (!weatherRes.ok || !forecastRes.ok) throw new Error("City not found");

        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();

        updateMainWeather(weatherData);
        updateHourlyForecast(forecastData);
    } catch (err) {
        alert("Error: " + err.message);
    }
}

// Instructional messages based on weather conditions
function getWeatherMessage(mainCondition) {
    const messages = {
        Thunderstorm: "⚡ Stormy skies — stay indoors!",
        Drizzle: "🌦 Light rain — a hoodie might do.",
        Rain: "🌧 Rainy — don’t forget your umbrella!",
        Snow: "❄️ Snowy — bundle up warmly!",
        Clear: "☀️ Clear skies — great day for a walk!",
        Clouds: "☁️ Cloudy — calm but overcast.",
        Mist: "🌫 Misty — drive with caution.",
        Smoke: "🌫 Smoky — avoid outdoor exercise.",
        Haze: "🌁 Hazy — take care outdoors.",
        Dust: "🌪 Dusty — wear a mask if sensitive.",
        Fog: "🌫 Foggy — low visibility ahead.",
        Sand: "🏜 Sandy — stay hydrated.",
        Ash: "🌋 Ash in air — avoid going outside.",
        Squall: "🌬 Windy squalls — secure loose items.",
        Tornado: "🌪 Tornado risk — seek shelter!"
    };

    return messages[mainCondition] || "🌍 Weather info is loading...";
}

// Display main weather
function updateMainWeather(data) {
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const condition = data.weather[0].main;
    const message = getWeatherMessage(condition);

    // Update main icon
    document.getElementById("main-icon").src = iconUrl;

    // Show instruction message below the icon
    const iconElement = document.getElementById("main-icon");
    let instruction = document.getElementById("weather-instruction");

    if (!instruction) {
        instruction = document.createElement("p");
        instruction.id = "weather-instruction";
        instruction.style.color = "white";
        instruction.style.fontSize = "14px";
        instruction.style.fontWeight = "600";
        instruction.style.marginTop = "10px";
        iconElement.parentNode.insertBefore(instruction, iconElement.nextSibling);
    }
    instruction.innerText = message;

    // Update temp-div
    document.getElementById("temp-div").innerHTML = `
        <h3 style="font-size: 20px; color: white; font-weight: 700;">${data.main.temp} °C</h3>
        <img src="${iconUrl}" alt="temp-icon" style="width: 50px;">
        <p style="font-size: 14px; font-weight: 600; color: white;">${data.weather[0].description}</p>
    `;

    // Update weather-info
    document.getElementById("weather-info").innerHTML = `
        <p style="font-size: 14px; font-weight: 600; color: white;">Humidity: ${data.main.humidity}%</p>
        <p style="font-size: 14px; font-weight: 600; color: white;">Wind: ${data.wind.speed} m/s</p>
        <p style="font-size: 14px; font-weight: 600; color: white;">Pressure: ${data.main.pressure} hPa</p>
    `;
}

// Display hourly forecast
function updateHourlyForecast(data) {
    let hourlyHTML = "";

    for (let i = 0; i < 5; i++) {
        const forecast = data.list[i];
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const time = forecast.dt_txt.split(" ")[1].slice(0, 5);

        hourlyHTML += `
            <div style="min-width: 90px; text-align: center; color: white; font-weight: 700;">
                <img src="${iconUrl}" style="width: 45px; margin-bottom: 5px;">
                <div style="font-size: 13px;">${time}</div>
                <div style="font-size: 14px;">${forecast.main.temp}°C</div>
            </div>
        `;
    }

    document.getElementById("forecast-scroll").innerHTML = hourlyHTML;
}


const myArr = ["Georgina", "Daniel", "Ayodeji"];

const [female, male, instructor] = myArr;

console.log(male); 

