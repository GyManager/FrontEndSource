import { ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    CardMedia,
    Paper,
    Skeleton,
    Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ejerciciosService from "../../services/ejercicios.service";

export default function Ejercicio(props) {
    const [loading, setLoading] = useState(() => true);
    const [loadingPasos, setLoadingPasos] = useState(() => true);
    const [loadingHerramientas, setLoadingHerramientas] = useState(() => true);
    const [ejercicio, setEjercicio] = useState(() => {});
    const [herramientas, setHerramientas] = useState(() => []);
    const [pasos, setPasos] = useState(() => []);

    const paperStyles = {
        sx: { mx: 1, p: 1, my: 2 },
        elevation: 2,
    };

    async function getEjercicio() {
        setLoading(true);
        const response = await ejerciciosService.getEjercicioById(props.idEjercicio);
        if (response instanceof AxiosError) {
            console.log(response); // improve
        } else {
            setEjercicio(response);
            setLoading(false);
        }
    }

    useEffect(() => {
        if(props.idEjercicio !== null && props.idEjercicio !== undefined){
            getEjercicio();
        }
    }, [props.idEjercicio]);

    useEffect(() => {
        setLoadingPasos(true);
        async function fetchPasosByIdEjercicio() {
            const response = await ejerciciosService.getPasosByEjercicioId(props.idEjercicio);
            if (response instanceof AxiosError) {
                console.log(response); //improve
            } else {
                setPasos(response);
                setLoadingPasos(false);
            }
        }
        if(props.idEjercicio !== null && props.idEjercicio !== undefined){
            fetchPasosByIdEjercicio();
        }
    }, [props.idEjercicio]);

    useEffect(() => {
        setLoadingHerramientas(true);
        async function fetchEquipamentoDeEjercicio() {
            const response = await ejerciciosService.getEquipamentoByEjercicio(props.idEjercicio);
            if (response instanceof AxiosError) {
                console.log(response); //improve
            } else {
                setHerramientas(response);
                setLoadingHerramientas(false);
            }
        }
        if(props.idEjercicio !== null && props.idEjercicio !== undefined){
            fetchEquipamentoDeEjercicio();
        }
    }, [props.idEjercicio]);

    return (
        <Container maxWidth="md" disableGutters>
            <Paper {...paperStyles}>
                <Typography variant="h5">
                    {loading ? <Skeleton></Skeleton> : ejercicio.nombre}
                </Typography>
                <Typography variant="h6">
                    {loading ? <Skeleton></Skeleton> : ejercicio.tipoEjercicio}
                </Typography>

                <Accordion sx={{ mt: 1 }} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6">Que necesitamos</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {loadingHerramientas ? (
                            <Skeleton></Skeleton>
                        ) : (
                            herramientas.map((herramienta) => (
                                <Typography>{herramienta}</Typography>
                            ))
                        )}
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6">Como realizar el ejercicio</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {loadingPasos ? (
                            <Skeleton></Skeleton>
                        ) : (
                            pasos.map((paso) => (
                                <Card>
                                    {paso.imagen !== null &&
                                        paso.imagen !== undefined &&
                                        paso.imagen !== "" && (
                                            <CardMedia component="img" image={paso.imagen} alt="" />
                                        )}
                                    <CardContent>
                                        <Typography>{paso.contenido}</Typography>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6">¿Como te fue hoy?</Typography>
                        
                    </AccordionSummary>
                </Accordion>
            </Paper>
        </Container>
    );
}
