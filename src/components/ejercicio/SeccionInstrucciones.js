import { Button, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { EjercicioContext } from '../../context/EjercicioContext'
import Paso from './Paso'

import orderBy from 'lodash/orderBy'

export default function SeccionInstrucciones(props) {
  const { formik, editable } = useContext(EjercicioContext)

  const pasos = formik.values.pasos

  const setPasos = (arr) => {
    formik.setFieldValue('pasos', arr, false)
  }

  
  const handleAgregarPaso = () => {
    const nuevoPaso = [
      ...formik.values.pasos,
      {
        "numeroPaso": pasos.length + 1,
        "contenido": "",
        "imagen": "",
      }
    ];
    formik.setFieldValue('pasos', nuevoPaso, false)
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
    console.log(nroPaso)
    const index = nroPaso - 1;
    console.log(pasos);
    if (pasos.length <= 1) {
      console.log('Debe haber al menos un paso')
    } else {
      console.log(nroPaso, index)
      const slicedArray = [
        ...pasos.slice(0, index),
        ...pasos.slice(index + 1)
      ]
      const arrayUpdateNroPaso = slicedArray.map((unPaso, i) => {
        return (
          { ...unPaso, "numeroPaso": i + 1 })
      })
      setPasos(arrayUpdateNroPaso);
      console.log(pasos)
    }
  }

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}>
            Instrucciones
          </Typography>
        </Grid>
          {
            pasos.map((unPaso, index) => {
              return (
                <Paso
                  index={index}
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
        <Grid item xs={12}>
          <Button
            variant='contained'
            size='small'
            onClick={handleAgregarPaso}
            sx={{ display: editable ? 'initial' : 'none' }}
          >+ Agregar paso</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}