import axios from 'axios';
import authService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL;
const API_PATH = "/micro-planes";
const API_PATH_PLANES = "/planes";

const getMicroPlanes = (search, pageSize, page, esTemplate, cantidadRutinas) => {
    let params = {}
    if(search !== undefined){
        params['search'] = search;
    }
    if(pageSize !== undefined){
        params['pageSize'] = pageSize;
    }
    if(page !== undefined){
        params['page'] = page;
    }
    if(esTemplate !== undefined){
        params['esTemplate'] = esTemplate;
    }
    if(cantidadRutinas !== undefined){
        params['cantidadRutinas'] = cantidadRutinas;
    }

    return axios.get(API_URL + API_PATH, {
        headers: {
            'Authorization': `Bearer ${authService.getStoredSession().access_token}`,
        },
        params
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return handleError(error);
    })
}

const getMicroPlanById = (idMicroPlan) => {
    return axios.get(API_URL + API_PATH + `/${idMicroPlan}`, {
        headers: {
            'Authorization': `Bearer ${authService.getStoredSession().access_token}`,
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return handleError(error);
    })
}

const getMicroPlanByPlanId = (idPlan) => {
    return axios.get(API_URL + API_PATH_PLANES + `/${idPlan}` + API_PATH, {
        headers: {
            'Authorization': `Bearer ${authService.getStoredSession().access_token}`,
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return handleError(error);
    })
}

const postMicroPlan = (microPlan) => {
    return axios.post(API_URL + API_PATH, microPlan, {
        headers: {
            'Authorization': `Bearer ${authService.getStoredSession().access_token}`,
        }
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return handleError(error)
    })
}

const putMicroPlan = (microPlan, idMicroPlan) => {
    return axios.put(API_URL + API_PATH + `/${idMicroPlan}`, microPlan, {
        headers: {
            'Authorization': `Bearer ${authService.getStoredSession().access_token}`,
        }
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return handleError(error)
    })
}

const deleteMicroPlanById = (idMicroPlan) => {
    return axios.delete(API_URL + API_PATH + `/${idMicroPlan}`, {
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
            authService.logout()
        }
    } else if (error.request) {
        console.log("Error in request:", error.request);
    } else {
        console.log("Unknown error: ", error.message);
    }
    return error;
}

const microPlanesService = {
    getMicroPlanes,
    getMicroPlanById,
    getMicroPlanByPlanId,
    postMicroPlan,
    putMicroPlan,
    deleteMicroPlanById
}

export default microPlanesService