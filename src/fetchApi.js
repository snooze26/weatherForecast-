export async function fetchWeather(zipCode) {
    // capture zipcode in api
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}?unitGroup=us&key=XDMJ5JHTFD5JRG59BXPBFECYS&contentType=json`
    const myHeaders = new Headers(); 
    // create headers 
    myHeaders.append("content-type", "application/json");
    
    // create request 
    const request = new Request(url, {
        method : "GET", 
        mode : "cors"
    })
    
    // check for response then do stuff 
    try {
        const response = await fetch(request);

        //check for error
        if (!response.ok){
            throw new Error('Error! Please enter a valid zip code');
        }
        // parse data
        const weatherData = await response.json();

        //check for empty json 
        if (!weatherData.currentConditions) {
            throw new Error(`That location is not found`);
        };
        
        // get weather report current conditions and those fields 
        // current conditions 
        const currentConditions = weatherData.currentConditions;
        const reportFields = {
                    // the fields 
            temp : currentConditions.temp,
            feelsLike : currentConditions.feelslike,
            dateTime : currentConditions.datetime, 
            description : weatherData.description || "No description available",
            percipType : currentConditions.preciptype ? currentConditions.preciptype[0] : "None",
            icon: currentConditions.icon
        };
        
        // map for weather icons 
        const weatherIcons = {
            'clear-day' : 'icons/clear-day.svg', 
            'clear-night' : 'icons/clear-night.svg',
            'cloudy' : 'icons/cloudy.svg',
            'default' : 'icons/default.svg',
            'fog' : 'icons/fog.svg', 
            'hail' : 'icons/hail.svg',
            'rain' : 'icons/rain.svg',
            'snow' : 'icons/snow.svg', 
            'thunderstorm' : 'icons/thunderstorm.svg',
            'tornado' : 'icons/tornado.svg',
            'wind' : 'icons/wind.svg'
        };

        console.log("Process data: ", reportFields);
        console.log("Proccess icons: ", weatherIcons);

        return {reportFields, weatherIcons};
    
    

    } catch (error) {
        console.error("There is something wrong: ", error);
        alert(error.message);

        return null
    }
};



// fetchWeather(64131);
