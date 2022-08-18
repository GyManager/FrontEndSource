import { Paper } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { ParameterDropdownProvider } from '../context/ParameterDropdownContext'
import { EjercicioProvider } from '../context/EjercicioContext'
import UnEjercicio from '../components/unEjercicioPage/UnEjercicio'
import UnEjercicioBis from '../components/unEjercicioPage/UnEjercicioBis'

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
                    <ParameterDropdownProvider tipoEjercicio bloque ejercicio >
                        <UnEjercicio />
                        {/* <UnEjercicioBis/> */}
                    </ParameterDropdownProvider>
                </EjercicioProvider>

            </Paper>
        </Container>
    )
}

export default UnEjercicioPage