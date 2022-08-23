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
        "idPaso": pasos.length - 1,
        "numeroPaso": pasos.length,
        "contenido": "",
        "imagen": ""
      }
    ])
  }

  const handleSubirPaso = (nroPaso) => {
    console.log('nroPaso: ', nroPaso)
    // console.log(nroPaso)
    // const pasoActual = pasos.find(unPaso => unPaso.numeroPaso === nroPaso)
    // const pasoAnterior = pasos.find(unPaso => unPaso.numeroPaso === (nroPaso - 1))
    // console.log(pasoActual)
    // console.log(pasoAnterior)
    if (nroPaso === 1) {
      console.log('No puede subir mas')
    } else {
      console.log(pasos)
      const idPasoASubir = pasos[nroPaso - 1].idPaso
      const idPasoABajar = pasos[nroPaso - 2].idPaso
      console.log(idPasoASubir, idPasoABajar)
      // pasos[nroPaso].numeroPaso--

      const updatePasos = pasos.map(unPaso => {
        if (unPaso.idPaso === idPasoASubir) {
          const numeroPasoDecrementado = nroPaso - 1;
          console.log({ ...unPaso, "numeroPaso": numeroPasoDecrementado })
          return (
            { ...unPaso, "numeroPaso": numeroPasoDecrementado }
          )
        } else if (unPaso.idPaso === idPasoABajar) {
          console.log(pasos)
          return (
            { ...unPaso, "numeroPaso": nroPaso }
          )
        }
        console.log(pasos)
        return unPaso
      }
      )
      const orderedUpdate = orderBy(updatePasos, 'numeroPaso')
      setPasos(orderedUpdate)

    }
  }
  console.log(pasos)


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