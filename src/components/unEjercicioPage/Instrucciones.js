import { Divider, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { EjercicioContext } from '../../context/EjercicioContext'

function Instrucciones() {
  const { pasos, setPasos } = useContext(EjercicioContext)
  console.log('pasos:')
  // console.log(pasos)
  // console.log(pasos[0].contenido)

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}>Instrucciones</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: { xs: 12, md: 14, lg: 18, xl: 20 } }}>
          {pasos.map(unPaso => {
            return (
              <div>
              <Typography>Paso: {unPaso.numeroPaso} </Typography>
              <Typography>Descripcion: {unPaso.contenido} </Typography>
              <Typography>Imagen: {unPaso.imagen} </Typography>
              <Divider></Divider>
              </div>
          )})}

        </Typography>
      </Grid>
    </Grid>
  )
}

export default Instrucciones