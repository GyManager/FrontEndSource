import { React, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import InformeMatriculaActual from "./InformeMatriculaActual";
import InformeMatriculaFutura from "./InformeMatriculaFutura";
import _ from "lodash";

function SimpleDialog(props) {
    // console.log("props.userMatriculas", props.userMatriculas);
    const { onClose, selectedValue, open } = props;
    // const [matriculaActiva, setMatriculaActiva] = useState()

    const handleClose = () => {
        onClose(selectedValue);
    };
    let matriculaActiva;
    let matriculaFutura;

    if (props.userMatriculas) {
        matriculaActiva = props.userMatriculas.filter(
            (unaMatricula) => unaMatricula.matriculaEstado === "ACTIVA"
        );
        matriculaActiva = { ...matriculaActiva[0] }.fechaVencimiento;
        // console.log('matriculaActiva',matriculaActiva)
        if (matriculaActiva === undefined) {
            matriculaActiva = "No tenes una matricula vigente";
        }
        matriculaFutura = props.userMatriculas.filter(
            (unaMatricula) => unaMatricula.matriculaEstado === "NO_INICIADA"
        );
        
    } else {
        matriculaActiva = "";
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            {/* <DialogTitle>Set backup account</DialogTitle> */}
            <DialogContent dividers>
                {/* {props.userMatriculas
                    .filter((unaMatricula) => unaMatricula.matriculaEstado === "ACTIVA")
                    .map((matriculaActual)=>
                        <InformeMatriculaActual fechaVencimiento={matriculaActual.fechaVencimiento} />
                    )} */}
                {/* {matriculaActiva ? ( */}
                <InformeMatriculaActual fechaVencimiento={matriculaActiva} />
                <InformeMatriculaFutura inicio={{ ...matriculaFutura[0] }.fechaVencimiento} />
                {/* ) : ( */}
                {/* <></> */}
                {/* )} */}
            </DialogContent>
        </Dialog>
    );
}

export default function SimpleDialogDemo(props) {
    console.log("props.userMatriculas: ", props.userMatriculas);
    return (
        <div>
            <SimpleDialog
                open={props.open}
                onClose={props.onClose}
                userMatriculas={props.userMatriculas}
            />
        </div>
    );
}
