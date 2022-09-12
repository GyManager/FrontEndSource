import axios from 'axios';
import authService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL;
const access_token = authService.getStoredSession()?  authService.getStoredSession().access_token : '';
const API_PATH_CLIENTE = "/clientes";
const API_PATH_MATRICULAS = "/matriculas";


const getMatriculasByIdCliente = (idCliente, filter) => {
    const options =  {
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
        params: {
            matriculasFilter: filter
        }
    }

    return axios.get(API_URL + API_PATH_CLIENTE + `/${idCliente}` + API_PATH_MATRICULAS, options)
    .then((response) => {
        return response.data
    }).catch((error) => {
        return handleError(error);
    })
}


const postMatricula = (matricula, idCliente) => {
    return axios.post(API_URL + API_PATH_CLIENTE + `/${idCliente}` + API_PATH_MATRICULAS, matricula, {
        headers: {
            'Authorization': `Bearer ${authService.getStoredSession().access_token}`,
        }
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return handleError(error)
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


const matriculasService = {
    getMatriculasByIdCliente,
    postMatricula
}


export default matriculasService