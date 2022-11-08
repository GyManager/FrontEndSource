import { Avatar, Container, Paper, Stack, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../context/ErrorContext";

import logo from "../../images/logo.png";
import dashboardService from "../../services/dashboard.service";
import GraficoClientesPorEstados from "./graficos/GraficoClientesPorEstados";
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
                <Paper sx={{ mx: 1, p: 1, my: 2 }} elevation={2}>
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Avatar
                            alt="Logo"
                            src={logo}
                            sx={{
                                mr: 2,
                                width: "15vw",
                                height: "15vw",
                                minWidth: "130px",
                                minHeight: "130px",
                                maxWidth: "140px",
                                maxHeight: "140px",
                            }}
                        />
                        <Typography variant="h4" align="center">
                            Dashboard CorE
                        </Typography>
                    </Stack>
                </Paper>
            </Container>

            <Container maxWidth="lg" disableGutters>
                <Paper sx={{ mx: 1, p: 1, my: 2, minHeight: "40vh" }} elevation={2}>
                    <Stack
                        direction={"row"}
                        sx={{ minHeight: "40vh" }}
                        flexWrap="wrap"
                        alignContent="center"
                        justifyContent="center"
                    >
                        <GraficoNumerico
                            title="Clientes con vencimiento de Matricula pronto"
                            data={loading ? 0 : data.cantidadClientesConMatriculaProximoVencimiento}
                            loading={loading}
                            maxWidth={"33%"}
                        />
                        <GraficoClientesPorEstados
                            data={loading ? {} : data.countClienteEstado}
                            loading={loading}
                            maxWidth={"33%"}
                        />
                        <GraficoNumerico
                            title="Clientes matriculados sin finalizar rutina en los ultimos dias"
                            data={loading ? 0 : data.cantidadClientesSinFinalizarDia}
                            loading={loading}
                            maxWidth={"33%"}
                        />
                    </Stack>
                </Paper>
            </Container>
        </Fragment>
    );
}
