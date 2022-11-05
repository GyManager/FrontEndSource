import { Box, Button } from "@mui/material";
import React from "react";

function EjerciciosSeguidos(props) {
    return (
        <Box {...props.boxStyle}>
            {props.ejercicios.map((unEjercicio) => {
                return <Button {...props.buttonStyle}>{unEjercicio.nombre}</Button>;
            })}
        </Box>
    );
}

export default EjerciciosSeguidos;
