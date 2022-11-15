import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function recover(mail) {
    return axios
        .post(API_URL + `/recovery`, { mail: mail })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return handleError(error);
        });
}

function handleError(error) {
    if (error.response) {
        console.log("Error in response, message: ", error.response.data);
        console.log("Status code: ", error.response.status);
        console.log("Headers: ", error.response.headers);
    } else if (error.request) {
        console.log("Error in request:", error.request);
    } else {
        console.log("Unknown error: ", error.message);
    }

    return error;
}

const recoverService = {
    recover,
};

export default recoverService;
