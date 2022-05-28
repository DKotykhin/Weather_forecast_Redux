import { configureStore } from '@reduxjs/toolkit';

import getdata from '../components/getWeather/getWeatherSlice';

const store = configureStore({
  reducer: { getdata },
  devTools: process.env.NODE_ENV !== 'production'  
});

export default store;
