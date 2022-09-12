import React from 'react'

import { Container } from '@mui/material/';
import Users from '../components/usersPage/Users'
import { UsersProvider } from '../context/UsersContext'


export default function UsersPage() {
    return (
        <Container fixed
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: '90vh', sm: '90vh', md: '82vh' }
            }}>
            <UsersProvider>
                <Users />
            </UsersProvider>
        </Container>
    )
}
