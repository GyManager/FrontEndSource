import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useFullscreen, useWindowSize } from "rooks";
import Grafico from "./Grafico";
import VistaInformeButtons from "./VistaInformeButtons";

function VistaInforme(props) {
    const [visualMode, setVisualMode] = useState(false);
    const [tipoAjuste, setTipoAjuste] = useState("horizontal");
    const fullscreenContainerRef = useRef(null);
    const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
    const isWideScreen = innerWidth > innerHeight;
    const { isFullscreenAvailable, isFullscreenEnabled, toggleFullscreen } = useFullscreen({
        target: fullscreenContainerRef,
    });

    // console.log(props.data[0].nombre)
    // const nombreEjercicio = props.title[0].nombre
    console.log(props.title);
    const titulo = props.title;

    const paperStyle = {
        sx: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mt: 2,
            width: isFullscreenEnabled ? "100vw" : "100%",
            height: isFullscreenEnabled ? "100vh" : "100%",
            backgroundColor: "lightGrey",
        },
    };

    const graficoParametros = {
        mediciones: props.data,
        label: props.label,
        visualMode: visualMode,
        tipoAjuste: tipoAjuste,
    };

    const buttonsParameters = {
        toggleFullscreen: toggleFullscreen,
        isFullscreenEnabled: isFullscreenEnabled,
        setTipoAjuste: setTipoAjuste,
        tipoAjuste: tipoAjuste,
    };
    return (
        <Paper>
            <div ref={fullscreenContainerRef}>
                <Paper {...paperStyle}>
                    {isFullscreenEnabled ? (
                        isWideScreen ? (
                            <>
                                <VistaInformeButtons {...buttonsParameters} />
                                <Grafico {...graficoParametros} />
                            </>
                        ) : (
                            <Typography variant="h6" textAlign="center">
                                Por favor gire la pantalla
                            </Typography>
                        )
                    ) : (
                        <>
                            <VistaInformeButtons {...buttonsParameters} />
                            <Grafico {...graficoParametros} />
                        </>
                    )}
                </Paper>
            </div>
        </Paper>
    );
}

export default VistaInforme;
