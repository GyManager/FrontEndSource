import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography, useMediaQuery, Paper, Stack } from "@mui/material";

import { AdminPanelSettings, FitnessCenter, Mail, Person, ListAlt } from "@mui/icons-material";

import { Container } from "@mui/system";
import Card from "./Card";
import logo from "../../images/logo.png";
import { menuItem } from "../drawer/Drawer";

// import userService from "../../services/users.service";

import useFetchUserInfo from "./servicesHooks"

function Dash(props) {
    const { userInfo } = useFetchUserInfo();
    


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
                    <Box sx={{ display: 'block', justifyContent: "center" }}>
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
            </Container>
        </>
    );
}

export default Dash;
