import { React, useState, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Grafico from "./Grafico";
import DatePicker from "../reusable/DatePicker";

import { Line } from "react-chartjs-2";

import medidasService from "../../services/medidas.service";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import _ from "lodash";

function InformeTipoMedida(props) {
    const formik = useFormik({
        initialValues: {
            fechaDesde: new Date(),
        },
    });
    const { idCliente, tipoMedida } = useParams();
    const [medidasClienteHistory, setMedidasClienteHistory] = useState([]);
    const [filteredMedidas, setFilteredMedidas] = useState([medidasClienteHistory]);
    console.log(medidasClienteHistory);

    useEffect(() => {
        const fetchMedidasHistoricas = async () => {
            const res = await medidasService.getMedidasSummary(idCliente, tipoMedida);
            setMedidasClienteHistory(res.medidasClienteHistory);
        };
        fetchMedidasHistoricas();
    }, []);

    useEffect(() => {
        const fechaDesde = formik.values.fechaDesde;
        const año = fechaDesde.getFullYear();
        const mes = _.padStart(fechaDesde.getMonth() + 1, 2, "0");
        const dia = _.padStart(fechaDesde.getDate(), 2, "0");
        const fechaDesdeFormated = año + "-" + mes + "-" + dia;
        console.log("fechaDesdeFormated", fechaDesdeFormated);
        console.log(medidasClienteHistory.fecha >= fechaDesdeFormated);
        const filteredMedida = medidasClienteHistory.filter((unaMedida) => {
            console.log(
                unaMedida.fecha +
                    "   " +
                    fechaDesdeFormated +
                    "  " +
                    (unaMedida.fecha >= fechaDesdeFormated)
            );
            return unaMedida.fecha >= fechaDesdeFormated;
        });
        setFilteredMedidas(filteredMedida);
        console.log("filteredMedida", filteredMedida);
    }, [formik.values.fechaDesde]);

    return (
        <Box>
            <Box sx={{ m: 2 }}>
                <Paper sx={{ width: "95vw", height: "20vh", mt: { xs: '230px', sm: 5 }, p:1 }}>
                    <Typography variant="h4" textAlign="center" gutterBottom>
                        Historico de {tipoMedida}
                    </Typography>
                    <DatePicker
                        value={formik.values.fechaDesde || ""}
                        id="fechaDesde"
                        name="fechaDesde"
                        label="Fecha desde"
                        editable={true}
                        onChange={formik.setFieldValue}
                        errorProp={formik.touched.fechaDesde && Boolean(formik.errors.fechaDesde)}
                        helperTextProp={formik.touched.fechaDesde && formik.errors.fechaDesde}
                    />
                </Paper>
            </Box>
            <Paper
                sx={{
                    width: "95vw",
                    height: "85vh",
                    backgroundColor: "lightGrey",
                    mx: 2,
                    mt: 3,
                    mb:10
                }}
            >
                <Grafico mediciones={filteredMedidas} />
            </Paper>
            {/* <DatePicker
                    value={(true ? fechaHasta : formik.values.fechaHasta) || ""}
                    id="fechaHasta"
                    name="fechaHasta"
                    label="Fecha hasta"
                    editable={false}
                /> */}
        </Box>
    );
}

export default InformeTipoMedida;

//
