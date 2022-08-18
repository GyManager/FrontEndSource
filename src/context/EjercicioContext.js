import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ejercicioService from "../services/ejercicios.service";
import { useFormik } from 'formik'
import orderBy from 'lodash/orderBy'
// import ejerciciosService from '../../services/ejercicios.service'
import ejerciciosService from '../services/ejercicios.service'
// import ejercicioSchema from '../../ejercicioSchema'
import ejercicioSchema from '../components/unEjercicioPage/ejercicioSchema'

export const EjercicioContext = createContext();

export const EjercicioProvider = ({ children, paso, unIdEjercicio }) => {
  const [pasos, setPasos] = useState([])
  let { idEjercicio } = useParams()
  console.log(idEjercicio)

  const formik = useFormik(
    {
      initialValues: {
        nombre: "",
        tipoDeEjercicio: "",
        linkVideo: ""
      },
      validationSchema: ejercicioSchema.validationSchema,
      onSubmit: () => {
        handleSubmit()
      },
    }
  );
  
  const handleSubmit = () => {

  }

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


  const getEjercicio = async (ejercicioId) => {
    const res = await ejerciciosService.getEjercicioById(ejercicioId)
    if (res instanceof AxiosError) {
      console.log(res?.response)
    } else {
      console.log(res)
      formik.setValues({
        nombre: res.nombre,
        tipoDeEjercicio: res.tipoEjercicio,
        linkVideo: res.video
      })
    }
  }

  return (
    <EjercicioContext.Provider value={{
      pasos,
      idEjercicio,
      getEjercicio,
      formik

    }}>
      {children}
    </EjercicioContext.Provider>
  )
}