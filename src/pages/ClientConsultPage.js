import React from 'react'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Clients from '../components/clientsPage/ClientConsult'


export default function ClientConsultPage() {
    return (
        <div>
            <Box sx={{ width: '100%', backgroundColor:'lightgray'}}
            >
                <Container maxWidth="xl">
                    <Clients/>
                </Container>
            </Box>
        </div>
    )
}
