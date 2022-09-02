import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
} from "@mui/material";
import { Fragment, useState } from "react";

/**
 * @param {handleAccept, buttonProps, buttonIcon, buttonText, alertTitle, alertContent, alertContentIcon} props
 * @returns
 */
export default function ButtonWithAlert(props) {
    const [open, setOpen] = useState(() => false);

    const handleAcceptButton = () => {
        props.handleAccept();
        setOpen(false);
    };

    return (
        <Fragment>
            <Button
                {...props.buttonProps}
                onClick={() => setOpen(true)}
                startIcon={props.buttonIcon}
            >
                {props.buttonText}
            </Button>
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
