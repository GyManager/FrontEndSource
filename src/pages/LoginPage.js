import React from 'react'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from '../components/loginPage/LoginHeader';
// import Form from '../components/loginPage/LoginForm';
import FormWithFormik from '../components/loginPage/LoginFormWithFormik';
import Aux from '../components/loginPage/LoginFormF'

export default function LoginPage() {
    return (
        <div>
            <Box sx={{ width: '100%' }}
            >
                <Container maxWidth="xs">
                    <Header/>
                    {/* <Form/> */}
                    <FormWithFormik/>
                    {/* <Aux/> */}
                </Container>
            </Box>
        </div>
    )
}
