import { ExpandMore, Save, ThumbUpSharp } from "@mui/icons-material";
import * as yup from "yup";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardContent,
    CardMedia,
    Paper,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import ejerciciosService from "../../services/ejercicios.service";
import { useFormik } from "formik";
import seguimientoService from "../../services/seguimiento.service";

export default function Ejercicio(props) {
    const [loading, setLoading] = useState(() => true);
    const [loadingPasos, setLoadingPasos] = useState(() => true);
    const [loadingHerramientas, setLoadingHerramientas] = useState(() => true);
    const [ejercicio, setEjercicio] = useState(() => {});
    const [herramientas, setHerramientas] = useState(() => []);
    const [pasos, setPasos] = useState(() => []);
    const [formikSubmitted, setFormikSubmitted] = useState(() => false);
    let { idPlan } = useParams();

    const formik = useFormik({
        initialValues: { carga: "", tiempo: "" },
        validationSchema: yup.object({
            carga: yup
                .number()
                .typeError("La carga debe ser un numero")
                .integer("debe ser un numero entero")
                .positive("La carga debe debe ser un valor positivo")
                .max(9999999999, "Maximo de 10 caracteres"),
            tiempo: yup.string().max(10, "Maximo de 10 caracteres").trim(),
        }),
        onSubmit: () => {
            handleSubmit();
        },
    });

    async function handleSubmit(e) {
        e?.preventDefault();
        if (
            (formik.values.carga !== null &&
                formik.values.carga !== null &&
                formik.values.carga !== "") ||
            (formik.values.tiempo !== null &&
                formik.values.tiempo !== null &&
                formik.values.tiempo !== "")
        ) {
            setFormikSubmitted(true);
            seguimientoService.postSeguimientoEjercicio(
                formik.values,
                idPlan,
                props.idEjercicioAplicado
            );
        }
    }

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
                            herramientas.map((herramienta) => (
                                <Typography key={herramienta}>{herramienta}</Typography>
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
                                <Card key={paso.idPaso}>
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

                    <AccordionDetails>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                            justifyContent="center"
                        >
                            <TextField
                                label="Carga"
                                id="carga"
                                name="carga"
                                value={formik.values.carga}
                                onChange={formik.handleChange}
                                error={formik.touched.carga && Boolean(formik.errors.carga)}
                                helperText={formik.touched.carga && formik.errors.carga}
                                variant="standard"
                                type="number"
                            />
                            <TextField
                                label="Tiempo"
                                id="tiempo"
                                name="tiempo"
                                value={formik.values.tiempo}
                                onChange={formik.handleChange}
                                error={formik.touched.tiempo && Boolean(formik.errors.tiempo)}
                                helperText={formik.touched.tiempo && formik.errors.tiempo}
                                variant="standard"
                            />
                        </Stack>
                        <Stack mt={3} alignItems="center" direction={"column"}>
                            <Button
                                variant="contained"
                                sx={{ maxWidth: 300, width: "100%" }}
                                onClick={formik.handleSubmit}
                                disabled={formikSubmitted}
                                endIcon={formikSubmitted ? <ThumbUpSharp /> : <Save />}
                            >
                                {formikSubmitted ? "Guardado" : "Guardar"}
                            </Button>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </Container>
    );
}
