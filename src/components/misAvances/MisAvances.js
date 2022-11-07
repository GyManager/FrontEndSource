import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Button, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";

import EjerciciosSeguidos from "./ButtonsEjerciciosSeguidos";

import AvisoSinRegistro from "./AvisoSinRegistro";

import { AvancesContext } from "../../context/AvancesContext";

import seguimientoAvancesService from "../../services/seguimiento.avances.service";



function MisAvances() {
    const [tieneMedidasRegistradas, setTieneMedidasRegistradas] = useState(true);
    const [tieneEjerciciosRegistrados, setTieneEjerciciosRegistrados] = useState(true);
    const { avanceEjercicios, setAvanceEjercicios, fetchAvancesEjercicios } = useContext(AvancesContext)
    const { idCliente } = useParams();
    const navigate = useNavigate();
    
    const paperStyle = {
        sx: {
            width: "100%",
            mb: 3,
            px: 2,
        },
    };
    
    const titleStyle = {
        variant: "h5",
        sx: { textAlign: "center" },
    };
    
    const titleSeccionStyle = {
        variant: "h4",
        sx: { textAlign: "center" },
    };
    
    const buttonStyle = {
        variant: "contained",
        sx: {
            mb: 2,
            mx: 3,
        },
    };
    
    const boxStyle = {
        sx: {
            display: "flex",
            flexDirection: "column",
        },
    };

    useEffect(() => {
        fetchAvancesEjercicios().then((response) => {
            setAvanceEjercicios(response);
        });
    }, []);

    return (
        <Container>
            <Paper {...paperStyle}>
                <Typography {...titleSeccionStyle}>
                    Mis avances
                </Typography>
            </Paper>

            <Paper {...paperStyle}>
                <Typography {...titleStyle}>Avance de Medidas</Typography>
                {tieneMedidasRegistradas ? (
                    <Box {...boxStyle}>
                        <Button
                            {...buttonStyle}
                            onClick={() => {
                                navigate("/mis-medidas/" + idCliente + "//informe/peso");
                            }}
                        >
                            Peso
                        </Button>
                    </Box>
                ) : (
                    <AvisoSinRegistro tipo="medidas" />
                )}
            </Paper>

            <Paper {...paperStyle} sx={{ mb: "10vh" }}>
                <Typography {...titleStyle}>Avance de Ejercicios</Typography>

                {tieneEjerciciosRegistrados ? (
                    <EjerciciosSeguidos
                        ejercicios={avanceEjercicios}
                        buttonStyle={buttonStyle}
                        boxStyle={boxStyle}
                    />
                ) : (
                    <AvisoSinRegistro tipo="otro" />
                )}
            </Paper>
        </Container>
    );
}

export default MisAvances;
