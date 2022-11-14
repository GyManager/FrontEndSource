import { React, useState, useEffect, useRef } from "react";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { Container } from "@mui/system";
import DatePicker from "../reusable/DatePicker";

import medidasService from "../../services/medidas.service";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import _ from "lodash";

import ContenedorCharts from "../reusable/ContenedorCharts/ContenedorCharts";

function InformeTipoMedida(props) {
    const d = new Date();
    d.setMonth("00");
    d.setDate("01");

    const formik = useFormik({
        initialValues: {
            fechaDesde: d,
        },
    });
    const { idCliente, tipoMedida } = useParams();
    const [medidasClienteHistory, setMedidasClienteHistory] = useState([]);
    const [filteredMedidas, setFilteredMedidas] = useState([medidasClienteHistory]);

    const boxStyle = {
        sx: {
            display: "flex",
            flexDirection: "column",
        },
    };

    const paperStyle = {
        sx: {
            width: "100%",
            mb: 3,
        },
    };
    const titleSeccionStyle = {
        variant: "h4",
        sx: { textAlign: "center" },
    };

    const fetchMedidasHistoricas = async () => {
        const res = await medidasService.getMedidasSummary(idCliente, tipoMedida);
        setMedidasClienteHistory(await res.medidasClienteHistory);
        console.log("fectch: medidasClienteHistory", await res);
        return await res.medidasClienteHistory;
    };

    const dateToString = (date) => {
        const año = date.getFullYear();
        const mes = _.padStart(date.getMonth() + 1, 2, "0");
        const dia = _.padStart(date.getDate(), 2, "0");
        const stringDate = año + "-" + mes + "-" + dia;
        return stringDate;
    };

    const filtrarMedidasPorFecha = async (unaFecha, medidasClienteHistory) => {
        const filteredMedidas = await medidasClienteHistory.filter((unaMedida) => {
            return unaMedida.fecha >= unaFecha;
        });
        return await filteredMedidas;
    };

    useEffect(() => {
        fetchMedidasHistoricas()
            .then((medidasClienteHistory) => {
                return [dateToString(formik.values.fechaDesde), medidasClienteHistory];
            })
            .then(([fechaDesdeFormated, medidasClienteHistory]) => {
                const medidasFilt = filtrarMedidasPorFecha(
                    fechaDesdeFormated,
                    medidasClienteHistory
                );
                return medidasFilt;
            })
            .then((filteredMedida) => {
                setFilteredMedidas(filteredMedida);
            });
    }, [formik.values.fechaDesde]);

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mt: { xs: "90px", md: "180px" },
            }}
        >
            <Box {...boxStyle}>
                <Paper {...paperStyle}>
                    <Typography {...titleSeccionStyle}>Historico de {tipoMedida}</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            my: 1,
                        }}
                    >
                        <DatePicker
                            value={formik.values.fechaDesde || ""}
                            id="fechaDesde"
                            name="fechaDesde"
                            label="Fecha desde"
                            editable={true}
                            onChange={formik.setFieldValue}
                            errorProp={
                                formik.touched.fechaDesde && Boolean(formik.errors.fechaDesde)
                            }
                            helperTextProp={formik.touched.fechaDesde && formik.errors.fechaDesde}
                        />
                    </Box>
                </Paper>
            </Box>
            <Paper {...paperStyle} sx={{ mb: { xs: "30px", md: "80px" } }}>
                <ContenedorCharts title={"Peso: "} data={filteredMedidas} label={"kg"} />
            </Paper>
        </Container>
    );
}

export default InformeTipoMedida;
