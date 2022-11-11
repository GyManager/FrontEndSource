import { Comment } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Fragment, useState } from "react";
import ModalFeedbackPlan from "./modalFinDia/ModalFeedbackPlan";

export default function FeedbackPlan(props) {
    const [modalOpen, setModalOpen] = useState(() => false);

    return (
        <Fragment>
            <Paper {...props.paperStyles}>
                <Typography variant="h5" align="center">
                    Felicitaciones!!!
                </Typography>
                <Typography variant="h5" align="center">
                    Terminaste tu plan
                </Typography>
                <Typography variant="h6" align="center">
                    Ayudanos a mejorar tu experiencia
                </Typography>
                <Container maxWidth="md" align="center" sx={{ mt: 2 }}>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={() => setModalOpen(true)}
                        startIcon={<Comment />}
                    >
                        Dar opinion
                    </Button>
                </Container>
            </Paper>
            <ModalFeedbackPlan open={modalOpen} setClose={() => setModalOpen(false)} />
        </Fragment>
    );
}
