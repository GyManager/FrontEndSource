import { React, useState, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Grafico from "./Grafico";

import { Line } from "react-chartjs-2";

import medidasService from "../../services/medidas.service";
import { useParams } from "react-router-dom";

function InformeTipoMedida(props) {
    const { idCliente, tipoMedida } = useParams();
    const [medidasClienteHistory, setMedidasClienteHistory] = useState([]);

    useEffect(() => {
        const fetchMedidasHistoricas = async () => {
            const res = await medidasService.getMedidasSummary(idCliente, tipoMedida);
            setMedidasClienteHistory(res.medidasClienteHistory);
        };
        fetchMedidasHistoricas();
    }, []);

    const handleClick2 = async () => {};

    return (
        <>
            <Paper sx={{ width: "95vw", height: "80vh" }}>
                <Typography variant="h3" textAlign="center">
                    Historico de {tipoMedida}
                </Typography>
                <Grafico mediciones={medidasClienteHistory} />
                <Button onClick={handleClick2}>Button</Button>
            </Paper>
        </>
    );
}

export default InformeTipoMedida;

//
