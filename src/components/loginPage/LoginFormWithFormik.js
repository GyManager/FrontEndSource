// Todo hacer el checkbox "Recordar usuario"
// Todo separa mejor por capas la funcion connectToServices() y llevar su
//      codigo al componente AuthService
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import AuthService from '../../services/auth.service';

import {
    Alert, Button, Checkbox, Container, FormControlLabel,
    Link, Paper, TextField, Typography
} from '@mui/material';

import { Backdrop, GenericModal } from '../reusable';

const validationSchema = yup.object({
    email: yup
        .string('Ingrese su email')
        .email('Ingrese un email válido')
        .required('El email es obligatorio'),
    password: yup
        .string('Ingrese su contraseña')
        .min(8, 'La contraseña debería tener como mínimo 8 caracteres')
        .required('La contraseña es obligatoria'),
});

const LoginFormWithFormik = () => {
    const [modalMsj, setModalMsj] = useState("");
    //Levantar estado de Modal
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => { setOpenModal(false) }
    //Levantar estado de Backdrop
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    const navigate = useNavigate();


    //Todo hacer refactor de connectToServices a Login
    const connectToServices = async (mail, pass) => {
        console.log(AuthService)
        setOpenBackdrop(true)
        try {
            await AuthService.login(mail, pass).then(
                () => {
                    navigate("/clientes")
                    window.location.reload();
                    setOpenBackdrop(false)
                },
                (error) => {
                    setOpenBackdrop(false)
                    setOpenModal(true);
                    if (error.response.data.status === 401) {
                        setModalMsj("Usuario o contraseña incorrecta");
                    } else {
                        setModalMsj(" Error en el servidor");
                    }
                }
            );

        } catch (err) {
            console.log(err);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            connectToServices(values.email, values.password)
        },
    });

    return (
        <div>
            <Paper
                sx={{ borderRadius: 3 }}
                elevation={3}
            >
                <Container
                    component="form"
                    sx={{ gap: 4 }}
                    onSubmit={formik.handleSubmit}>
                    <Typography
                        sx={{ pt: 3, pb: 0 }}
                        variant="h6"
                        align="center"
                        component="div"
                        gutterBottom>
                        Iniciar Sesión
                    </Typography>

                    {modalMsj === '' ?
                        <Typography
                            sx={{ pt: 0, pb: 0 }}
                            color='error.main'
                            variant="body2"
                            align="center"
                            component="div"
                            gutterBottom>
                        </Typography>
                        :
                        <Alert severity="error"
                            sx={{ mb: 2 }}>{modalMsj}</Alert>
                    }

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
                    <TextField
                        fullWidth
                        size="small"
                        sx={{ my: 1 }}
                        id="password"
                        name="password"
                        label="Contraseña"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <FormControlLabel
                        label="Recordar mi usuario"
                        size="small"
                        control={
                            <Checkbox
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }}
                                value="checkBox"
                                color="primary"
                            />
                        }
                    />
                    <Button
                        id='IniciarSesion'
                        fullWidth
                        sx={{ mt: 2 }}
                        variant="contained"
                        type="submit"
                    >
                        Iniciar sesión
                    </Button>
                    <Typography
                        sx={{ pt: 1, pb: 3 }}
                        variant="caption"
                        align="right"
                        component="div"
                    >
                        <Link href="">Olvido su contraseña?</Link>
                    </Typography>
                </Container>
            </Paper>
            <GenericModal
                show={openModal}
                hide={handleCloseModal}
                serverMsj={modalMsj} />
            <Backdrop
                show={openBackdrop}
                hide={handleCloseBackdrop} />

        </div>
    )
}

export default LoginFormWithFormik