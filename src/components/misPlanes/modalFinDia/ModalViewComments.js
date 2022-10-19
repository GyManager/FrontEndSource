import { Cancel, Send } from "@mui/icons-material";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Fragment, useState } from "react";

export default function ModalViewComments(props) {
    const [comentario, setComentario] = useState(() => "");

    return (
        <Fragment>
            <Typography variant="h5" align="center">
                Dejanos tu comentario
            </Typography>
            <Container align="center" sx={{ mt: 2 }}>
                <TextField
                    multiline
                    maxRows={8}
                    fullWidth
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                />
            </Container>
            <Stack direction={"row"} justifyContent="space-around" sx={{ mt: 2 }}>
                <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<Send />}
                    onClick={() => props.handleEnviar(comentario)}
                    disabled={props.loadingSubmit}
                >
                    Enviar
                </Button>
                <Button
                    variant="outlined"
                    size="medium"
                    color="secondary"
                    startIcon={<Cancel />}
                    onClick={props.handleCancelar}
                    disabled={props.loadingSubmit}
                >
                    Cancelar
                </Button>
            </Stack>
        </Fragment>
    );
}
