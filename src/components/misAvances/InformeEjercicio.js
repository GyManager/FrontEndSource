import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Container, Paper, Typography } from "@mui/material";
import GenericComboBox from "../reusable/GenericComboBox";
import ContenedorCharts from "../reusable/ContenedorCharts/ContenedorCharts";

import { AvancesContext } from "../../context/AvancesContext";

function InformeEjercicio() {
    const {
        avanceEjercicios,
        fetchHistoricoEjercicio,
        idCliente,
        idEjercicio,
        historicoEjercicio,
        setHistoricoEjercicio,
    } = useContext(AvancesContext);
    const [titulo, setTitulo] = useState("");
    const [medidaComboBox, setMedidaComboBox] = useState("Carga");
    const [ejercicioComboBox, setEjercicioComboBox] = useState("");
    const [dataByType, setDataByType] = useState(() => [{}]);
    const navigate = useNavigate();

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
            // px: 2,
        },
    };
    const titleSeccionStyle = {
        variant: "h4",
        sx: { textAlign: "center" },
    };

    const generarData = async (dataType, resHistoricoEjercicio) => {
        if (resHistoricoEjercicio) {
            setHistoricoEjercicio(resHistoricoEjercicio);
        }
        const dataName = dataType === "Carga" ? "cargaReal" : "tiempoReal";
        console.log("resHistoricoEjercicio", await resHistoricoEjercicio);
        const dataByTypeArray = await resHistoricoEjercicio.map((unRegistro) => {
            return {
                fecha: unRegistro.fechaCarga,
                valor: unRegistro[dataName],
            };
        });
        console.log("dataByTypeArray", dataByTypeArray);
        setDataByType(await dataByTypeArray);
    };

    const ejercicioByName = async (event) => {
        const ejercicioBuscado = avanceEjercicios.filter((unEjercicio) => {
            return unEjercicio.nombre === event.target.value;
        });
        return ejercicioBuscado;
    };

    const ejercicioById = avanceEjercicios.filter((unEjercicio) => {
        return Number(unEjercicio.idEjercicio) === Number(idEjercicio);
    });

    const handleChangeEjercicio = async (event) => {
        await setEjercicioComboBox(await event.target.value);
        const ejercicioSeleccionado = await ejercicioByName(event);
        const idEjercicio = ejercicioSeleccionado[0].idEjercicio;
        navigate("/mis-avances/" + idCliente + "/ejercicio/" + idEjercicio);
        generarData(medidaComboBox);
    };

    const handleChangeMedida = (event) => {
        setMedidaComboBox(event.target.value);
        console.log("event.target.value", event.target.value);
        generarData(event.target.value);
    };

    const cargaInicial = () => {
        const ejercicioInicial = ejercicioById;
        setTitulo(ejercicioInicial[0].nombre);
        setEjercicioComboBox(ejercicioInicial[0].nombre);
    };

    useEffect(() => {
        generarData(medidaComboBox, historicoEjercicio);
    }, [medidaComboBox]);

    useEffect(() => {
        cargaInicial();
        fetchHistoricoEjercicio(idCliente, idEjercicio).then((response) => {
            generarData(medidaComboBox, response);
        });
    }, [idEjercicio]);

    useEffect(() => {
        cargaInicial();
        fetchHistoricoEjercicio(idCliente, idEjercicio).then((response) => {
            generarData("Carga", response);
        });
    }, []);

    return (
        <Container sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Box {...boxStyle}>
                <Paper {...paperStyle}>
                    <Typography {...titleSeccionStyle}>Avance de ejercicio</Typography>
                </Paper>
            </Box>
            <Box {...boxStyle}>
                <Paper {...paperStyle} sx={{ p: 2 }}>
                    <Typography variant="h5" textAlign={"center"}>
                        {" "}
                        {titulo}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            justifyContent: { md: "space-around" },
                            alignItems: "center",
                            mt: 1,
                        }}
                    >
                        <GenericComboBox
                            label="Ejercicio"
                            id="ejercicioComboBox"
                            value={ejercicioComboBox}
                            handleChange={handleChangeEjercicio}
                            editable={true}
                            valueForNone=""
                            labelForNone="Seleccionar ejercicio"
                            values={avanceEjercicios.map((unEjercicio) => {
                                return unEjercicio.nombre;
                            })}
                            minWidth={250}
                            // fullwidth
                        />
                        <Box sx={{ mt: { xs: 2, md: "none" } }}>
                            <GenericComboBox
                                label="Medida"
                                id="medidaComboBox"
                                value={medidaComboBox}
                                handleChange={handleChangeMedida}
                                editable={true}
                                valueForNone=""
                                labelForNone="Seleccionar medida"
                                values={["Tiempo", "Carga"]}
                                minWidth={250}
                            />
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Box>
                <Paper {...paperStyle} sx={{ mb: { xs: "30px", md: "80px" } }}>
                    <ContenedorCharts
                        title={"Ejercicio: " + titulo + " - Medida: " + medidaComboBox}
                        data={dataByType}
                        label={medidaComboBox}
                    />
                </Paper>
            </Box>
        </Container>
    );
}

export default InformeEjercicio;
