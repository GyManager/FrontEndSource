import { Warning } from "@mui/icons-material";
import { Box, List, ListItem, ListItemIcon, ListItemText, Modal, Paper, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../context/ErrorContext";

export default function ErrorModalSystem() {
    const { setErrorMessage, errorMessage } = useContext(ErrorContext);
    const [open, setOpen] = useState(() => false);

    useEffect(() => {
        if (errorMessage !== undefined && errorMessage !== null) {
            setOpen(true);
        }
    }, [errorMessage]);

    function handleClose() {
        setOpen(false);
        setErrorMessage(null);
    }

    if (errorMessage === undefined || errorMessage === null || !open) {
        return;
    }

    const errors = (Array.isArray(errorMessage)) ?
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {errorMessage.map(error => (
                <ListItem>
                    <ListItemIcon>
                        <Warning color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={error} />
                </ListItem>
            )) }
        </List>
        :  (typeof errorMessage === "string") ?
        <Typography>
            <Warning color="warning" />
            {errorMessage}
        </Typography>
        :
        <Typography>
            <Warning color="warning" />
            {JSON.stringify(errorMessage)}
        </Typography>

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{display:'flex', alignItems:'center',justifyContent:'center'}}
        >
            <Paper sx={{p:2}}>
                <Typography variant="h5" sx={{mb:2}}>
                    {"Algo salio mal :("}
                </Typography>
                <Stack direction="row" spacing={2}>
                    {errors}
                </Stack>
            </Paper>
        </Modal>
    );
}
