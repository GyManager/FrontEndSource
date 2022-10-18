import { Save } from "@mui/icons-material";
import { Button, Divider, Fab, Paper, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ErrorContext } from "../../context/ErrorContext";
import { SnackbarContext } from "../../context/SnackbarContext";
import { UserContext } from "../../context/UserContext";
import clientsService from "../../services/users.service";

export default function PasswordChange() {
    const { addSnackbar } = useContext(SnackbarContext);
    const { processErrorMessage } = useContext(ErrorContext);
    const { getUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            actualPass: "",
            pass: "",
            confirmacionPass: "",
        },
        validationSchema: yup.object({
            passActual: yup.string().required("La contraseña actual es obligatoria").trim(),
            pass: yup
                .string()
                .required("La nueva contraseña es obligatoria")
                .matches(
                    "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*#?&]+",
                    "La contraseña debe tener un numero, una minuscula y una mayuscula"
                )
                .min(8, "La contraseña debe tener al menos 8 caracteres")
                .max(25, "La contraseña debe tener como maximo 25 caracteres")
                .trim(),
            confirmacionPass: yup
                .string()
                .required("La confirmacion de la contraseña es obligatoria")
                .trim(),
        }),
        onSubmit: () => {
            handleSubmit();
        },
    });

    async function handleSubmit(e) {
        e?.preventDefault();
        let usuario = await getUserInfo();
        const respuesta = await clientsService.putUserPassword(formik.values, usuario.idUsuario);
        if (respuesta instanceof AxiosError) {
            processErrorMessage(respuesta.response.data);
        } else {
            navigate("/home");
            addSnackbar({
                message: "La contraseña fue actualizada con exito",
                severity: "success",
            });
        }
    }

    return (
        <Container maxWidth="md" disableGutters>
            <Paper
                sx={{ mx: 1, p: 2, my: 2 }}
                elevation={2}
                component="form"
                onSubmit={formik.handleSubmit}
            >
                <Typography variant="h4">Cambiar contraseña</Typography>
                <Container
                    maxWidth="sm"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <Stack spacing={2} sx={{ width: "100%" }}>
                        <TextField
                            label="Contraseña actual"
                            id="passActual"
                            name="passActual"
                            value={formik.values.passActual}
                            onChange={formik.handleChange}
                            error={formik.touched.passActual && Boolean(formik.errors.passActual)}
                            helperText={formik.touched.passActual && formik.errors.passActual}
                            variant="standard"
                            type="password"
                        />

                        <TextField
                            label="Nueva contraseña"
                            id="pass"
                            name="pass"
                            value={formik.values.pass}
                            onChange={formik.handleChange}
                            error={formik.touched.pass && Boolean(formik.errors.pass)}
                            helperText={formik.touched.pass && formik.errors.pass}
                            variant="standard"
                            type="password"
                        />

                        <TextField
                            label="Confirmar nueva contraseña"
                            id="confirmacionPass"
                            name="confirmacionPass"
                            value={formik.values.confirmacionPass}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.confirmacionPass &&
                                Boolean(formik.errors.confirmacionPass)
                            }
                            helperText={
                                formik.touched.confirmacionPass && formik.errors.confirmacionPass
                            }
                            variant="standard"
                            type="password"
                        />
                    </Stack>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ mt: 2, maxWidth: 300, display: { xs: "none", md: "flex" } }}
                    >
                        Cambiar contraseña
                    </Button>
                    <Divider></Divider>
                    <Typography variant="body2">
                        Recorda que la contraseña debe tener:
                        <ul>
                            <li>Minimo 8 Caracteres</li>
                            <li> Maximo 25 Caracteres </li>
                            <li>Un numero</li>
                            <li>Una mayuscula</li>
                            <li>Una minuscula</li>
                        </ul>
                    </Typography>
                </Container>
            </Paper>

            <Fab
                type="submit"
                onClick={formik.handleSubmit}
                color="primary"
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    display: { md: "none", lg: "none", xl: "none" },
                }}
            >
                <Save />
            </Fab>
        </Container>
    );
}
