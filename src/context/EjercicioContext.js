import axios, { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ejercicioService from "../services/ejercicios.service";
import { useFormik } from 'formik'
import orderBy from 'lodash/orderBy'
// import ejerciciosService from '../../services/ejercicios.service'
import ejerciciosService from '../services/ejercicios.service'
// import ejercicioSchema from '../../ejercicioSchema'
import ejercicioSchema from '../components/unEjercicioPage/ejercicioSchema'
import { Filter } from "@mui/icons-material";
import { Identity } from "@mui/base";

export const EjercicioContext = createContext();

export const EjercicioProvider = ({ children, paso, unIdEjercicio }) => {

  const navigate = useNavigate()
  let { idEjercicio } = useParams()
  const [editable, setEditable] = useState(false)
  const [allTipoEjercicios, setAllTipoEjercicios] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  // const [equipamentoDeEjercicio, setEquipamentoDeEjercicio] = useState([])
  const [equipamentosById, setEquipamentosById] = useState([])

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


  const handleSubmit = async () => {
    setEditable(false)

    console.log(formik.values.equipamentoDeEjercicioIds)
    const ejercicio = {
      "nombre": formik.values.nombre,
      "tipoEjercicio": formik.values.tipoDeEjercicio,
      "video": formik.values.linkVideo,
      "pasos": formik.values.pasos,
      "idHerramientaList": formik.values.equipamentoDeEjercicioIds
    }

    if (idEjercicio === 'new') {
      const res = await ejerciciosService.postEjercicio(ejercicio)
      if (res instanceof AxiosError) {
        console.log('Informar error por backdrop')
      } else {
        console.log('informar exito en snackbar')
      }
    } else {
      const res = await ejerciciosService.putEjercicio(ejercicio, idEjercicio)
      if (res instanceof AxiosError) {
        console.log('Informar error por backdrop')
      } else {
        console.log('informar exito en snackbar')
      }
    }
    navigate('/ejercicios')
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

  const handleDelete = async() => {
    console.log(idEjercicio)
    const res = await ejercicioService.deleteEjercicio(idEjercicio)
    if (res instanceof AxiosError) {
      console.log(res)
    } else {
      console.log('delete completado informar por snackbar')
    }
    navigate('/ejercicios')
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
    }}>
      {children}
    </EjercicioContext.Provider>
  )
}