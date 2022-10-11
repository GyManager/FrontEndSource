import { Save } from "@mui/icons-material";
import { Button, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import seguimientoService from "../../services/seguimiento.service";

export default function FeedbackEjercicioModal(props) {
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
            seguimientoService.postSeguimientoEjercicio(
                formik.values,
                idPlan,
                props.idEjercicioAplicado
            );
            props.setClose();
        }
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
                        endIcon={<Save />}
                    >
                        {"Guardar"}
                    </Button>
                </Stack>
            </Paper>
        </Modal>
    );
}
