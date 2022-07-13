import axios from 'axios';
import authService from './auth.service';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//TODO IMPLEMENTAR DOTENV PARA API_URL
const API_URL = "https://gymanager-dev-api.herokuapp.com/api"
// const API_URL = "https://rickandmortyapi.com/api/character"

const datosDeSesion = authService.getStoredSession()
const access_token = datosDeSesion.access_token


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