import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material/';

export default function ButtonClientMobile(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{
            height: '100%',
            transform: 'translateZ(0px)',
            flexGrow: 1,
            display: { md: 'none', lg: 'none', xl: 'none' },

            position: 'fixed',
            right: '4vw',
            bottom: '-74vh',
        }}>

            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >

                { props.editable &&
                <SpeedDialAction
                    key='Guardar'
                    icon={<Save />}
                    tooltipTitle='Guardar'
                    onClick={() => {handleClose(); props.handleSubmit();}}
                />
                }                
                
                { props.editable &&
                <SpeedDialAction
                    key='Cancelar'
                    icon={<Cancel />}
                    tooltipTitle='Cancelar'
                    onClick={() => {props.handleCancelEdit(); handleClose();}}
                />
                }

                { props.clienteId !== 'new' && !props.editable &&
                <SpeedDialAction
                    key='Editar'
                    icon={<Edit />}
                    tooltipTitle='Editar'
                    onClick={() => {props.handleEditClick(); handleClose();}}
                />
                }

                { props.clienteId !== 'new' && !props.editable &&
                <SpeedDialAction
                    key='Borrar'
                    icon={<Delete />}
                    tooltipTitle='Borrar'
                    onClick={props.handleDeleteClick}
                />
                }

            </SpeedDial>
        </Box >
    );
}
