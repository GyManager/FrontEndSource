import axios from 'axios';
import jwt from 'jwt-decode';

//TODO IMPLEMENTAR DOTENV PARA API_URL
const API_URL = "https://gymanager-dev-api.herokuapp.com/api"


const login = (email, password) => {
    var bodyFormData  = new FormData();
    bodyFormData.append('mail', email);
    bodyFormData.append('pass', password);
    return axios
        .post(API_URL + "/auth", bodyFormData)
        .then((response) => {
            console.log(response, response.data)
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            else{
                console.log("error en la peticion")
            }
            return response.data;
        });
};

const getStoredSession = () => {
    const storageToken = localStorage.getItem("user");
    const parsedToken = JSON.parse(storageToken);
    
    if(!parsedToken?.hasOwnProperty('access_token')){
        return null
    }

    let tokenExpirationDateInMillis = jwt(parsedToken.access_token).exp * 1000;
    if(tokenExpirationDateInMillis < Date.now()){
        logout()
    } 

    return parsedToken;
}

const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
}

const authService = {
    login,
    getStoredSession,
    logout
};

export default authService;