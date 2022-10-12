import { Paper, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MiPlanContext } from "../../context/MiPlanContext";
import RutinaCard from "./RutinaCard";

export default function MiMicroPlan(props) {
    let { idPlan, idMicroPlan } = useParams();

    const { plan, loading } = useContext(MiPlanContext);

    const microPlan = plan
        ? plan.microPlans.filter((microPlan) => microPlan.idMicroPlan === parseInt(idMicroPlan))[0]
        : {};

    const paperStyles = {
        sx: { mx: 1, p: 1, my: 2 },
        elevation: 2,
    };

    // TODO: cuando tengamos feedback de las rutinas, tenemos que meter el estado completado aca segun si tiene feedback en esta semana - BE y FE
    const rutinas = loading ? (
        <Skeleton variant="rectangular" height={80} sx={{ m: 1 }} />
    ) : (
        microPlan.rutinas.map((rutina, index) => (
            <RutinaCard
                key={rutina.idRutina}
                nombre={rutina.nombre}
                dia={index + 1}
                route={`/mis-planes/${idPlan}/micro-plan/${idMicroPlan}/rutina/${rutina.idRutina}`}
            />
        ))
    );

    return (
        <Container maxWidth="md" disableGutters>
            <Paper {...paperStyles}>
                <Typography variant="h4" align="center">
                    Micro Plan:
                </Typography>
                <Typography variant="h5" align="center">
                    {loading ? <Skeleton></Skeleton> : microPlan.nombre}
                </Typography>
            </Paper>
            {rutinas}
        </Container>
    );
}
