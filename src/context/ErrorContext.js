import { createContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState();

    function processErrorMessage(response) {

        if (response.hasOwnProperty("errors")
            && Array.isArray(response.errors)
            && response.errors.length !== 0) {
            
            if (response.errors[0].defaultMessage) {
                setErrorMessage(
                    response.errors.map((error) => error.defaultMessage)
                );
            }
        } else if(response.hasOwnProperty("message")) {
            setErrorMessage(response.message);
        } else {
            setErrorMessage(response)
        }
    }

    return (
        <ErrorContext.Provider
            value={{
                setErrorMessage,
                processErrorMessage,
                errorMessage,
            }}
        >
            {children}
        </ErrorContext.Provider>
    );
};
