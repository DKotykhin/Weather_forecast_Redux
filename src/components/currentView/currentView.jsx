import { Grid, Typography, Box } from "@mui/material";
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer } from '@mui/material';

import { getWeatherData, getWeatherParams } from "./currentData";

const CurrentView = ({ currentdata }) => {
  const [ weatherData, lastupd, cityName, localData, localTime] = currentdata;
  const { current } = weatherData
  const { humidity, clouds, uvi } = current;
  const { descr, icon } = getWeatherData(current.weather);
  const {
    newPressure,
    newTemp,
    newFeels,
    newDewPoint,
    newWindSpeed,
    newWindDirect,
    newVisibility,
    newSunrise,
    newSunset,
    dayDuration,
  } = getWeatherParams(weatherData);

  
  const currentItem_1 = [
    { name: "Местное время: ", value: localTime },
    { name: "Рассвет: ", value: newSunrise },
    { name: "Закат: ", value: newSunset },
    { name: "Длительность дня: ", value: dayDuration },
  ];

  const currentItem_2 = [
    { name: "Температура: ", value: newTemp + " °С" },
    { name: "Чувствуется как: ", value: newFeels + " °С" },
    { name: "Влажность: ", value: humidity + " %" },
    { name: "Давление: ", value: newPressure + " мм рт ст" },
    { name: "Точка росы: ", value: newDewPoint + " °С" },
  ];

  const currentItem_3 = [
    {
      name: "Скорость ветра: ",
      value: newWindSpeed ? newWindSpeed + " м/с" : "безветренно",
    },
    { name: "Ветер: ", value: newWindDirect },
    { name: "Облачность: ", value: clouds ? clouds + " %" : "ясно" },
    { name: "Видимость: ", value: newVisibility + " км" },
    { name: "UV индекс: ", value: uvi ? uvi.toFixed(1) : uvi },
  ];

  return (
    <Box className="current_view">
      <Typography className="last_upd">Последнее обновление: {lastupd}</Typography>
      <Grid container>
        <Grid item xs={12} md={6} xl={3}>
          <Box className="city_box">
            <Typography className='city_name'>{cityName}</Typography>
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={icon}
            />
            <Typography className='city_name'>{descr}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <TableContainer className="table">
            <Table>
              <TableHead>
                <TableRow>                
                  <TableCell colSpan={2} className='table_row'>
                    {localData}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItem_1.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className='table_cell_item'>{item.name}</TableCell>
                      <TableCell className='table_cell_item item_2'>{item.value}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <TableContainer className="table">
            <Table>
              <TableBody>
                {currentItem_2.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className='table_cell_item'>{item.name}</TableCell>
                      <TableCell className='table_cell_item item_2'>{item.value}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
        <TableContainer className="table">
            <Table>
              <TableBody>
                {currentItem_3.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className='table_cell_item'>{item.name}</TableCell>
                      <TableCell className='table_cell_item item_2'>{item.value}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CurrentView;
