import React from 'react'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from '../components/loginPage/LoginHeader';
import FormWithFormik from '../components/loginPage/LoginFormWithFormik';


export default function LoginPage() {
    return (
        <div>
            <Box sx={{ width: '100%' }}
            >
                <Container maxWidth="xs">
                    <Header />
                    <FormWithFormik />
                </Container>
            </Box>
        </div>
    )
}
