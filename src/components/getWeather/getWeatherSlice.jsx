import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useFetchWeather } from "../../hooks/hookRequest";

const initialState = {    
    cityName: '',
    flag: false,
    process: 'waiting',
    data: {}    
};

export const fetchData = createAsyncThunk(
    'fetchdata',
    (cityName) => {
        const { getWeather } = useFetchWeather();        
        return getWeather(cityName);
    }
)

const getWeatherSlice = createSlice({
    name: 'getdata',
    initialState,
    reducers: {
        citySelect: (state, action) => {
            state.cityName = action.payload
        },
        cityUpdate: state => {
            state.flag = !state.flag
        }
    },
    extraReducers: (builder) => {        
        builder
            .addCase(fetchData.pending, state => {state.process = 'loading'})
            .addCase(fetchData.fulfilled, (state, action) => {
                state.process = 'loaded';
                state.data = action.payload;
                console.log(state.data)
            })
            .addCase(fetchData.rejected, state => {
                state.process = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = getWeatherSlice;

export default reducer;
export const {
    citySelect,
    cityUpdate,        
} = actions;