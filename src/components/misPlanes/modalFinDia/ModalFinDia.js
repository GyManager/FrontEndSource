import { Collapse, Modal, Paper } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parametersService from "../../../services/parameter.service";
import seguimientoService from "../../../services/seguimiento.service";
import ModalViewComments from "./ModalViewComments";
import ModalViewCongrats from "./ModalViewCongrats";
import ModalViewOptions from "./ModalViewOptions";

export default function ModalFinDia(props) {
    let { idPlan, idMicroPlan, idRutina } = useParams();
    const [estadoSeleccionado, setEstadoSeleccionado] = useState(() => null);
    const [loadingOpciones, setLoadingOpciones] = useState(() => true);
    const [opcionesEstadoSeguimiento, setOpcionesEstadoSeguimiento] = useState(() => []);

    const [modalPage, setModalPage] = useState(() => 1);

    const navigate = useNavigate();

    function seleccionarEstado(idEstadoSeleccionado) {
        setEstadoSeleccionado(idEstadoSeleccionado);
        setModalPage(2);
    }

    async function handleEnviar(comentario) {
        seguimientoService.postSeguimientoRutina(
            { observacion: comentario, idEstadoSeguimiento: estadoSeleccionado },
            idPlan,
            idMicroPlan,
            idRutina
        );
        setModalPage(3);
    }

    function handleCancelar() {
        props.setClose();
        setModalPage(1);
        if(modalPage === 3){
            navigate(`/mis-planes/${idPlan}/micro-plan/${idMicroPlan}`)
        }
    }

    useEffect(() => {
        setLoadingOpciones(true);
        async function getEstadosSeguimiento() {
            const response = await parametersService.getEstadosSeguimiento();
            if (response instanceof AxiosError) {
                console.log(response); // TODO IMPROVE
            } else {
                setOpcionesEstadoSeguimiento(response);
                setLoadingOpciones(false);
            }
        }
        getEstadosSeguimiento();
    }, []);

    return (
        <Modal
            open={props.open}
            onClose={handleCancelar}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                sx={{
                    py: 3,
                    px: 2,
                    width: { xs: "90vw", md: "fit-content" },
                    gap: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Collapse in={modalPage === 1}>
                    <ModalViewOptions
                        loadingOpciones={loadingOpciones}
                        opcionesEstadoSeguimiento={opcionesEstadoSeguimiento}
                        setEstadoSeleccionado={seleccionarEstado}
                    />
                </Collapse>

                <Collapse in={modalPage === 2}>
                    <ModalViewComments
                        handleEnviar={handleEnviar}
                        handleCancelar={handleCancelar}
                    />
                </Collapse>

                <Collapse in={modalPage === 3}>
                    <ModalViewCongrats run={modalPage === 3}/>
                </Collapse>
            </Paper>
        </Modal>
    );
}
