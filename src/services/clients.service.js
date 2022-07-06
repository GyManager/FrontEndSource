import axios from 'axios';

//TODO IMPLEMENTAR DOTENV PARA API_URL
const API_URL = "https://gymanager-dev-api.herokuapp.com/api"


const getClients = () => {
    // var bodyFormData  = new FormData();
    // return axios.get(API_URL + '/clientes?fuzzySearch=', bodyFormData)
    return axios.get(API_URL + '/clientes?fuzzySearch=')
    .then((response) => {
        console.log(response)
    })
}

const clientsService = {
    getClients
}

export default clientsService