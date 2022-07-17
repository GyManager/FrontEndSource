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

const getTotalElements = async (response) => {
    return response.data.totalElements
}

const makeClientsResponsePlain = (response) => {
    const ret = response.data.content.map((usuMap) => (
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
        }
    )
    )
    return ret
}


const getClients = (search) => {
    if (search === undefined) {
        search = ''
    }
    return axios.get(API_URL + '/clientes?fuzzySearch='+ search, {
    // return axios.get(API_URL + '/clientes?fuzzySearch=nico&pageSize=20', {
    // return axios.get(API_URL + '/clientes?pageSize=20&?fuzzySearch=' + search , {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    }
    )
        .then((response) => {
            const usuariosPlano = makeClientsResponsePlain(response)
            const elementosTotales = getTotalElements(response)
            console.log(usuariosPlano)
            console.log(elementosTotales)
            console.log(response.data.totalElements)
            return [usuariosPlano, response.data.totalElements]
        }
        )
}


const getClientsPerPage = (rowsPerPage, page) => {
    return axios.get(API_URL + '/clientes?pageSize=' + rowsPerPage + '&page=' + page, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    }
    )
        .then((response) => {
            const usuariosPlano = makeClientsResponsePlain(response)
            return usuariosPlano;
        }
        )
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
    putClient
}

export default clientsService