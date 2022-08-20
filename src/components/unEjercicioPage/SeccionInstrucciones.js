import { Button, Divider, Grid, Paper, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { EjercicioContext } from '../../context/EjercicioContext'
import Paso from './Paso'
function Instrucciones(props) {
  const { pasos, setPasos } = useContext(EjercicioContext)
  console.log(pasos)

  return (
    <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}>Instrucciones</Typography>
          </Grid>
          <Grid item xs={12}>
            {pasos.map(unPaso => {
              return (
                <Paso
                  nroPaso={unPaso.numeroPaso}
                  descripcion={unPaso.contenido}
                  imagen={unPaso.imagen}
                />
              )
            })}
          </Grid>
          <Grid item xs={12}>
            <Button spacing='' variant='contained' size='small'>+ Agregar paso</Button>
          </Grid>
        </Grid>
    </Grid>
  )
}

export default Instrucciones

// {
//   "idPaso": 0,
//   "numeroPaso": 1,
//   "contenido": "string",
//   "imagen": "string"
// }