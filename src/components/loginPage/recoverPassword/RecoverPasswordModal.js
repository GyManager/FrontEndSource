import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import recoverService from "../../../services/recover.service";

export default function RecoverPasswordModal(props) {
    const formik = useFormik({
        initialValues: {
            email: props.mail || "",
        },
        validationSchema: yup.object({
            email: yup
                .string("Ingrese su email")
                .email("Ingrese un email válido")
                .required("El email es obligatorio"),
        }),
        onSubmit: () => {
            handleSubmit();
        },
    });

    async function handleSubmit() {
        recoverService.recover(formik.values.email);
        props.close();
    }

    return (
        <Modal
            open={props.open}
            onClose={props.close}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                sx={{
                    p: 2,
                    width: { xs: "90vw", md: "60vw" },
                    gap: 3,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Recuperar contraseña
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    Ingrese el correo electronico asociado a su cuenta, si el mismo existe y esta
                    asociado a un usuario, recibira un correo con una contraseña provisoria
                </Typography>

                <TextField
                    fullWidth
                    size="small"
                    sx={{ my: 1 }}
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <Button
                    id="recover"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={formik.handleSubmit}
                >
                    Recuperar contraseña
                </Button>
            </Paper>
        </Modal>
    );
}
