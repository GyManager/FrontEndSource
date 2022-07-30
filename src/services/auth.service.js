import axios from 'axios';
// import { useNavigate } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL;


const login = (email, password) => {
    var bodyFormData  = new FormData();
    bodyFormData.append('mail', email);
    bodyFormData.append('pass', password);
    return axios
        .post(API_URL + "/auth", bodyFormData)
        .then((response) => {
            if (response.data.access_token) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
            }
            else{
                console.log("error en la peticion")
            }
            return response.data;
        });
};

const getStoredSession = () => {
    const storageToken = sessionStorage.getItem("user");
    const parsedToken = JSON.parse(storageToken);
    return parsedToken ? parsedToken : null
}

const refreshToken = () => {
    console.log("Refreshing token (For now it just logs out)")
    logout()
}

const logout = () => {
    sessionStorage.removeItem("user");
    window.location.reload();
}

const authService = {
    login,
    getStoredSession,
    refreshToken,
    logout
};

export default authService;