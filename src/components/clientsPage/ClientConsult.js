import React from 'react'
import { useState, useEffect } from 'react'
import { Grid, Box, Paper, Typography, Button } from '@mui/material/'

import ButtonAddClientMobile from './ButtonAddClientMobile'
import ButtonAddClientDesktop from './ButtonAddClientDesktop'
import SearchBar from './SearchBar'
import TablesClient from './TablesClient'

import ClientService from '../../services/clients.service'



export default function ClientConsult() {
    const [clientes, setClientes] = useState([]);
    // Barra de busqueda
    const [search, setSearch] = useState('');
    const handleSearchChange = (e) => {
        console.log('OnChange')
            setSearch(e.target.value)
            console.log(e.target.value)
            console.log(e.target.name)
    }
    
    const handleSearchButtonClick = async (search) => {
       
        console.log('Onsubmit')
        // console.log(search)
        
        try {
            await ClientService.getClient(search).then(
                (response) => {
                    const arr = []
                    arr.push(response)
                    console.log(arr)
                    setClientes(arr)
                },
                (error) => {
                    if (error.response.data.status === 401) {
                        console.log("Consolelog=401");
                    } else {
                        console.log(" Consolelog!=401");
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    
    

useEffect(()=>{handleClick()},[])



    const handleClick = async () => {
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

    return (

        <Box sx={{
            display: 'flex', flexwrap: 'wrap',
            // backgroundColor: 'lightgray'
        }}
            justifyContent='center'>
            <Paper
                elevation={12}
                // variant='outlined'
                sx={{
                    // backgroundColor: 'darkblue'
                }}

            >
                <Grid container width='97%' spacing={1} sx={{ mt: 1, mb: 1, mx: 2, backgroundColor: 'red' }} alignItems='center'  >
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
                            justifyContent='end'>
                            <ButtonAddClientDesktop />
                            <Button onClick={handleClick}>Probar Clientes</Button>
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
                                stateSearch={search}
                                onChangeSearch={handleSearchChange}
                                onClickSearchButton={handleSearchButtonClick}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='start' sx={{ backgroundColor: 'blue' }}>
                        <Grid item xs={12} md={12}
                            sx={{
                                backgroundColor: 'lightGreen',
                                height: { xs: '77vh', md: '70vh', lg: '68vh' }
                            }}
                        >
                            <TablesClient 
                            clientes={clientes}/>
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

