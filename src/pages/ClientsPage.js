import React from 'react'

import { Container, Box, Paper } from '@mui/material/';
import Clients from '../components/clientsPage/Clients'


export default function ClientConsultPage() {
    return (
        <Container fixed sx={{ backgroundColor: 'green' }}>
            <Box sx={{
                display: 'flex', flexwrap: 'wrap',
                // backgroundColor: 'lightgray'
            }}
                justifyContent='center'>
                <Paper
                    elevation={12}
                    // variant='outlined'
                    sx={{
                        // backgroundColor: 'darkblue'
                    }}
                >
                    <Clients />
                </Paper>
            </Box>
        </Container>
    )
}
