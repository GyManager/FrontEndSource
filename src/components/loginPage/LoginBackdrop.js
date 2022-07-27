import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoginBackdrop(props) {

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.show}
        onClick={props.hide}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
