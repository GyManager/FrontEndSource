import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material'

function AlertDialog(props) {

  const handleCloseAlertDialog = () => {
    props.setOpen(false);
  };

  const handleAcceptButton = () => {
    props.buttonActionAccept();
    handleCloseAlertDialog();
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleCloseAlertDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" alignItems='center' aligntContent='center'>
          {props.title}
        </DialogTitle>
        <DialogContent>
          <Stack direction='row' justifyContent='center' alignItems='center'>
            <DialogContentText id="alert-dialog-description">
              {props.content}
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

export default AlertDialog

/*
// Copiar para implementar

//Estados del AlertDialog a usar en el padre
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
// Evento que abre el dialogo
    const handleClickOpenAlertDialog = () => {
        setOpenAlertDialog(true);
    };

// Componente a usar en el padre
<AlertDialog
                open={openAlertDialog}
                setOpen={setOpenAlertDialog}
                title={ 'Está por eliminar al cliente' + formik.values.nombre'}
                content='¿Seguro desea eliminarlo?'
                buttonTextAccept='Borrar'
                buttonTextDeny='Cancelar'
                buttonActionAccept={deleteCliente}
            >
                <DeleteForeverIcon color="warning" fontSize="medium" />
</AlertDialog>

*/