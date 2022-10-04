import { Container, LinearProgress, Paper, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import planesService from "../../services/planes.service";
import MicroPlanCard from "./MicroPlanCard";

export default function MiPlan() {
    let { idPlan } = useParams();

    const [loading, setLoading] = useState(() => true);
    const [plan, setPlan] = useState(() => {});

    const getPlanById = async () => {
        setLoading(true);

        const respuesta = await planesService.getPlanById(idPlan);

        if (respuesta instanceof AxiosError) {
            console.log(respuesta);
        } else {
            setPlan(respuesta);
            respuesta.microPlans = respuesta.microPlans.sort(
                (a, b) => a.numeroOrden - b.numeroOrden
            );
            setLoading(false);
        }
    };

    useEffect(() => {
        getPlanById();
    }, []);

    const semanaActual = loading
        ? ""
        : Math.ceil((new Date() - new Date(plan.fechaDesde)) / 86400000 / 7);

    const totalSemanas = loading
        ? ""
        : Math.ceil((new Date(plan.fechaHasta) - new Date(plan.fechaDesde)) / 86400000 / 7);

    const porcentajeCompletado = loading
        ? 0
        : Math.floor(((semanaActual - 1) / totalSemanas) * 100);

    const paperStyles = {
        sx: { mx: 1, p: 1, my: 2 },
        elevation: 2,
    };

    let acumSemanas = 1;

    const microPlanes = loading ? (
        <Skeleton variant="rectangular" height={108} sx={{ mx: 1 }} />
    ) : (
        plan.microPlans.map((microPlan) => {
            let semanaInicio = acumSemanas;
            acumSemanas += microPlan.observaciones.length;
            return (
                <MicroPlanCard
                    nombre={microPlan.nombre}
                    semanaInicio={semanaInicio}
                    semanaFin={acumSemanas - 1}
                    semanaActual={semanaActual}
                    route={`/mis-planes/${idPlan}/micro-plan/${microPlan.idMicroPlan}`}
                />
            );
        })
    );

    const microPlanActivo = loading ? (
        <Skeleton variant="rectangular" height={108} sx={{ m: 1 }} />
    ) : (
        microPlanes.filter((microPlan) => {
            return (
                microPlan.props.semanaInicio <= semanaActual &&
                microPlan.props.semanaFin >= semanaActual
            );
        })
    );
    console.log(microPlanActivo);

    return (
        <Container maxWidth="md" disableGutters>
            <Paper {...paperStyles}>
                <Typography variant="h4" align="center">
                    Plan Vigente: <br />
                    {loading ? <Skeleton></Skeleton> : plan.objetivo}
                </Typography>

                <Typography variant="body2" align="center">
                    Fecha estimada de finalizacion:{" "}
                    {loading ? (
                        <Skeleton></Skeleton>
                    ) : (
                        new Date(plan.fechaHasta).toLocaleDateString()
                    )}
                </Typography>

                <Typography variant="body2" align="center">
                    {!loading && `Semana ${semanaActual} de ${totalSemanas}`}
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <LinearProgress
                        variant={loading ? "indeterminate" : "determinate"}
                        value={porcentajeCompletado}
                        sx={{
                            height: 15,
                            borderRadius: 5,
                            backgroundColor: "rgb(238, 175, 175)",
                        }}
                        color="success"
                    />
                    <Typography variant="body2" align="center" color="success.dark">
                        {loading ? "" : `Completado ${porcentajeCompletado}%`}
                    </Typography>
                </Box>
            </Paper>

            {microPlanActivo}

            <Paper {...paperStyles}>
                <Typography variant="h5">Actividades del plan</Typography>
                {microPlanes}
            </Paper>
        </Container>
    );
}
