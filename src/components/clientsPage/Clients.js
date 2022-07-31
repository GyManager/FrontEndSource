import React from 'react'
import { useState, useEffect } from 'react'
import { Grid, Box, Paper, Typography } from '@mui/material/'

import ButtonAddClientMobile from './ButtonAddClientMobile'
import ButtonAddClientDesktop from './ButtonAddClientDesktop'
import SearchBar from './SearchBar'
import TablesClient from './TablesClient'
import LoginModal from '../reusable/Modal';
import LoginBackdrop from '../reusable/Backdrop'

import clientsService from '../../services/clients.service'

import { useMediaQuery } from '@mui/material';
import { AxiosError } from 'axios'



export default function Clients() {
    const isMediumDevice = useMediaQuery('(max-width:900px');

    const [modalMsj, setModalMsj] = useState("");
    //Estados de LoginModal
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => { setOpenModal(false) }

    //Estados de Backdrop
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    const [clientes, setClientes] = useState([{}]);
    const [clientesTotal, setClientesTotal] = useState(() => 0)

    const [page, setPage] = useState(() => 0);
    const [rowsPerPage, setRowsPerPage] = useState(() => 10);
    const [valueToSearch, setValueToSearch] = useState('');

    const searchClientes = (newValueToSearch) => {
        setValueToSearch(newValueToSearch)
        setPage(0)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }

    useEffect(() => {
        const fetchData = async () => {
            setOpenBackdrop(true)
            const respuesta = await clientsService.getClients(valueToSearch, rowsPerPage, page);
            setOpenBackdrop(false)
            if (respuesta instanceof AxiosError) {
                setModalMsj(respuesta?.message)
                setOpenModal(true)
            } else {
                setClientes(respuesta.content)
                setClientesTotal(respuesta.totalElements)
            }
        }

        fetchData();

    }, [valueToSearch, rowsPerPage, page])

    return (

        <Box sx={{
            display: 'flex', flexwrap: 'wrap',
            // backgroundColor: 'green'
        }}
            justifyContent='center'>
            <Paper
                elevation={12}
                // TODO  006
                sx={{
                    // backgroundColor: 'yellow',
                    height: '83vh',

                }}

            >
                <Grid container width='90vw'
                    sx={{
                        mt: 1, mb: 1, mx: 2,
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
                    <Grid container justifyContent='start' alignItems='center'>
                        <Grid item xs={10.5} md={5}
                            sx={{
                                // backgroundColor: 'lightBlue',
                                mb: 2
                            }}
                        >
                            <SearchBar
                                searchClientes={searchClientes}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='start' sx={{ backgroundColor: 'green' }} >
                        <Grid item xs={12}
                            sx={{
                                backgroundColor: 'lightGreen',
                                // height: { xs: '77vh', md: '30vh', lg: '68vh' }
                                height: '100%',

                            }}
                        >
                            <TablesClient
                                clientes={clientes}
                                clientesTotal={clientesTotal}
                                page={page}
                                handleChangePage={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />

                            {/* <StickyHeadTable /> */}


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
            <LoginModal
                show={openModal}
                hide={handleCloseModal}
                serverMsj={modalMsj} />
            <LoginBackdrop
                show={openBackdrop}
                hide={handleCloseBackdrop} />
        </Box>
    )
}

