import React from 'react'

import { Container, Paper } from '@mui/material/';
import Clients from '../components/clientsPage/Clients'


export default function ClientPage() {
    return (
        <Container fixed
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'green',
                height: { xs: '90vh', sm: '90vh', md: '82vh' }
            }}>
                <Clients />
        </Container>
    )
}
