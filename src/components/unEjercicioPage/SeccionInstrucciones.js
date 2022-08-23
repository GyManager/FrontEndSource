import { Button, Divider, Grid, Paper, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { EjercicioContext } from '../../context/EjercicioContext'
import Paso from './Paso'
import orderBy from 'lodash/orderBy'

export default function SeccionInstrucciones(props) {
  const { pasos, setPasos } = useContext(EjercicioContext)

  const handleAgregarPaso = () => {
    setPasos([
      ...pasos,
      {
        "numeroPaso": pasos.length + 1,
        "contenido": "",
        "imagen": "",

      }
    ])
    console.log(pasos)
  }

  const handleSubirPaso = (nroPaso) => {
    if (nroPaso === 1) {
      console.log('No se puede subir mas')
    } else {
      const indexPasoASubir = nroPaso - 1
      const indexPasoABajar = nroPaso - 2
      pasos[indexPasoASubir].numeroPaso--
      pasos[indexPasoABajar].numeroPaso++
      const orderedUpdate = orderBy(pasos, 'numeroPaso')
      setPasos(orderedUpdate)
    }
  }

  const handleBajarPaso = (nroPaso) => {
    if (nroPaso === pasos.length) {
      console.log('No se puede bajar mas')
    } else {
      const indexPasoASubir = nroPaso
      const indexPasoABajar = nroPaso - 1
      pasos[indexPasoASubir].numeroPaso--
      pasos[indexPasoABajar].numeroPaso++
      const orderedUpdate = orderBy(pasos, 'numeroPaso')
      setPasos(orderedUpdate)
    }
  }

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}>Instrucciones</Typography>
        </Grid>
        <Grid item xs={12}>
          {pasos.map((unPaso, index) => {
            return (
              <Paso
                id={`descripcion${index}`}
                nroPaso={unPaso.numeroPaso}
                descripcion={unPaso.contenido}
                imagen={unPaso.imagen}
                handleSubirPaso={handleSubirPaso}
                handleBajarPaso={handleBajarPaso}
              />
            )
          })}
        </Grid>
        <Grid item xs={12}>
          <Button spacing='' variant='contained' size='small' onClick={handleAgregarPaso}>+ Agregar paso</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

// {
//   "idPaso": 0,
//   "numeroPaso": 1,
//   "contenido": "string",
//   "imagen": "string"
// }