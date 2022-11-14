import React from 'react'

import { Container } from '@mui/material/';
import MisMedidas from '../components/misMedidas/MisMedidas'

export default function MisMedidasPage() {
    return (
        <Container fixed
            sx={{
                display: 'flex',
                flexDirection:'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: { xs: '90vh', sm: '90vh', md: '82vh' }
            }}>
                <MisMedidas />
        </Container>
    )
}
