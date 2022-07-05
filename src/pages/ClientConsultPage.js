import React from 'react'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Clients from '../components/clientsPage/ClientConsult'


export default function ClientConsultPage() {
    return (
        <Container fixed sx={{ backgroundColor: 'green' }}>
            <Clients />
        </Container>
    )
}
