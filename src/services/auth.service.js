import axios from 'axios';
//TODO IMPLEMENTAR DOTENV PARA API_URL
const API_URL = "https://gymanager-dev-api.herokuapp.com/api";

const login = (email, password) => {
    return axios
        .post(API_URL + "/auth", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};


const authService = {
    login
};

export default authService;