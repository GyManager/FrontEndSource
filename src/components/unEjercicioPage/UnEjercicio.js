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

function UnEjercicioPage() {
  // const [tiposDeEjercicio, setTiposDeEjercicio] = useState(() => '')

  const {
    idEjercicio, formik, getEjercicio, handleSubmit, editable, setEditable,
  } = useContext(EjercicioContext);
  const navigate = useNavigate()

  const ButtonStyle = {
    sx: { mx: 1, justifyContent: 'space-around' },
    variant: 'contained',
    size: 'large',
    fullWidth: true,
  }

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

  const ButtonMobileStyle
    = {
    sx: {
      display: { xs: 'block', md: 'none' },
      position: 'fixed',
      right: '4vw',
      bottom: '4vh'
    }
  }

  const probar = () => {
    console.log('probando')
  }

  useEffect(() => {
    idEjercicio === 'new' ?
      setEditable(true)
      :
      getEjercicio(idEjercicio)
  }, [])

  const guardar = () => {
    // Implementar el post y put 
    setEditable(false)
    idEjercicio === 'new' ?
      // Implementar post
      console.log('aca iria el post')
      :
      // Implementar put
      console.log('aca iria el put')
  }

  return (
    <div>
      <form
        method="post"
        onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item sx={{ display: 'block' }} xs={6} >
            <Breadcumbs
              names={['Ejercicios', formik.values.nombre]}
              urls={['../ejercicios/']}
            />

            <Typography component='span'
              sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 40 } }}
            >Ejercicio: {formik.values.nombre}
            </Typography>
          </Grid>
          {/* <Grid item xs={6} sx={{ display: { xs: 'none', md: 'flex' } }}  > */}
          {/* <Button type='submit' {...ButtonStyle} > <Save /></Button> */}
          {/* <Button type="submit" > <Save /></Button> */}
          {/* <Button {...ButtonStyle} onClick={()=>{setEditable(true)}}><Edit /></Button> */}
            
            <ButtonsUnEjercicioDesktop/>

{/* 
            <Button {...ButtonStyle} onClick={() => { editable ? setEditable(false) : setEditable(true) }}
        >{editable ? <Save /> : <Edit />}
          {editable ? 'Guardar' : 'Editar'}</Button>
        <Button {...ButtonStyle} onClick={() => probar()}
        >{editable ? <Cancel /> : <Delete />}
          {editable ? 'Cancelar' : 'Borrar'}</Button>
          </Grid> */}
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

          <Grid item xs={12}
            {...ButtonMobileStyle}>
            <ButtonUnEjercicioMobile
              guardar={guardar}
            />

          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default UnEjercicioPage