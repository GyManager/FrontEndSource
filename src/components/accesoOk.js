import React from 'react'
import Drawer from './drawer/Drawer'
import Footer from './Footer';
import Typography from '@mui/material/Typography';

function accesoOk() {
  return (
    <div>
      <Drawer />
      <Typography
        sx={{ pt: 3, pb: 1 }}
        variant="h6"
        align="center"
        component="div"
        gutterBottom>
        Ud ha iniciado sesion (...En construccion)
      </Typography>

      <Footer />
    </div>
  )
}

export default accesoOk