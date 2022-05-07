import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getCityCoordinates, getCityWeather, getCityPollution } from "../components/getData/GetData";
//import { process } from "../actions/actions";
import { process } from '../components/getWeather/getWeatherSlice'


export const useFetchWeather = () => {
    const dispatch = useDispatch();

    const getWeather = useCallback(
        async(cityName) => {
            try {
                dispatch(process('loading'))

                const coords = await getCityCoordinates(cityName);
                const { lat, lon } = coords;

                const [weatherData, pollutionData] = await Promise.all([
                    getCityWeather(lat, lon),
                    getCityPollution(lat, lon),
                ]);

                //dispatch(process('loaded'))
                return { weatherData, pollutionData };
            } catch {
                dispatch(process('error'))
                console.log("error");
                return null;
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [getCityCoordinates]
    );

    return { getWeather };
};