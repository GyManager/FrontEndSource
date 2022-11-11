import React from 'react'

import { Container } from '@mui/material/';
import MisMedidas from '../components/misMedidas/MisMedidas'

export default function UsersPage() {
    return (
        <Container fixed
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: '90vh', sm: '90vh', md: '82vh' }
            }}>
                <MisMedidas />
        </Container>
    )
}
