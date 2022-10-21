import { React, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import InformeMatriculaActual from "./InformeMatriculaActual";
import _ from "lodash";

function SimpleDialog(props) {
    console.log("props.userMatriculas", props.userMatriculas);
    const { onClose, selectedValue, open } = props;
    // const [matriculaActiva, setMatriculaActiva] = useState()

    const handleClose = () => {
        onClose(selectedValue);
    };
    let matriculaActiva;
    // setMatriculaActiva(props.userMatriculas.filter((unaMatricula)=> unaMatricula.matriculaEstado === "ACTIVA"))
    if (props.userMatriculas) {
        matriculaActiva = props.userMatriculas.filter(
            (unaMatricula) => unaMatricula.matriculaEstado === "ACTIVA"
        );
        // console.log("miMatriculaDialog: matriculaActiva:", matriculaActiva);
        console.log("miMatriculaDialog: matriculaActiva:23", {...matriculaActiva[0]}.fechaVencimiento);
    } else {
        matriculaActiva = 'Sin datos'
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
                {matriculaActiva ? (
                    <InformeMatriculaActual
                        fechaVencimiento={{...matriculaActiva[0]}.fechaVencimiento}
                    />
                ) : (
                    <></>
                )}
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
