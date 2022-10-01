//Librerias
import React, { useContext, useEffect, useState } from 'react'

//Data
import { EjercicioContext } from "../../context/EjercicioContext";

//Vista
import { Paper, Grid, Typography } from '@mui/material'

import ButtonUnEjercicioMobile from './ButtonUnEjercicioMobile'
import SeccionNombreYTipo from './SeccionNombreYTipo'
import SeccionInstrucciones from './SeccionInstrucciones';
import SeccionVideo from './SeccionVideo';
import SeccionEquipamento from './SeccionEquipamento'
import ButtonsUnEjercicioDesktop from './ButtonsUnEjercicioDesktop';
import { AlertDialog, Breadcumbs, GenericModal } from '../reusable';

function UnEjercicioPage() {

  const {
    idEjercicio, formik, getEjercicio, editable, setEditable,
    openModal, modalMsj, handleCloseModal, handleDelete
  } = useContext(EjercicioContext);
  // Estados AlertDialog
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const handleClickOpenAlertDialog = () => {
    setOpenAlertDialog(true);
  };

  const paperStyle = {
    elevation: 2,
    sx: { px: 2, mt: 2 }
  }

  const TextFieldStyle = {
    disabled: !editable,
    inputProps: { readOnly: Boolean(!editable) },
    variant: "standard",
    onChange: formik.handleChange
  }

  useEffect(() => {
    idEjercicio === 'new' ?
      setEditable(true)
      :
      getEjercicio(idEjercicio)
  }, [])


  return (
    <form
      method="post"
      onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item sx={{ display: 'block' }} xs={8} >
          <Breadcumbs
            names={['Ejercicios', formik.values.nombre]}
            urls={['../ejercicios/']}
          />
          <Typography component='span'
            sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 40 } }}
          >Ejercicio: {formik.values.nombre}
          </Typography>
        </Grid>
        <ButtonsUnEjercicioDesktop
          openAlertDialog={handleClickOpenAlertDialog}
        />
        <Grid item xs={12}>
          <SeccionNombreYTipo
            paperStyle={paperStyle}
            TextFieldStyle={TextFieldStyle}
          />
          <Paper {...paperStyle} >
            <SeccionInstrucciones />
          </Paper>
          <Paper {...paperStyle}>
            <SeccionVideo />
          </Paper>
          <Paper {...paperStyle} >
            <SeccionEquipamento />
          </Paper>
        </Grid>
        <ButtonUnEjercicioMobile
        />
      </Grid>
      <GenericModal
        show={openModal}
        hide={handleCloseModal}
        serverMsj={modalMsj}
      />
      <AlertDialog
        open={openAlertDialog}
        setOpen={setOpenAlertDialog}
        title={'Está por eliminar al ejercicio' + formik.values.nombre}
        content='¿Seguro desea eliminarlo?'
        buttonTextAccept='Borrar'
        buttonTextDeny='Cancelar'
        buttonActionAccept={handleDelete}
      />
    </form>
  )
}

export default UnEjercicioPage