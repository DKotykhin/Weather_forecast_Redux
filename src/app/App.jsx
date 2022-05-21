import React from "react";
import AppHeader from "../components/appHeader/AppHeader";
import GetWeather from "../components/getWeather/getWeather";
import InputSelect from "../components/inputSelect/InputSelect";

function App() {
    return (
        <div>            
            <AppHeader />
            <InputSelect />
            <GetWeather/>            
        </div>
    );
}

export default App;
