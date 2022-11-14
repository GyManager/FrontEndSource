import { Container, Grid, Paper } from "@mui/material";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../../context/ErrorContext";
import dashboardService from "../../../services/dashboard.service";
import GraficoFinalRutinaPorEstados from "../graficos/GraficoFinalRutinaPorEstados";
import ReporteEstadoSeguimientoFiltros from "./ReporteEstadoSeguimientoFiltros";
import ReporteEstadoSeguimientoModal from "./ReporteEstadoSeguimientoModal";
import ReporteEstadoSeguimientoTable from "./ReporteEstadoSeguimientoTable";

export default function ReporteEstadoSeguimiento() {
    const [data, setData] = useState(() => {});
    const [loading, setLoading] = useState(() => true);
    const [estadoSeguimientoSeleccionado, setEstadoSeguimientoSeleccionado] = useState(() => []);
    const [clienteSeleccionado, setClienteSeleccionado] = useState();
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
        <Container maxWidth="lg" disableGutters>
            <Paper sx={{ mx: 1, p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={8}>
                        <GraficoFinalRutinaPorEstados
                            hideTitle
                            data={loading ? 0 : data.estadoSeguimientoCounts}
                            loading={loading}
                            link={"/tablero/estado-seguimiento"}
                            containerSxOverride={{
                                minHeight: "100%",
                                height: { xs: "50vh", md: "100%" },
                                p: 1,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <ReporteEstadoSeguimientoFiltros
                            estadoSeguimientoSeleccionado={estadoSeguimientoSeleccionado}
                            setEstadoSeguimientoSeleccionado={setEstadoSeguimientoSeleccionado}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <ReporteEstadoSeguimientoTable
                            estadoSeguimientoSeleccionado={estadoSeguimientoSeleccionado}
                            setClienteSeleccionado={setClienteSeleccionado}
                        />
                    </Grid>
                </Grid>
            </Paper>
            {clienteSeleccionado !== null && clienteSeleccionado !== undefined && (
                <ReporteEstadoSeguimientoModal
                    open={clienteSeleccionado !== null && clienteSeleccionado !== undefined}
                    handleClose={() => setClienteSeleccionado(null)}
                    estadoSeguimientoSeleccionado={estadoSeguimientoSeleccionado}
                    {...clienteSeleccionado}
                />
            )}
        </Container>
    );
}
