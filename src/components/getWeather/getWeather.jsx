import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";
import "moment/locale/ru";

import { useFetchWeather } from "../../hooks/hookRequest";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import CurrentView from "../currentView/currentView";
import ForecastView from "../forcastView/forcastView";
import {
    cityNameSelector,
    flagSelector,
    processSelector,
    loaded,    
} from "../getWeather/getWeatherSlice";

import "./getWeather.css";

const GetWeather = () => {
    const [localTime, setLocalTime] = useState(null);
    const [localData, setLocalData] = useState(null);
    const [lastupd, setLastupd] = useState(null);
    const [weatherData, setWeatherData] = useState({});

    const dispatch = useDispatch();

    const cityName = useSelector(cityNameSelector);
    const flag = useSelector(flagSelector);
    const process = useSelector(processSelector);

    const { getWeather } = useFetchWeather();

    useEffect(() => {
        if (cityName) {
            getWeather(cityName).then((weather) => {
                //if (!weather) return;
                setWeatherData(weather.weatherData);
                console.log("pollutionData :>> ", weather.pollutionData);
                console.log("weatherData :>> ", weather.weatherData);
            });
        }
    }, [flag, cityName, getWeather]);

    const updateTime = useCallback(() => {
        if (process === "loaded") {
            const {
                timezone_offset,
                current: { dt },
            } = weatherData;
            setLocalTime(
                moment.utc().add(timezone_offset, "seconds").format("LT")
            );
            setLocalData(
                moment.utc().add(timezone_offset, "seconds").format("dddd DD MMMM")
            );
            setLastupd(
                moment.unix(dt).startOf().fromNow());
        }
    }, [weatherData, process]);

    useEffect(() => {
        if (Object.keys(weatherData).length > 0) {
            dispatch(loaded());                       
        }
    }, [weatherData, dispatch]);
    
    useEffect(() => {                   
        updateTime();       
    }, [weatherData, updateTime]);

    useEffect(() => {
        const timeOut = setInterval(() => updateTime(), 10000);
        return () => clearInterval(timeOut);
    });

    return (
        <div>
            {process === "loading" && <Spinner />}
            {process === "error" && <ErrorMessage />}
            {process === "loaded" && (
                <>
                    <CurrentView
                        currentdata={[
                            weatherData,
                            lastupd,
                            cityName,
                            localData,
                            localTime,
                        ]}
                    />
                    <ForecastView forecastdata={weatherData} />
                </>
            )}
        </div>
    );
};

export default GetWeather;