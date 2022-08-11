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

const getEjercicios = (search, pageSize, page) => {
    let params = {}
    search !== undefined && (params['search'] = search)
    pageSize !== undefined && (params['search'] = pageSize)
    page !== undefined && (params['page'] = page)
    return axios.get(API_URL + '/ejercicios', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
        params
    }).then((response) => {
        const res = response.data.content
        console.log(res)
        return res
    }).catch((error) => {return handleError(error)})
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



const ejerciciosService = {
    getEjercicios
}

export default ejerciciosService

