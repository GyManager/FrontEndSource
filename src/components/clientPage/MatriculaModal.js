import {
    Button,
    Modal,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import DatePicker from "../reusable/DatePicker";
import matriculaSchema from "./matriculaSchema";
import matriculasService from "../../services/matriculas.service";
import { SnackbarContext } from "../../context/SnackbarContext";
import { ErrorContext } from "../../context/ErrorContext";
import { useContext } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

/**
 *
 * @param {idCliente, open, setOpen} props
 * @returns
 */
export default function MatriculaModal(props) {
    const { addSnackbar } = useContext(SnackbarContext);
    const { processErrorMessage } = useContext(ErrorContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            fechaPago: new Date(),
            fechaInicio: new Date(),
            cantidadMeses: 1,
            cantidadDiasSemana: 5,
        },
        validationSchema: matriculaSchema.validationSchema,
        onSubmit: () => {
            handleSubmit();
        },
    });

    async function handleSubmit(e) {
        e?.preventDefault();
        const respuesta = await matriculasService.postMatricula(
            formik.values,
            props.idCliente
        );
        handleRespuesta(respuesta, "La matricula se ha cargado con exito");
    }

    const handleRespuesta = (respuesta, mensaje) => {
        if (respuesta instanceof AxiosError) {
            processErrorMessage(respuesta.response.data);
        } else {
            navigate(`/clientes/${props.idCliente}`);
            addSnackbar({ message: mensaje, severity: "success" });
            props.setOpen(false);
        }
    };

    return (
        <Modal
            open={props.open}
            onClose={() => props.setOpen(false)}
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
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Agregar matricula
                </Typography>

                <Stack direction="column" spacing={3}>
                    <DatePicker
                        value={formik.values.fechaPago || ""}
                        id="fechaPago"
                        name="fechaPago"
                        label="Fecha de pago"
                        editable={true}
                        onChange={formik.setFieldValue}
                        errorProp={
                            formik.touched.fechaPago &&
                            Boolean(formik.errors.fechaPago)
                        }
                        helperTextProp={
                            formik.touched.fechaPago && formik.errors.fechaPago
                        }
                    />
                    <DatePicker
                        value={formik.values.fechaInicio || ""}
                        id="fechaInicio"
                        name="fechaInicio"
                        label="Fecha de inicio"
                        editable={true}
                        onChange={formik.setFieldValue}
                        errorProp={
                            formik.touched.fechaInicio &&
                            Boolean(formik.errors.fechaInicio)
                        }
                        helperTextProp={
                            formik.touched.fechaInicio &&
                            formik.errors.fechaInicio
                        }
                    />
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                    <TextField
                        fullwidth
                        type="number"
                        variant="standard"
                        label="Cantidad de meses"
                        id="cantidadMeses"
                        onChange={formik.handleChange}
                        value={formik.values.cantidadMeses}
                        error={
                            formik.touched.cantidadMeses &&
                            Boolean(formik.errors.cantidadMeses)
                        }
                        helperText={
                            formik.touched.cantidadMeses &&
                            formik.errors.cantidadMeses
                        }
                    />

                    <TextField
                        fullwidth
                        type="number"
                        variant="standard"
                        label="Cantidad de dias a la semana"
                        id="cantidadDiasSemana"
                        onChange={formik.handleChange}
                        value={formik.values.cantidadDiasSemana}
                        error={
                            formik.touched.cantidadDiasSemana &&
                            Boolean(formik.errors.cantidadDiasSemana)
                        }
                        helperText={
                            formik.touched.cantidadDiasSemana &&
                            formik.errors.cantidadDiasSemana
                        }
                    />
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Button onClick={formik.handleSubmit}>Guardar</Button>
                    <Button onClick={() => props.setOpen(false)}>
                        Cancelar
                    </Button>
                </Stack>
            </Paper>
        </Modal>
    );
}
