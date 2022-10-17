import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { Fragment } from "react";

export default function ModalViewOptions(props) {
    return (
        <Fragment>
            <Typography variant="h5" align="center">
                Nos interesa tu avance!!
            </Typography>

            <Typography variant="h6" align="center">
                Contanos como terminaste el dia
            </Typography>

            <Stack direction="column" spacing={2} justifyContent="center" mx={5}>
                {props.loadingOpciones ? (
                    <Skeleton></Skeleton>
                ) : (
                    props.opcionesEstadoSeguimiento
                        .sort((a, b) => b.puntaje - a.puntaje)
                        .map((opcion) => (
                            <Button
                                key={opcion.idEstadoSeguimiento}
                                variant="contained"
                                size="small"
                                onClick={() =>
                                    props.setEstadoSeleccionado(opcion.idEstadoSeguimiento)
                                }
                                color={opcion.color}
                            >
                                {opcion.descripcion}
                            </Button>
                        ))
                )}
            </Stack>
        </Fragment>
    );
}
