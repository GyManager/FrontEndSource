import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import { useFullscreen, useWindowSize } from "rooks";
import Grafico from "./Grafico";
import VistaInformeButtons from "./VistaInformeButtons";
import { ScreenRotation } from "@mui/icons-material";

function VistaInforme(props) {
    // const [tipoAjuste, setTipoAjuste] = useState("horizontal");
    const [isExpanded, setIsExpanded] = useState(false);
    const fullscreenContainerRef = useRef(null);
    const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
    const isWideScreen = innerWidth > innerHeight;
    const { isFullscreenAvailable, isFullscreenEnabled, toggleFullscreen } = useFullscreen({
        target: fullscreenContainerRef,
    });

    const alturaPaper = innerHeight - 120 + "px";

    const paperStyle = {
        sx: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mt: 2,
            width: isFullscreenEnabled ? "100vw" : "100%",
            height: isFullscreenEnabled ? "100vh" : null,
            px: 1,
            py: 2,
            backgroundColor: "lightGrey",
        },
    };

    const graficoParametros = {
        mediciones: props.data,
        label: props.label,
        isFullscreenEnabled: isFullscreenEnabled,
        isExpanded: isExpanded,
    };

    const buttonsParameters = {
        toggleFullscreen: toggleFullscreen,
        isFullscreenEnabled: isFullscreenEnabled,
        setIsExpanded: setIsExpanded,
        isExpanded: isExpanded,
        isWideScreen: isWideScreen,
    };
    return (
        <Box>
            <div ref={fullscreenContainerRef}>
                <Paper {...paperStyle}>
                    {isFullscreenEnabled ? (
                        isWideScreen ? (
                            <>
                                <Typography>{props.title}</Typography>
                                <VistaInformeButtons
                                    {...buttonsParameters}
                                    fullscreenButton
                                    fixButton
                                />
                                <Grafico {...graficoParametros} />
                            </>
                        ) : (
                            <>
                                <VistaInformeButtons {...buttonsParameters} fullscreenButton />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="h6" textAlign="center">
                                        Por favor gire la pantalla{" "}
                                        <p>
                                            <ScreenRotation fontSize="large" />
                                        </p>
                                    </Typography>
                                </Box>
                            </>
                        )
                    ) : (
                        <>
                            <VistaInformeButtons
                                {...buttonsParameters}
                                fullscreenButton
                                fixButton
                            />
                            <Grafico {...graficoParametros} />
                        </>
                    )}
                </Paper>
            </div>
        </Box>
    );
}

export default VistaInforme;
