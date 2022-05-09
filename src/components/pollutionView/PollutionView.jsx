import * as React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

import "./pollutionView.css";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function PollutionView({ pollutiondata }) {
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { components, main } = pollutiondata;
    const airState = [
        "отлично",
        "хорошо",
        "удовлетворительно",
        "плохо",
        "очень плохо",
    ];
    //console.log(airState[main.aqi - 1]);
    //console.log(components);

    return (
      <div className="button">
          <Button color="success" onClick={handleOpen}>
              Состояние воздуха
          </Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                  <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                  >
                      Состояние воздуха
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <p>{airState[main.aqi - 1]}</p>
                      <p>{`Угарный газ: ${components.co} мкг/м`}</p>
                  </Typography>
              </Box>
          </Modal>
      </div>
    );
}
