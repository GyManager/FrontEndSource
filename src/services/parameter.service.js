import axios from 'axios';
import authService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL;
const access_token = authService.getStoredSession()?  authService.getStoredSession().access_token : '';


const getEstadosSeguimiento = () => {
    return getParameters('/estados-seguimiento');
}

const getTipoDocumentos = () => {
    return getParameters('/tipo-documentos');
}

const getSexos = () => {
    return getParameters('/sexos');
}

const getObjetivos = () => {
    return getParameters('/objetivos');
}

const getBloques = () => {
    return getParameters('/bloques');
}

const getTipoEjercicios = () => {
    return getParameters('/tipo-ejercicios');
}

const getParameters = (urlPath) => {
    const options =  {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    }

    return axios.get(API_URL + urlPath, options).then((response) => {
        return response.data
    }).catch((error) => {
        return handleError(error);
    })
}

const getEjercicios = () => {
    const urlPath = '/ejercicios'
    const options =  {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
        params: {
            pageSize: 1_000_000
        }
    }

    return axios.get(API_URL + urlPath, options).then((response) => {
        return response.data
    }).catch((error) => {
        return handleError(error);
    })
}


const handleError = (error) => {
    if(error.response) {
        console.log("Error in response, message: ", error.response.data);
        console.log("Status code: ", error.response.status);
        console.log("Headers: ", error.response.headers);

        if(error.response.status === 403 ){
            authService.refreshToken()
        }

    } else if (error.request) {
        console.log("Error in request:", error.request);

    } else {
        console.log("Unknown error: ", error.message);

    }

    return error;
}


const parametersService = {
    getTipoDocumentos,
    getSexos,
    getBloques,
    getObjetivos,
    getTipoEjercicios,
    getEjercicios,
    getEstadosSeguimiento
}


export default parametersService