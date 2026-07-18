// const apiKey = "475290c56462be6c690963bd17bb2398";

// const lat = 5.4833;
// const lon = 7.0333;

// const weatherUrl =
// `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// async function getWeather(){

// const response = await fetch(weatherUrl);

// const data = await response.json();

// document.querySelector("#temperature").textContent =
// `${Math.round(data.list[0].main.temp)}°C`;

// document.querySelector("#description").textContent =
// data.list[0].weather[0].description;

// const forecast = document.querySelector("#forecast");

// forecast.innerHTML="";

// for(let i=8;i<=24;i+=8){

// const day=document.createElement("p");

// day.textContent=
// `${Math.round(data.list[i].main.temp)}°C`;

// forecast.appendChild(day);

// }

//    try{

// const response=await fetch(weatherUrl);

// if(!response.ok){
// throw new Error("Weather failed");
// }

// const data=await response.json();

// }
// catch(error){

// console.error(error);

// }

// }

// getWeather();




const apiKey = "475290c56462be6c690963bd17bb2398";

const lat = 5.4833;
const lon = 7.0333;

const weatherUrl =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {

    try {

        const response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error(`Weather API Error: ${response.status}`);
        }

        const data = await response.json();

        document.querySelector("#temperature").textContent =
            `${Math.round(data.list[0].main.temp)}°C`;

        document.querySelector("#description").textContent =
            data.list[0].weather[0].description;

        const forecast = document.querySelector("#forecast");

        forecast.innerHTML = "";

        for (let i = 8; i <= 24; i += 8) {

            const day = document.createElement("p");

            day.textContent =
                `${Math.round(data.list[i].main.temp)}°C`;

            forecast.appendChild(day);
        }

    } catch (error) {

        console.error("Weather Error:", error);

        document.querySelector("#temperature").textContent = "Unavailable";
        document.querySelector("#description").textContent =
            "Weather data unavailable";
    }
}

getWeather();