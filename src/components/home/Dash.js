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
    FolderCopy,
    SquareFoot,
    Timeline,
} from "@mui/icons-material";

import { Container } from "@mui/system";
import Card from "./Card";
import logo from "../../images/logo.png";
import { menuItem } from "../drawer/Drawer";
import clientsService from "../../services/users.service";
import matriculasService from "../../services/matriculas.service";
import MiMatriculaDialog from "../miMatricula/MiMatriculaDialog";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
// import useFetchActiveUserMatriculas from "../../services/usersHooks";

function Dash(props) {
    const [userInfo, setUserInfo] = useState({});
    const { notificaciones, loadingNotificaciones } = useContext(UserContext);
    const [matriculas, setMatriculas] = useState([]);
    const [tieneClienteAsociado, setTieneClienteAsociado] = useState(() => {});
    const [idCliente, setIdCliente] = useState(() => {});
    const [notificacionMatricula, setNotificacionMatricula] = useState({ estado: 0 });
    const { showMatricula } = useParams();
    const navigate = useNavigate("");

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        navigate("/home");
        setOpen(false);
    };

    useEffect(() => {
        showMatricula !== undefined ? setOpen(true) : handleClose();
    }, [showMatricula]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await clientsService.getActiveUser();
            setUserInfo(userInfo);
            setTieneClienteAsociado(userInfo.cliente ? true : false);
            const idCliente = userInfo.cliente?.idCliente;
            setIdCliente(idCliente);
        };
        fetchUserInfo();
    }, []);

    const verificarMatriculas = async () => {
        const matriculaProntoAVencer = matriculas.filter(
            (unaMatricula) => unaMatricula.matriculaEstado === "PRONTO_A_VENCER"
        );
        const matriculaActiva = matriculas.filter(
            (unaMatricula) => unaMatricula.matriculaEstado === "ACTIVA"
        );
        if (matriculaProntoAVencer.length !== 0) {
            setNotificacionMatricula({ estado: "1", color: "warning" });
        }
        if (matriculaProntoAVencer.length === 0 && matriculaActiva.length === 0) {
            setNotificacionMatricula({ estado: "!", color: "error" });
        }
    };

    useEffect(() => {
        const fecthMatriculas = async () => {
            if (await tieneClienteAsociado) {
                const res = await matriculasService.getMatriculasByIdCliente(await idCliente);
                setMatriculas(await res);
                verificarMatriculas();
            }
        };
        fecthMatriculas();
    }, [idCliente, tieneClienteAsociado, notificacionMatricula]);

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
            text: "Mis Avances",
            icon: <Timeline {...iconStyle} />,
        },

        {
            text: "Mis Medidas",
            icon: <SquareFoot {...iconStyle} />,
        },
        {
            text: "Mi Matricula",
            icon: (
                <Badge
                    badgeContent={notificacionMatricula.estado}
                    color={notificacionMatricula.color}
                    component="span"
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    sx={{ mx: 2.79 }}
                >
                    <Receipt sx={iconLargeStyle} />
                </Badge>
            ),
        },
        {
            text: "Dashboard",
            icon: <Receipt {...iconStyle} />,
        },
        {
            text: "Mis Datos",
            icon: <Person {...iconStyle} />,
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
                                            idCliente={idCliente}
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
                {tieneClienteAsociado && matriculas !== undefined ? (
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
