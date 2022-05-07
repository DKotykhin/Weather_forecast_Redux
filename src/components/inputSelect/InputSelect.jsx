import React from "react";

import { useDispatch } from "react-redux";
import { InputLabel, MenuItem, FormControl } from "@mui/material";
import { Select } from "@mui/material";
//import { Button, Stack } from "@mui/material";
import cityList from './cityList.json';
// import { citySelect, cityUpdate } from '../../actions/actions';
import { citySelect, cityUpdate } from '../getWeather/getWeatherSlice';

import "./InputSelect.css";

const InputSelect = () => {
    const [city, setCity] = React.useState('');    
    const dispatch = useDispatch();   

    const onCitySelect = (event) => {        
        setCity(event.target.value);
        dispatch(citySelect(event.target.value));        
    };
      
    return (
        <div className="boxSelector">
            <FormControl color="success" style={{ width: 300 }}>
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
            {/* <Stack className="button">
        <Button color="success" variant="outlined" onClick={ButtonChange}>
          Refresh
        </Button>
      </Stack> */}
        </div>
    );
};

export default InputSelect;
