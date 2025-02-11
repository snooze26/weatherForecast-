import { fetchWeather } from "./fetchApi.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form");
    // animate icon off load of dom load
    const weatherIcon = document.querySelector(".weatherIcon");
    
    setTimeout(startAnimation, 500);
    setTimeout(stopAnimation, 5000);

    function startAnimation() {
        weatherIcon.classList.add('img');
    }

    function stopAnimation() { 
        weatherIcon.classList.remove('img');
        void weatherIcon.offsetWidth;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const locationInput = document.querySelector("#searchInput").value;


        const result = await fetchWeather(locationInput);
        console.log("results: ", result);

        const {reportFields, weatherIcons} = result; 
        console.log("WD", reportFields);
        console.log("WI: ", weatherIcons);


        // retrieve data row cells
        const temp = document.querySelector("#tempData");
        temp.textContent = `${reportFields.temp}\u00B0F`;

        const feelsLike = document.querySelector("#feelsLikeData");
        feelsLike.textContent = `${reportFields.feelsLike}\u00B0F`;
        
        const dateTime = document.querySelector("#dateTimeData");
        dateTime.textContent = `${reportFields.dateTime}`;

        const description = document.querySelector("#descriptionData");
        description.textContent = `${reportFields.description}`;

        const percipType = document.querySelector("#percipTypeData");
        percipType.textContent = `${reportFields.percipType.charAt(0).toUpperCase() + reportFields.percipType.slice(1)}`;


        weatherIcon.src = weatherIcons[reportFields.icon] || "icons/default.svg";
        weatherIcon.alt = `${reportFields.icon};`
        // set off animation for icon 
        weatherIcon.onload = () => {
            setTimeout(startAnimation, 500);
            setTimeout(stopAnimation, 5000);
        }
    });
})

