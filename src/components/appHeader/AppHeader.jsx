import { Container } from "@mui/material";

import weather_image from "./weather.png";

import "./AppHeader.scss";

const Header = () => {
    return (
        <Container maxWidth='xl'>
            <div className="header">
                <img src={weather_image} alt="weather" /> Weather Forecast
            </div>
        </Container>
    );
};

export default Header;
