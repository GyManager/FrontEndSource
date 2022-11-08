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
    } = useContext(AvancesContext);
    // const { idEjercicio } = useParams();
    const [data, setData] = useState([{}]);
    const [medidaComboBox, setMedidaComboBox] = useState("Carga");
    const [ejercicioComboBox, setEjercicioComboBox] = useState('');
    const [dataByType, setDataByType] = useState([{}]);
    const navigate = useNavigate()

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

    const ejercicioListadoComboBox = avanceEjercicios.map((unEjercicio)=>{return unEjercicio.nombre})

    const generarData = (dataType) => {
        const dataName = dataType === "Carga" ? "cargaReal" : "tiempoReal";
        const dataByTypeArray = historicoEjercicio.map((unRegistro) => {
            return {
                fecha: unRegistro.fechaCarga,
                valor: unRegistro[dataName],
            };
        });
        setDataByType(dataByTypeArray);
    };
    const ejercicioByName = async(event) => { 
        const ejercicioBuscado = 
        avanceEjercicios.filter((unEjercicio) => {
            console.log(unEjercicio.nombre + ' | ' + event.target.value + ' | ' + (unEjercicio.nombre === event.target.value))
        return unEjercicio.nombre === event.target.value})
        return ejercicioBuscado
    };

    const ejercicioById = avanceEjercicios.filter((unEjercicio) => {
        return Number(unEjercicio.idEjercicio) === Number(idEjercicio);
    });

    const handleChangeEjercicio = async(event) => {
        await setEjercicioComboBox(await event.target.value)
        const ejercicioSeleccionado = await ejercicioByName(event)
        const idEjercicio = ejercicioSeleccionado[0].idEjercicio
        navigate('/mis-avances/' + idCliente + '/ejercicio/' + idEjercicio   )
        
        await console.log('hoolaMundo',await ejercicioSeleccionado[0])

    }

    const handleChangeMedida = (event) => {
        setMedidaComboBox(event.target.value);
        console.log("event.target.value", event.target.value);
        generarData(event.target.value);
    };

    const titulo = ejercicioById[0].nombre;

    console.log("ejercicioById", ejercicioById);
    useEffect(() => {
        fetchHistoricoEjercicio(idCliente, idEjercicio).then(() => generarData("Carga"));
        setEjercicioComboBox(titulo)
    }, [idCliente, idEjercicio]);

  

    console.log("historicoEjercicio", historicoEjercicio);

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
                    <Box sx={{ display:'flex', justifyContent:'center',mt: 1 }}>
                        <GenericComboBox
                            label="Ejercicio"
                            id="ejercicioComboBox"
                            value={ejercicioComboBox}
                            handleChange={handleChangeEjercicio}
                            editable={true}
                            valueForNone=""
                            labelForNone="Seleccionar ejercicio"
                            values={avanceEjercicios.map((unEjercicio)=>{return unEjercicio.nombre})}
                            minWidth={250}
                        />
                    </Box>
                    <Box sx={{ display:'flex', justifyContent:'center',mt: 1 }}>
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
