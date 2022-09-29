import React from 'react'

import { Container } from '@mui/material/';
import Users from '../components/usersPage/Users'

export default function UsersPage() {
    return (
        <Container fixed
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: '90vh', sm: '90vh', md: '82vh' }
            }}>
                <Users />
        </Container>
    )
}
