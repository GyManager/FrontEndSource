//Librerias
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { AxiosError } from 'axios'

//Data
import { EjercicioContext } from "../../context/EjercicioContext";

//Vista
import { Paper, Container, Grid, Typography, Button } from '@mui/material'
import Breadcumbs from '../reusable/Breadcumbs'

import ButtonUnEjercicioMobile from './ButtonUnEjercicioMobile'
import SeccionNombreYTipo from './SeccionNombreYTipo'
import SeccionInstrucciones from './SeccionInstrucciones';
import SeccionVideo from './SeccionVideo';
import SeccionEquipamento from './SeccionEquipamento'
import ButtonsUnEjercicioDesktop from './ButtonsUnEjercicioDesktop';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { GenericModal } from '../reusable';

function UnEjercicioPage() {
  // const [tiposDeEjercicio, setTiposDeEjercicio] = useState(() => '')

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

console.log(openModal, ' ', modalMsj)
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