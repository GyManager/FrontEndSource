//Librerias
import React, { useContext, useEffect } from 'react'

//Data
import { EjercicioContext } from "../../context/EjercicioContext";

//Vista
import { Paper, Grid, Typography } from '@mui/material'
import Breadcumbs from '../reusable/Breadcumbs'

import ButtonUnEjercicioMobile from './ButtonUnEjercicioMobile'
import SeccionNombreYTipo from './SeccionNombreYTipo'
import SeccionInstrucciones from './SeccionInstrucciones';
import SeccionVideo from './SeccionVideo';
import SeccionEquipamento from './SeccionEquipamento'
import ButtonsUnEjercicioDesktop from './ButtonsUnEjercicioDesktop';
import { GenericModal } from '../reusable';

function UnEjercicioPage() {

  const {
    idEjercicio, formik, getEjercicio, editable, setEditable, 
    openModal, modalMsj, handleCloseModal
  } = useContext(EjercicioContext);

  const paperStyle = {
    elevation: 2,
    sx: { p: 2, mt: 2 }
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
        <ButtonsUnEjercicioDesktop />
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
    </form>
  )
}

export default UnEjercicioPage