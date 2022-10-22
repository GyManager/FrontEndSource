import { Save } from "@mui/icons-material";
import { Button, Container, Fab, Paper, Stack, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../context/ErrorContext";
import { SnackbarContext } from "../../context/SnackbarContext";
import { UserContext } from "../../context/UserContext";
import clientsService from "../../services/clients.service";
import clientSchema from "../clientPage/clientSchema";
import { GenericComboBox } from "../reusable";
import DatePicker from "../reusable/DatePicker";
import userSchema from "../user/userSchema";
import userService from "../../services/users.service";

const paperStyles = {
    sx: { mx: 1, p: 2, my: 2 },
    elevation: 2,
};

const stackStyle = {
    direction: { xs: "column", md: "row" },
    spacing: { xs: 2, md: 5 },
};

export default function MisDatos() {
    const { addSnackbar } = useContext(SnackbarContext);
    const { processErrorMessage } = useContext(ErrorContext);
    const { getUserInfo, loadUserInfo } = useContext(UserContext);

    const navigate = useNavigate();

    const [esCliente, setEsCliente] = useState(() => false);

    async function getDatosUsuario() {
        let usuario = await getUserInfo();
        setEsCliente(usuario.cliente);

        formik.setFieldValue("numeroDocumento", usuario.numeroDocumento || "", false);
        formik.setFieldValue("tipoDocumento", usuario.tipoDocumento || "", false);
        formik.setFieldValue("apellido", usuario.apellido || "", false);
        formik.setFieldValue("nombre", usuario.nombre || "", false);
        formik.setFieldValue("mail", usuario.mail || "", false);
        formik.setFieldValue("sexo", usuario.sexo || "", false);
        formik.setFieldValue("celular", usuario.celular || "", false);

        formik.setFieldValue("direccion", usuario.cliente.direccion || "", false);
        formik.setFieldValue("objetivo", usuario.cliente.objetivo || "", false);
        formik.setFieldValue("fechaNacimiento", usuario.cliente.fechaNacimiento || "", false);
        formik.setFieldValue("observaciones", usuario.cliente.observaciones || "", false);
    }

    useEffect(() => {
        getDatosUsuario();
    }, []);

    const formik = useFormik({
        initialValues: {
            tipoDocumento: "",
            numeroDocumento: "",
            nombre: "",
            apellido: "",
            fechaNacimiento: "",
            sexo: "",
            mail: "",
            celular: "",
            direccion: "",
            objetivo: "",
            observaciones: "",
        },
        validationSchema: esCliente ? clientSchema.validationSchema : userSchema.validationSchema,
        onSubmit: () => {
            handleSubmit();
        },
    });

    async function handleSubmit(e) {
        e?.preventDefault();

        let respuesta = {};
        let usuario = await getUserInfo();
        if (esCliente) {
            const cliente = {
                usuario: {
                    numeroDocumento: Number(formik.values.numeroDocumento),
                    tipoDocumento: formik.values.tipoDocumento,
                    nombre: formik.values.nombre.trim(),
                    apellido: formik.values.apellido.trim(),
                    sexo: formik.values.sexo,
                    mail: formik.values.mail.trim(),
                    celular: Number(formik.values.celular),
                },
                objetivo: formik.values.objetivo,
                direccion: formik.values.direccion,
                fechaNacimiento: formik.values.fechaNacimiento,
                observaciones: formik.values.observaciones,
            };
            respuesta = await clientsService.putClient(cliente, usuario.cliente.idCliente);
        } else {
            respuesta = await userService.putMyUser(formik.values, usuario.idUsuario);
        }

        if (respuesta instanceof AxiosError) {
            processErrorMessage(respuesta.response.data);
        } else {
            loadUserInfo();
            navigate("/home");
            addSnackbar({
                message: "Sus datos fueron actualizados exitosamente",
                severity: "success",
            });
        }
    }

    return (
        <Container maxWidth="md" disableGutters component="form" onSubmit={formik.handleSubmit}>
            <Paper sx={{ mx: 1, p: 1, my: 2 }} elevation={2}>
                <Typography variant="h4" align="center">
                    Mis datos
                </Typography>

                <Paper {...paperStyles}>
                    <Stack {...stackStyle}>
                        <GenericComboBox
                            label="Tipo de documento"
                            id="tipoDocumento"
                            minWidth={250}
                            editable={true}
                            value={formik.values.tipoDocumento || ""}
                            handleChange={formik.handleChange}
                            valueForNone=""
                            labelForNone="Seleccionar tipo de documento"
                            values={["DNI", "Pasaporte"]}
                            errorProp={
                                formik.touched.tipoDocumento && Boolean(formik.errors.tipoDocumento)
                            }
                            helperTextProp={
                                formik.touched.tipoDocumento && formik.errors.tipoDocumento
                            }
                        />
                        <TextField
                            label="Numero de documento"
                            id="numeroDocumento"
                            variant="standard"
                            fullWidth
                            value={formik.values.numeroDocumento}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.numeroDocumento &&
                                Boolean(formik.errors.numeroDocumento)
                            }
                            helperText={
                                formik.touched.numeroDocumento && formik.errors.numeroDocumento
                            }
                        />
                    </Stack>
                </Paper>

                <Paper {...paperStyles}>
                    <Stack {...stackStyle}>
                        <TextField
                            label="Nombre"
                            id="nombre"
                            variant="standard"
                            fullWidth
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                            helperText={formik.touched.nombre && formik.errors.nombre}
                        />
                        <TextField
                            label="Apellido"
                            id="apellido"
                            variant="standard"
                            fullWidth
                            value={formik.values.apellido}
                            onChange={formik.handleChange}
                            error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                            helperText={formik.touched.apellido && formik.errors.apellido}
                        />
                    </Stack>

                    {esCliente && (
                        <Stack {...stackStyle} sx={{ mt: 2 }}>
                            <DatePicker
                                label="Fecha nacimiento"
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                editable={true}
                                value={formik.values.fechaNacimiento || ""}
                                onChange={formik.setFieldValue}
                                errorProp={
                                    formik.touched.fechaNacimiento &&
                                    Boolean(formik.errors.fechaNacimiento)
                                }
                                helperTextProp={
                                    formik.touched.fechaNacimiento && formik.errors.fechaNacimiento
                                }
                            />

                            <GenericComboBox
                                label="Sexo"
                                id="sexo"
                                minWidth={250}
                                editable={true}
                                value={formik.values.sexo || ""}
                                handleChange={formik.handleChange}
                                valueForNone=""
                                labelForNone="Seleccionar sexo"
                                values={["Masculino", "Femenino", "No especifica"]}
                            />
                        </Stack>
                    )}
                </Paper>

                <Paper {...paperStyles}>
                    <Stack {...stackStyle}>
                        <TextField
                            label="Email"
                            id="mail"
                            variant="standard"
                            fullWidth
                            value={formik.values.mail}
                            onChange={formik.handleChange}
                            error={formik.touched.mail && Boolean(formik.errors.mail)}
                            helperText={formik.touched.mail && formik.errors.mail}
                        />
                        <TextField
                            label="Celular"
                            id="celular"
                            variant="standard"
                            fullWidth
                            value={formik.values.celular}
                            onChange={formik.handleChange}
                            error={formik.touched.celular && Boolean(formik.errors.celular)}
                            helperText={formik.touched.celular && formik.errors.celular}
                        />
                        {esCliente && (
                            <TextField
                                label="Direccion"
                                id="direccion"
                                variant="standard"
                                fullWidth
                                value={formik.values.direccion}
                                onChange={formik.handleChange}
                                error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                                helperText={formik.touched.direccion && formik.errors.direccion}
                            />
                        )}
                    </Stack>
                </Paper>

                {esCliente && (
                    <Paper {...paperStyles}>
                        <Stack {...stackStyle}>
                            <GenericComboBox
                                label="Objetivo"
                                id="objetivo"
                                minWidth={250}
                                editable={true}
                                value={formik.values.objetivo || ""}
                                handleChange={formik.handleChange}
                                valueForNone=""
                                labelForNone="Seleccionar objetivo"
                                values={[
                                    "Ganar masa muscular",
                                    "Perder peso",
                                    "Tonificar",
                                    "No especifica",
                                ]}
                                errorProp={
                                    formik.touched.objetivo && Boolean(formik.errors.objetivo)
                                }
                                helperTextProp={formik.touched.objetivo && formik.errors.objetivo}
                            />
                        </Stack>
                    </Paper>
                )}

                <Container
                    maxWidth="sm"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ maxWidth: 300, display: { xs: "none", md: "flex" } }}
                    >
                        Guardar cambios
                    </Button>
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
