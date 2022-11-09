import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Container, Paper, Typography } from "@mui/material";
import GenericComboBox from "../reusable/GenericComboBox";
import VistaInforme from "./VistaInforme";

import { AvancesContext } from "../../context/AvancesContext";

function InformeEjercicio() {
    const {
        avanceEjercicios,
        fetchHistoricoEjercicio,
        idCliente,
        idEjercicio,
        historicoEjercicio,
        setHistoricoEjercicio
    } = useContext(AvancesContext);
    // const { idEjercicio } = useParams();
    const [titulo, setTitulo] = useState("");
    const [medidaComboBox, setMedidaComboBox] = useState("Carga");
    const [ejercicioComboBox, setEjercicioComboBox] = useState("");
    const [dataByType, setDataByType] = useState(()=>[{}]);
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
            px: 2,
        },
    };
    const titleSeccionStyle = {
        variant: "h4",
        sx: { textAlign: "center" },
    };

    const titleStyle = {
        variant: "h5",
        sx: { textAlign: "center" },
    };

    const buttonStyle = {
        variant: "contained",
        sx: {
            mb: 2,
            mx: 3,
        },
    };

    const generarData = async (dataType, resHistoricoEjercicio) => {
        if(resHistoricoEjercicio){
            setHistoricoEjercicio(resHistoricoEjercicio)
        }
        const dataName = dataType === "Carga" ? "cargaReal" : "tiempoReal";
        console.log('resHistoricoEjercicio', await resHistoricoEjercicio)
        const dataByTypeArray = await resHistoricoEjercicio.map((unRegistro) => {
            return {
                fecha: unRegistro.fechaCarga,
                valor: unRegistro[dataName],
            };
        });
        console.log('dataByTypeArray',dataByTypeArray)
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
        await console.log("hoolaMundo", await ejercicioSeleccionado[0]);
        generarData(medidaComboBox);
    };

    const handleChangeMedida = (event) => {
        setMedidaComboBox(event.target.value);
        console.log("event.target.value", event.target.value);
        generarData(event.target.value);
    };

    console.log("ejercicioById", ejercicioById);
    // useEffect(() => {
    //     fetchHistoricoEjercicio(idCliente, idEjercicio).then(() => generarData("Carga"));
    //     setTitulo(ejercicioById[0].nombre);
    //     setEjercicioComboBox(titulo);
    // }, [idCliente, idEjercicio, ejercicioComboBox]);

    const cargaInicial = () => {
        const ejercicioInicial = ejercicioById;
        setTitulo(ejercicioInicial[0].nombre);
        setEjercicioComboBox(ejercicioInicial[0].nombre);
    };
    // fetchHistoricoEjercicio(idCliente, idEjercicio).then(() => generarData("Carga"));
    useEffect(() => {
        generarData(medidaComboBox, historicoEjercicio)}
    , [medidaComboBox]);
    
    useEffect(() => {
        cargaInicial()
        fetchHistoricoEjercicio(idCliente, idEjercicio)
        .then((response) => {generarData(medidaComboBox, response)})}
    , [idEjercicio]);
    
    useEffect(() => {
        cargaInicial()
        fetchHistoricoEjercicio(idCliente, idEjercicio)
        .then((response) => {generarData("Carga", response)})}
    , []);

    return (
        <Container>
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
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
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
                        />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
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
                </Paper>
            </Box>
            <Box>
                <Paper {...paperStyle}>
                    {/* <VistaInforme title={ejercicioById} data={historicoEjercicio} /> */}
                    <VistaInforme title={titulo} data={dataByType} label={medidaComboBox} />
                </Paper>
            </Box>
        </Container>
    );
}

export default InformeEjercicio;
