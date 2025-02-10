import { fetchWeather } from "./fetchApi.js";
export function weatherReportData(temp, feelsLike, dateTime, description, percipType) {
    this.temp = temp;
    this.feelsLike = feelsLike;
    this.dateTime = dateTime;
    this.description = description;
    this.percipType = percipType; 

    async function getWeatherData(zipCode) { 
        const data = await fetchWeather(zipCode);
    
        if (!data) {
            throw new Error("Trouble fetching weather report");
        };
    
        return {
            temp : data.temp,
            feelsLike : data.feelsLike,
            dateTime : data.dateTime, 
            description : data.description, 
            percipType : data.percipType
        };
    }
};







