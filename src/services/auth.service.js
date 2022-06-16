import axios from 'axios';
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

const authService = {
    login
};

export default authService;