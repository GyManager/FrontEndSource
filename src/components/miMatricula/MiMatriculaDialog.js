import { React, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Button, DialogContent } from "@mui/material";
import InformeMatricula from "./InformeMatricula";

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [tieneMatriculaProximaAVencer, setTieneMatriculaProximaAVencer] = useState(false);
    const [tieneMatriculaActiva, setTieneMatriculaActiva] = useState(false);
    const [tieneMatriculaFutura, setTieneMatriculaFutura] = useState(false);
    

    const [mensaje1, setMensaje1] = useState("");
    const [mensaje2, setMensaje2] = useState("");

    const handleClose = () => {
        onClose(selectedValue);
    };
    const [matriculaActiva, setMatriculaActiva] = useState("");
    const [matriculaFutura, setMatriculaFutura] = useState("");
    const [matriculaProntoAVencer, setMatriculaProntoAVencer] = useState("");

    useEffect(() => {
        const setMatriculas = async () => {
            const matriculaActiva = await props.userMatriculas.filter(
                (unaMatricula) => unaMatricula.matriculaEstado === "ACTIVA"
            );

            if ((await matriculaActiva[0]) === undefined) {
                setTieneMatriculaActiva(false);
            } else {
                setTieneMatriculaActiva(true);
                setMatriculaActiva({ ...matriculaActiva[0] }.fechaVencimiento);
                setMensaje1("Tu matricula actual vence el: ");
            }

            const matriculaFutura = await props.userMatriculas.filter(
                (unaMatricula) => unaMatricula.matriculaEstado === "NO_INICIADA"
            );

            if ((await matriculaFutura[0]) === undefined) {
                setTieneMatriculaFutura(false);
            } else {
                setTieneMatriculaFutura(true);
                setMatriculaFutura({ ...matriculaFutura[0] }.fechaVencimiento);
                setMensaje2("Tenes una matricula futura desde : " + matriculaFutura[0].fechaInicio.split("T", 1) + ' al:') ;
            }

            const matriculaProntoAVencer = await props.userMatriculas.filter(
                (unaMatricula) => unaMatricula.matriculaEstado === "PRONTO_A_VENCER"
            );

            if ((await matriculaProntoAVencer[0]) === undefined) {
                setMatriculaProntoAVencer(false);
            } else {
                setTieneMatriculaProximaAVencer(true);
                setMatriculaProntoAVencer({ ...matriculaProntoAVencer[0] }.fechaVencimiento);
                setMensaje1("Tu matricula está proxima a vencer");
            }
        };
        setMatriculas();
    }, [props.userMatriculas]);
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
                {tieneMatriculaActiva ? (
                    <InformeMatricula check mensaje={mensaje1} fechaVencimiento={matriculaActiva} />
                ) : (
                    !tieneMatriculaProximaAVencer ?
                    <InformeMatricula close mensaje={'No tenes matricula vigente'} fechaVencimiento={matriculaActiva} />
                    :
                    null
                )}
                {tieneMatriculaProximaAVencer ? (
                    <InformeMatricula
                        warning
                        mensaje={mensaje1}
                        fechaVencimiento={matriculaProntoAVencer}
                    />
                ) : null}
                {tieneMatriculaFutura ? (
                    <InformeMatricula check mensaje={mensaje2} fechaVencimiento={matriculaFutura} />
                ) : (
                    <InformeMatricula
                        close
                        mensaje={"No tenes matricula a futuro. \n Recorda matricularte a tiempo"}
                        fechaVencimiento={matriculaFutura}
                    />
                )}


                <Button variant="contained" sx={{ width: "40%", mt: "7%" }} onClick={handleClose}>
                    Aceptar
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default function SimpleDialogDemo(props) {
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
