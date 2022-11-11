import React from 'react'

import { Container } from '@mui/material/';
import InformeEjercicio from '../components/misAvances/InformeEjercicio'

export default function InformeEjercicioPage() {
    return (
        <Container fixed
            sx={{
                display: 'flex',
                flexDirection:'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: { xs: '90vh', sm: '90vh', md: '82vh' }
            }}>
                <InformeEjercicio />
        </Container>
    )
}
