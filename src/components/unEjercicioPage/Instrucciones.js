import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import {EjercicioContext} from '../../context/EjercicioContext'

function Instrucciones() {
const { pasos, setPasos } = useContext(EjercicioContext)
console.log('pasos:')
console.log(pasos)
console.log(pasos[0].contenido)

  return (
    <div> 
    {/* <Grid container display='block'> */}
    <Typography sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}>Instrucciones</Typography>
    <Typography sx={{ fontSize: { xs: 12, md: 14, lg: 18, xl: 20 } }}>Instrucciones Harcodeadas</Typography>
    <Typography>hola {pasos[0].contenido}</Typography>
    <div>hola {pasos[0].contenido}</div>
    {/* </Grid> */}
    </div>
  )
}

export default Instrucciones