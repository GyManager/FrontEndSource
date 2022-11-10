import axios from "axios";
import authService from "./auth.service";

const API_URL = process.env.REACT_APP_API_URL;

/*
const getSeguimientoEjercicioByIdRutina = (idPlan, idMicroPlan, idRutina, seguimientosFilter) => {
    let params = {};
    if (seguimientosFilter !== undefined) {
        params["seguimientosFilter"] = seguimientosFilter;
    }

    return axios
        .get(
            `${API_URL}/planes/${idPlan}/micro-planes/${idMicroPlan}/rutinas/${idRutina}/seguimientos-ejercicios`,
            {
                headers: {
                    Authorization: `Bearer ${authService.getStoredSession().access_token}`,
                },
                params,
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return handleError(error);
        });
};

const postSeguimientoEjercicio = (seguimientoEjercicio, idPlan, idEjercicioAplicado) => {
    let params = {
        idEjercicioAplicado: idEjercicioAplicado,
    };
    return axios
        .post(API_URL + API_PATH_PLANES + `/${idPlan}` + API_PATH, seguimientoEjercicio, {
            headers: {
                Authorization: `Bearer ${authService.getStoredSession().access_token}`,
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

const getSeguimientoRutinaByIdMicroPlan = (idPlan, idMicroPlan, seguimientosFilter) => {
    let params = {};
    if (seguimientosFilter !== undefined) {
        params["seguimientosFilter"] = seguimientosFilter;
    }

    return axios
        .get(`${API_URL}/planes/${idPlan}/micro-planes/${idMicroPlan}/seguimientos`, {
            headers: {
                Authorization: `Bearer ${authService.getStoredSession().access_token}`,
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

*/
// api/cliente/263/seguimientos-ejercicios/
const getSeguimientosUsuario = async (idCliente) => {
    const URL = API_URL + "/cliente/" + idCliente + "/seguimientos-ejercicios/";

    return axios
        .get(URL, {
            headers: {
                Authorization: `Bearer ${authService.getStoredSession().access_token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error);
        });
};

const getHistoricoEjercicio = async (idCliente, idEjercicio) => {
    // api/cliente/263/seguimientos-ejercicios/32
    const URL = API_URL + "/cliente/" + idCliente + "/seguimientos-ejercicios/" + idEjercicio
    return axios
    .get(URL, {
        headers: {
            Authorization: `Bearer ${authService.getStoredSession().access_token}`,
        },
    })
    .then((response) => {
        // console.log('response', response.data)
        return response.data;
    })
    .catch((error) => {
        handleError(error)
    });
}

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

const seguimientoAvancesService = {
    getHistoricoEjercicio,
    getSeguimientosUsuario,
   
};

export default seguimientoAvancesService;
