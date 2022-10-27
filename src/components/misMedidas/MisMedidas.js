import { React, useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import TablaMedidas from "./TablaMedidas";
import GenericComboBox from "../reusable/GenericComboBox";

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

    const fetchComboFechas = async () => {
        const fechasMediciones = await medidasService.getFechasMediciones(idCliente);
        formik.setFieldValue("fechasMediciones" || "", await fechasMediciones, false);
        return await fechasMediciones;
    };

    const cargarUltimaFecha = async (res) => {
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

    useEffect(() => {
        fetchComboFechas().then((fechasMediciones) => {
            cargarUltimaFecha(fechasMediciones).then((idMedidas) => {
                fetchMedidas(idMedidas);
            });
        });
    }, []);
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
                <TablaMedidas ultimasMedidas={formik.values.medidas} />
            </Paper>
        </Container>
    );
}

export default MisMedidas;
