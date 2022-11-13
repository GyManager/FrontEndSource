import { React, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Button, DialogContent } from "@mui/material";
import InformeMatriculaActual from "./InformeMatriculaActual";
import InformeMatriculaFutura from "./InformeMatriculaFutura";

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [tieneMatriculaProximaAVencer, setTieneMatriculaProximaAVencer] = useState(false);
    const [tieneMatriculaActiva, setTieneMatriculaActiva] = useState(false);
    const [tieneMatriculaFutura, setTieneMatriculaFutura] = useState(false);

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
                setMatriculaActiva("No tenes una matricula vigente");
            } else {
                setTieneMatriculaActiva(true);
                setMatriculaActiva({ ...matriculaActiva[0] }.fechaVencimiento);
            }

            const matriculaFutura = await props.userMatriculas.filter(
                (unaMatricula) => unaMatricula.matriculaEstado === "NO_INICIADA"
            );

            if ((await matriculaFutura[0]) === undefined) {
                setMatriculaFutura("No tenes una matricula a futuro");
            } else {
                setMatriculaFutura(true)
                setMatriculaFutura({ ...matriculaFutura[0] }.fechaVencimiento);
            }

            const matriculaProntoAVencer = await props.userMatriculas.filter((unaMatricula) => {
                return unaMatricula.matriculaEstado === "PRONTO_A_VENCER";
            });

            if ((await matriculaProntoAVencer[0]) === undefined) {
                setMatriculaProntoAVencer("No tenes una matricula pronto a vencer");
            } else {
                setTieneMatriculaProximaAVencer(true);
                setMatriculaProntoAVencer({ ...matriculaProntoAVencer[0] }.fechaVencimiento);
            }
        };
        // console.log(
        // "🚀 ~ file: MiMatriculaDialog.js ~ line 52 ~ setMatriculas ~ matriculaProntoAVencer",
        // matriculaProntoAVencer
        // );
        // console.log(
        // "🚀 ~ file: MiMatriculaDialog.js ~ line 53 ~ setMatriculas ~ matriculaFutura",
        // matriculaFutura
        // );
        // console.log(
        // "🚀 ~ file: MiMatriculaDialog.js ~ line 54 ~ setMatriculas ~ matriculaActiva",
        // matriculaActiva
        // );
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
                {tieneMatriculaProximaAVencer ? (
                    <InformeMatriculaActual
                        fechaVencimiento={matriculaProntoAVencer}
                        mensaje={"Tienes una matricula proxima a vencer:"}
                        tieneMatriculaProximaAVencer={tieneMatriculaProximaAVencer}
                    />
                ) : (
                    <InformeMatriculaActual
                        mensaje={"Tu matricula actual vence el:"}
                        fechaVencimiento={matriculaActiva}
                    />
                )}

                {/* <InformeMatriculaActual fechaVencimiento={matriculaActiva} /> */}
                <InformeMatriculaFutura fechaInicio={matriculaFutura} />
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
