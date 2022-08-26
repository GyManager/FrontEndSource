import { ConnectingAirportsOutlined } from '@mui/icons-material'
import axios from 'axios'
import authService from './auth.service'

const API_URL = "https://gymanager-dev-api.herokuapp.com/api"

let access_token = ''

try {
    const datosDeSesion = authService.getStoredSession()
    access_token = datosDeSesion.access_token
}
catch (error) {
    access_token = ''
}

const filtrarAtributo = (unAtributo, unArray) => {
    return unArray.map((obj) => {
        return (obj[unAtributo])
    })
}


const fetchData = (url, params) => {
    return axios
        .get(API_URL + url, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
            params
        }).then((res) => {
            const resData = res.data
            return resData
        }).catch((error) => { return handleError(error) })
}


const handleError = (error) => {
    if (error.response) {
        console.log("Error in response, message: ", error.response.data);
        console.log("Status code: ", error.response.status);
        console.log("Headers: ", error.response.headers);
        if (error.response.status === 403) {
            authService.refreshToken()
        }
    } else if (error.request) {
        console.log("Error in request:", error.request);
    } else {
        console.log("Unknown error: ", error.message);
    }
    return error;
}

const getEjercicios = (search, pageSize, page) => {
    let params = {}

    if (search !== undefined) {
        params['search'] = search;
    }
    if (pageSize !== undefined) {
        params['pageSize'] = pageSize;
    }
    if (page !== undefined) {
        params['page'] = page;
    }
    return fetchData('/ejercicios', params)
}

const getEjercicioById = (id) => {
    const url = '/ejercicios/' + id
    return fetchData(url)
}

const getAllTipoEjercicios = () => {
    const url = '/tipo-ejercicios'
    const res = fetchData(url)
    return res
}

const getPasosByEjercicioId = (id) => {
    const url = '/ejercicios/' + id + '/pasos'
    return fetchData(url)
}

const getEquipamentoByEjercicio = (id) => {
    const url = '/ejercicios/' + id + '/herramientas'
    const res = fetchData(url).then((res)=>{return res.map((unEquip) => {return unEquip.nombre})})
    return res
}

const getAllEquipamentos = (id) => {
    const url = '/herramientas/'
    const res = fetchData(url).then((res)=>{return res.map((unEquip) => {return unEquip.nombre})})
    // const res = fetchData(url).then((res)=>{return filtrarAtributo('nombre', res)})
    return res
}

const ejerciciosService = {
    getEjercicioById,
    getEjercicios,
    getAllTipoEjercicios,
    getPasosByEjercicioId,
    getEquipamentoByEjercicio,
    getAllEquipamentos
}

export default ejerciciosService

