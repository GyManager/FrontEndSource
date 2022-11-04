import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";

import AvisoSinRegistro from "./AvisoSinRegistro";

function MisAvances() {
    const [tieneMedidasRegistradas, setTieneMedidasRegistradas] = useState(false);
    const [tieneEjerciciosRegistrados, setTieneEjerciciosRegistrados] = useState(false);
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

    return (
        <Container>
            <Paper {...paperStyle}>
                <Typography {...titleStyle} variant="h4">
                    Mis avances
                </Typography>
            </Paper>
            <Paper {...paperStyle}>
                <Typography {...titleStyle}>Avance de Medidas</Typography>
                {tieneMedidasRegistradas ? (
                    "Botones avance de medidas"
                ) : (
                    <AvisoSinRegistro tipo="medidas" />
                )}
            </Paper>
            <Paper {...paperStyle}>
                <Typography {...titleStyle}>Avance de Ejercicios</Typography>

                {tieneMedidasRegistradas ? (
                    "Botones avance de medidas"
                ) : (
                    <AvisoSinRegistro tipo="otro" />
                )}
            </Paper>
        </Container>
    );
}

export default MisAvances;
