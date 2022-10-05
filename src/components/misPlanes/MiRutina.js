import { Paper, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MiPlanContext } from "../../context/MiPlanContext";
import BloqueAccordion from "./BloqueAccordion";

export default function MiRutina() {
    let { idPlan, idMicroPlan, idRutina } = useParams();

    const { plan, loading } = useContext(MiPlanContext);

    const rutina = plan
        ? plan.microPlans
              .filter((microPlan) => microPlan.idMicroPlan == idMicroPlan)[0]
              .rutinas.filter((rutina) => rutina.idRutina == idRutina)[0]
        : {};

    const paperStyles = {
        sx: { mx: 1, p: 1, my: 2 },
        elevation: 2,
    };

    let ejerciciosAplicados = <Skeleton></Skeleton>;

    if (!loading) {
        const bloqueSet = new Set();
        rutina.ejerciciosAplicados.forEach((ejercicioAplicado) =>
            bloqueSet.add(ejercicioAplicado.bloque)
        );

        const bloquesEjercicios = Array.from(bloqueSet).map((bloque) => {
            return {
                bloque: bloque,
                ejerciciosAplicadosBloque: rutina.ejerciciosAplicados.filter(
                    (ejercicioAplicado) => ejercicioAplicado.bloque === bloque
                ),
            };
        });

        ejerciciosAplicados = bloquesEjercicios.map((bloque) => (
            <BloqueAccordion key={bloque.bloque} {...bloque} />
        ));
    }

    return (
        <Container maxWidth="md" disableGutters>
            <Paper {...paperStyles}>
                <Typography variant="h5" align="center">
                    {loading ? <Skeleton></Skeleton> : `Rutina ${rutina.nombre}`}
                </Typography>
            </Paper>

            <Container maxWidth="md">{ejerciciosAplicados}</Container>
        </Container>
    );
}
