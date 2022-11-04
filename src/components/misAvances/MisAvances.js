import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import _ from 'lodash'
import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";

import EjerciciosSeguidos from "./EjerciciosSeguidos";

import AvisoSinRegistro from "./AvisoSinRegistro";

import seguimientoAvancesService from "../../services/seguimiento.avances.service";

function MisAvances() {
    const [tieneMedidasRegistradas, setTieneMedidasRegistradas] = useState(false);
    const [tieneEjerciciosRegistrados, setTieneEjerciciosRegistrados] = useState(true);
    const [avanceEjercicios, setAvanceEjercicios] = useState([]);
    const { idCliente } = useParams();

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

    const fetchAvancesEjercicios = async () => {
        const response = await seguimientoAvancesService.getSeguimientosUsuario(idCliente);
        return _.sortBy(response,'nombre')
    };
    useEffect(() => {
       fetchAvancesEjercicios()
       .then((response)=>{setAvanceEjercicios(response)})
    }, []);
console.log(avanceEjercicios)
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
            <Paper {...paperStyle} sx={{mb:'10vh'}}>
                <Typography {...titleStyle}>Avance de Ejercicios</Typography>

                {tieneEjerciciosRegistrados ? (
                    <EjerciciosSeguidos ejercicios={avanceEjercicios}/>
                ) : (
                    <AvisoSinRegistro tipo="otro" />
                )}
            </Paper>
        </Container>
    );
}

export default MisAvances;
