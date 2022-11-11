import { Button, Container, Grid, Paper } from "@mui/material";
import GraficoNumerico from "../../graficos/GraficoNumerico";
import ReporteNumericoTable from "./ReporteNumericoTable";

export default function ReporteNumerico({
    title,
    data,
    loading,
    fetchClientes,
    reversed,
    enableExport,
}) {
    async function handleExport() {
        fetchClientes(null, null, null, null, null, null, true).then((response) => {
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);

            // create "a" HTML element with href to file & click
            const link = document.createElement("a");
            link.href = href;
            link.setAttribute("download", "file.pdf"); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    }

    return (
        <Container maxWidth="lg" disableGutters>
            <Paper sx={{ mx: 1, p: 1 }}>
                <Grid container spacing={1} direction={reversed ? "row-reverse" : "row"}>
                    <Grid
                        container
                        xs={12}
                        md={4}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            gap: 2,
                        }}
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
                        {/* {enableExport && <Button  variant="contained" onClick={handleExport}>Exportar listado</Button>} */}
                        {enableExport && (
                            <Button variant="contained" onClick={handleExport}>
                                Exportar listado
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <ReporteNumericoTable fetchClientes={fetchClientes} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
