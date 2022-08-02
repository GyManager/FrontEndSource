import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Stack } from '@mui/material'

export default function AlertDialog(props) {

  const handleCloseAlertDialog = () => {
    props.setProp(false);
  };

  const handleAcceptButton = () => {
    props.buttonActionAccept();
    handleCloseAlertDialog();
  }

  return (
    <div>
      <Dialog
        open={props.openProp}
        onClose={handleCloseAlertDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" alignItems='center' aligntContent='center'>
          {props.titleProp + props.nameProp}
        </DialogTitle>
        <DialogContent>
          <Stack direction='row' justifyContent='center' alignItems='center'>
            <DialogContentText id="alert-dialog-description">
              {props.contentProp}
            </DialogContentText>
            {props.children}
          </Stack>
        </DialogContent>
        <DialogActions sx={{
          justifyContent: 'space-between',
        }}>
          <Button onClick={handleCloseAlertDialog} autoFocus>
          Cancelar</Button>
          <Button onClick={handleAcceptButton} >
          {props.buttonTextAccept}
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


/*

//Estados del AlertDialog a usar en el padre
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const handleClickOpenAlertDialog = () => {
        setOpenAlertDialog(true);
    };

// Componente a usar en el padre
<AlertDialog
                openProp={openAlertDialog}
                handleClickProp={handleClickOpenAlertDialog}
                setProp={setOpenAlertDialog}
                titleProp='Está por eliminar al cliente '
                nameProp={formik.values.nombre + ' ' + formik.values.apellido}
                contentProp='¿Seguro desea eliminarlo?'
                buttonTextAccept='Borrar'
                buttonTextDeny='Cancelar'
                buttonActionAccept={deleteCliente}
            >
                <DeleteForeverIcon color="warning" fontSize="medium" />
</AlertDialog>

*/