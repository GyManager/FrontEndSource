import React from 'react'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from '../components/LoginHeader';
import Form from '../components/LoginForm';

export default function LoginPage() {
    return (
        <div>
            <Box sx={{ width: '100%' }}
            >
                <Container maxWidth="xs">
                    <Header/>
                    <Form/>
                </Container>
            </Box>
        </div>
    )
}
