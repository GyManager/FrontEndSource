import axios from "axios";
import authService from "./auth.service";

const API_URL = process.env.REACT_APP_API_URL;
const access_token = authService.getStoredSession()
    ? authService.getStoredSession().access_token
    : "";

const getSummary = (
    dayCountVencimientoMatricula,
    dayOverdueVencimientoMatricula,
    dayCountSinFinalizarDia,
    dayCountSeguimientoFinDiaEstado,
    dayCountSeguimientoFinDiaFecha
) => {
    const options = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        params: {
            dayCountVencimientoMatricula: dayCountVencimientoMatricula? dayCountVencimientoMatricula : 7,
            dayOverdueVencimientoMatricula: dayOverdueVencimientoMatricula? dayOverdueVencimientoMatricula : 0,
            dayCountSinFinalizarDia: dayCountSinFinalizarDia? dayCountSinFinalizarDia : 7,
            dayCountSeguimientoFinDiaEstado: dayCountSeguimientoFinDiaEstado? dayCountSeguimientoFinDiaEstado : 7,
            dayCountSeguimientoFinDiaFecha: dayCountSeguimientoFinDiaFecha? dayCountSeguimientoFinDiaFecha : 30
        }
    };

    return axios
        .get(API_URL + "/dashboard", options)
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

const dashboardService = {
    getSummary,
};

export default dashboardService;
