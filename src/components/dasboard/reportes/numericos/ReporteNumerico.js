import { Container, Grid, Paper } from "@mui/material";
import GraficoNumerico from "../../graficos/GraficoNumerico";
import ReporteNumericoTable from "./ReporteNumericoTable";

export default function ReporteNumerico({ title, data, loading, fetchClientes, reversed }) {
    return (
        <Container maxWidth="lg" disableGutters>
            <Paper sx={{ mx: 1, p: 1 }}>
                <Grid container spacing={1} direction={reversed ? "row-reverse" : "row"}>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <GraficoNumerico
                            title={title}
                            data={loading ? 0 : data}
                            loading={loading}
                            containerSxOverride={{
                                minHeight: "35vh",
                                height: { xs: "50vh", md: "35vh" },
                                p: 1,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <ReporteNumericoTable fetchClientes={fetchClientes} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
