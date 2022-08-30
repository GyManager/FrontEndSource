import { Alert, Snackbar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../../context/SnackbarContext";

export default function SnackbarSystem(){
    const {snackbarMessage, removeSnackbar} = useContext(SnackbarContext)
    const [open, setOpen] = useState(() => false);

    useEffect(() => {
        if(snackbarMessage !== undefined && snackbarMessage !== null){
            setOpen(true);
        }
    }, [snackbarMessage])

    function handleClose(event, reason){
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        removeSnackbar()
    }

    if(snackbarMessage === undefined || snackbarMessage === null){
        return;
    }

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={3000}
            onClose={handleClose} 
        >
            <Alert
                onClose={handleClose} 
                severity={snackbarMessage.severity} 
                sx={{ width: '100%' }}
            >
                {snackbarMessage.message}
            </Alert>
        </Snackbar>
    )   
}