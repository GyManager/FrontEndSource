import { Box, Button } from "@mui/material";
import React from "react";

const boxStyle = {
    sx:{
        display:'flex',
        flexDirection:'column',
    }
}

const buttonStyle = {
    variant:'contained',
    sx:{
        mb:2,
        mx:3

    }
    }


function EjerciciosSeguidos(props) {
    return (
        <Box {...boxStyle}>
            {props.ejercicios.map((unEjercicio) => {
                return <Button {...buttonStyle}>{unEjercicio.nombre}</Button>;
            })}
        </Box>
    );
}

export default EjerciciosSeguidos;
