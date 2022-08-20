import { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [equipamentoDeEjercicio, setEquipamentoDeEjercicio] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [editable, setEditable] = useState(false)
  let { idEjercicio } = useParams()
  const navigate = useNavigate()

  // console.log(idEjercicio)

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
        // console.log(res)
        const orderedRes = orderBy(res, ['numeroPaso'], ['asc'])
        // console.log(orderedRes)
        setPasos(orderedRes)
      }
    }
    if (unIdEjercicio) {
      pasosByIdEjercicio(idEjercicio)
    }
  }, [])

  const getEjercicio = async (ejercicioId) => {
    const res = await ejerciciosService.getEjercicioById(ejercicioId)
    if (res instanceof AxiosError) {
      console.log(res?.response)
    } else {
      // console.log(res)
      formik.setValues({
        nombre: res.nombre,
        tipoDeEjercicio: res.tipoEjercicio,
        linkVideo: res.video
      })
    }
  }

  useEffect(() => {
    const getEquipamentoDeEjercicio = async (idEjercicio) => {
      const res = await ejerciciosService.getEquipamentoByEjercicio(idEjercicio)
      if (res instanceof AxiosError) {
        console.log(res?.message)
      } else {
        console.log(res)
        setEquipamentoDeEjercicio(res)
      }
    }
    getEquipamentoDeEjercicio(idEjercicio)

  }, [])

  useEffect(() => {
    const getEquipamentos = async () => {
      const res = await ejerciciosService.getEquipamentos()
      if (res instanceof AxiosError) {
        console.log(res?.message)
      } else {
        const orderedRes = orderBy(res, ['nombre'], ['asc'])
        console.log(orderedRes)
        setEquipamentos(orderedRes)
      }
    }
    getEquipamentos()

  }, [])

  const handleCancelEdit = () => {
    if (idEjercicio === 'new') {
      navigate("/ejercicios");
    } else {
      setEditable(false)
      getEjercicio(idEjercicio);
    }
  }



  return (
    <EjercicioContext.Provider value={{
      pasos,
      idEjercicio,
      getEjercicio,
      formik,
      equipamentoDeEjercicio,setEquipamentoDeEjercicio,
      equipamentos, setEquipamentos,
      editable, setEditable,
      handleCancelEdit,


    }}>
      {children}
    </EjercicioContext.Provider>
  )
}