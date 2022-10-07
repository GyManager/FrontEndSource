import axios from "axios";
import authService from "./auth.service";

//const API_URL = process.env.REACT_APP_API_URL;
const API_URL = "http://localhost:8081/api";
const API_PATH_PLANES = "/planes";
const API_PATH = "/seguimiento";
const access_token = authService.getStoredSession()
    ? authService.getStoredSession().access_token
    : "";

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
};

export default seguimientoService;
