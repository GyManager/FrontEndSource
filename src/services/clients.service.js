import axios from 'axios';

//TODO IMPLEMENTAR DOTENV PARA API_URL
// const API_URL = "https://gymanager-dev-api.herokuapp.com/api"
const API_URL = "https://rickandmortyapi.com/api/character"



const getClients = () => {
    var bodyFormData = new FormData();
    // return axios.get(API_URL + '/clientes?fuzzySearch=1', bodyFormData)
    return axios
        .get(API_URL, bodyFormData)
        // return axios.get(API_URL + '/clientes?fuzzySearch=')
        .then((response) => {
            console.log('recibi la respuesta')
            return response.data.results;
        }
        )
    }


const clientsService = {
    getClients
}

export default clientsService