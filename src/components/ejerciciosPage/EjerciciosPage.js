import React from 'react'
import { useEffect } from 'react'
import { Box, Button, Grid, Paper } from '@mui/material'
import { Container } from '@mui/system'

import ejerciciosService from '../../services/ejercicios.service'

function EjerciciosPage() {

    useEffect(() => {
    const getEjercicios = async () => {
        await ejerciciosService.getEjercicios()
    }
    getEjercicios()
}, [])

const getEjercicios = async () => {
    await ejerciciosService.getEjercicios()
}

    return (
        <div>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <Paper
                    sx={{
                        width: { xs: '90vw', lg: '70vw' },
                        height: { xs: '140vh', sm: '90vh', md: '80vh', lg: '77vh', xl: '80vh' },
                        p: '1vw'
                    }}
                >
                    <Grid container>
                        <Grid item sx={{ display: 'flex', backgroundColor: 'yellow' }} xs='12' md='6' >
<Button onClick={getEjercicios}>Clicme</Button>
                        </Grid>

                    </Grid>

                </Paper>
            </Container>
            {/* 
            <Box
                sx={{
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 128,
                        height: '80vw',
                    },
                }}
            >
                <Paper elevation={0} />
                <Paper />
                <Paper elevation={3} />
            </Box>
             */}
        </div>
    )
}

export default EjerciciosPage