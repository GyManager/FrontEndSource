import React, { useEffect, useState, useContext } from "react";
import { Avatar, Box, Typography, useMediaQuery, Paper, Stack, Badge } from "@mui/material";

import {
    AdminPanelSettings,
    FitnessCenter,
    Mail,
    Person,
    ListAlt,
    Lock,
    Receipt,
    FolderCopy
} from "@mui/icons-material";

import { Container } from "@mui/system";
import Card from "./Card";
import logo from "../../images/logo.png";
import { menuItem } from "../drawer/Drawer";
import clientsService from "../../services/users.service";
import matriculasService from "../../services/matriculas.service";
import usersHooks from "../../services/usersHooks";
import MiMatriculaDialog from "../miMatricula/MiMatriculaDialog";
import { UserContext } from "../../context/UserContext";
// import useFetchActiveUserMatriculas from "../../services/usersHooks";

function Dash(props) {
    const [userInfo, setUserInfo] = useState({});
    const { notificaciones, loadingNotificaciones } = useContext(UserContext);
    const [matriculas, setMatriculas] = useState([]);
    const [tieneClienteAsociado, setTieneClienteAsociado] = useState(()=>{});
    const [clienteMatriculado, setClienteMatriculado] = useState(() => false);
    const [idCliente, setIdCliente] = useState(()=>{});
    console.log("dash:");

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await clientsService.getActiveUser();
            console.log("dash res:", userInfo);
            setUserInfo(userInfo);
            setTieneClienteAsociado(userInfo.cliente ? true : false);
            if(userInfo.cliente){
                setClienteMatriculado(userInfo.cliente.clienteEstado !== "No matriculado")
            }
            const idCliente = userInfo.cliente?.idCliente;
            setIdCliente(idCliente);
        };
        fetchUserInfo();
    }, []);
    console.log("tieneClienteAsociado:", tieneClienteAsociado);

    useEffect(() => {
        const fecthMatriculas = async () => {
            if (await tieneClienteAsociado) {
                const res = await matriculasService.getMatriculasByIdCliente(await idCliente);
                setMatriculas(await res);
                console.log("res: ", await res);
            }
        };
        fecthMatriculas();
    }, [idCliente, tieneClienteAsociado]);

    console.log("dash: idCliente:", idCliente);
    console.log("dash: userInfo:", userInfo);
    console.log("dash: matriculas", matriculas);


    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const iconMediumStyle = {
        width: "40%",
        height: "8vh",
        color: "primary.main",
    };
    const iconLargeStyle = {
        width: "100%",
        height: "8vh",
        color: "primary.main",
    };

    const isMediumDevice = useMediaQuery("(max-width:900px)");

    const iconStyle = {
        sx: isMediumDevice ? iconMediumStyle : iconLargeStyle,
        color: "white",
    };

    const feedbackPlanesPendientes = loadingNotificaciones
        ? 0
        : notificaciones.filter((notificacion) => notificacion.id === "FEEDBACK_PLANES")[0]?.valor;

    const styledIcons = [
        {
            text: "Plan Vigente",
            icon: <Mail {...iconStyle} />,
        },
        {
            text: "Historico Planes",
            icon: (
                <Badge
                    badgeContent={feedbackPlanesPendientes}
                    color="warning"
                    component="span"
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    sx={{ mx: 2.79 }}
                >
                    <FolderCopy sx={iconLargeStyle} />
                </Badge>
            ),
        },
        {
            text: "Clientes",
            icon: <Person {...iconStyle} />,
        },
        {
            text: "Ejercicios",
            icon: <FitnessCenter {...iconStyle} />,
        },
        {
            text: "Micro Planes",
            icon: <ListAlt {...iconStyle} />,
        },
        {
            text: "Usuarios",
            icon: <AdminPanelSettings {...iconStyle} />,
        },
        {
            text: "Mi Matricula",
            icon: <Receipt {...iconStyle} />,
        },
        {
            text: "Mis datos",
            icon: <Person {...iconStyle} />,
        },
        {
            text: "Cambiar Contraseña",
            icon: <Lock {...iconStyle} />,
        },
    ];

    console.log(clienteMatriculado)
    return (
        <>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Paper sx={{p: 2, display: "flex", flexDirection:"column", width: isMediumDevice ? "90vw" : "70vw",}}>
                <Box
                    sx={{
                        minHeight: "145px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        alt="Logo"
                        src={logo}
                        sx={{
                            mr: 2,
                            width: "15vw",
                            height: "15vw",
                            minWidth: "130px",
                            minHeight: "130px",
                            maxWidth: "140px",
                            maxHeight: "140px",
                        }}
                    />
                    <Box sx={{ display: "block", justifyContent: "center" }}>
                        <Typography variant="h5">Bienvenido a CoreE</Typography>
                        <Typography variant="h5">{userInfo.nombre}</Typography>
                    </Box>
                </Box>
                { 
                    userInfo && userInfo.cliente && userInfo.cliente.clienteEstado === "No matriculado" &&
                    <Typography variant="h6" align="center">Usted no posee matricula vigente, no podra acceder a las funciones de entrenamiento.</Typography>
                }
                { 
                    userInfo && userInfo.cliente && userInfo.cliente.clienteEstado === "Desactivado" &&
                    <Typography variant="h6" align="center">Su usuario esta desactivado, no podra acceder a las funciones de entrenamiento.</Typography>                            
                }
                </Paper>
            </Container>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
                <Paper
                    sx={{
                        width: isMediumDevice ? "90vw" : "70vw",
                        mt: 2,
                        p: 1,
                    }}
                >
                    <Stack
                        direction={isMediumDevice ? "column" : "row"}
                        spacing={2}
                        alignItems="center"
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                            }}
                        >
                            {menuItem
                                .filter(
                                    (object) =>
                                        !(
                                            !tieneClienteAsociado && object.text === "Mi Matricula"
                                        ) &&
                                        object.text !== "Inicio" &&
                                        (props.token.permisos.includes(object.permiso) ||
                                            object.permiso === "")
                                )
                                .map((item) => {
                                    return (
                                        <Card
                                            title={item.text}
                                            description={item.descripcion}
                                            isMediumDevice={isMediumDevice}
                                            url={item.url}
                                            handleClickOpen={handleClickOpen}
                                            disabled={item.requiereMatricula && !clienteMatriculado}
                                        >
                                            {
                                                styledIcons.filter(
                                                    (icon) => icon.text === item.text
                                                )[0].icon
                                            }
                                        </Card>
                                    );
                                })}
                        </Box>
                    </Stack>
                </Paper>
                { tieneClienteAsociado && matriculas!== undefined? (
                    <MiMatriculaDialog
                        open={open}
                        handleClickOpen={handleClickOpen}
                        onClose={handleClose}
                        userMatriculas={matriculas}
                    />
                ) : (
                    <></>
                )}
            </Container>
        </>
    );
}

export default Dash;
