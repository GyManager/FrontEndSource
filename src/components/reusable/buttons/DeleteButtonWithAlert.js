import { Delete, DeleteForever } from "@mui/icons-material";
import ButtonWithAlert from "./ButtonWithAlert";

/**
 *
 * @param {handleAccept, buttonProps, alertTitle, alertContent, buttonText, hideButtonIcon} props
 * @returns
 */
export default function DeleteButtonWithAlert(props) {
    return (
        <ButtonWithAlert
            buttonProps={props.buttonProps}
            handleAccept={props.handleAccept}
            buttonText={props.buttonText ? props.buttonText : "Borrar"}
            buttonIcon={props.hideButtonIcon || <Delete />}
            alertTitle={props.alertTitle}
            alertContent={props.alertContent ? props.alertContent : "¿Seguro desea eliminarlo?"}
            alertContentIcon={
                <DeleteForever color="warning" fontSize="medium" />
            }
        />
    );
}
