import { fetchWeather } from "./fetchApi.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form");
    const table = document.querySelector("#weatherDataBody");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const locationInput = document.querySelector("#searchInput").value;

        console.log(locationInput);

        const weatherData = await fetchWeather(locationInput);

        // retrieve data row cells
        const temp = document.querySelector("#tempData");
        temp.textContent = `${weatherData.temp}\u00B0F`;

        const feelsLike = document.querySelector("#feelsLikeData");
        feelsLike.textContent = `${weatherData.feelsLike}\u00B0F`;
        
        const dateTime = document.querySelector("#dateTimeData");
        dateTime.textContent = `${weatherData.dateTime}`;

        const description = document.querySelector("#descriptionData");
        description.textContent = `${weatherData.description}`;

        const percipType = document.querySelector("#percipTypeData");
        percipType.textContent = `${weatherData.percipType}`;

    });
})