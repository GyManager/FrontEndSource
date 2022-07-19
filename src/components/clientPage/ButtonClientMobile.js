import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const actions = [
    { icon: <EditIcon />, name: 'Editar' },
    { icon: <DeleteIcon />, name: 'Borrar' },

];

export default function ButtonClientMobile() {
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
            <Backdrop open={open} />
            {/* TODO NICO 2 Hacer que cuando se este en modo creacion: url= .../new
             (usar useParams de react router            ver uso en Client) hacer que
              el siguiente speed dial no se renderice o se renderice pero que 
              simplemente sea un boton normal para crear el cliente */}

            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                // position: 'absolute', bottom: 16, right: 16
                //  }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </Box >
    );
}
