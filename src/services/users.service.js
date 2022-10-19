import axios from "axios";
import authService from "./auth.service";

//TODO IMPLEMENTAR DOTENV PARA API_URL

const API_URL = process.env.REACT_APP_API_URL;
const access_token = authService.getStoredSession() ?  authService.getStoredSession().access_token : '';

const getActiveUser = () => {
    return axios
        .get(API_URL + "/usuarios/info", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return handleError(error);
        });
};

const getUsers = (search, pageSize, page) => {
    let params = {};
    if (search !== undefined) {
        params["search"] = search;
    }
    if (pageSize !== undefined) {
        params["pageSize"] = pageSize;
    }
    if (page !== undefined) {
        params["page"] = page;
    }
    return axios
        .get(API_URL + "/usuarios?sortBy=APELLIDO", {
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

const postUser = (usuario) => {
    return axios
        .post(
            API_URL + "/usuarios",
            { ...usuario },
            {
                headers: { Authorization: `Bearer ${access_token}` },
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return handleError(error);
        });
};

const putUser = (usuario, idUsuario) => {
    return axios
        .put(
            API_URL + "/usuarios/" + idUsuario,
            { ...usuario },
            {
                headers: { Authorization: `Bearer ${access_token}` },
            }
        )
        .then((response) => {
            console.log("Recibida correctamente");
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.log("Hubo un error en la peticion put");
            console.log(error);
            return handleError(error);
        });
};

const putUserPassword = (passwords, idUsuario) => {
    return axios.put(`${API_URL}/usuarios/${idUsuario}/password`, passwords,
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


const putUserPasswordReset = ( idUsuario) => {
    return axios.put(`${API_URL}/usuarios/${idUsuario}/password-reset`, {},
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

const deleteUserById = (idUsuario) => {
    return axios
        .delete(API_URL + "/usuarios/" + idUsuario, {
            headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((response) => {
            console.log("Recibida correctamente");
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.log("Hubo un error en la peticion delete");
            return handleError(error);
        });
};

// busca un usuario por id
const getUserById = (id) => {
    return axios
        .get(API_URL + "/usuarios/" + id, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("Hubo un error");
            console.log(error);
            if (error.response.status === 404) {
                console.log(error.response.data.message);
                return [{ message: "Usuario no encontrado", status: 404 }];
            }
            return [{ message: error.response.data.message }];
        });
};

const getAllRoles = () => {
    return axios
        .get(API_URL + "/roles", {
            headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getUserInfo = () => {
    return axios.get(API_URL + '/usuarios/info', {
        headers: { 
            'Authorization': `Bearer ${access_token}` 
        }
    }).then((response) => {
        return response.data
    }).catch((err) => {
         handleError(err)
    })
}

const handleError = (error) => {
    if (error.response) {
        console.log("Error in response, message: ", error.response.data);
        console.log("Status code: ", error.response.status);
        console.log("Headers: ", error.response.headers);
        // if (error.response.status === 403) {
        if (error.response.status === 401) {
            authService.refreshToken();
        }
        if (error.response.status === 403) {
            console.log("error 403 el Usuario esta asociado a un usuario");
        }
    } else if (error.request) {
        console.log("Error in request:", error.request);
    } else {
        console.log("Unknown error: ", error.message);
    }
    return error;
};

const clientsService = {
    getActiveUser,
    getUsers,
    getUserById,
    putUser,
    deleteUserById,
    postUser,
    getAllRoles,
    getUserInfo,
    putUserPassword,
    putUserPasswordReset
};


export default clientsService;
