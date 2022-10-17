import { Button, Collapse, Paper, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { MiPlanContext } from "../../context/MiPlanContext";
import seguimientoService from "../../services/seguimiento.service";
import BloqueAccordion from "./BloqueAccordion";
import Ejercicio from "./Ejercicio";
import FeedbackEjercicioModal from "./FeedbackEjercicioModal";
import ModalFinDia from "./modalFinDia/ModalFinDia";

export default function MiRutina() {
    let { idPlan, idMicroPlan, idRutina } = useParams();

    const { plan, loading } = useContext(MiPlanContext);
    let [searchParams, setSearchParams] = useSearchParams();
    const ejercicioSeleccionado = searchParams.get("idEjercicioAplicado");
    const [cargarSeguimiento, setCargarSeguimiento] = useState();
    const [seguimientos, setSeguimientos] = useState(() => []);
    const [openModalFinDia, setOpenModalFinDia] = useState(() => false);

    async function getSeguimientos() {
        const respuesta = await seguimientoService.getSeguimientoEjercicioByIdRutina(
            idPlan,
            idMicroPlan,
            idRutina,
            "HOY"
        );
        if (respuesta instanceof AxiosError) {
            console.log(respuesta); // TODO IMPROVE
        } else {
            setSeguimientos(respuesta);
        }
    }

    useEffect(() => {
        getSeguimientos();
    }, []);

    const rutina = plan
        ? plan.microPlans
              .filter((microPlan) => microPlan.idMicroPlan === parseInt(idMicroPlan))[0]
              .rutinas.filter((rutina) => rutina.idRutina === parseInt(idRutina))[0]
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
                cargarSeguimiento={setCargarSeguimiento}
                seguimientos={seguimientos}
            />
        ));
    }

    const ejMostrado = loading
        ? null
        : rutina.ejerciciosAplicados.filter(
              (ejercicioAp) => ejercicioAp.idEjercicioAplicado === parseInt(ejercicioSeleccionado)
          )[0];

    const ejercicioACargarSeguimiento = loading
        ? null
        : rutina.ejerciciosAplicados.filter(
              (ejercicioAp) => ejercicioAp.idEjercicioAplicado === cargarSeguimiento
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

                {!loading && cargarSeguimiento !== null && cargarSeguimiento !== undefined && (
                    <FeedbackEjercicioModal
                        {...ejercicioACargarSeguimiento}
                        setClose={() => setCargarSeguimiento(null)}
                        reload={getSeguimientos}
                        seguimientoActual={
                            seguimientos.filter(
                                (seguimiento) =>
                                    seguimiento.idEjercicioAplicado ===
                                    ejercicioACargarSeguimiento.idEjercicioAplicado
                            )[0]
                        }
                    />
                )}

                <Container maxWidth="md" align="center" sx={{ mt: 2 }}>
                    <Button size="large" variant="contained" onClick={() => setOpenModalFinDia(true)}>
                        Terminar dia de entrenamiento
                    </Button>
                </Container>
                
                <ModalFinDia
                    open={openModalFinDia}
                    setClose={() => setOpenModalFinDia(false)}
                />

                
            </Collapse>

            <Collapse
                in={ejercicioSeleccionado !== null && ejercicioSeleccionado !== undefined}
                mountOnEnter
                unmountOnExit
            >
                <Ejercicio {...ejMostrado} volver={() => setSearchParams()} />
            </Collapse>
        </Container>
    );
}
