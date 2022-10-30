import axios from "axios";
import authService from "./auth.service";

const API_URL = process.env.REACT_APP_API_URL;
const API_PATH = "/clientes";

const getFechasMediciones = (idCliente) => {
    return axios
        .get(API_URL + API_PATH + "/" + idCliente + "/medidas", {
            headers: {
                Authorization: `Bearer ${authService.getStoredSession().access_token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return handleError(error);
        });
};
//TODO refactorizar idFecha a IdMedida
const getMedidasPorIdClientePorIdFecha = (idCliente, idFecha) => {
    return axios
        .get(API_URL + API_PATH + "/" + idCliente + "/medidas/" + idFecha, {
            headers: {
                Authorization: `Bearer ${authService.getStoredSession().access_token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return handleError(error);
        });
};

const deleteMedidasPorIdClientePorIdMedida = (idCliente, idMedida) => {
    return axios
        .delete(API_URL + API_PATH + "/" + idCliente + "/medidas/" + idMedida, 
        {
            headers: {
                Authorization: `Bearer ${authService.getStoredSession().access_token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return handleError(error);
        });
};

const postMedidasPorIdCliente = (idCliente, medidas) => {
    return axios.post(
        API_URL + API_PATH + "/" + idCliente + "/medidas",{...medidas},
        {
            headers: {
                Authorization: `Bearer ${authService.getStoredSession().access_token}`,
            },
        }
    )
    .then((response) => {
        return response.data;
    })
    .catch((error)=> {
        return handleError(error);
    })
};


const putMedidasPorIdClientePorIdMedidas = (idCliente, medidas, idMedidas) => {
    return axios.put(
        API_URL + API_PATH + "/" + idCliente + "/medidas/" + idMedidas,{...medidas},
        {
            headers: {
                Authorization: `Bearer ${authService.getStoredSession().access_token}`,
            },
        }
    )
    .then((response) => {
        return response.data;
    })
    .catch((error)=> {
        return handleError(error);
    })
};

const handleError = (error) => {
    if (error.response) {
        console.log("Error in response, message: ", error.response.data);
        console.log("Status code: ", error.response.status);
        console.log("Headers: ", error.response.headers);
        if (error.response.status === 403) {
            authService.logout();
        }
    } else if (error.request) {
        console.log("Error in request:", error.request);
    } else {
        console.log("Unknown error: ", error.message);
    }
    return error;
};

const medidasService = {
    getFechasMediciones,
    getMedidasPorIdClientePorIdFecha,
    deleteMedidasPorIdClientePorIdMedida,
    postMedidasPorIdCliente,
    putMedidasPorIdClientePorIdMedidas,
};

export default medidasService;
