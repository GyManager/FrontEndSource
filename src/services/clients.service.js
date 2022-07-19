import axios from 'axios';
import authService from './auth.service';

//TODO IMPLEMENTAR DOTENV PARA API_URL
const API_URL = "https://gymanager-dev-api.herokuapp.com/api"
// const API_URL = "https://rickandmortyapi.com/api/character"
let access_token = ''

try {
    const datosDeSesion = authService.getStoredSession()
    access_token = datosDeSesion.access_token
}
catch (error) {
    access_token = ''
}

const getClients = (search) => {
    if (search === undefined) {
        search = ''
    }
    return axios.get(API_URL + '/clientes?pageSize=100&fuzzySearch=' + search, {
        // return axios.get(API_URL + '/clientes?fuzzySearch=nico&pageSize=20', {
        // return axios.get(API_URL + '/clientes?pageSize=20&?fuzzySearch=' + search , {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    }
    )
        .then((response) => {
            console.log(response)
            const usuariosPlano = response.data.content.map((usuMap) => (
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
            const elementosTotales = response.data.totalElements
            console.log(usuariosPlano)
            console.log(elementosTotales)
            return [usuariosPlano, elementosTotales]
        }
        )
}


/*
const getClientsPerPage = (rowsPerPage, page) => {
    return axios.get(API_URL + '/clientes?pageSize=' + rowsPerPage + '&page=' + page, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    }
    )
        .then((response) => {
            const usuariosPlano = response.data.content.map((usuMap) => (
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
            return usuariosPlano;
        }
        )
}
*/



const postClient = (cliente) => {
    const client = {
        "usuario": {
            "numeroDocumento": 390723673,
            "tipoDocumento": "Pasaporte",
            "nombre": "Federico",
            "apellido": "Garip",
            "sexo": "Masculino",
            "mail": "garip.federico@gmail.com",
            "celular": 3513851126,
            "fechaAlta": "2022-07-18",
            "fechaBaja": null
        },
        "objetivo": "Ganar masa muscular",
        "direccion": "Av Colon 4933",
        "fechaNacimiento": "1995-05-29T00:00:00.000+00:00",
        "observaciones": "Algo gil"
    }


    axios.post(API_URL + '/clientes', {
        ...cliente
    }, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }

    }).then((response) => {
        console.log('Recibida correctamente')
        console.log(response.data)
        return response.data
    }).catch((error) => {
        console.log('Hubo un error en la peticion post')
        console.log(error)
    })
}








// busca un cliente por id
const getClientById = (id) => {
    console.log('id')
    console.log(id)
    return axios
        .get(API_URL + '/clientes/' + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }
        )
        .then((response) => {
            // console.log('AcaEstariala response:')
            // console.log(response)
            // console.log('AcaEstarialaRespuesta de getClient')
            // const ret = []
            // ret.push(response.data.content)
            // console.log(ret)

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
                "fechaBaja": usu.usuario.fechaBaja
            }

            // console.log('usuariosPlano')
            // console.log(usuariosPlano)
            return [usuariosPlano]

        }
        ) //Aca cierra el then
        .catch((error) => {
            console.log('Hubo un error')
            console.log(error)
            if (error.response.status === 404) {
                console.log(error.response.data.message)
                return [{ message: 'Cliente no encontrado', status: 404 }]
            }
            return [{ message: error.response.data.message }]
            // return [{}]
        }
        )

}


const putClient = (cliente) => {
    return axios.put('clientes')
}


const clientsService = {
    getClients,
    getClientById,
    putClient,
    postClient
}

export default clientsService