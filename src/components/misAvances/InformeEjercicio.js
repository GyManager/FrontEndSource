import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { Box, Container, Paper, Typography } from "@mui/material";
import VistaInforme from "./VistaInforme";

import { AvancesContext } from "../../context/AvancesContext";

function InformeEjercicio() {
    const { avanceEjercicios } = useContext(AvancesContext);
    const { idEjercicio } = useParams();

    const boxStyle = {
        sx: {
            display: "flex",
            flexDirection: "column",
        },
    };

    const paperStyle = {
        sx: {
            width: "100%",
            mb: 3,
            px: 2,
        },
    };
    const titleSeccionStyle = {
        variant: "h4",
        sx: { textAlign: "center" },
    };

    const titleStyle = {
        variant: "h5",
        sx: { textAlign: "center" },
    };

    const buttonStyle = {
        variant: "contained",
        sx: {
            mb: 2,
            mx: 3,
        },
    };


    console.log("avanceEjercicios[idEjercicio]", avanceEjercicios[0]);
    console.log("idEjercicio", idEjercicio);
    const ejercicioById = avanceEjercicios.filter((unEjercicio) => {
        // console.log('filter '+unEjercicio.idEjercicio + ' ' +idEjercicio + '    ' + (Number(unEjercicio.idEjercicio) === Number(idEjercicio)))
        return Number(unEjercicio.idEjercicio) === Number(idEjercicio);
    });
    console.log("ejercicioById", ejercicioById);
    
    
    
    return (
        <Container>
            <Box {...boxStyle}>
                <Paper {...paperStyle}>
                    <Typography {...titleSeccionStyle}>Avance de ejercicio</Typography>
                </Paper>
            </Box>
            <Box {...boxStyle}>
                <Paper {...paperStyle}></Paper>
            </Box>
            <Box>
                <Paper {...paperStyle}>
                    <VistaInforme ejercicio={ejercicioById} />
                </Paper>
            </Box>
        </Container>
    );
}

export default InformeEjercicio;
