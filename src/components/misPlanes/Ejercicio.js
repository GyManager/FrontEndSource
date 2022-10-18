import { ExpandMore, PlayArrow } from "@mui/icons-material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    List,
    ListItem,
    ListItemText,
    Paper,
    Skeleton,
    Typography,
} from "@mui/material";
import { Container } from "@mui/system";
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

    useEffect(() => {
        if (props.idEjercicio !== null && props.idEjercicio !== undefined) {
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
        if (props.idEjercicio !== null && props.idEjercicio !== undefined) {
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
        if (props.idEjercicio !== null && props.idEjercicio !== undefined) {
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
                            <List sx={{ py: 0 }}>
                                {herramientas.map((herramienta) => (
                                    <ListItem key={herramienta} sx={{ py: 0 }}>
                                        <ListItemText primary={herramienta} />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6">Como realizar el ejercicio</Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {loadingPasos ? (
                            <Skeleton></Skeleton>
                        ) : (
                            pasos
                                .sort((a, b) => a.numeroPaso - b.numeroPaso)
                                .map((paso) => (
                                    <Card key={paso.idPaso}>
                                        <CardHeader
                                            title={`${paso.numeroPaso}. ${paso.contenido}`}
                                            titleTypographyProps={{ variant: "p" }}
                                        />
                                        {paso.imagen !== null &&
                                            paso.imagen !== undefined &&
                                            paso.imagen !== "" && (
                                                <CardMedia
                                                    component="img"
                                                    image={paso.imagen}
                                                    alt=""
                                                    sx={{ pb: 2 }}
                                                />
                                            )}
                                    </Card>
                                ))
                        )}
                        {!loading && ejercicio.video && (
                            <Button
                                size="medium"
                                color="error"
                                variant="contained"
                                endIcon={<PlayArrow />}
                                href={ejercicio.video}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Video instructivo
                            </Button>
                        )}
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </Container>
    );
}
