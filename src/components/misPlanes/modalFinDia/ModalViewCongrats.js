import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Fragment } from "react";
import img from "../../../images/ejercicio.png";

export default function ModalViewCongrats() {
    return (
        <Fragment>
            <Container align="center" sx={{ height: 50 }}>
                <Paper
                    sx={{
                        width: "fit-content",
                        p: 2,
                        borderRadius: 50,
                        position: "relative",
                        top: -100,
                    }}
                >
                    <img src={img} height={"100vh"}></img>
                </Paper>
            </Container>
            <Typography variant="h5" align="center">
                FELICITACIONES!!! COMPLETASTE UN DIA MAS DE ENTRENAMIENTO!!
            </Typography>
            <br />
            <Typography variant="h5" align="center">
                SEGUI ASI PARA ALCANZAR TUS OBJETIVOS!!
            </Typography>
        </Fragment>
    );
}
