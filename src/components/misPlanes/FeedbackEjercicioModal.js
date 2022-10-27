import { Save } from "@mui/icons-material";
import { Button, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import seguimientoService from "../../services/seguimiento.service";

export default function FeedbackEjercicioModal(props) {
    let { idPlan } = useParams();

    const formik = useFormik({
        initialValues: {
            cargaReal: props.seguimientoActual?.cargaReal || "",
            tiempoReal: props.seguimientoActual?.tiempoReal || "",
        },
        validationSchema: yup.object({
            cargaReal: yup
                .string()
                .matches(/^\d+[\.\d]*$/, "La carga debe ser un numero")
                .max(10, "Maximo de 10 caracteres"),
            tiempoReal: yup
                .string()
                .matches(/^[\d\.]+\d*$/, "El tiempo debe ser un numero")
                .max(10, "Maximo de 10 caracteres"),
        }),
        onSubmit: () => {
            handleSubmit();
        },
    });

    async function handleSubmit(e) {
        e?.preventDefault();
        if (
            (formik.values.cargaReal !== null &&
                formik.values.cargaReal !== null &&
                formik.values.cargaReal !== "") ||
            (formik.values.tiempoReal !== null &&
                formik.values.tiempoReal !== null &&
                formik.values.tiempoReal !== "")
        ) {
            const respuesta = await seguimientoService.postSeguimientoEjercicio(
                formik.values,
                idPlan,
                props.idEjercicioAplicado
            );
            if (respuesta instanceof AxiosError) {
                console.log(respuesta); // TODO IMPROVE
            } else {
                props.reload();
            }
        }
        props.setClose();
    }

    const open = props.idEjercicioAplicado !== null && props.idEjercicioAplicado !== undefined;

    return (
        <Modal
            open={open}
            onClose={props.setClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                sx={{
                    p: 2,
                    width: { xs: "90vw", md: "fit-content" },
                    gap: 3,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h6">
                    ¿Como te fue hoy haciendo {props.nombreEjercicio}?
                </Typography>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    justifyContent="center"
                >
                    <TextField
                        label="Carga (Kg)"
                        id="cargaReal"
                        name="cargaReal"
                        value={formik.values.cargaReal}
                        onChange={formik.handleChange}
                        error={formik.touched.cargaReal && Boolean(formik.errors.cargaReal)}
                        helperText={formik.touched.cargaReal && formik.errors.cargaReal}
                        variant="standard"
                    />
                    <TextField
                        label="Tiempo (minutos)"
                        id="tiempoReal"
                        name="tiempoReal"
                        value={formik.values.tiempoReal}
                        onChange={formik.handleChange}
                        error={formik.touched.tiempoReal && Boolean(formik.errors.tiempoReal)}
                        helperText={formik.touched.tiempoReal && formik.errors.tiempoReal}
                        variant="standard"
                    />
                </Stack>
                <Stack mt={3} alignItems="center" direction={"column"}>
                    <Button
                        variant="contained"
                        sx={{ maxWidth: 300, width: "100%" }}
                        onClick={formik.handleSubmit}
                        endIcon={<Save />}
                    >
                        {"Guardar"}
                    </Button>
                </Stack>
            </Paper>
        </Modal>
    );
}
