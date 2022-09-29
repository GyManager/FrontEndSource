import React from 'react'

import { Container, Paper } from '@mui/material/';
import User from '../components/user/User';

export default function UserPage() {
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper
                sx={{
                    width: { xs: '90vw', lg: '70vw' },
                    p: '1vw',
                    mb: 1
                }}
            >
                    <User />
            </Paper>
        </Container>
    )
}
