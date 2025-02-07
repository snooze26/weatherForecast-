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
        if (weatherData.currentConditions.length === 0) {
            throw new Error(`That location is not found`);
        };
        
        // get weather report current conditions and those fields 
        // current conditions 
        let currentConditions = weatherData.currentConditions;
        
        // the fields 
        let temp = currentConditions.temp;
        let feelsLike = currentConditions.feelslike;
        let dateTime = currentConditions.datetime; 
        let description = weatherData.description;
        let percipType = currentConditions.preciptype[0];


        console.log({temp, feelsLike, dateTime, description, percipType});

    

    } catch (error) {
        console.error("There is something wrong: ", error);
        alert(error.message);
    }
};


fetchZipcode(64131);
