import axios from 'axios';
import authService from './auth.service';

//TODO IMPLEMENTAR DOTENV PARA API_URL
const API_URL = "https://gymanager-dev-api.herokuapp.com/api"
// const API_URL = "https://rickandmortyapi.com/api/character"

const session = authService.getStoredSession()
const access_token =  session.access_token
const config = {
    headers: { Authorization: `Bearer ${access_token}` }
};


const getClients = () => {
    console.log('aca va el accesstoken:')
    console.log(access_token)
    // Consulta R&M
    // return axios.get(API_URL)
    //  Consulta GyManager
    // var bodyFormData = new FormData();

    return axios.get(API_URL + '/clientes?fuzzySearch=',
    config)
        // Consulta Gymanager 2
        // return axios.get(API_URL + '/clientes?fuzzySearch=', bodyFormData)
        .then((response) => {
            console.log('recibi la respuesta')
            return response.data.results;
        }
        )
}

const getClient = (id) => {
    return axios
        // .get(API_URL + '/2')
        .get(' ')
        .then((response) => {
            console.log(id)
            console.log('AcaEstarialaRespuesta')
            console.log(response)
            // return response.data.results
        })
}

const clientsService = {
    getClients,
    getClient
}

export default clientsService