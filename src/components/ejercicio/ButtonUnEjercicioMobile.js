import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material/';
import { EjercicioContext } from '../../context/EjercicioContext';
import { useContext } from 'react';
import { Grid } from '@mui/material';


export default function ButtonUnEjercicioMobile(props) {
    const { editable, setEditable, idEjercicio, handleCancelEdit } = useContext(EjercicioContext)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const handleReset = () => navigate


    const ButtonMobileStyle
        = {
        sx: {
            display: { xs: 'block', md: 'none' },
            position: 'fixed',
            right: '4vw',
            bottom: '4vh'
        }
    }

    return (
        <Grid item xs={12}
            {...ButtonMobileStyle}>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                sx={{
                    position: 'fixed', bottom: 16, right: 16,
                    display: { md: 'none', lg: 'none', xl: 'none' }
                }}
            >

                {editable &&
                    <SpeedDialAction
                        key='Guardar'
                        icon={<Save />}
                        tooltipTitle='Guardar'
                        onClick={() => { handleClose(); props.guardar(); }}
                    />
                }

                {editable &&
                    <SpeedDialAction
                        key='Cancelar'
                        icon={<Cancel />}
                        tooltipTitle='Cancelar'
                        onClick={() => { handleCancelEdit();; handleClose(); }}
                    />
                }

                {idEjercicio !== 'new' && !editable &&
                    <SpeedDialAction
                        key='Editar'
                        icon={<Edit />}
                        tooltipTitle='Editar'
                        // onClick={() => {props.handleEditClick(); handleClose();}}
                        onClick={() => { setEditable(true); handleClose() }}

                    />
                }

                {idEjercicio !== 'new' && !editable &&
                    <SpeedDialAction
                        key='Borrar'
                        icon={<Delete />}
                        tooltipTitle='Borrar'
                        onClick={props.handleDeleteClick}
                    />
                }

            </SpeedDial>
        </Grid>
    );
}
