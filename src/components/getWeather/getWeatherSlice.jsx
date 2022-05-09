import { createSlice } from "@reduxjs/toolkit";

const initialState = {    
    cityName: '',
    flag: false,
    process: 'waiting'
};

const getWeatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        citySelect: (state, action) => {
            state.cityName = action.payload
        },
        cityUpdate: state => {
            state.flag = !state.flag
        },
        process: (state, action) => {
            state.process = action.payload
        },
        loaded: state => {
            state.process = 'loaded'
        }
    }
});

const {actions, reducer} = getWeatherSlice;

export default reducer;
export const {
    citySelect,
    cityUpdate,
    process,
    loaded
} = actions

export const cityNameSelector = (state) => state.cityName;
export const flagSelector = (state) => state.flag;
export const processSelector = (state) => state.process;