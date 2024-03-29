import React from 'react'

import { Container, Paper } from '@mui/material/';
import Client from '../components/clientPage/Client';



export default function ClientPage() {
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center'}}>
            <Paper
                sx={{
                    width: {xs:'90vw', lg:'70vw'},
                    //height: { xs: '140vh', sm: '90vh', md: '110vh', lg:'110vh', xl:'80vh' },
                    p:'1vw',
                    mb:1
                }}
            >
                <Client/>
            </Paper>
        </Container>
    )
}
