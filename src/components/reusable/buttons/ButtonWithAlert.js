import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Stack,
} from "@mui/material";
import { Fragment, useState } from "react";

/**
 * @param {handleAccept, buttonProps, buttonIcon, buttonText, alertTitle, alertContent, alertContentIcon, isIconButton} props
 * @returns
 */
export default function ButtonWithAlert(props) {
    const [open, setOpen] = useState(() => false);

    const handleAcceptButton = () => {
        props.handleAccept();
        setOpen(false);
    };

    const button = props.isIconButton ? (
        <IconButton onClick={() => setOpen(true)} {...props.buttonProps}>{props.buttonIcon}</IconButton>
    ) : (
        <Button
            {...props.buttonProps}
            onClick={() => setOpen(true)}
            startIcon={props.buttonIcon}
        >
            {props.buttonText}
        </Button>
    );

    return (
        <Fragment>
            {button}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle alignItems="center">
                    {props.alertTitle}
                </DialogTitle>
                <DialogContent>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <DialogContentText id="alert-dialog-description">
                            {props.alertContent}
                        </DialogContentText>
                        {props.alertContentIcon}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "space-between" }}>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleAcceptButton}>
                        {props.buttonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
