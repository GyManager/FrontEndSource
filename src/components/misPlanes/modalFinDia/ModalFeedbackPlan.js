import { Collapse, Modal, Paper } from "@mui/material";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MiPlanContext } from "../../../context/MiPlanContext";
import { SnackbarContext } from "../../../context/SnackbarContext";
import { ErrorContext } from "../../../context/ErrorContext";
import parametersService from "../../../services/parameter.service";
import seguimientoService from "../../../services/seguimiento.service";
import ModalViewComments from "./ModalViewComments";
import ModalViewOptions from "./ModalViewOptions";

export default function ModalFeedbackPlan(props) {
    let { idPlan } = useParams();
    const [estadoSeleccionado, setEstadoSeleccionado] = useState(() => null);
    const [loadingOpciones, setLoadingOpciones] = useState(() => true);
    const [loadingSubmit, setLoadingSubmit] = useState(() => false);
    const [opcionesEstadoSeguimiento, setOpcionesEstadoSeguimiento] = useState(() => []);
    const [modalPage, setModalPage] = useState(() => 1);

    const { getPlanById } = useContext(MiPlanContext);
    const { addSnackbar } = useContext(SnackbarContext);
    const { processErrorMessage } = useContext(ErrorContext);

    function seleccionarEstado(idEstadoSeleccionado) {
        setEstadoSeleccionado(idEstadoSeleccionado);
        setModalPage(2);
    }

    async function handleEnviar(comentario) {
        setLoadingSubmit(true)
        const response = await seguimientoService.putSeguimientoPlan(
            { observacion: comentario, idEstadoSeguimiento: estadoSeleccionado },
            idPlan
        );

        if (response instanceof AxiosError) {
            setLoadingSubmit(false)
            processErrorMessage(response.response.data);
        } else {
            addSnackbar({
                message: "Gracias por tu comentario",
                severity: "success",
            });
            props.setClose();
            setLoadingSubmit(false)
            setModalPage(1);
            getPlanById();
        }
        
    }

    function handleCancelar() {
        props.setClose();
        setModalPage(1);
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
                        loadingSubmit={loadingSubmit}
                    />
                </Collapse>
            </Paper>
        </Modal>
    );
}
