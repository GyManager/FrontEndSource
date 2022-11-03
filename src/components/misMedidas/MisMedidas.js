import { React, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { InfoOutlined } from "@mui/icons-material";
import TablaMedidas from "./TablaMedidas";
import GenericComboBox from "../reusable/GenericComboBox";
import ButtonMedidasMobile from "./ButtonMedidasMobile";

import _ from "lodash";
import { useFormik } from "formik";
import { SnackbarContext } from "../../context/SnackbarContext";
import { ErrorContext } from "../../context/ErrorContext";

import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import medidasService from "../../services/medidas.service";
import clientsService from "../../services/users.service";
import medidasSchema from "./medidasSchema";

function MisMedidas() {
    const formik = useFormik({
        initialValues: {
            fechasMediciones: [],
            idMedidas: "",
            fecha: "",
            medidas: {
                peso: "",
                altura: "",
                cervical: "",
                dorsal: "",
                lumbar: "",
                coxalPelvica: "",
                cadera: "",
                muslosIzq: "",
                muslosDer: "",
                rodillasIzq: "",
                rodillasDer: "",
                gemelosIzq: "",
                gemelosDer: "",
                brazoIzq: "",
                brazoDer: "",
            },
        },
        validationSchema: medidasSchema.validationSchema,
        onSubmit: () => {
            handleSubmit();
        },
    });
    const handleSubmit = async () => {
        if (idMedidas === "new") {
            const res = await medidasService.postMedidasPorIdCliente(
                idCliente,
                formik.values.medidas
            );
            handleRespuesta(await res, "Medidas registradas correctamente");
            handleClose();
        } else {
            const res = await medidasService.putMedidasPorIdClientePorIdMedidas(
                idCliente,
                formik.values.medidas,
                formik.values.idMedidas
            );
            handleRespuesta(await res, "Medidas modificadas correctamente");
        }
    };
    const params = useParams();
    const idCliente = params.idCliente;
    const idMedidas = params.idMedidas;
    const [editable, setEditable] = useState(false);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const { addSnackbar } = useContext(SnackbarContext);
    const { processErrorMessage } = useContext(ErrorContext);
    const navigate = useNavigate();

    const resetFormikFields = () => {
        const medidasKeys = Object.keys(formik.values.medidas);
        const resetFields = medidasKeys.map((unField) =>
            formik.setFieldValue(`medidas.${unField}`, "", true)
        );
        formik.setFieldValue("fecha", "");
        formik.setFieldValue("idMedidas", "");
        resetFields();
    };

    const handleClose = () => {
        navigate("../mis-medidas/" + idCliente);
        setEditable(false);
        cargaInicial();
    };

    const handleAddClick = () => {
        navigate("../mis-medidas/" + idCliente + "/new");
        setEditable(true);
        resetFormikFields();
    };

    const handleEditClick = () => {
        navigate("../mis-medidas/" + idCliente + "/" + formik.values.idMedidas);
        setEditable(true);
    };

    const handleRespuesta = (res, msj) => {
        if (res instanceof AxiosError) {
            processErrorMessage(res.response.data);
        } else {
            setEditable(false);
            addSnackbar({ message: msj, severity: "success", duration: 3000 });
            navigate("/home");
        }
        return;
    };

    const fetchFechasComboBox = async () => {
        let fechasMediciones = await medidasService.getFechasMediciones(idCliente);
        fechasMediciones = _.orderBy(fechasMediciones, "fecha");
        formik.setFieldValue("fechasMediciones" || "", await fechasMediciones, false);
        return await fechasMediciones;
    };

    const setUltimaFecha = async (res) => {
        const ultimaFecha = await _.maxBy(res, "fecha");
        formik.setFieldValue("fecha" || "", await ultimaFecha.fecha, false);
        formik.setFieldValue("idMedidas" || "", await ultimaFecha.idMedidas, false);
        return ultimaFecha.idMedidas;
    };

    const fetchMedidas = async (idMedidas) => {
        const medidas = medidasService.getMedidasPorIdClientePorIdFecha(idCliente, await idMedidas);
        formik.setFieldValue("medidas" || "", await medidas, true);
    };

    const getIdMedidasPorFecha = async (fechaSeleccionada) => {
        const fechas = await formik.values.fechasMediciones;
        const fecha = await fechas.filter((unaFecha) => unaFecha.fecha === fechaSeleccionada);
        console.log("probando", fechaSeleccionada);
        const idMedidas = await fecha[0].idMedidas;
        return idMedidas;
    };
    const deleteMedidas = async () => {
        const res = await medidasService.deleteMedidasPorIdClientePorIdMedida(
            idCliente,
            formik.values.idMedidas
        );
        handleRespuesta(res, "Medidas eliminadas exitosamente");
    };
    const handleDeleteClick = () => {
        setOpenAlertDialog(true);
        console.log(formik.values.idMedidas);
    };

    const cargaInicial = () => {
        fetchFechasComboBox().then((fechasMediciones) => {
            setUltimaFecha(fechasMediciones).then((idMedidas) => {
                fetchMedidas(idMedidas);
            });
        });
    };

    useEffect(() => {
        cargaInicial();
    }, []);

    // Este useEffect se ejecuta al seleccionar una nueva fecha en el combobox
    useEffect(() => {
        getIdMedidasPorFecha(formik.values.fecha).then((idMedidas) => {
            //Ejecuto en paralelo porque ya tengo idMedidas
            fetchMedidas(idMedidas);
            formik.setFieldValue("idMedidas" || "", idMedidas, false);
        });
    }, [formik.values.fecha]);

    return (
        <Container maxWidth="md" disableGutters>
            <Paper sx={{ mx: 1, p: 1, my: 2 }} elevation={2}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <Typography variant="h5" align="center">
                        Mis Medidas
                    </Typography>
                    {editable ? (
                        <>
                            <Typography>{formik.values.fecha}</Typography>
                            <IconButton
                                edge="end"
                                size="large"
                                aria-label="info"
                                sx={{ mr: 2 }}
                                onClick={() => {}}
                            >
                                <InfoOutlined />
                            </IconButton>
                        </>
                    ) : (
                        <Box sx={{ width: "40vw", mt: 2 }}>
                            <GenericComboBox
                                label="Medicion"
                                id="fecha"
                                value={formik.values.fecha}
                                handleChange={formik.handleChange}
                                editable={true}
                                valueForNone=""
                                labelForNone="Seleccionar fecha"
                                values={formik.values.fechasMediciones.map((unaMedicion) => {
                                    return unaMedicion.fecha;
                                })}
                                minWidth={150}
                            />
                        </Box>
                    )}
                </Box>
                <TablaMedidas
                    ultimasMedidas={formik.values.medidas}
                    editable={editable}
                    formik={formik}
                />
            </Paper>
            <ButtonMedidasMobile
                editable={editable}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                deleteMedidas={deleteMedidas}
                handleCancelEdit={handleClose}
                handleAddClick={handleAddClick}
                clienteId={formik.values.idMedidas}
                handleSubmit={formik.handleSubmit}
                formik={formik}
                openAlertDialog={openAlertDialog}
                setOpenAlertDialog={setOpenAlertDialog}
            />
        </Container>
    );
}

export default MisMedidas;
