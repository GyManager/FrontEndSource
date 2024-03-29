import * as React from 'react';
// import { Stack, Snackbar, Alert } from '@mui/material';

import { Snackbar, Stack }  from '@mui/material';

import MuiAlert from '@mui/material/Alert';

// --> Boton, se usa como prueba al importar
// import Button from '@mui/material/Button'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars(props) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setOpen(false);
  };

  // --> Boton, se usa como prueba al importar
  // const handleClick = () => {
  //   props.setOpen(true);
  // };


  return (
    <Stack spacing={2} sx={{ width: '100%' }}>

     {/*
       // --> Boton, se usa como prueba al importar
     <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
      */}

      <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
      {/*
      <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert>
      */}
    </Stack>
  );
}
