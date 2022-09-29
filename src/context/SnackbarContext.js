import { createContext, useState } from "react";

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const[snackbarMessage, setSnackbarMessage] = useState()
    const[snackbarQueue, setSnackbarQueue] = useState(() => [])
    
    function addSnackbar(message){
        if(snackbarMessage === null || snackbarMessage === undefined){
            setSnackbarMessage({...message})
        } else {
            setSnackbarQueue(prev => [...prev, {...message}])
        }
    }

    function removeSnackbar(){
        if(snackbarQueue.length === 0){
            setSnackbarMessage(undefined)
        } else {
            setTimeout(() => {
                setSnackbarMessage(snackbarQueue[0])
                setSnackbarQueue(prev => {prev.shift(); return prev})
            }, 150);
        }
    }

    return (
        <SnackbarContext.Provider value={{
            snackbarMessage,
            removeSnackbar,
            addSnackbar
        }}>
            {children}
        </SnackbarContext.Provider>
    )
}