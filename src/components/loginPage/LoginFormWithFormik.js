import React from 'react'

import { useFormik } from 'formik';
import * as yup from 'yup';

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link';



const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const LoginFormWithFormik = () => {
    const formik = useFormik({
        initialValues: {
            email: 'JuanCarlos@gmail.com',
            password: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <Paper
                sx={{ borderRadius: 3 }}
                elevation={3}
            >
                <Container component="form" sx={{ gap: 4 }} onSubmit={formik.handleSubmit}>
                    <Typography
                        sx={{ pt: 3, pb: 1 }}
                        variant="h6"
                        align="center"
                        component="div"
                        gutterBottom>
                        Iniciar Sesión
                    </Typography>

                    {/* --------------------------Aca con formik-------------------------- */}
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
                        name="password"
                        type="password"
                        id="password"
                        label="Contraseña"
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
                                //   onChange={()=}
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
        </div>
    )
}

export default LoginFormWithFormik