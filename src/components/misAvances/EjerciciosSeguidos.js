import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function EjerciciosSeguidos(props) {
    const navigate = useNavigate();

    return (
        <Box {...props.boxStyle}>
            {props.ejercicios.map((unEjercicio) => {
                return (
                    <Button
                        {...props.buttonStyle}
                        onClick={() => {
                            navigate("./ejercicio/" + unEjercicio.idEjercicio);
                        }}
                    >
                        {unEjercicio.nombre}
                    </Button>
                );
            })}
        </Box>
    );
}

export default EjerciciosSeguidos;
