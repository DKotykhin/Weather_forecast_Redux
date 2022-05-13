import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";
import "moment/locale/ru";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import CurrentView from "../currentView/currentView";
import ForecastView from "../forcastView/forcastView";
import { fetchData } from "../getWeather/getWeatherSlice";

import "./getWeather.css";

const GetWeather = () => {
    const [localTime, setLocalTime] = useState(null);
    const [localData, setLocalData] = useState(null);
    const [lastupd, setLastupd] = useState(null);
    
    const dispatch = useDispatch();

    const cityName = useSelector(state => state.cityName);
    const flag = useSelector(state => state.flag);
    const process = useSelector(state => state.process);
    const data = useSelector(state => state.data);
    const { weatherData } = data;

    useEffect(() => {
        if (cityName) {
            dispatch(fetchData(cityName))
        }        
    }, [flag, cityName, dispatch])

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