import { Avatar, Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Button, Paper, Stack } from "@mui/material";
import { Container, height } from "@mui/system";
import React from "react";
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
import logo from "../../images/logo.png";
import Fab from "@mui/material/Fab";

import { animateScroll as scroll } from 'react-scroll'

function Home(props) {
    const iconMediumStyle = {
        width: "40%",
        height: "10vh",
        color: "primary.main",
    };
    const iconLargeStyle = {
        width: "100%",
        height: "10vh",
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
    ];
    return (
        <>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
                <Paper
                    sx={{
                        width: "90vw",
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
                            width: "12vw",
                            height: "12vw",
                            minWidth: "120px",
                            minHeight: "120px",
                        }}
                    />
                    <Typography variant="h4">
                        Bienvenido a CoreE <i>UsuarioName</i>{" "}
                    </Typography>
                </Paper>
            </Container>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
                <Paper sx={{ width: "90vw", mt: 2, p: 2 }}>
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
            <Container sx={{ display: "flex", justifyContent: "center" }}>
                <Fab color="primary" aria-label="add" sx={{width:'4vw', height:'4vw', mt:1}} onClick={()=>{scroll.scrollToBottom()}}>
                    <ArrowCircleDown sx={{width:'3vw', height:'3vw'}}/>
                </Fab>
                
            </Container>
            <Paper sx={{height:'86vh'}}>
            <Fab color="primary" aria-label="add" sx={{width:'4vw', height:'4vw', mt:1}} onClick={()=>{scroll.scrollToTop()}}>
                    <ArrowCircleUp sx={{width:'3vw', height:'3vw'}}/>
                </Fab>
            </Paper>
        </>
    );
}

export default Home;
