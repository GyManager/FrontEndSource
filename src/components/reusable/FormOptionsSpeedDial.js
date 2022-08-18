import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material/';

/**
 * 
 * @param {id, editable, handleCancelEdit, handleEditClick, handleDeleteClick, handleSubmit} props 
 * @returns 
 */
export default function FormOptionsSpeedDial(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <SpeedDial
            ariaLabel="Options"
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            sx={{ position: 'fixed', bottom: 16, right: 16 ,
                display: { md: 'none', lg: 'none', xl: 'none' }
            }}
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

            { props.id !== 'new' && !props.editable &&
            <SpeedDialAction
                key='Editar'
                icon={<Edit />}
                tooltipTitle='Editar'
                onClick={() => {props.handleEditClick(); handleClose();}}
            />
            }

            { props.id !== 'new' && !props.editable &&
            <SpeedDialAction
                key='Borrar'
                icon={<Delete />}
                tooltipTitle='Borrar'
                onClick={props.handleDeleteClick}
            />
            }

        </SpeedDial>
    );
}
