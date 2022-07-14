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




const getClients = () => {
    console.log('aca va el accesstoken:')
    console.log(access_token)
    return axios.get(API_URL + '/clientes?fuzzySearch=', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    }
    )
        .then((response) => {
            console.log('recibi la respuesta')
            const ret = response.data.content
            console.log(ret)
            return ret;
        }
        )
}

const getClient = (id) => {
    return axios
        .get(API_URL + '/clientes/' + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }
            )
        .then((response) => {
            console.log('AcaEstarialaRespuesta')
            const ret = []
            ret.push(response.data)
            console.log(ret)
            return ret
        })
        .catch(error => {
            if(error.response.status === 404){
            console.log(error.response.data.message)
            return [{message: 'Cliente no encontrado', status: 404 } ]
        }
        return [{message: error.response.data.message}]
            // return [{}]
        })
}

const clientsService = {
    getClients,
    getClient
}

export default clientsService