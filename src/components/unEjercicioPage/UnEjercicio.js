//Librerias
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { AxiosError } from 'axios'

//Data
import { ParameterDropdownContext } from "../../context/ParameterDropdownContext";
import { EjercicioContext } from "../../context/EjercicioContext";
import ejerciciosService from '../../services/ejercicios.service'
import ejercicioSchema from './ejercicioSchema'

//Vista
import { Paper, Container, Grid, Typography, Button, TextField } from '@mui/material'
import { Edit, Delete, Save, Cancel } from '@mui/icons-material/';
import Breadcumbs from '../reusable/Breadcumbs'

import { GenericComboBox } from '../reusable'
import ButtonUnEjercicioMobile from './ButtonUnEjercicioMobile'
import Instrucciones from './Instrucciones';


function UnEjercicioPage() {
  // const [tiposDeEjercicio, setTiposDeEjercicio] = useState(() => '')
  const { tipoEjercicios } = useContext(ParameterDropdownContext)
  const { pasosByIdEjercicio, idEjercicio } = useContext(EjercicioContext)
  console.log(tipoEjercicios)
  const navigate = useNavigate()

  // console.log(idEjercicio)

  const formik = useFormik(
    {
      initialValues: {
        nombre: "",
        tipoDeEjercicio: ""
      },
      validationSchema: ejercicioSchema.validationSchema,
      onSubmit: () => {
        handleSubmit()
      },
    }
  );

  const handleSubmit = () => {

  }

  const [editable, setEditable] = useState(false)

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

  const getEjercicio = async (ejercicioId) => {
    const res = await ejerciciosService.getEjercicioById(ejercicioId)
    if (res instanceof AxiosError) {
      console.log(res?.response)
    } else {
      console.log(res)
      formik.setValues({
        nombre: res.nombre,
        tipoDeEjercicio: res.tipoEjercicio
      })
    }
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

        <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 40 } }}>Ejercicio: {formik.values.nombre}</Typography>
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
                // value={"Full body"}
                handleChange={formik.handleChange}
                editable={editable}
                valueForNone=""
                labelForNone="Seleccionar tipo de ejercicio"
                // values={["Superior", "Medio", "Inferior", "Full body"]}
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
        <Grid item xs={12}>
          <Paper {...paperStyle} >
            {/* <Grid container display='block'> */}
            <Typography sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}>Video</Typography>
            <Typography sx={{ fontSize: { xs: 12, md: 14, lg: 18, xl: 20 } }}>Link del video</Typography>
            {/* </Grid> */}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper {...paperStyle} >
            {/* <Grid container display='block'> */}
            <Typography sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}>Equipamento</Typography>
            <Typography sx={{ fontSize: { xs: 12, md: 14, lg: 18, xl: 20 } }}>Funcionalidad seleccion de equipamento</Typography>
            {/* </Grid> */}
          </Paper>
        </Grid>
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