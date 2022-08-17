import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'

import { Paper, Container, Grid, Typography, Button, TextField } from '@mui/material'
import Breadcumbs from '../reusable/Breadcumbs'

import ejercicioSchema from './ejercicioSchema'
import { GenericComboBox } from '../reusable'
import ButtonUnEjercicioMobile from './ButtonUnEjercicioMobile'
import ejerciciosService from '../../services/ejercicios.service'
import { AxiosError } from 'axios'

function UnEjercicioPage() {
  const navigate = useNavigate()
  let { ejercicioId } = useParams()
  const formik = useFormik(
    {
      initialValues: {
        nombre: '',
        tipoDeEjercicio: ''
      },
      validationSchema: ejercicioSchema.validationSchema,
      onSubmit: () => {
        handleSubmit()
      },
    }
  );


  const handleSubmit = () => {

  }

  const [editable, setEditable] = useState(true)

  const paperStyle = {
    elevation: 2,
    sx: {
      p: 2,
      mt: 2,

    }
  }

  const TextFieldStyle = {
    disabled: !editable,
    inputProps: { readOnly: Boolean(!editable) },
    variant: "standard",
    onChange: formik.handleChange
  }

  const getEjercicio = async (ejercicioId) => {
    const res = await ejerciciosService.getEjercicioById(ejercicioId)
    if (res instanceof AxiosError) {
      console.log(res?.response)
    } else {
      console.log(res)
    }
  }

  const probar = () => {
    console.log(ejercicioId)
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Paper
        sx={{
          width: { xs: '90vw', lg: '70vw' },
          // height: { xs: '140vh', sm: '90vh', md: '80vh', lg: '77vh', xl: '80vh' },
          p: '1vw',
          mt: '2vh',
        }}
      >
        <Grid container>
          <Grid item sx={{ display: 'block' }} xs={10} >
            <Breadcumbs
              names={['Ejercicios', 'EjerHARDCODEADO']}
              urls={['../ejercicios/']}
            />

            <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 40 } }}>Ejercicio:Harcodeado</Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: { xs: 'none', md: 'flex' } }}  >
            <Button variant='contained' size='large' fullWidth
              onClick={() => getEjercicio(ejercicioId)}
            >Crear</Button>
          </Grid>
          <Grid item xs={12}>
            <Paper {...paperStyle} >
              <Grid container>
                <Grid item xs={12} md={5}>
                  <TextField fullWidth
                    {...TextFieldStyle}
                    label="Nombre"
                    id="ejercicioNombre"
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
                    values={["Superior", "Medio", "Inferior"]}
                    minWidth={250} />
                </Grid>
              </Grid>
            </Paper>
            <Grid item xs={12}>
              <Paper {...paperStyle} >
                {/* <Grid container display='block'> */}
                <Typography sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}>Instrucciones</Typography>
                <Typography sx={{ fontSize: { xs: 12, md: 14, lg: 18, xl: 20 } }}>Instrucciones Harcodeadas</Typography>
                {/* </Grid> */}
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
      </Paper>
    </Container>
  )
}

export default UnEjercicioPage