import { Modal, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../../context/ErrorContext";
import seguimientoService from "../../../services/seguimiento.service";

export default function ReporteEstadoSeguimientoModal(props) {
    const [loading, setLoading] = useState(() => true);
    const [seguimientos, setSeguimientos] = useState(() => []);
    const { processErrorMessage } = useContext(ErrorContext);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await seguimientoService.getSeguimientoRutinaByIdCliente(
                props.idCliente,
                7
            );
            if (response instanceof AxiosError) {
                processErrorMessage(response.response.data);
            } else {
                setSeguimientos(response);
                setLoading(false);
            }
        }
        fetchData();
    }, [props.idCliente]);

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <Paper sx={{ p: 2, maxWidth: { xs: "99vw", sm: "70vw" } }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    {`${props?.usuario.nombre} ${props?.usuario.apellido}`}
                </Typography>
                <Stack
                    direction="column"
                    spacing={1}
                    sx={{ overflow: "scroll", maxHeight: "40vh", width: "60vw" }}
                >
                    {loading ? (
                        <Skeleton></Skeleton>
                    ) : (
                        seguimientos.map((seguimiento) => (
                            <Paper sx={{ p: 2 }}>
                                <Typography>{`${seguimiento.fechaCarga} - ${seguimiento.estadoSeguimientoDto.descripcion}`}</Typography>
                                <Typography>{`${seguimiento.observacion}`}</Typography>
                            </Paper>
                        ))
                    )}
                </Stack>
            </Paper>
        </Modal>
    );
}
