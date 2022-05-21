import { Grid } from "@mui/material";
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer } from '@mui/material';

import { getForecastParams, getForecastData} from './forecastData';

const ForecastView = ({ forecastdata }) => {
  const { daily } = forecastdata;

  return (
    <Grid container>
      {daily.map((item, i) => {
        const {          
          humidity,          
          clouds,
          rain,
          uvi,        
          weather,
        } = item;

        const {
          newPressure,
          dayTemp,
          nightTemp,
          newWindSpeed,
          newWindDirect,
          newPop,
          forecastDay,
        } = getForecastParams(item, forecastdata);

          const { descr, icon } = getForecastData(weather);

        const forecastItem = [
          { name: "Днём: ", value: dayTemp + " °С" },
          { name: "Ночью: ", value: nightTemp + " °С" },
          { name: "Давление: ", value: newPressure + " мм рт ст" },
          { name: "Облачность: ", value: clouds ? clouds + " %" : "ясно" },
          { name: "Влажность: ", value: humidity + " %" },
          { name: "Осадки: ", value: rain ? rain.toFixed(1) + " мм" : 0 },
          { name: "Вероятность: ", value: newPop + " %" },
          {
            name: "Скорость ветра: ",
            value: newWindSpeed ? newWindSpeed + " м/с" : "безветренно",
          },
          { name: "Ветер: ", value: newWindDirect },
          { name: "UV индекс: ", value: uvi ? uvi.toFixed(1) : uvi },
        ];

        return (
          <Grid key={i} item xs={12} md={6} xl={3} className="current_view">
            <TableContainer className="table forecast_table">            
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} className='table_row'>
                      Прогноз погоды
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className='table_row'>
                      {forecastDay}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className='table_row'>
                      <img
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt={icon}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className='table_row padding_row'>
                      {descr}
                    </TableCell>
                  </TableRow>                  
                  </TableHead>
                  <TableBody>
                  {forecastItem.map((item, i) => {
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
        );
      })}
    </Grid>
  );
};

export default ForecastView;