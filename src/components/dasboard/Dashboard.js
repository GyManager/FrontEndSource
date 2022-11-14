import { Avatar, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../context/ErrorContext";

import logo from "../../images/logo.png";
import dashboardService from "../../services/dashboard.service";
import GraficoClientesPorEstados from "./graficos/GraficoClientesPorEstados";
import GraficoFinalRutinaPorEstados from "./graficos/GraficoFinalRutinaPorEstados";
import GraficoFinalRutinaPorFecha from "./graficos/GraficoFinalRutinaPorFecha";
import GraficoNumerico from "./graficos/GraficoNumerico";

export default function Dashboard() {
    const [data, setData] = useState(() => {});
    const [loading, setLoading] = useState(() => true);
    const { processErrorMessage } = useContext(ErrorContext);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await dashboardService.getSummary();
            if (response instanceof AxiosError) {
                processErrorMessage(response.response.data);
            } else {
                setData(response);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <Fragment>
            <Container maxWidth="md" disableGutters>
                <Paper sx={{ mx: 1, p: 1 }} elevation={2}>
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Avatar alt="Logo" src={logo} sx={{ height: 50, width: 50, mr: 3 }} />
                        <Typography variant="h4" align="center">
                            Tablero CorE
                        </Typography>
                    </Stack>
                </Paper>
            </Container>

            <Container maxWidth="lg" disableGutters sx={{ mb: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                        <GraficoNumerico
                            title="Clientes con vencimiento de Matricula pronto"
                            data={loading ? 0 : data.cantidadClientesConMatriculaProximoVencimiento}
                            loading={loading}
                            link={"/tablero/vencimientos"}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GraficoClientesPorEstados
                            data={loading ? {} : data.countClienteEstado}
                            loading={loading}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GraficoNumerico
                            title="Clientes matriculados sin finalizar rutina en los ultimos dias"
                            data={loading ? 0 : data.cantidadClientesSinFinalizarDia}
                            loading={loading}
                            link={"/tablero/sin-finalizar"}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GraficoFinalRutinaPorEstados
                            data={loading ? 0 : data.estadoSeguimientoCounts}
                            loading={loading}
                            link={"/tablero/estado-seguimiento"}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GraficoFinalRutinaPorFecha
                            data={loading ? 0 : data.countByFechaNotOlderThanDays}
                            loading={loading}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
}
