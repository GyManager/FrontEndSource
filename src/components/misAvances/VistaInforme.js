import React, { useEffect, useState } from 'react'

function VistaInforme(props) {
// const [ejercicio , setEjercicio] = useState({})

    // console.log(ejercicio)
    // useEffect(()=>{
    //     setEjercicio(props.ejercicio)
    //     console.log(props.ejercicio)
    // },[props.ejercicio])
console.log(props.ejercicio[0].nombre)
const nombreEjercicio = props.ejercicio[0].nombre


  return (
    <div>VistaInformessss {nombreEjercicio}
    </div>
  )
}

export default VistaInforme