import { Collapse, Paper, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { MiPlanContext } from "../../context/MiPlanContext";
import BloqueAccordion from "./BloqueAccordion";
import Ejercicio from "./Ejercicio";

export default function MiRutina() {
    let { idPlan, idMicroPlan, idRutina } = useParams();

    const { plan, loading } = useContext(MiPlanContext);
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState();

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
            <BloqueAccordion
                key={bloque.bloque}
                {...bloque}
                setEjercicioSeleccionado={setEjercicioSeleccionado}
            />
        ));
    }

    const ejMostrado = loading
        ? null
        : rutina.ejerciciosAplicados.filter(
              (ejercicioAp) => ejercicioAp.idEjercicioAplicado === ejercicioSeleccionado
          )[0];

    return (
        <Container maxWidth="md" disableGutters>
            <Collapse in={ejercicioSeleccionado === null || ejercicioSeleccionado === undefined}>
                <Paper {...paperStyles}>
                    <Typography variant="h5" align="center">
                        {loading ? <Skeleton></Skeleton> : `Rutina ${rutina.nombre}`}
                    </Typography>
                </Paper>

                <Container maxWidth="md">{ejerciciosAplicados}</Container>
            </Collapse>

            <Collapse
                in={ejercicioSeleccionado !== null && ejercicioSeleccionado !== undefined}
                mountOnEnter
                unmountOnExit
            >
                <Ejercicio {...ejMostrado} volver={() => setEjercicioSeleccionado(null)} />
            </Collapse>
        </Container>
    );
}
