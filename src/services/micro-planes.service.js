import axios from 'axios';
import authService from './auth.service';

// const API_URL = "https://gymanager-dev-api.herokuapp.com/api";
const API_URL = "http://localhost:8081/api";
const API_PATH = "/micro-planes";

const getMicroPlanes = (search, pageSize, page) => {
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
    getMicroPlanById
}

export default microPlanesService