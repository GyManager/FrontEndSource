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
    ]);
    console.log(pasos)
  }

  const handleSubirPaso = (nroPaso) => {
    const copiaPasos = [...pasos]
    if (nroPaso === 1) {
      console.log('No se puede subir mas')
    } else {
      const indexPasoASubir = nroPaso - 1
      const indexPasoABajar = nroPaso - 2
      copiaPasos[indexPasoASubir].numeroPaso--
      copiaPasos[indexPasoABajar].numeroPaso++
      const orderedUpdate = orderBy(pasos, 'numeroPaso')
      setPasos(orderedUpdate)
    }
  }

  const handleBajarPaso = (nroPaso) => {
    const copiaPasos = [...pasos]
    if (nroPaso === pasos.length) {
      console.log('No se puede bajar mas')
    } else {
      const indexPasoASubir = nroPaso
      const indexPasoABajar = nroPaso - 1
      copiaPasos[indexPasoASubir].numeroPaso--
      copiaPasos[indexPasoABajar].numeroPaso++
      const orderedUpdate = orderBy(pasos, 'numeroPaso')
      setPasos(orderedUpdate)
    }
  }

  const handleDelete = (nroPaso) => {
    const index = nroPaso - 1;
    console.log(pasos);
    if(pasos.length <=1 ){
      console.log('Debe haber al menos un paso')
    }
    console.log(nroPaso, index)
    setPasos([
      ...pasos.slice(0, index),
      ...pasos.slice(index + 1)
    ]);
    //actualizar numero pasos
    const arrayUpdate = pasos.map((unPaso, i) => {
      return(
      { ...unPaso , "numeroPaso" : i + 1 } )
    })
    setPasos(arrayUpdate)
    console.log(pasos)
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
              handleDelete={handleDelete}
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