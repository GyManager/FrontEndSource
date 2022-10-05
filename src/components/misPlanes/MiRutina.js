import { ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Paper,
    Skeleton,
    Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MiPlanContext } from "../../context/MiPlanContext";
import EjercicioAplicadoCard from "./EjercicioAplicadoCard";

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

    return (
        <Container maxWidth="md" disableGutters>
            <Paper {...paperStyles}>
                <Typography variant="h5" align="center">
                    {loading ? <Skeleton></Skeleton> : `Rutina ${rutina.nombre}`}
                </Typography>
            </Paper>

            <Container maxWidth="md">
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6">Bloque calentamiento</Typography>
                    </AccordionSummary>

                    <Divider />

                    <AccordionDetails>
                        <EjercicioAplicadoCard />
                    </AccordionDetails>
                </Accordion>
            </Container>
        </Container>
    );
}
