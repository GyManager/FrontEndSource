import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Warning } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

function InformeMatriculaActual(props) {

    const fecha = props.fechaVencimiento.split("T", 1);


    const boxTypographyStyle = {
        sx: { display: "flex", flexDirection: "column", width: "100%", ml: 3 },
    };

    const Informe = (
        <>
        { props.check &&  <CheckIcon fontSize="large" /> }
        { props.close &&  <CloseIcon fontSize="large" /> }
        { props.warning &&  <Warning fontSize="large" /> }
        
            <Box {...boxTypographyStyle} >
                <Typography align="center">{props.mensaje}</Typography>
                <Typography align="center" >{fecha}</Typography>
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
                width: "300px",
            }}
        >
            {Informe}
        </Box>
    );
}

export default InformeMatriculaActual;
