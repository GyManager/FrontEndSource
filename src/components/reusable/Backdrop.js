import * as React from 'react';
import { Backdrop, CircularProgress, Typography, Stack } from '@mui/material/'

export default function LoginBackdrop(props) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.show}
        onClick={props.hide}
      >
        <Stack direction="column" alignItems='center'>
          <CircularProgress color="inherit" />
          <Typography>Un momento por favor</Typography>
        </Stack>
      </Backdrop>
    </div>
  );
}

/*
// Copiar para implementar

//Estados de Backdrop (En padre)
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

// En jsx
<Backdrop
                show={openBackdrop}
                hide={handleCloseBackdrop} />


*/