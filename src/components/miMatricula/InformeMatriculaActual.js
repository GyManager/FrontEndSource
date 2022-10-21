import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { useEffect } from 'react';

let tieneMatriculaVigente = true

function InformeMatriculaActual(props) {
  console.log(props.fechaVencimiento)
useEffect(()=>{
    
},)

const siTiene = <><CheckIcon/>Tu matricula actual vence el: {props.fechaVencimiento}</>
const noTiene = <><CloseIcon/>No tenes una matricula vigente </>
  return (
    <Box sx={{display:'flex', justifyContent:'center' ,justifyItems:'center'}}>
    {tieneMatriculaVigente ? siTiene : noTiene}
    </Box>
  )
}

export default InformeMatriculaActual