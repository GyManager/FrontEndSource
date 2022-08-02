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
  width: {xs:'90vw', sm:'75vw', md:'25vw'},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal(props) {

/*
//Estados de LoginModal -> Para levantar estado
const [modalMsj, setModalMsj] = useState("");
const [openModal, setOpenModal] = useState(false);
const handleCloseModal = () => { setOpenModal(false) }

// Componente
<Modal
                show={openModal}
                hide={handleCloseModal}
                serverMsj={modalMsj} />
*/

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.hide}
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
