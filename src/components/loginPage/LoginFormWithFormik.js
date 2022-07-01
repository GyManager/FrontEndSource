// Todo hacer el checkbox "Recordar usuario"
// Todo hacer que la sesion sea persistente. Ver video2 del JWT
// Todo separa mejor por capas la funcion connectToServices() y llevar su
//      codigo al componente AuthService
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import AuthService from '../../services/auth.service';

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import LoginModal from './LoginModal';
import LoginBackdrop from './LoginBackdrop'

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
    //Levantar estado de LoginModal
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => { setOpenModal(false) }
    //Hasta aca lenvantar estado de LoginModal
    //Levantar estado de LoginBackdrop
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };
    //Hasta aca lenvantar estado de LoginBackdrop

    const navigate = useNavigate();



    const connectToServices = async (mail, pass) => {
        console.log(AuthService)
        setOpenBackdrop(true)
        try {
            await AuthService.login(mail, pass).then(
                () => {
                    setOpenBackdrop(false)
                    navigate("/")
                    window.location.reload();
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
            email: 'fedeg@gmail.com',
            password: '12345678aA',
            // email: '',
            // password: '',
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
                        fullWidth
                        sx={{ mt: 2 }}
                        variant="contained"
                        type="submit"
                        color="primary"
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
            <LoginModal
                show={openModal}
                hide={handleCloseModal}
                serverMsj={modalMsj} />
            <LoginBackdrop
                show={openBackdrop}
                hide={handleCloseBackdrop} />

        </div>
    )
}

export default LoginFormWithFormik