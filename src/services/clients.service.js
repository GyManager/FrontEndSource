import axios from 'axios';

//TODO IMPLEMENTAR DOTENV PARA API_URL
// const API_URL = "https://gymanager-dev-api.herokuapp.com/api"
const API_URL = "https://rickandmortyapi.com/api/character"



const getClients = () => {
    // var bodyFormData = new FormData();
    // return axios.get(API_URL + '/clientes?fuzzySearch=1', bodyFormData)
    return axios
        .get(API_URL)
        // return axios.get(API_URL + '/clientes?fuzzySearch=')
        .then((response) => {
            console.log('recibi la respuesta')
            return response.data.results;
        }
        )
}

const getClient = (id) => {
    return axios
        // .get(API_URL + '/2')
        .get('https://rickandmortyapi.com/api/character/2')
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