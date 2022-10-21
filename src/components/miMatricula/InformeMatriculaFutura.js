import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { useEffect } from 'react';


function InformeMatriculaFutura(props) {
  // console.log(props.inicio)
  useEffect(()=>{
    
  },)
  
  let tieneMatriculaVigente = true


const siTiene = <><CalendarMonthIcon/>Tenés una matricula futura desde el: {props.inicio.split("T",1)}</>
const noTiene = <><CloseIcon/>No tenes una matricula a futuro. Recorda matricularte a tiempo!!!</>
  return (
    <Box sx={{display:'flex', justifyContent:'center' ,justifyItems:'center'}}>
    {tieneMatriculaVigente ? siTiene : noTiene}
    </Box>
  )
}

export default InformeMatriculaFutura