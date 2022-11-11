import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

function InformeMatriculaFutura(props) {
    let tieneMatriculaFutura;
    tieneMatriculaFutura = props.fechaInicio !== "No tenes una matricula a futuro" ? true : false;

    const fechaInicioMatriculaFutura = props.fechaInicio.split("T", 1);

    const boxTypographyStyle = {
        sx: { display: "flex", flexDirection: "column", width: "100%", ml: 3 },
    };

    const siTiene = (
        <>
            <CalendarMonthIcon fontSize="large" />
            <Box {...boxTypographyStyle}>
                <Typography align={"center"}>Tenés una matricula futura desde el: </Typography>
                <Typography align={"center"}>{fechaInicioMatriculaFutura} </Typography>
            </Box>
        </>
    );
    const noTiene = (
        <>
            <CloseIcon fontSize="large" />
            <Box {...boxTypographyStyle}>
                <Typography align={"center"}>No tenes una matricula a futuro.</Typography>
                <Typography align={"center"}>Recorda matricularte a tiempo!!! </Typography>
            </Box>
        </>
    );
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                mt: "7%",
                width: "100%",
            }}
        >
            {tieneMatriculaFutura ? siTiene : noTiene}
        </Box>
    );
}

export default InformeMatriculaFutura;
