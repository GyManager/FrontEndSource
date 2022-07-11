import React from 'react'

import { Container, Box, Paper } from '@mui/material/';
import Client from '../components/clientPage/Client';


export default function ClientPage() {
    return (
        <Container fixed sx={{ backgroundColor: 'green' }}>
            <Box>
                <Paper>
                    <Client />
                </Paper>
            </Box>
        </Container>
    )
}
