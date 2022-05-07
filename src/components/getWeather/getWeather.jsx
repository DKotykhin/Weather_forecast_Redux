import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/ru";

import { useFetchWeather } from "../../hooks/hookRequest";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import CurrentView from "../currentView/currentView";
import ForecastView from "../forcastView/forcastView";
//import { loaded } from "../../actions/actions";
import { loaded } from "../getWeather/getWeatherSlice";

import "./getWeather.css";

const GetWeather = () => {
    const [localTime, setLocalTime] = useState(null);
    const [localData, setLocalData] = useState(null);
    const [lastupd, setLastupd] = useState(null);
    const [weatherData, setWeatherData] = useState({});

    const dispatch = useDispatch();

    const cityName = useSelector(state => state.cityName);
    const flag = useSelector(state => state.flag);
    const process = useSelector(state => state.process);

    const { getWeather } = useFetchWeather();

    useEffect(() => {
        if (cityName) {            
            getWeather(cityName)
            .then((weather) => {
                if (!weather) return;
                setWeatherData(weather.weatherData);                                
                console.log("pollutionData :>> ", weather.pollutionData);
                console.log("weatherData :>> ", weather.weatherData);
            })
            .then(() => dispatch(loaded()))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flag]);

    useEffect(() => {        
        const timeOut = setInterval(() => updateTime(), 10000);
        return () => clearInterval(timeOut);
    });

    useEffect(() => {              
        updateTime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weatherData.timezone_offset]);

    const updateTime = () => {               
        if (process === "loaded") {
            const {
                timezone_offset,
                current: { dt }
            } = weatherData;            
            setLocalTime(
                moment.utc().add(timezone_offset, "seconds").format("LT")
            );
            setLocalData(
                moment
                    .utc()
                    .add(timezone_offset, "seconds")
                    .format("dddd DD MMMM")
            );
            setLastupd(moment.unix(dt).startOf().fromNow());
        }
    };
    
    const setContent = (process) => {        
        switch (process) {
            case "waiting":
                return null;
            case "loading":
                return <Spinner />;
            case "loaded":
                return (
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
                );
            case "error":
                return <ErrorMessage />;
            default:
                throw new Error("Unexpected process state");
        }
    };

    return <div>{setContent(process)}</div>;
};

export default GetWeather;