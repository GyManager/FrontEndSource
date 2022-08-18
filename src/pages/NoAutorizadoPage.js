import React from 'react'
import { Container, Typography } from '@mui/material/';
import ErrorIcon from '@mui/icons-material/Error';
import { Box } from '@mui/system';

export default function NoAutorizadoPage(props) {
    return (
        <Container
            maxWidth='false' 
            disableGutters
            sx={{
                py:{xs:0, sm:1}, 
                px:{xs:0.1, sm:1, md:3, lg:5},
                display:'flex',
                flexDirection:'column',
                gap:1,
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <Box sx={{display:'flex', gap:1, alignItems:'center'}}>
                <ErrorIcon fontSize='large'/> 
                <Typography sx={{fontSize: {xs: 24, md: 28, lg: 30, xl: 34}}}>
                    Pagina no encontrada
                </Typography>
            </Box>
            <Typography sx={{fontSize: {xs: 18, md: 18, lg: 20, xl: 24}, width:'80%'}} align='center'>
                Es posbiel que usted no este autorizado a acceder a esta seccion
            </Typography>
        </Container>
    )
}
