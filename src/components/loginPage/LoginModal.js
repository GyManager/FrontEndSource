import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal(props) {

  return (
    <div>
      <Modal
        open={props.abierto}
        onClose={props.cerrar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction='row' spacing={2}>
            <ReportGmailerrorredIcon color='warning'/>
            <Typography id="modal-modal-description">
            {props.serverMsj}
            </Typography>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
