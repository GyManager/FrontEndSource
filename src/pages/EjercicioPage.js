import { Paper } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { EjercicioProvider } from '../context/EjercicioContext'
import EjercicioPage from '../components/ejercicio/Ejercicio'

function UnEjercicioPage() {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
            <Paper
                sx={{
                    width: { xs: '90vw', lg: '70vw' },
                    // height: { xs: '140vh', sm: '90vh', md: '80vh', lg: '77vh', xl: '80vh' },
                    p: '1vw',
                    mt: '2vh',
                }}
            >
                <EjercicioProvider paso unIdEjercicio >
                        <EjercicioPage />
                </EjercicioProvider>

            </Paper>
        </Container>
    )
}

export default UnEjercicioPage