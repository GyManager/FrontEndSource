import React from 'react'

import { Container, Paper } from '@mui/material/';
import Client from '../components/clientPage/Client';



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
            <Paper
                sx={{
                    width: {xs:'90vw', lg:'60vw'},
                    height:'100%'
                }}
            >
                <Client/>
            </Paper>
        </Container>
    )
}
