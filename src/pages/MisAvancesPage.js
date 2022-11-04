import React from 'react'

import { Container } from '@mui/material/';
import MisAvances from '../components/misAvances/MisAvances'

export default function MisAvancesPage() {
    return (
        <Container fixed
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: '90vh', sm: '90vh', md: '82vh' }
            }}>
                <MisAvances />
        </Container>
    )
}
