import { fetchWeather } from "./fetchApi.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form");

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
        percipType.textContent = `${reportFields.percipType}`;

        const weatherIcon = document.querySelector("#weatherIcon");
        weatherIcon.src = weatherIcons[reportFields.icon] || "icons/default.svg";
        weatherIcon.alt = `${reportFields.icon};`
    });
})