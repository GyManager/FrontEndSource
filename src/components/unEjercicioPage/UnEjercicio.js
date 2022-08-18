//Librerias
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { AxiosError } from 'axios'

//Data
import { ParameterDropdownContext } from "../../context/ParameterDropdownContext";
import { EjercicioContext } from "../../context/EjercicioContext";

//Vista
import { Paper, Container, Grid, Typography, Button, TextField } from '@mui/material'
import { Edit, Delete, Save, Cancel } from '@mui/icons-material/';
import Breadcumbs from '../reusable/Breadcumbs'

import { GenericComboBox } from '../reusable'
import ButtonUnEjercicioMobile from './ButtonUnEjercicioMobile'
import Instrucciones from './Instrucciones';
import Equipamento from './Equipamento'
import Video from './Video';


function UnEjercicioPage() {
  // const [tiposDeEjercicio, setTiposDeEjercicio] = useState(() => '')
  const { tipoEjercicios } = useContext(ParameterDropdownContext)
  const {
    pasosByIdEjercicio, idEjercicio, formik, getEjercicio, handleSubmit, editable, setEditable
  } = useContext(EjercicioContext)
  const navigate = useNavigate()



  const paperStyle = {
    elevation: 2,
    sx: {
      p: 2, mt: 2,
    }
  }

  const TextFieldStyle = {
    disabled: !editable,
    inputProps: { readOnly: Boolean(!editable) },
    variant: "standard",
    onChange: formik.handleChange
  }

  const ButtonStyle = {
    sx: {
      mx: 1,
      justifyContent: 'space-around'
    },
    variant: 'contained',
    size: 'large',
    fullWidth: true
  }

  const probar = () => {
    console.log('probando')
    pasosByIdEjercicio(idEjercicio)
  }

  useEffect(() => {
    idEjercicio === 'new' ?
      setEditable(true)
      :
      getEjercicio(idEjercicio)
    // getTiposDeEjercicios()
  }, [])

  const guardar = () => {
    // Implementar el post
    setEditable(false)
  }

  return (

    <Grid container>
      <Grid item sx={{ display: 'block' }} xs={8} >
        <Breadcumbs
          names={['Ejercicios', formik.values.nombre]}
          urls={['../ejercicios/']}
        />

        <Typography component='span' sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 40 } }}>Ejercicio: {formik.values.nombre}</Typography>
      </Grid>
      <Grid item xs={4} sx={{ display: { xs: 'none', md: 'flex' } }}  >
        <Button {...ButtonStyle} onClick={() => { editable ? guardar() : setEditable(true) }}
        >{editable ? <Save /> : <Edit />}
          {editable ? 'Guardar' : 'Editar'}</Button>
        <Button {...ButtonStyle} onClick={() => probar()}
        >{editable ? <Cancel /> : <Delete />}
          {editable ? 'Cancelar' : 'Borrar'}</Button>
      </Grid>
      <Grid item xs={12}>
        <Paper {...paperStyle} >
          <Grid container>
            <Grid item xs={12} md={5}>
              <TextField fullWidth
                {...TextFieldStyle}
                label="Nombre"
                id="nombre"
                value={formik.values.nombre}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
                autoFocus
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={7} sx={{ textAlign: 'center' }}>
              <GenericComboBox
                label="Tipo de ejercicio"
                id="ejercicioTipoDeEjercicio"
                value={formik.values.tipoDeEjercicio}
                handleChange={formik.handleChange}
                editable={editable}
                valueForNone=""
                labelForNone="Seleccionar tipo de ejercicio"
                values={tipoEjercicios}
                minWidth={250} />
            </Grid>
          </Grid>
        </Paper>
        <Grid item xs={12}>
          <Paper {...paperStyle} >

            <Instrucciones />

          </Paper>
        </Grid>
        <Paper {...paperStyle}>

          <Video />

        </Paper>
        <Paper {...paperStyle} >
          <Grid item xs={12}>
            <Typography component='span' sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}>Equipamento</Typography>
            <Equipamento/>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          right: '4vw',
          bottom: '4vh'
        }} >
        <ButtonUnEjercicioMobile />
      </Grid>
    </Grid>
  )
}

export default UnEjercicioPage