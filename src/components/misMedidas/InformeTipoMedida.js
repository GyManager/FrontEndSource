import { React, useState, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Grafico from "./Grafico";
import DatePicker from "../reusable/DatePicker";
import FitScreenIcon from "@mui/icons-material/FitScreen";

import medidasService from "../../services/medidas.service";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import _ from "lodash";

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
    const [visualMode, setVisualMode] = useState(false);

    const fetchMedidasHistoricas = async () => {
        const res = await medidasService.getMedidasSummary(idCliente, tipoMedida);
        setMedidasClienteHistory(await res.medidasClienteHistory);
        console.log('fectch: medidasClienteHistory', await res)
        return await res.medidasClienteHistory
    };

    const dateToString = (date) => {
        const año = date.getFullYear();
        const mes = _.padStart(date.getMonth() + 1, 2, "0");
        const dia = _.padStart(date.getDate(), 2, "0");
        const stringDate = año + "-" + mes + "-" + dia;
        return stringDate;
    };

    const filtrarMedidasPorFecha = async(unaFecha, medidasClienteHistory) => {
        const filteredMedidas = await medidasClienteHistory.filter((unaMedida) => {
            return unaMedida.fecha >= unaFecha;
        });
        return await filteredMedidas;
    };

    useEffect(() => {
        fetchMedidasHistoricas()
            .then((medidasClienteHistory) => {
                return [dateToString(formik.values.fechaDesde), medidasClienteHistory] ;
            })
            .then(([fechaDesdeFormated, medidasClienteHistory]) => {
                const medidasFilt = filtrarMedidasPorFecha(fechaDesdeFormated, medidasClienteHistory);
                return medidasFilt;
            })
            .then((filteredMedida) => {
                setFilteredMedidas(filteredMedida);
            });
    }, [formik.values.fechaDesde]);

    return (
        <Box>
            <Box sx={{ mx: 2, }}>
                <Paper sx={{ width: "90vw", mt: { xs: "90px", sm: "100px", lg: "250px" }, p: 1 }}>
                    <Typography variant="h4" textAlign="center" gutterBottom>
                        Historico de {tipoMedida}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                        <Button
                            variant="outlined"
                            endIcon={<FitScreenIcon />}
                            sx={{ ml: 2 }}
                            onClick={() => {
                                setVisualMode(!visualMode);
                            }}
                        >
                            {visualMode ? "Ajustar" : "Desplazar"}
                        </Button>
                    </Box>
                </Paper>
            </Box>
            <Box sx={{ m: 2 }}>
            <Paper
                sx={{
                    width: "90vw",
                    backgroundColor: "lightGrey",
                }}
            >
                <Grafico mediciones={filteredMedidas} visualMode={visualMode} />
            </Paper>
            </Box>
        </Box>
    );
}

export default InformeTipoMedida;

//
