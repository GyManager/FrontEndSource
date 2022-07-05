import React from 'react'
import { Grid, Paper, Typography } from '@mui/material/'


import ButtonAddClientMobile from './ButtonAddClientMobile'
import ButtonAddClientDesktop from './ButtonAddClientDesktop'
import SearchBar from './SearchBar'
import TablesClient from './TablesClient'

export default function ClientConsult() {
    return (
        <div>
            {/* TODO Agregar en el drawer un elemento vacio de la misma altura que el drawer para no tener que andar posicionando los elementos
        y para que funcione mejor el responsive */}
            <Paper width='100%' >
                <Grid container spacing={1} sx={{ mt: 1, mb: 1, mx: 2 }} alignItems='center'  >
                    <Grid container item justifyContent='space-between' alignItems='center'>
                        <Grid item xs={12} md={3}
                        // sx={{ backgroundColor: 'blue' }}
                        >
                            <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 42 } }} >
                                Clientes
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={2}
                            sx={{
                                // backgroundColor: 'yellow',
                                display: { xs: 'none', md: 'block' }
                            }}
                            justifyContent='flex-end'>
                            <ButtonAddClientDesktop />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='start' alignItem='center'>
                        <Grid item xs={10.5} md={5}
                            sx={{
                                // backgroundColor: 'lightBlue',
                                mb: 2
                            }}
                        >
                            <SearchBar />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='start' alignItem='end'>
                        <Grid item xs={10.5} md={12}
                            sx={{
                                // backgroundColor: 'lightGreen',
                                height: { xs: '77vh', md: '70vh', lg: '68vh' }
                            }}
                        >
                            <TablesClient />
                        </Grid>
                    </Grid>
                    {/* Boton solo para vista mobile */}
                    <Grid container>
                        <Grid item xs={12} md={12}
                            sx={{
                                // backgroundColor: 'yellow',
                                display: { xs: 'block', md: 'none' },
                                position: 'fixed',
                                right: '4vw',
                                bottom: '4vh'
                            }} >
                            <ButtonAddClientMobile />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div >
    )
}

