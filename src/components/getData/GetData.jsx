import axios from "axios";

const appKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

const instance = axios.create({
    baseURL: "https://api.openweathermap.org/",
});

const getCityCoordinates = async (cityName) => {
    const result = await instance.get("geo/1.0/direct", {
        params: {
            q: cityName,
            appid: appKey,
        },
    });
    return result.data[0];
};

const getCityWeather = async (latitude, lontitude) => {
    const result = await instance.get("data/2.5/onecall", {
        params: {
            lang: 'ru',
            lat: latitude,
            lon: lontitude,
            appid: appKey,
        },
    });
    return result.data;
};

const getCityPollution = async (latitude, lontitude) => {
    const result = await instance.get("data/2.5/air_pollution", {
        params: {
            lang: 'ru',
            lat: latitude,
            lon: lontitude,
            appid: appKey,
        },
    });
    return result.data.list[0];
};

export { getCityCoordinates, getCityWeather, getCityPollution };
