import { AxiosError } from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ejercicioService from "../services/ejercicios.service";
import { useFormik } from 'formik'
import orderBy from 'lodash/orderBy'

import ejerciciosService from '../services/ejercicios.service'

import ejercicioSchema from '../components/unEjercicioPage/ejercicioSchema'

import { SnackbarContext } from '../context/SnackbarContext'


export const EjercicioContext = createContext();

export const EjercicioProvider = ({ children, paso, unIdEjercicio }) => {
  const { addSnackbar } = useContext(SnackbarContext)

  const navigate = useNavigate()
  let { idEjercicio } = useParams()
  const [editable, setEditable] = useState(false)
  const [allTipoEjercicios, setAllTipoEjercicios] = useState([])
  const [equipamentos, setEquipamentos] = useState([])

  const [openModal, setOpenModal] = useState(false)
  const [modalMsj, setModalMsj] = useState('')
  const handleCloseModal = () => { setOpenModal(false) }

  const formik = useFormik(
    {
      initialValues: {
        nombre: "",
        tipoDeEjercicio: "",
        pasos: [{
          contenido: "",
          idPaso: "",
          imagen: "",
          numeroPaso: "1"
        }],
        linkVideo: "",
        equipamentoDeEjercicio: [],
        equipamentoDeEjercicioIds: [],
      },
      validationSchema: ejercicioSchema.validationSchema,
      onSubmit: () => {
        handleSubmit()
      },
    }
  );


  const handleRespuesta = (res, msj) => {
    if (res instanceof AxiosError) {
      setModalMsj(res.message)
      setOpenModal(true)
    } else {
      addSnackbar({ message: msj, severity: "success", duration: 3000 })
      navigate('/ejercicios')
    }
    return
  }

  const handleSubmit = async () => {
    setEditable(false)

    const ejercicio = {
      "nombre": formik.values.nombre,
      "tipoEjercicio": formik.values.tipoDeEjercicio,
      "video": formik.values.linkVideo,
      "pasos": formik.values.pasos,
      "idHerramientaList": formik.values.equipamentoDeEjercicioIds
    }

    if (idEjercicio === 'new') {
      const res = await ejerciciosService.postEjercicio(ejercicio)
      handleRespuesta(res, 'Ejercicio creado exitosamente')
    } else {
      const res = await ejerciciosService.putEjercicio(ejercicio, idEjercicio)
      handleRespuesta(res, 'Ejercicio actualizado exitosamente')
    }
  }

  // getEjercicioById
  const getEjercicio = async (ejercicioId) => {
    const res = await ejerciciosService.getEjercicioById(ejercicioId)
    if (res instanceof AxiosError) {
      console.log(res?.response)
    } else {
      formik.setFieldValue('nombre', res.nombre, true)
      formik.setFieldValue('tipoDeEjercicio', res.tipoEjercicio, true)
      formik.setFieldValue('linkVideo', res.video, true)
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

      }
    }
    fetchPasosByIdEjercicio(idEjercicio)
    // }
    // if (unIdEjercicio) {
    //   fetchPasosByIdEjercicio(idEjercicio)
    // }
  }, [])

  // getAllEquipamentos
  useEffect(() => {
    const fetchAllNombreEquipamentos = async () => {
      const res = await ejerciciosService.getAllEquipamentos()
      if (res instanceof AxiosError) {
        console.log(res?.message)
      } else {
        // console.log('clg', res)
        const equipamentoNombres = res.map((unEquipamento) => { return unEquipamento.nombre })
        const orderedEquipamentosNombres = orderBy(equipamentoNombres, 'nombre')
        // console.log('clg', orderedEquipamentosNombres)
        setEquipamentos(orderedEquipamentosNombres)
      }
    }
    fetchAllNombreEquipamentos()

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

  // SetSelectedEquipamentosIds
  useEffect(() => {
    const getAllEquipamentos = async () => {
      const allEquipamentos = await ejerciciosService.getAllEquipamentos()
      if (allEquipamentos instanceof AxiosError) {
        console.log(allEquipamentos?.message)
      } else {
        const equipamentoDeEjercicioNombres = formik.values.equipamentoDeEjercicio

        const tieneNombre = (unEquipamento) => {
          return equipamentoDeEjercicioNombres.includes(unEquipamento.nombre)
        }

        const equipamentoDeEjercicioObjArray = allEquipamentos.filter(tieneNombre)

        const equipamentoDeEjercicioIds = equipamentoDeEjercicioObjArray.map((unEquipamento) => {
          return unEquipamento.idHerramienta
        })
        formik.setFieldValue('equipamentoDeEjercicioIds', equipamentoDeEjercicioIds, false)
      }
    }
    getAllEquipamentos()
  }
    , [formik.values.equipamentoDeEjercicio])

  const handleCancelEdit = () => {
    if (idEjercicio === 'new') {
      navigate("/ejercicios");
    } else {
      setEditable(true)
      getEjercicio(idEjercicio);
    }
  }
 // DeleteEjercicioByID
  const handleDelete = async () => {
    console.log(idEjercicio)
    const res = await ejercicioService.deleteEjercicio(idEjercicio)
    handleRespuesta(res,'Ejercicio eliminado exitosamente')
  }

  return (
    <EjercicioContext.Provider value={{
      formik,
      editable,
      setEditable,
      idEjercicio,
      getEjercicio,
      allTipoEjercicios,
      // equipamentoDeEjercicio, setEquipamentoDeEjercicio,
      equipamentos, setEquipamentos,
      handleCancelEdit,
      handleDelete,
      openModal,
      modalMsj,
      handleCloseModal
    }}>
      {children}
    </EjercicioContext.Provider>
  )
}