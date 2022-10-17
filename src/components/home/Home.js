import React, { useState } from "react";
import {
    Avatar,
    Box,
    IconButton,
    Typography,
    useMediaQuery,
    Button,
    Paper,
    Stack,
    Fab,
} from "@mui/material";
import { Container } from "@mui/system";
import {
    Newspaper,
    Straighten,
    FolderShared,
    HowToReg,
    History,
    ArrowCircleDown,
    ArrowCircleUp,
} from "@mui/icons-material";
import Card from "./Card";
import MiniReportes from "./MiniReportes";
import logo from "../../images/logo.png";

import { animateScroll as scroll } from "react-scroll";

function Home(props) {
    const [isOnTop, setIsOnTop] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);

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

    const dataCardsCliente = [
        {
            titulo: "plan vigente",
            descripcion: "accede a todos los planes que has hecho",
            icon: <Newspaper {...iconStyle} />,
            url: "",
        },
        {
            titulo: "mis medidas",
            descripcion: "mantene actualizadas tus dimensiones corporales.",
            icon: <Straighten {...iconStyle} />,
        },
        {
            titulo: "mis datos",
            descripcion: "datos generales de tu perfil.",
            icon: <FolderShared {...iconStyle} />,
        },
        {
            titulo: "mi matricula",
            descripcion: "consulta el estado de tu matricula.",
            icon: <HowToReg {...iconStyle} />,
        },
        {
            titulo: "historico planes",
            descripcion: "aca podras acceder a todos los planes que has hecho.",
            icon: <History {...iconStyle} />,
        },
        {
            titulo: "mis medidas",
            descripcion: "mantene actualizadas tus dimensiones corporales.",
            icon: <Straighten {...iconStyle} />,
        },
        {
            titulo: "mis datos",
            descripcion: "datos generales de tu perfil.",
            icon: <FolderShared {...iconStyle} />,
        },
        {
            titulo: "mi matricula",
            descripcion: "consulta el estado de tu matricula.",
            icon: <HowToReg {...iconStyle} />,
        },
        {
            titulo: "historico planes",
            descripcion: "aca podras acceder a todos los planes que has hecho.",
            icon: <History {...iconStyle} />,
        },
    ];

    const handleWheel = (e) => {
        e.preventDefault();
        if (!isScrolling) {
            setIsScrolling(true);
            isOnTop ? scroll.scrollToBottom() : scroll.scrollToTop();
            setIsOnTop(!isOnTop);
        }
        setTimeout(() => {}, 1000);
    };



    return (
        <>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
                <Paper
                    sx={{
                        width: isMediumDevice ? "90vw" : "70vw",
                        height: "20vh",
                        maxHeight: "250px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
                    }}
                    onWheel={handleWheel}
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
                            maxHeight: "140px"
                        }}
                    />
                    <Typography variant="h5">
                        Bienvenido a CoreE <i>UsuarioName</i>{" "}
                    </Typography>
                </Paper>
            </Container>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
                <Paper
                    sx={{
                        width: isMediumDevice ? "90vw" : "70vw",
                        // height: "57vh",
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
                            {props.token.permisos.includes("gestion-planes") &&
                                dataCardsCliente.map((card) => {
                                    return (
                                        <Card
                                            title={card.titulo}
                                            description={card.descripcion}
                                            isMediumDevice={isMediumDevice}
                                        >
                                            {card.icon}
                                        </Card>
                                    );
                                })}
                        </Box>
                    </Stack>
                </Paper>
              </Container>
</>
)}

export default Home;


