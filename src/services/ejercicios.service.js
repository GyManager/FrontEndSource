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

const headers = {
    headers: {
        'Authorization': `Bearer ${access_token}`,
    }
}

const fetchData = (url, params) => {
    return axios
        .get(API_URL + url, {
            ...headers,
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
    const res = fetchData(url).then((res) => { return res.map((unEquip) => { return unEquip.nombre }) })
    return res
}

const getAllEquipamentos = (id) => {
    const url = '/herramientas/'
    const res = fetchData(url)
    return res
}

const postEjercicio = (ejercicio) => {
    return axios.post(API_URL + '/ejercicios', ejercicio,
        {...headers})
        .then(
            (res) => { return res.data }
        ).catch(err => {
            console.log('Hubo un error en el POST service: ', err)
            return handleError(err)
        })
}

const deleteEjercicio = (idEjercicio) => {
    return axios.delete(API_URL + '/ejercicios/' + idEjercicio ,
        {...headers})
        .then(
            (res) => { return res.data }
        ).catch(err => {
            console.log('Hubo un error en el DELETE service: ', err)
            return handleError(err)
        })
}

const putEjercicio = (ejercicio, idEjercicio) => {
    return axios.put(API_URL + '/ejercicios/' + idEjercicio, ejercicio,
        {...headers})
        .then(
            (res) => { return res.data }
        ).catch(err => {
            console.log('Hubo un error en el PUT service: ', err)
            return handleError(err)
        })
}

const ejerciciosService = {
    getEjercicioById,
    getEjercicios,
    getAllTipoEjercicios,
    getPasosByEjercicioId,
    getEquipamentoByEjercicio,
    getAllEquipamentos,
    postEjercicio,
    deleteEjercicio,
    putEjercicio
}

export default ejerciciosService