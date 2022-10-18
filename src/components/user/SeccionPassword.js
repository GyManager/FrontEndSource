import { Lock } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useContext } from "react";
import { ErrorContext } from "../../context/ErrorContext";
import { SnackbarContext } from "../../context/SnackbarContext";
import clientsService from "../../services/users.service";
import ButtonWithAlert from "../reusable/buttons/ButtonWithAlert";

export default function SeccionPassword(props) {
    const { addSnackbar } = useContext(SnackbarContext);
    const { processErrorMessage } = useContext(ErrorContext);

    async function handleSubmit(e) {
        e?.preventDefault();

        const response = await clientsService.putUserPasswordReset(props.idUsuario);

        if (response instanceof AxiosError) {
            processErrorMessage(response.response.data);
        } else {
            addSnackbar({
                message: "La contraseña fue reiniciada con exito",
                severity: "success",
            });
        }
    }

    return (
        <Paper {...props.paperStyle}>
            <Typography variant="h5"> Contraseña</Typography>
            <ButtonWithAlert
                buttonProps={{ variant: "outlined" }}
                handleAccept={handleSubmit}
                buttonText={"Reiniciar Contraseña"}
                buttonIcon={<Lock />}
                alertTitle={"Reinicio de contraseña"}
                alertContent={`Esta por reiniciar la contraseña del usuario ${props.nombre} ${props.apellido}, 
                la misma se cambiara a su numero de documento ¿Seguro que desea hacerlo?`}
            />
        </Paper>
    );
}
