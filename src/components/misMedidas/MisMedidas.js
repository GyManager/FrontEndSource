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
    // const [fechasMediciones, setFechasMediciones] = useState([]);
    const [ultimaFecha, setUltimaFecha] = useState({});
    // const [fechaSeleccionada, setFechaSeleccionada] = useState("");
    const [ultimasMedidas, setUltimasMedidas] = useState({});

    const fetchFechas = async () => {
        const res = await medidasService.getFechasMediciones(idCliente);
        // setFechasMediciones(await res);
        await formik.setFieldValue("fechasMediciones" || "", await res, false);
        // formik.setFieldValue(unPar[0], unPar[1] || "", false);
    };
    const cargarUltimaFecha = async () => {
        const ultimaFecha = await _.maxBy(formik.values.fechasMediciones, "fecha");
        setUltimaFecha(await ultimaFecha);
        // console.log("fechasMediciones", await res);
        console.log("ultimaFecha", await ultimaFecha);
        await formik.setFieldValue(
            "fecha" || "",
            await ultimaFecha.fecha,
            false
        );
        console.log("formik.values.fecha", await formik.values.fecha);
    };
    const fetchMedidas = async (idFecha) => {
        const medidas = await medidasService.getMedidasPorIdClientePorIdFecha(
            idCliente,
            // await ultimaFecha.idMedidas
            await idFecha
        );
        setUltimasMedidas(await medidas);
        console.log("medidas", medidas);

        const ultimasMedidasParesArray = _.toPairs(await medidas);
        const filteredPairs = ultimasMedidasParesArray.filter(
            (unPar) => unPar[0] !== "idMedidas" && unPar[0] !== "fecha" && unPar[0] !== "foto"
        );
        console.log("filteredPairs", filteredPairs);
        await filteredPairs.forEach((unPar, index) => {
            // formik.setFieldValue(unPar[0], unPar[1] || "", false);
            // formik.setFieldValue(medidas[index], unPar[1] || "", false);
            // formik.setFieldValue(unPar[0], unPar[1] || "", false);
            console.log(unPar[0]);
        });
        console.log(formik);
    };
    useEffect(() => {
        // Para hacer
        // fetchFechasMedidas(idCliente)
        // fetchUltimaFecha(Medidas)
        // fetchMedidas(unaFecha)
        fetchFechas();
        cargarUltimaFecha();
        fetchMedidas(ultimaFecha.idFecha);
    }, [idCliente]);

    useEffect(() => {
        fetchMedidas();
    }, [formik.values.fecha]);
    // console.log('fechasMediciones',fechasMediciones)
    // console.log('ultimaFecha',ultimaFecha)
    // console.log('ultimasMedidas',ultimasMedidas)
    // console.log(fechasMediciones.map((unaMedicion)=>{return unaMedicion.fecha }))
    console.log("formik.values.medidas", formik.values.medidas[0]);
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
                <TablaMedidas ultimasMedidas={ultimasMedidas} />
                {/* <TablaMedidas ultimasMedidas={formik.values.medidas} /> */}
            </Paper>
        </Container>
    );
}

export default MisMedidas;
