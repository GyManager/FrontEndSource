import { React } from "react";
import Dialog from "@mui/material/Dialog";
import { Button, DialogContent } from "@mui/material";
import InformeMatriculaActual from "./InformeMatriculaActual";
import InformeMatriculaFutura from "./InformeMatriculaFutura";

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

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
        if (matriculaActiva === undefined) {
            matriculaActiva = "No tenes una matricula vigente";
        }

        matriculaFutura = props.userMatriculas.filter(
            (unaMatricula) => unaMatricula.matriculaEstado === "NO_INICIADA"
        );
        matriculaFutura = { ...matriculaFutura[0] }.fechaVencimiento;
        if (matriculaFutura === undefined) {
            matriculaFutura = "No tenes una matricula a futuro";
        }
    } else {
        matriculaActiva = "";
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    justifyItems: "center",
                    alignItems: "center",
                }}
            >
                <InformeMatriculaActual fechaVencimiento={matriculaActiva} />
                <InformeMatriculaFutura fechaInicio={matriculaFutura} />
                <Button variant="contained" sx={{ width: "40%", mt: "7%" }} onClick={handleClose}>
                    Aceptar
                </Button>
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
