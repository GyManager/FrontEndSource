import axios from 'axios';
import authService from './auth.service';

//TODO IMPLEMENTAR DOTENV PARA API_URL
const API_URL = process.env.REACT_APP_API_URL;

let access_token = ''

try {
    const datosDeSesion = authService.getStoredSession()
    access_token = datosDeSesion.access_token
}
catch (error) {
    access_token = ''
}

const aplanadora = (response) => {
    return response.data.content.map((usuMap) => (
        {
            "idCliente": usuMap.idCliente,
            "idUsuario": usuMap.usuario.idUsuario,
            "numeroDocumento": usuMap.usuario.numeroDocumento,
            "tipoDocumento": usuMap.usuario.tipoDocumento,
            "apellido": usuMap.usuario.apellido,
            "nombre": usuMap.usuario.nombre,
            "sexo": usuMap.usuario.sexo,
            "mail": usuMap.usuario.mail,
            "celular": usuMap.usuario.celular,
            "fechaAlta": usuMap.usuario.fechaAlta,
            "fechaBaja": usuMap.usuario.fechaBaja,
            "objetivo": usuMap.objetivo,
            "direccion": usuMap.direccion,
            "fechaNacimiento": usuMap.fechaNacimiento,
            "observaciones": usuMap.observaciones,
            "clienteEstado": usuMap.clienteEstado
        }))
}

const getClients = (fuzzySearch, pageSize, page) => {
    let params = {}
    if(fuzzySearch !== undefined){
        params['fuzzySearch'] = fuzzySearch;
    }
    if(pageSize !== undefined){
        params['pageSize'] = pageSize;
    }
    if(page !== undefined){
        params['page'] = page;
    }
    return axios.get(API_URL + '/clientes', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
        params
    }).then((response) => {
        response.data.content = aplanadora(response)

        /*
        response.data.content = response.data.content.map((usuMap) => (
            {
                "idCliente": usuMap.idCliente,
                "idUsuario": usuMap.usuario.idUsuario,
                "numeroDocumento": usuMap.usuario.numeroDocumento,
                "tipoDocumento": usuMap.usuario.tipoDocumento,
                "apellido": usuMap.usuario.apellido,
                "nombre": usuMap.usuario.nombre,
                "sexo": usuMap.usuario.sexo,
                "mail": usuMap.usuario.mail,
                "celular": usuMap.usuario.celular,
                "fechaAlta": usuMap.usuario.fechaAlta,
                "fechaBaja": usuMap.usuario.fechaBaja,
                "objetivo": usuMap.objetivo,
                "direccion": usuMap.direccion,
                "fechaNacimiento": usuMap.fechaNacimiento,
                "observaciones": usuMap.observaciones
            }))
            */

        return response.data;
    }).catch((error) => {
        return handleError(error);
    })
}

const getClientsConSeguimientos = (fuzzySearch, pageSize, page, cantidadDias, idEstadoSeguimientoList) => {
    let params = {}
    if(fuzzySearch !== undefined){
        params['fuzzySearch'] = fuzzySearch;
    }
    if(pageSize !== undefined){
        params['pageSize'] = pageSize;
    }
    if(page !== undefined){
        params['page'] = page;
    }
    if(cantidadDias !== undefined){
        params['cantidadDias'] = cantidadDias;
    }
    if(idEstadoSeguimientoList !== undefined){
        params['idEstadoSeguimientoList'] = idEstadoSeguimientoList;
    }
    return axios.get(API_URL + '/clientes/ultimos-seguimientos', {
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


const postClient = (cliente) => {
    return axios.post(API_URL + '/clientes', {...cliente}, 
        {
            headers: {'Authorization': `Bearer ${access_token}`}
        }
    ).then((response) => {
        
        return response.data
    }).catch((error) => {
        return handleError(error)
    })
}


const putClient = (cliente, idCliente, reactivate) => {
    let params = {}
    if(reactivate !== undefined){
        params['reactivate'] = reactivate;
    }
    return axios.put(API_URL + '/clientes/' + idCliente, {...cliente}, 
        {
            headers: {'Authorization': `Bearer ${access_token}`},
            params
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
            headers: {'Authorization': `Bearer ${access_token}`}
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
const getClientById = (id) => {
    return axios
        .get(API_URL + '/clientes/' + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }
        )
        .then((response) => {
            const usu = response.data
            const usuariosPlano = {
                "direccion": usu.direccion,
                "fechaNacimiento": usu.fechaNacimiento,
                "idCliente": usu.idCliente,
                "objetivo": usu.objetivo,
                "observaciones": usu.observaciones,
                "idUsuario": usu.usuario.idUsuario,
                "numeroDocumento": usu.usuario.numeroDocumento,
                "tipoDocumento": usu.usuario.tipoDocumento,
                "apellido": usu.usuario.apellido,
                "nombre": usu.usuario.nombre,
                "sexo": usu.usuario.sexo,
                "mail": usu.usuario.mail,
                "celular": usu.usuario.celular,
                "fechaAlta": usu.usuario.fechaAlta,
                "fechaBaja": usu.usuario.fechaBaja,
                "clienteEstado": usu.clienteEstado
            }
            return usuariosPlano
        }
        )
        .catch((error) => {
            console.log('Hubo un error')
            console.log(error)
            if (error.response.status === 404) {
                console.log(error.response.data.message)
                return [{ message: 'Cliente no encontrado', status: 404 }]
            }
            return [{ message: error.response.data.message }]
        }
        )
}

const handleError = (error) => {
    if(error.response) {
        console.log("Error in response, message: ", error.response.data);
        console.log("Status code: ", error.response.status);
        console.log("Headers: ", error.response.headers);
        if(error.response.status === 403 ){
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
    getClients,
    getClientById,
    putClient,
    deleteClientById,
    postClient,
    getClientsConSeguimientos
}

export default clientsService