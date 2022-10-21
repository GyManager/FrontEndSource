import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { useEffect } from "react";

function InformeMatriculaActual(props) {
    console.log('props.fechaVencimiento',props.fechaVencimiento);;
    let tieneMatriculaVigente;
tieneMatriculaVigente = props.fechaVencimiento !== 'No tenes una matricula vigente' ? true : false


    const siTiene = (
        <>
            <CheckIcon />
            Tu matricula actual vence el: {props.fechaVencimiento.split("T",1)}
        </>
    );
    const noTiene = (
        <>
            <CloseIcon />
            No tenes una matricula vigente{" "}
        </>
    );
    return (
        <Box sx={{ display: "flex", justifyContent: "center", justifyItems: "center" }}>
            {tieneMatriculaVigente ? siTiene : noTiene}
        </Box>
    );
}

export default InformeMatriculaActual;
