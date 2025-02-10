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
            percipType : currentConditions.preciptype ? currentConditions.preciptype[0] : "None"
        };

        console.log("Process data: ", reportFields);
        return reportFields;
    

    } catch (error) {
        console.error("There is something wrong: ", error);
        alert(error.message);

        return null
    }
};


fetchWeather(64131);