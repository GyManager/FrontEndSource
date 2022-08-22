import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
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

  const navigate = useNavigate()
  let { idEjercicio } = useParams()
  const [editable, setEditable] = useState(false)
  const [tipoEjercicios, setTipoEjercicios] = useState([])
  const [pasos, setPasos] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [equipamentoDeEjercicio, setEquipamentoDeEjercicio] = useState([])

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
const fetchAllTiposEjercicio = async () => {
  const res = await ejercicioService.getAllTipoEjercicios()
  console.log('Tipo ejerciciosRES')
  console.log(res)
  setTipoEjercicios(res)
}
fetchAllTiposEjercicio()

},[])


  useEffect(() => {
    const fetchPasosByIdEjercicio = async (id) => {
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
      fetchPasosByIdEjercicio(idEjercicio)
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
    const fetchEquipamentoDeEjercicio = async (idEjercicio) => {
      const res = await ejerciciosService.getEquipamentoByEjercicio(idEjercicio)
      if (res instanceof AxiosError) {
        console.log(res?.message)
      } else {
        console.log(res)
        const orderedRes = orderBy(res, ['nombre'], ['asc'])
        console.log(orderedRes)
        // const equipamentoDeEjercicioNombres = orderedRes.map((unEquipamento) => { return unEquipamento.nombre })
        setEquipamentoDeEjercicio(orderedRes)
      }
    }
    fetchEquipamentoDeEjercicio(idEjercicio)

  }, [])

  useEffect(() => {
    const fetchAllEquipamentos = async () => {
      const res = await ejerciciosService.getAllEquipamentos()
      if (res instanceof AxiosError) {
        console.log(res?.message)
      } else {
        const orderedRes = orderBy(res, ['nombre'], ['asc'])
        console.log(orderedRes)
        // const equipamentoNombres = orderedRes.map((unEquipamento) => { return unEquipamento.nombre })

        // setEquipamentos(equipamentoNombres)
        setEquipamentos(orderedRes)
      }
    }
    fetchAllEquipamentos()

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
      formik,
      editable, setEditable,
      pasos,
      idEjercicio,
      getEjercicio,
      tipoEjercicios,
      equipamentoDeEjercicio, setEquipamentoDeEjercicio,
      equipamentos, setEquipamentos,
      handleCancelEdit,


    }}>
      {children}
    </EjercicioContext.Provider>
  )
}