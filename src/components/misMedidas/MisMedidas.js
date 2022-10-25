import { Box, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useEffect, useState } from "react";
import DatePicker from "../reusable/DatePicker";
import TablaMedidas from "./TablaMedidas";
import medidasService from "../../services/medidas.service";
import { useParams } from "react-router-dom";
import GenericComboBox from "../reusable/GenericComboBox";
import _ from "lodash";

function MisMedidas() {
    const params = useParams();
    const idCliente = params.idCliente;
    console.log("idCliente:", idCliente);
    const [fechasMediciones, setFechasMediciones] = useState([]);
    const [ultimaFecha, setUltimaFecha] = useState({});
    const [ultimasMedidas, setUltimasMedidas] = useState({})

    useEffect(() => {
        const fetchFechasYMedidas = async () => {
            const res = await medidasService.getFechasMediciones(idCliente);
            setFechasMediciones(await res);
            const ultimaFecha = await _.maxBy(res, "fecha");
            setUltimaFecha(await ultimaFecha);
            // console.log("fechasMediciones", await res);
            // console.log("ultimaFecha", await ultimaFecha);

            const medidas = await medidasService.getMedidasPorIdClientePorIdFecha(idCliente, await ultimaFecha.idMedidas);
            setUltimasMedidas(await medidas)
        };
        fetchFechasYMedidas();

    }, [idCliente]);
console.log('fechasMediciones',fechasMediciones)
console.log('ultimaFecha',ultimaFecha)
console.log('ultimasMedidas',ultimasMedidas)

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
                        {/* <GenericComboBox 
                            // label="Mediciones"
                            // id="mediciones"
                            // value={formik.values.sexo}
                            // handleChange={formik.handleChange}
                            // editable={editable}
                            // valueForNone=""
                            // labelForNone="Seleccionar sexo"
                            // values={["Masculino", "Femenino", "No especifica"]}
                            // minWidth={250}
                        {/* /> */}
                        {/* <DatePicker
                            // value={fechaBusqueda}
                            id="fechaBusqueda"
                            name="fechaBusqueda"
                            label="Ver medidas desde"
                            editable={true}
                            // onChange={(id, value) => setFechaBusqueda(value)}
                        /> */}
                    </Box>
                </Box>
                <TablaMedidas />
            </Paper>
        </Container>
    );
}

export default MisMedidas;
