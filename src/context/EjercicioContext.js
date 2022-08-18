import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ejercicioService from "../services/ejercicios.service";

export const EjercicioContext = createContext();

export const EjercicioProvider = ({ children, paso, unIdEjercicio }) => {
  const [pasos, setPasos] = useState([])
  let { idEjercicio } = useParams()
  console.log(idEjercicio)
  
  useEffect(() => {
    const pasosByIdEjercicio = async (id) => {
      const res = await ejercicioService.getPasosByEjercicioId(id)
      if (res instanceof AxiosError) {
        console.log('Hubo un error')
      } else {
        console.log(res)
        setPasos(res)
      }
    }
    if(unIdEjercicio){
    pasosByIdEjercicio(idEjercicio)
    }
  },[])


  return (
    <EjercicioContext.Provider value={{
      pasos,
      idEjercicio
    }}>
      {children}
    </EjercicioContext.Provider>
  )
}