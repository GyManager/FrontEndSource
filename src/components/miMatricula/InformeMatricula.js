import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

function InformeMatriculaActual(props) {

    const fechaVencimientoMatriculaActual = props.fechaVencimiento.split("T", 1);


    const boxTypographyStyle = {
        sx: { display: "flex", flexDirection: "column", width: "100%", ml: 3 },
    };

    const siTiene = (
        <>
            <CheckIcon fontSize="large" />
            <Box {...boxTypographyStyle}>
                <Typography align="center">{props.mensaje}</Typography>
                <Typography align="center">{fechaVencimientoMatriculaActual}</Typography>
            </Box>
        </>
    );
    const noTiene = (
        <>
            <CloseIcon fontSize="large" />
            <Box {...boxTypographyStyle}>
                <Typography align="center">No tenes una matricula vigente</Typography>
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
            {tieneMatriculaVigente ? siTiene : noTiene}
        </Box>
    );
}

export default InformeMatriculaActual;
