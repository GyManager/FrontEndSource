import { Box, Button, Fab, Tooltip } from "@mui/material";
import { Fullscreen, FullscreenExit, ZoomIn, ZoomOut } from "@mui/icons-material/";
import React from "react";

function VistaInformeButtons(props) {
    const fullscreenTooltipTitle = props.isFullscreenEnabled
        ? "Cerrar Pantalla Completa"
        : "Abrir Pantalla Completa";
    const fullscreenIcon = props.isFullscreenEnabled ? (
        <FullscreenExit fontSize="large"/>
    ) : (
        <Fullscreen fontSize="large" />
    );

    const fitGraphicTitle = props.isExpanded ? "Contraer grafico" : "Expandir grafico";

    const fitGraphicIcon = props.isExpanded ? (
        <ZoomOut fontSize="large"/>
    ) : (
        <ZoomIn  fontSize="large"/>
    );

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end",px:1}}>
            {props.fullscreenButton ? (
                <>
                    <Tooltip title={fullscreenTooltipTitle} placement="bottom" sx={{mx:2}}>
                        <Fab
                            size="large"
                            color="primary"
                            aria-label="add"
                            onClick={() => {
                                props.toggleFullscreen();
                            }}
                        >
                            {fullscreenIcon}
                            {/* {props.isWideScreen
                                ? props.isFullscreenEnabled
                                    ? "Cerrar Pantalla Completa"
                                    : "Pantalla1"
                                : props.isFullscreenEnabled
                                ? "Cerrar Pantalla Completa"
                                : "Pantalla3"} */}
                        </Fab>
                    </Tooltip>
                </>
            ) : null}
            {props.fixButton ? (
                <Tooltip title={fitGraphicTitle} placement="bottom">
                    <Fab
                        size="large"
                        color="primary"
                        aria-label="add"
                        onClick={() => {
                            props.setIsExpanded(!props.isExpanded);
                        }}
                    >
                        {fitGraphicIcon}
                        {/* {props.isExpanded ? "Contraer" : "Expandir"} */}
                    </Fab>
                </Tooltip>
            ) : null}
        </Box>
    );
}

export default VistaInformeButtons;
