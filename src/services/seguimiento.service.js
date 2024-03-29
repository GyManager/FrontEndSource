import axios from "axios";
import authService from "./auth.service";

const API_URL = process.env.REACT_APP_API_URL;
const API_PATH_PLANES = "/planes";
const API_PATH = "/seguimiento";

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

const getSeguimientoRutinaByIdCliente = (idCliente, cantidadDias, idEstadoSeguimientoList) => {
    let params = {};
    if (cantidadDias !== undefined) {
        params["cantidadDias"] = cantidadDias;
    }
    if (idEstadoSeguimientoList !== undefined) {
        params["idEstadoSeguimientoList"] = idEstadoSeguimientoList;
    }
    return axios
        .get(`${API_URL}/clientes/${idCliente}/seguimientos-rutinas`, {
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

const postSeguimientoRutina = (seguimientoRutina, idPlan, idMicroPlan, idRutina) => {
    return axios
        .post(
            API_URL +
                API_PATH_PLANES +
                `/${idPlan}/micro-planes/${idMicroPlan}/rutinas/${idRutina}/seguimientos`,
            seguimientoRutina,
            {
                headers: {
                    Authorization: `Bearer ${authService.getStoredSession().access_token}`,
                },
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return handleError(error);
        });
};

const putSeguimientoPlan = (seguimientoRutina, idPlan) => {
    return axios
        .put(API_URL + API_PATH_PLANES + `/${idPlan}/seguimientos`, seguimientoRutina, {
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

const seguimientoService = {
    postSeguimientoEjercicio,
    getSeguimientoEjercicioByIdRutina,
    postSeguimientoRutina,
    getSeguimientoRutinaByIdMicroPlan,
    putSeguimientoPlan,
    getSeguimientoRutinaByIdCliente,
};

export default seguimientoService;
