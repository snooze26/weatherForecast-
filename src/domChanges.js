import { fetchWeather } from "./fetchApi.js";

export function domChanges() {
  // capture the input from the search 
  const searchBtn = document.querySelector("#searchBtn");
  const searchInput = document.querySelector("#searchInput");
  

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const zipCode = searchInput.value;
    const weather = fetchWeather(zipCode);
    console.log(weather);   
  })
}

domChanges();