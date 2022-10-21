import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography, useMediaQuery, Paper, Stack } from "@mui/material";

import {
    AdminPanelSettings,
    FitnessCenter,
    Mail,
    Person,
    ListAlt,
    Lock,
    Receipt,
} from "@mui/icons-material";

import { Container } from "@mui/system";
import Card from "./Card";
import logo from "../../images/logo.png";
import { menuItem } from "../drawer/Drawer";

import clientsService from "../../services/users.service";
import matriculasService from "../../services/matriculas.service";
import usersHooks from "../../services/usersHooks";
import MiMatriculaDialog from "../miMatricula/MiMatriculaDialog";
// import useFetchActiveUserMatriculas from "../../services/usersHooks";

function Dash(props) {
    const [userInfo, setUserInfo] = useState({});
    const [matriculas, setMatriculas] = useState([]);
    const [tieneClienteAsociado, setTieneClienteAsociado] = useState(()=>{});
    const [idCliente, setIdCliente] = useState(()=>{});
    console.log("dash:");

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await clientsService.getActiveUser();
            console.log("dash res:", userInfo);
            setUserInfo(userInfo);
            setTieneClienteAsociado(userInfo.cliente ? true : false);
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

    const styledIcons = [
        {
            text: "Mis Planes",
            icon: <Mail {...iconStyle} />,
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
            text: "Cambiar Contraseña",
            icon: <Lock {...iconStyle} />,
        },
    ];

    return (
        <>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
                <Paper
                    sx={{
                        width: isMediumDevice ? "90vw" : "70vw",
                        height: "20vh",
                        minHeight: "145px",
                        maxHeight: "200px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
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
