import axios from "axios";
import authService from "./auth.service";

const API_URL = process.env.REACT_APP_API_URL;
const access_token = authService.getStoredSession()
    ? authService.getStoredSession().access_token
    : "";

const getClients = (
    fuzzySearch,
    pageSize,
    page,
    matriculaVenceEn,
    matriculaVenceEnOverdue,
    sinFinalizarRutinaEn
) => {
    let params = {};
    if (fuzzySearch !== undefined) {
        params["fuzzySearch"] = fuzzySearch;
    }
    if (pageSize !== undefined) {
        params["pageSize"] = pageSize;
    }
    if (page !== undefined) {
        params["page"] = page;
    }
    if (matriculaVenceEn !== undefined) {
        params["matriculaVenceEn"] = matriculaVenceEn;
    }
    if (matriculaVenceEnOverdue !== undefined) {
        params["matriculaVenceEnOverdue"] = matriculaVenceEnOverdue;
    }
    if (sinFinalizarRutinaEn !== undefined) {
        params["sinFinalizarRutinaEn"] = sinFinalizarRutinaEn;
    }
    return axios
        .get(API_URL + "/clientes", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            params,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return handleError(error);
        });
};

const handleError = (error) => {
    if (error.response) {
        console.log("Error in response, message: ", error.response.data);
        console.log("Status code: ", error.response.status);
        console.log("Headers: ", error.response.headers);
        if (error.response.status === 403) {
            authService.refreshToken();
        }
    } else if (error.request) {
        console.log("Error in request:", error.request);
    } else {
        console.log("Unknown error: ", error.message);
    }
    return error;
};

const clientsServiceV2 = {
    getClients,
};

export default clientsServiceV2;
