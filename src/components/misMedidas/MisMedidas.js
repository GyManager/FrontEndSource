import { React, useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import TablaMedidas from "./TablaMedidas";
import GenericComboBox from "../reusable/GenericComboBox";
import ButtonMedidasMobile from "./ButtonMedidasMobile";

import { useParams } from "react-router-dom";
import medidasSchema from "./medidasSchema";
import medidasService from "../../services/medidas.service";
import _ from "lodash";
import { useFormik } from "formik";

function MisMedidas() {
    const formik = useFormik({
        initialValues: {
            fechasMediciones: [],
            idMedidas: "",
            fecha: "",
            medidas: [
                {
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
            ],
        },
        validationSchema: medidasSchema.validationSchema,
        onSubmit: () => {
            handleSubmit();
        },
    });
    const handleSubmit = () => {};
    const params = useParams();
    const idCliente = params.idCliente;
    const [editable, setEditable] = useState(false);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);

    const fetchFechasComboBox = async () => {
        const fechasMediciones = await medidasService.getFechasMediciones(idCliente);
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
        console.log(await medidas);
        formik.setFieldValue("medidas" || "", await medidas, true);
    };

    const getIdMedidasPorFecha = async (fechaSeleccionada) => {
        const fechas = formik.values.fechasMediciones;
        const fecha = fechas.filter((unaFecha) => unaFecha.fecha === fechaSeleccionada);
        const idMedidas = fecha[0].idMedidas;
        return idMedidas;
    };
    const deleteMedidas = async () => {
        await medidasService.deleteMedidasPorIdClientePorIdMedida(
            idCliente,
            formik.values.idMedidas
        );
        const fechasMediciones = await fetchFechasComboBox();
        setUltimaFecha(fechasMediciones);
    };
    const handleDeleteClick = () => {
        setOpenAlertDialog(true);
        console.log(formik.values.idMedidas);
    };

    useEffect(() => {
        fetchFechasComboBox().then((fechasMediciones) => {
            setUltimaFecha(fechasMediciones).then((idMedidas) => {
                fetchMedidas(idMedidas);
            });
        });
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
                </Box>
                <TablaMedidas ultimasMedidas={formik.values.medidas} editable={editable} />
            </Paper>
            <ButtonMedidasMobile
                editable={editable}
                handleEditClick={() => setEditable(true)}
                handleDeleteClick={handleDeleteClick}
                deleteMedidas={deleteMedidas}
                handleCancelEdit={() => setEditable(false)}
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
