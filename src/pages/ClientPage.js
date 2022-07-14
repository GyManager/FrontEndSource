import React from 'react'

import { Container, Paper } from '@mui/material/';
import Client from '../components/clientPage/Client';
import { useParams } from 'react-router-dom';



export default function ClientPage() {
    let { clienteId } = useParams();

    return (
        <Container fixed
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
                height: { xs: '90vh', sm: '90vh', md: '82vh' }
            }}>
            <h1>{clienteId}</h1>
            <Paper
                sx={{
                    height: '90%'
                }}
            >
                <Client />
            </Paper>
        </Container>
    )
}
