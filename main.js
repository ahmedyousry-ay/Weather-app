const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "8659276757e75604fdc99d9b0195adac",
    loc_api : "156.213.58.91"
}

let weather = {};

let mainClass = "";

const app_container = document.querySelector(".app-container");

const weather_location = document.querySelector("#location");
const date = document.getElementById("date");

const temperature_current = document.getElementById("temperature-current");
const temperature_max_min = document.getElementById("temperature-max-min");
const _weather = document.querySelector("#weather");
const weather_desc = document.querySelector("#weather-desc");


document.addEventListener("DOMContentLoaded", () => {
    firstCity();
    addCity();
});

// Add The Default City
const firstCity = () => {
    fetch("https://geolocation-db.com/json/")
        .then((res) => res.json()).then((result) => {
            // console.log(result);
            getWeatherData(result.city);
        });
};


const addCity = () => {
    const searchInput = document.querySelector(".search-bar");
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            getWeatherData(searchInput.value);
        };
    });
};


const getWeatherData = (city) => {
    fetch(
        `${api.base}weather?q=${city}&units=metric&appid=${api.key}`
    ).then((res) => res.json()).then(result => {
        
        weather = { ...result };
        
        fillData(weather);

    });
    
}

const fillData = (weather) => {

    // add background Image 
    if (typeof weather.main !== "undefined") {
        if (weather.main.temp > 18) {
            mainClass = "hot";
        }
        else {
            mainClass = 'cold';
        }
    }
    app_container.className = mainClass;


    weather_location.textContent = weather.name + " , " + weather.sys.country;
    
    date.textContent = dateBuild( new Date());
    temperature_current.textContent =
        `Current Temperature: ${Math.round(weather.main.temp)} C`;
    
    temperature_max_min.textContent = `High: ${Math.round(weather.main.temp_max)} C / Low: ${Math.round(weather.main.temp_min)} C`;

    _weather.textContent = weather.weather[0].main;

    weather_desc.textContent = `${weather.weather[0].description}  , Wind speed is ${weather.wind.speed}`
};

// Date
const dateBuild =  (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);  //Nov 29 2025
    return date;
}

