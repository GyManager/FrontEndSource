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
  const [allTipoEjercicios, setAllTipoEjercicios] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [equipamentoDeEjercicio, setEquipamentoDeEjercicio] = useState([])

  // console.log(idEjercicio)

  const formik = useFormik(
    {
      initialValues: {
        nombre: "",
        tipoDeEjercicio: "",
        pasos: [{
          contenido: "",
          idPaso: "",
          imagen: "",
          numeroPaso: ""
        }],
        linkVideo: "",
        equipamentoDeEjercicio: []
      },
      validationSchema: ejercicioSchema.validationSchema,
      onSubmit: () => {
        handleSubmit()
      },
    }
  );

  const handleSubmit = () => {
  }

  // getEjercicioById
  const getEjercicio = async (ejercicioId) => {
    const res = await ejerciciosService.getEjercicioById(ejercicioId)
    if (res instanceof AxiosError) {
      console.log(res?.response)
    } else {
      formik.setFieldValue('nombre' , res.nombre, true)
      formik.setFieldValue('tipoDeEjercicio' , res.tipoEjercicio, true)
      formik.setFieldValue('linkVideo' , res.video, true)
    }
  }

  //getAllTipoEjercicios
  useEffect(() => {
    const fetchAllTiposEjercicio = async () => {
      const res = await ejercicioService.getAllTipoEjercicios()
      setAllTipoEjercicios(res)
    }
    fetchAllTiposEjercicio()

  }, [])

  //getPasosByEjercicioId
  useEffect(() => {
    const fetchPasosByIdEjercicio = async (id) => {
      const res = await ejercicioService.getPasosByEjercicioId(id)
      if (res instanceof AxiosError) {
        console.log('Hubo un error')
      } else {
        const orderedRes = orderBy(res, ['numeroPaso'], ['asc'])
        formik.setFieldValue('pasos', orderedRes, true)

        }}
      fetchPasosByIdEjercicio(idEjercicio)
    // }
    // if (unIdEjercicio) {
    //   fetchPasosByIdEjercicio(idEjercicio)
    // }
  }, [])

  // getAllEquipamentos
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

  // getEquipamentoByEjercicio
  useEffect(() => {
    const fetchEquipamentoDeEjercicio = async (idEjercicio) => {
      const res = await ejerciciosService.getEquipamentoByEjercicio(idEjercicio)
      if (res instanceof AxiosError) {
      } else {
        const orderedRes = orderBy(res, ['nombre'], ['asc'])
        // setEquipamentoDeEjercicio(orderedRes)
        formik.setFieldValue('equipamentoDeEjercicio', orderedRes, false)
      }
    }
    fetchEquipamentoDeEjercicio(idEjercicio)

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
      idEjercicio,
      getEjercicio,
      allTipoEjercicios,
      equipamentoDeEjercicio, setEquipamentoDeEjercicio,
      equipamentos, setEquipamentos,
      handleCancelEdit,
    }}>
      {children}
    </EjercicioContext.Provider>
  )
}