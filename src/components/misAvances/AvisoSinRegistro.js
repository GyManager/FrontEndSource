import { React } from "react";
import { Box, Typography } from "@mui/material";
import { ArrowRightAlt, Warning } from "@mui/icons-material/";

const AvisoSinRegistro = (props) => {
    const textStyle = {
        variant: "b1",
        sx: {
            textAlign: "center",
        },
    };

    const boxWithArrowStyle = {
        sx: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
    };
    return (
        <Box sx={{ p: 1 }}>
            <Typography sx={{ textAlign: "center" }}>
                <Warning fontSize="large" color="warning" />
            </Typography>
            {props.tipo === "medidas" ? (
                <Typography {...textStyle}>
                    <p>No tenes ninguna medida registrada.</p>
                    <p>
                        Para registrar tus medidas accede a la opcion de "Mis medidas" desde la
                        pantalla principal.
                    </p>
                </Typography>
            ) : (
                <Typography {...textStyle}>
                    <p>No tenes registrado tus avances en ningun ejercicio.</p>
                    <p>
                        {" "}
                        Para registrar tus avances podes hacerlo desde cada rutina que estes
                        haciendo.
                    </p>
                    <Box {...boxWithArrowStyle}>
                        <ArrowRightAlt /> <Typography>Seleccionando el ejercicio</Typography>
                    </Box>
                    <Box {...boxWithArrowStyle}>
                        <ArrowRightAlt /> <Typography>Opcion "ANOTAR RESULTADOS"</Typography>
                    </Box>
                </Typography>
            )}
        </Box>
    );
};
export default AvisoSinRegistro;
