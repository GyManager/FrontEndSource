import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalCardPaso(props) {

    const handleClose = () => props.setOpen(false);

    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign='center'>
                        Paso: {props.paso.numeroPaso}
                    </Typography>


                    <Card sx={{ maxWidth: 700 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="100%"
                                image={props.paso.imagen}
                                alt="someText"
                            />
                            <CardContent>

                            </CardContent>
                        </CardActionArea>
                    </Card>




                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Descripcion: {props.paso.contenido}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
