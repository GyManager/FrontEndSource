import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ejercicioService from "../services/ejercicios.service";
import orderBy from 'lodash/orderBy'

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
        const orderedRes = orderBy(res,['numeroPaso'],['asc'])
        console.log(orderedRes)
        setPasos(orderedRes)
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