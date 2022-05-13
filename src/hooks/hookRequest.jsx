import { getCityCoordinates, getCityWeather, getCityPollution } from "../components/getData/GetData";

export const useFetchWeather = () => {
    
    const getWeather = async(cityName) => {
            try {
                const coords = await getCityCoordinates(cityName);
                const { lat, lon } = coords;

                const [weatherData, pollutionData] = await Promise.all([
                    getCityWeather(lat, lon),
                    getCityPollution(lat, lon),
                ]);
               
                return { weatherData, pollutionData };
            } catch (error) {                
                console.log('Error: ' + error.message)
                return null;
            }            
        }

    return { getWeather };
};