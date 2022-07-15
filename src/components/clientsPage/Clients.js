import React from 'react'
import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { Grid, Box, Paper, Typography, Button } from '@mui/material/'

import ButtonAddClientMobile from './ButtonAddClientMobile'
import ButtonAddClientDesktop from './ButtonAddClientDesktop'
import SearchBar from './SearchBar'
import TablesClient from './TablesClient'

import ClientService from '../../services/clients.service'

import { useMediaQuery } from '@mui/material';



export default function Clients() {
    const isMediumDevice = useMediaQuery('(max-width:900px');
    const [clientes, setClientes] = useState([{}]);
    const getClients = async () => {
        try {
            await ClientService.getClients().then(
                (responseArray) => {
                    setClientes(responseArray)
                },
                (error) => {
                    if (error.response.data.status === 401) {
                        console.log("Consolelog=401");
                    } else {
                        console.log("Consolelog!=401");
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => { getClients() }, [])

    return (

        <Box sx={{
            display: 'flex', flexwrap: 'wrap',
            // backgroundColor: 'lightgray'
        }}
            justifyContent='center'>
            <Paper
                elevation={12}
                // TODO  006
                sx={{
                    // backgroundColor: 'darkblue',
                    height: '83vh'
                }}

            >
                <Grid container width='100%' spacing={1} 
                sx={{ mt: 1, mb: 1, mx: 2,
                //  backgroundColor: 'red' 
                 }} 
                 alignItems='center'  >
                    <Grid container item justifyContent='space-between' alignItems='center'>
                        <Grid item xs={12} md={3}
                        // sx={{ backgroundColor: 'blue' }}
                        >
                            {/* TODO HACER UN COMPONENTE TIPOGRAPHY CON LOS TAMAÑOS DE LAS LETRAS PARA REDUCIR MANTENIMINETO Y MEJORAR CONSISTENCIA   */}
                            <Typography sx={{ fontSize: { xs: 24, md: 30, lg: 36, xl: 42 } }} >
                                Clientes
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={2}
                            sx={{
                                // backgroundColor: 'yellow',
                                display: { xs: 'none', sm: 'none', md: 'block' }
                            }}
                            justifyContent='end'>
                            <ButtonAddClientDesktop size={isMediumDevice ? "small" : "medium"} />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='start' alignItem='center'>
                        <Grid item xs={10.5} md={5}
                            sx={{
                                // backgroundColor: 'lightBlue',
                                mb: 2
                            }}
                        >
                            <SearchBar
                             clientes={clientes}
                             setClientes={setClientes}
                                // stateSearch={search}
                                // onChangeSearch={handleSearchChange}
                                // onClickSearchButton={handleSearchButtonClick}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='start' sx={{ backgroundColor: '' }} >
                        <Grid item xs={12} sm={10} md={12}
                            sx={{
                                // backgroundColor: 'lightGreen',
                                // height: { xs: '77vh', md: '30vh', lg: '68vh' }
                                height: '100%'
                            }}
                        >
                            <TablesClient
                                clientes={clientes}
                            />
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
        </Box >
    )
}

