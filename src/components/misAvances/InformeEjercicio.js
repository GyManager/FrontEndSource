import { Box, Container, Paper, Typography } from "@mui/material";
import React from "react";

function InformeEjercicio() {
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

    return (
        <Container>
            <Box {...boxStyle}>
                <Paper {...paperStyle}>
                    <Typography {...titleSeccionStyle}>Avance de ejercicio</Typography>
                </Paper>
            </Box>
            <Box {...boxStyle}>
                <Paper {...paperStyle}>
                    
                </Paper>
            </Box>
        </Container>
    );
}

export default InformeEjercicio;
