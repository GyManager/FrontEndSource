import { Typography } from '@mui/material'
import React from 'react'

function Instrucciones() {
  return (
    <div> {/* <Grid container display='block'> */}
    <Typography sx={{ fontSize: { xs: 14, md: 16, lg: 20, xl: 22 } }}>Instrucciones</Typography>
    <Typography sx={{ fontSize: { xs: 12, md: 14, lg: 18, xl: 20 } }}>Instrucciones Harcodeadas</Typography>
    {/* </Grid> */}</div>
  )
}

export default Instrucciones