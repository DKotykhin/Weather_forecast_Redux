import React from "react";
import { useDispatch } from "react-redux";

import { InputLabel, MenuItem, FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import cityList from './cityList.json';
import { citySelect, cityUpdate } from '../getWeather/getWeatherSlice';

import "./InputSelect.scss";

const InputSelect = () => {
    const [city, setCity] = React.useState('');    
    const dispatch = useDispatch();   

    const onCitySelect = (event) => {        
        setCity(event.target.value);
        dispatch(citySelect(event.target.value));        
    };

    const theme = createTheme({
        palette: {
            success: {
                main: '#a52a2a'
            }
        }
    });
      
    return (
        <div className="cityselector">
            <ThemeProvider theme={theme}>
                <FormControl color = 'success' style={{ width: 300 }}>
                    <InputLabel id="townLabel">Выберите город</InputLabel>
                    <Select
                        variant="standard"
                        labelId="townLabel"
                        //id="townSelect"
                        value={city}
                        label="Выберите город"
                        onChange={onCitySelect}
                        onClick={() => dispatch(cityUpdate())}
                    >
                        {cityList.cities.map((item, i) => {
                            return (
                                <MenuItem key={i} value={item}>
                                    {item}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>               
            </ThemeProvider>
        </div>
    );
};

export default InputSelect;
