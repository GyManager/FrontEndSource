import axios from 'axios';
import authService from './auth.service';

//TODO IMPLEMENTAR DOTENV PARA API_URL
const API_URL = "https://gymanager-dev-api.herokuapp.com/api"

let access_token = ''

try {
    const datosDeSesion = authService.getStoredSession()
    access_token = datosDeSesion.access_token
}
catch (error) {
    access_token = ''
}

const getUsers = (search, pageSize, page) => {
    let params = {}
    if (search !== undefined) {
        params['search'] = search;
    }
    if (pageSize !== undefined) {
        params['pageSize'] = pageSize;
    }
    if (page !== undefined) {
        params['page'] = page;
    }
    return axios.get(API_URL + '/usuarios?sortBy=APELLIDO', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
        params
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return handleError(error);
    })
}


const postUser = (usuario) => {
    return axios.post(API_URL + '/usuarios', { ...usuario },
        {
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
    ).then((response) => {

        return response.data
    }).catch((error) => {
        return handleError(error)
    })
}


const putUser = (usuario, idUsuario) => {
    return axios.put(API_URL + '/usuarios/' + idUsuario, { ...usuario },
        {
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
    ).then((response) => {
        console.log('Recibida correctamente')
        console.log(response.data)
        return response.data
    }).catch((error) => {
        console.log('Hubo un error en la peticion put')
        console.log(error)
        return handleError(error)
    })
}

const deleteClientById = (idCliente) => {
    return axios.delete(API_URL + '/clientes/' + idCliente,
        {
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
    ).then((response) => {
        console.log('Recibida correctamente')
        console.log(response.data)
        return response.data
    }).catch((error) => {
        console.log('Hubo un error en la peticion delete')
        return handleError(error)
    })
}


// busca un cliente por id
const getUserById = (id) => {
    return axios
        .get(API_URL + '/usuarios/' + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }
        )
        .then((response) => {
            // const usu = response.data
            // const usuariosPlano = {
            //     "direccion": usu.direccion,
            //     "fechaNacimiento": usu.fechaNacimiento,
            //     "idCliente": usu.idCliente,
            //     "objetivo": usu.objetivo,
            //     "observaciones": usu.observaciones,
            //     "idUsuario": usu.usuario.idUsuario,
            //     "numeroDocumento": usu.usuario.numeroDocumento,
            //     "tipoDocumento": usu.usuario.tipoDocumento,
            //     "apellido": usu.usuario.apellido,
            //     "nombre": usu.usuario.nombre,
            //     "sexo": usu.usuario.sexo,
            //     "mail": usu.usuario.mail,
            //     "celular": usu.usuario.celular,
            //     "fechaAlta": usu.usuario.fechaAlta,
            //     "fechaBaja": usu.usuario.fechaBaja
            // }
            return response.data
        }
        )
        .catch((error) => {
            console.log('Hubo un error')
            console.log(error)
            if (error.response.status === 404) {
                console.log(error.response.data.message)
                return [{ message: 'Usuario no encontrado', status: 404 }]
            }
            return [{ message: error.response.data.message }]
        }
        )
}

const getAllRoles = () => {
    return axios.get(API_URL + '/roles', {
        headers: { 'Authorization': `Bearer ${access_token}` }
    }).then((res) => {
        return res.data
    }).catch((err) => { console.log(err) })
}

const handleError = (error) => {
    if (error.response) {
        console.log("Error in response, message: ", error.response.data);
        console.log("Status code: ", error.response.status);
        console.log("Headers: ", error.response.headers);
        if (error.response.status === 403) {
            authService.refreshToken()
        }
    } else if (error.request) {
        console.log("Error in request:", error.request);
    } else {
        console.log("Unknown error: ", error.message);
    }
    return error;
}

const clientsService = {
    getUsers,
    getUserById,
    putUser,
    deleteClientById,
    postUser,
    getAllRoles
}

export default clientsService